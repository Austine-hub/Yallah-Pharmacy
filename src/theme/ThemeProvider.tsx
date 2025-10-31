// ===============================================================
// THEME PROVIDER — Modern, Accessible, Extendable (2025)
// ===============================================================

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

// ===============================================================
// ✅ Type Definitions
// ===============================================================
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

// ===============================================================
// ✅ Context Creation
// ===============================================================
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ===============================================================
// ✅ Provider Component
// ===============================================================
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialize theme from localStorage or system preference
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") as Theme | null;
      if (storedTheme) return storedTheme;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });

  // ===============================================================
  // 🌙 Apply theme to document + persist preference
  // ===============================================================
  const applyTheme = useCallback((newTheme: Theme) => {
    const root = document.documentElement;
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    // Optional: sync meta theme color for browser UI
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        newTheme === "dark" ? "#0b1c2c" : "#ffffff"
      );
    }
  }, []);

  // Apply the theme whenever it changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  // ===============================================================
  // 🖥️ Watch for OS-level theme changes
  // ===============================================================
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event: MediaQueryListEvent) => {
      // Only auto-change if user hasn't chosen a manual theme yet
      const storedTheme = localStorage.getItem("theme");
      if (!storedTheme) {
        setTheme(event.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // ===============================================================
  // 🔄 Toggle manually between light and dark
  // ===============================================================
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ===============================================================
// ✅ Custom Hook — useTheme()
// ===============================================================
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
