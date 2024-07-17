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

  const getTheme = () => {
    if (themeMode === 'light') {
      return createTheme({
        palette: {
          mode: 'light',
          background: {
            default: '#FAF0E6',
            paper: '#B9B4C7',
          },
          text: {
            primary: '#352F44',
            secondary: 'rgba(53, 47, 68, 0.7)',
          },
          action: {
            disabled: '#5C5470',
          },
          primary: {
            main: '#352F44',
          },
          secondary: {
            main: '#352F44',
          },
        },
      });
    } else {
      return createTheme({
        palette: {
          mode: 'dark',
          background: {
            default: '#352F44',
            paper: '#5C5470',
          },
          text: {
            primary: '#FAF0E6',
            secondary: 'rgba(250, 240, 230, 0.7)',
          },
          action: {
            disabled: '#5C5470',
          },
          primary: {
            main: '#FAF0E6',
          },
          secondary: {
            main: '#FAF0E6',
          },
        },
      });
    }
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleThemeMode }}>
      <ThemeProvider theme={getTheme()}>
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
              backgroundColor: themeMode === 'dark' ? '#5C5470' : '#B9B4C7',
              '&:hover': {
                backgroundColor: themeMode === 'dark' ? '#352F44' : '#5C5470',
              }
            }}
          >
            {themeMode === 'light' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeSwitcher;
