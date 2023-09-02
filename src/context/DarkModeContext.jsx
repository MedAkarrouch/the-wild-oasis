import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();
export function DarkModeContextProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove("light-mode");
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.classList.add("light-mode");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((isDark) => !isDark);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
export function useDarkModeContext() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error(
      "DarkModeContext was used outside of the DarkModeContextProvider"
    );
  return context;
}
