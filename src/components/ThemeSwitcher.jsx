import React, { useState, useEffect, createContext, useContext } from 'react';
import { IconButton, Box, CssBaseline } from '@mui/material';
import { Brightness4, Brightness7, Monitor } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const ThemeSwitcher = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light');

  const updateThemeMode = (mode) => {
    setThemeMode(mode);
    localStorage.setItem('theme', mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
  };

  const toggleThemeMode = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    updateThemeMode(newMode);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    updateThemeMode(storedTheme);
  }, []);

  const getIcon = () => {
    if (themeMode === 'light') return <Brightness7 />;
    if (themeMode === 'dark') return <Brightness4 />;
    return <Monitor />;
  };

  const theme = createTheme({
    palette: {
      mode: themeMode === 'dark' ? 'dark' : 'light',
      background: {
        default: themeMode === 'dark' ? '#352F44' : '#FAF0E6',
        paper: themeMode === 'dark' ? '#5C5470' : '#B9B4C7',
      },
      text: {
        primary: themeMode === 'dark' ? '#FAF0E6' : '#352F44',
        secondary: themeMode === 'dark' ? 'rgba(250, 240, 230, 0.7)' : 'rgba(53, 47, 68, 0.7)',
      },
      action: {
        disabled: themeMode === 'dark' ? '#5C5470' : '#B9B4C7',
      },
      primary: {
        main: themeMode === 'dark' ? '#FAF0E6' : '#352F44',
      },
      secondary: {
        main: themeMode === 'dark' ? '#FAF0E6' : '#352F44',
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ themeMode, toggleThemeMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
        <Box
          position="fixed"
          bottom={16}
          right={16}
          zIndex={1000}
        >
          <IconButton
            onClick={toggleThemeMode}
            color="primary"
            sx={{
              backgroundColor: theme.palette.background.paper,
              '&:hover': {
                backgroundColor: theme.palette.background.default,
              }
            }}
          >
            {getIcon()}
          </IconButton>
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeSwitcher;
