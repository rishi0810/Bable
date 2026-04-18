import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const THEME_STORAGE_KEY = "bable-theme";

const applyTheme = (theme) => {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.setAttribute("data-theme", theme);
};

const resolveInitialTheme = () => {
  if (typeof window === "undefined") {
    return "light";
  }

  return (
    window.localStorage.getItem(THEME_STORAGE_KEY) ||
    document.documentElement.getAttribute("data-theme") ||
    "light"
  );
};

export const useThemeStore = create()(
  persist(
    (set, get) => ({
      theme: resolveInitialTheme(),
      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },
      toggleTheme: () => {
        const nextTheme = get().theme === "light" ? "dark" : "light";
        applyTheme(nextTheme);
        set({ theme: nextTheme });
      },
    }),
    {
      name: THEME_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);

applyTheme(useThemeStore.getState().theme);
