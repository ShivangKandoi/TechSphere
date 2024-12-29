import React, { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  // Always enforce dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Provide a simplified context value with dark mode always true
  const value = {
    darkMode: true,
    toggleDarkMode: () => {} // No-op function since we don't allow toggling
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
} 