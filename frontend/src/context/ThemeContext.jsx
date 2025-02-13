import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext(undefined);

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  const switchMode = () => {
    console.log("hello");
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, switchMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
