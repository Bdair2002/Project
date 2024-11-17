import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#e76f51',
    },
    secondary: {
      main: '#f4a261',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#000000',
      secondary: '#555555',
    },
    action: {
      active: '#E76F28',
      hover: '#eeeeee',
      selected: '#e3f2fd',
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h1: { fontWeight: 600, fontSize: '3rem' },
    h2: { fontWeight: 500, fontSize: '2.5rem' },
    h3: { fontWeight: 400, fontSize: '2rem' },
    body1: { fontWeight: 400, fontSize: '1rem' },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2A9D8F',
    },
    secondary: {
      main: '#E9C46A',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
    action: {
      active: '#90caf9',
      hover: '#333333',
      selected: '#90caf9',
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h1: { fontWeight: 600, fontSize: '3rem' },
    h2: { fontWeight: 500, fontSize: '2.5rem' },
    h3: { fontWeight: 400, fontSize: '2rem' },
    body1: { fontWeight: 400, fontSize: '1rem' },
  },
});
