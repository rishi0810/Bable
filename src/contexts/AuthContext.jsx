import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { buildApiUrl } from "../lib/api.js";

const AuthContext = createContext();
const AUTH_SESSION_KEY = "bable.auth-session";

const createAuthState = (overrides = {}) => ({
  isAuthenticated: false,
  user: null,
  userId: null,
  loading: false,
  error: null,
  ...overrides,
});

const normalizeAuthData = (data = {}) =>
  createAuthState({
    isAuthenticated: Boolean(data.Authenticated),
    user: data.user || null,
    userId: data.userId || data.user?._id || null,
    loading: false,
    error: null,
  });

const readCachedAuthState = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const cachedValue = window.sessionStorage.getItem(AUTH_SESSION_KEY);

    if (!cachedValue) {
      return null;
    }

    const parsedValue = JSON.parse(cachedValue);

    return {
      isAuthenticated: Boolean(parsedValue?.isAuthenticated),
      user: parsedValue?.user || null,
      userId: parsedValue?.userId || parsedValue?.user?._id || null,
    };
  } catch (error) {
    console.error("Failed to read cached auth state:", error);
    window.sessionStorage.removeItem(AUTH_SESSION_KEY);
    return null;
  }
};

const writeCachedAuthState = (authState) => {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(
    AUTH_SESSION_KEY,
    JSON.stringify({
      isAuthenticated: authState.isAuthenticated,
      user: authState.user,
      userId: authState.userId,
    })
  );
};

const clearCachedAuthState = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.removeItem(AUTH_SESSION_KEY);
};

export const AuthProvider = ({ children }) => {
  const initialCachedStateRef = useRef(readCachedAuthState());
  const authCheckPromiseRef = useRef(null);
  const [authState, setAuthState] = useState(() =>
    initialCachedStateRef.current
      ? createAuthState({
          ...initialCachedStateRef.current,
          loading: false,
        })
      : createAuthState({ loading: true })
  );

  const applyAuthState = useCallback((nextState, { persist = true } = {}) => {
    setAuthState(nextState);

    if (persist) {
      writeCachedAuthState(nextState);
      return;
    }

    clearCachedAuthState();
  }, []);

  const checkAuth = useCallback(async ({ force = false } = {}) => {
    if (!force) {
      const cachedAuthState = readCachedAuthState();

      if (cachedAuthState) {
        const nextState = createAuthState({
          ...cachedAuthState,
          loading: false,
          error: null,
        });

        setAuthState(nextState);
        return nextState.isAuthenticated;
      }
    }

    if (authCheckPromiseRef.current) {
      return authCheckPromiseRef.current;
    }

    authCheckPromiseRef.current = (async () => {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await fetch(
          buildApiUrl("/user/authcheck"),
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.status === 401 || response.status === 403) {
          const nextState = createAuthState({ loading: false });
          applyAuthState(nextState);
          return false;
        }

        if (!response.ok) {
          throw new Error("Authentication check failed");
        }

        const data = await response.json();
        const nextState = normalizeAuthData(data);

        applyAuthState(nextState);
        return nextState.isAuthenticated;
      } catch (error) {
        console.error("Auth check error:", error);
        setAuthState(
          createAuthState({
            loading: false,
            error: error.message,
          })
        );
        clearCachedAuthState();
        return false;
      } finally {
        authCheckPromiseRef.current = null;
      }
    })();

    return authCheckPromiseRef.current;
  }, [applyAuthState]);

  const login = useCallback(async (credentials) => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));

      const response = await fetch(
        buildApiUrl("/user/login"),
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );

      let data = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(data?.message || "Login failed");
      }

      if (data?.Authenticated !== undefined || data?.user || data?.userId) {
        const nextState = normalizeAuthData({
          Authenticated: data.Authenticated ?? true,
          user: data.user,
          userId: data.userId,
        });

        applyAuthState(nextState);
        return nextState.isAuthenticated;
      }

      return checkAuth({ force: true });
    } catch (error) {
      console.error("Login error:", error);
      setAuthState((prev) => ({ ...prev, loading: false, error: error.message }));
      throw error;
    }
  }, [applyAuthState, checkAuth]);

  const logout = useCallback(async () => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));

      const response = await fetch(
        buildApiUrl("/user/logout"),
        {
          method: "POST",
          credentials: "include",
        }
      );

      applyAuthState(createAuthState({ loading: false }));

      return response.ok;
    } catch (error) {
      console.error("Logout error:", error);

      applyAuthState(
        createAuthState({
          loading: false,
          error: error.message,
        }),
        { persist: false }
      );
      return false;
    }
  }, [applyAuthState]);

  const refreshAuth = useCallback(() => {
    return checkAuth({ force: true });
  }, [checkAuth]);

  useEffect(() => {
    if (!initialCachedStateRef.current) {
      checkAuth();
    }
  }, [checkAuth]);

  const contextValue = {
    ...authState,
    login,
    logout,
    refreshAuth,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
