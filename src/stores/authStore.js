import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  buildApiUrl,
  clearAuthToken,
  getAuthToken,
  readResponseBody,
  setAuthToken,
} from "../lib/api.js";

const AUTH_SESSION_KEY = "bable.auth-session";

const createAuthState = (overrides = {}) => ({
  isAuthenticated: false,
  user: null,
  userId: null,
  loading: false,
  error: null,
  ...overrides,
});

const decodeJwtPayload = (token) => {
  if (!token || typeof token !== "string") {
    return null;
  }

  const [, payload] = token.split(".");
  if (!payload || typeof window === "undefined") {
    return null;
  }

  try {
    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = window.atob(normalizedPayload);
    return JSON.parse(decodedPayload);
  } catch {
    return null;
  }
};

const getUserIdFromToken = (token) => {
  const payload = decodeJwtPayload(token);
  if (!payload) {
    return null;
  }

  return (
    payload.userId ||
    payload.user_id ||
    payload.id ||
    payload.sub ||
    payload.uid ||
    null
  );
};

const isTokenExpired = (token) => {
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) {
    return false;
  }

  return Date.now() >= payload.exp * 1000;
};

const extractTokenFromAuthHeader = (rawHeader) => {
  if (!rawHeader || typeof rawHeader !== "string") {
    return null;
  }

  const trimmed = rawHeader.trim();
  if (!trimmed) {
    return null;
  }

  const bearerMatch = trimmed.match(/^Bearer\s+(.+)$/i);
  if (bearerMatch?.[1]) {
    return bearerMatch[1].trim();
  }

  return trimmed;
};

const getInitialAuthState = () => {
  if (typeof window === "undefined") {
    return createAuthState({ loading: false });
  }

  const token = getAuthToken();
  if (!token || isTokenExpired(token)) {
    clearAuthToken();
    return createAuthState({ loading: false });
  }

  return createAuthState({
    isAuthenticated: true,
    userId: getUserIdFromToken(token),
    loading: false,
  });
};

export const useAuthStore = create()(
  persist(
    (set, get) => ({
      ...getInitialAuthState(),
      checkAuth: async ({ force = false } = {}) => {
        try {
          if (typeof window === "undefined") {
            set(createAuthState({ loading: false }));
            return false;
          }

          const token = getAuthToken();

          if (!token || isTokenExpired(token)) {
            clearAuthToken();
            set(createAuthState({ loading: false }));
            return false;
          }

          if (!force) {
            const { isAuthenticated, userId, user } = get();

            if (isAuthenticated) {
              set(
                createAuthState({
                  isAuthenticated: true,
                  userId: userId || getUserIdFromToken(token),
                  user,
                  loading: false,
                  error: null,
                })
              );
              return true;
            }
          }

          set((prev) =>
            createAuthState({
              isAuthenticated: true,
              userId: getUserIdFromToken(token),
              user: prev.user,
              loading: false,
              error: null,
            })
          );
          return true;
        } catch (error) {
          console.error("Auth check error:", error);
          clearAuthToken();
          set(
            createAuthState({
              loading: false,
              error: error.message,
            })
          );
          return false;
        }
      },
      login: async (credentials) => {
        try {
          set((prev) => ({ ...prev, loading: true, error: null }));

          const response = await fetch(buildApiUrl("/user/login-user"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          const responseBody = await readResponseBody(response);
          const authHeader =
            response.headers.get("Authorization") ||
            response.headers.get("authorization");
          const token = extractTokenFromAuthHeader(authHeader);

          if (!response.ok) {
            if (response.status === 404) {
              throw new Error("No User Found");
            }

            if (response.status === 401) {
              throw new Error("Unauthorized");
            }

            throw new Error(
              (typeof responseBody === "string" && responseBody) ||
                responseBody?.message ||
                "Login failed"
            );
          }

          if (!token) {
            throw new Error(
              "Login succeeded but Authorization token is unavailable to the browser. Ensure backend CORS exposes header: Access-Control-Expose-Headers: Authorization"
            );
          }

          setAuthToken(token);

          const loginUser =
            responseBody && typeof responseBody === "object"
              ? {
                  id: responseBody.id,
                  name: responseBody.name,
                  email: responseBody.email,
                }
              : null;

          set(
            createAuthState({
              isAuthenticated: true,
              user: loginUser,
              userId: loginUser?.id || getUserIdFromToken(token),
              loading: false,
              error: null,
            })
          );

          return true;
        } catch (error) {
          console.error("Login error:", error);
          set((prev) => ({ ...prev, loading: false, error: error.message }));
          throw error;
        }
      },
      logout: async () => {
        try {
          set((prev) => ({ ...prev, loading: true, error: null }));
          clearAuthToken();
          set(createAuthState({ loading: false }));
          return true;
        } catch (error) {
          console.error("Logout error:", error);
          clearAuthToken();
          set(
            createAuthState({
              loading: false,
              error: error.message,
            })
          );
          return false;
        }
      },
      refreshAuth: async () => get().checkAuth({ force: true }),
    }),
    {
      name: AUTH_SESSION_KEY,
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        userId: state.userId,
      }),
    }
  )
);
