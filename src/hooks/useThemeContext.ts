import { useContext } from 'react';
import { ThemeContextType, ThemeContext } from '../context/ThemeProvider';

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }
  return context;
};
