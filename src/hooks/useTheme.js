import { useShallow } from "zustand/react/shallow";
import { useThemeStore } from "../stores/themeStore.js";

export const useTheme = () => {
  return useThemeStore(
    useShallow((state) => ({
      theme: state.theme,
      setTheme: state.setTheme,
      toggleTheme: state.toggleTheme,
    }))
  );
};
