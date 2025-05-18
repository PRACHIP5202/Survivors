import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check local storage for saved theme preference or default to light mode
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('emberEyeTheme');
    return savedTheme === 'dark';
  });

  // Update the data-theme attribute on the root element whenever darkMode changes
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    if (darkMode) {
      root.setAttribute('data-theme', 'dark');
      body.classList.add('dark-mode');
      document.documentElement.style.backgroundColor = '#121212';
      body.style.backgroundColor = '#121212';
      localStorage.setItem('emberEyeTheme', 'dark');
    } else {
      root.removeAttribute('data-theme');
      body.classList.remove('dark-mode');
      document.documentElement.style.backgroundColor = '';
      body.style.backgroundColor = '';
      localStorage.setItem('emberEyeTheme', 'light');
    }
  }, [darkMode]);

  // Toggle between light and dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};