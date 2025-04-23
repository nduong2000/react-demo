import React, { createContext, useState, useContext } from 'react';

// Create a context with a default value
const ThemeContext = createContext({
  darkMode: false,
  toggleTheme: () => {},
});

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Provider component to wrap around components that need theme access
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Function to toggle the theme
  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Value object to be provided to consumers
  const value = {
    darkMode,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
