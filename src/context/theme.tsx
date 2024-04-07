import React, { createContext, useContext, useState } from 'react';

type Theme = 'light' | 'dark';

type TContext = {
  theme: Theme;
  setTheme: () => void;
};
type TProvider = {
  children: React.ReactNode;
};

const initialTheme: Theme = 'light';

const ThemeContext = createContext<TContext>({
  theme: initialTheme,
  setTheme: () => {},
});
export const ThemeProvider = ({ children }: TProvider) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const changeTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const providerValue = {
    theme: theme,
    setTheme: changeTheme,
  };
  return <ThemeContext.Provider value={providerValue}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used with a ThemeContext');
  return context;
};
