import React from 'react';
import {createContext} from 'react';

export const ThemeContext = createContext(undefined);

interface ProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ProviderProps> = ({children}) => {
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
