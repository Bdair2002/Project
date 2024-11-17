import { useContext } from 'react';
import { ThemeContext, ThemeContextType } from '../context/ThereProvider';

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }
  return context;
};
