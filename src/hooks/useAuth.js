import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "../stores/authStore.js";

export const useAuth = () => {
  return useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      userId: state.userId,
      loading: state.loading,
      error: state.error,
      login: state.login,
      logout: state.logout,
      refreshAuth: state.refreshAuth,
      checkAuth: state.checkAuth,
    }))
  );
};
