// ThemeSwitcher.jsx
import React, { useState, useEffect, createContext, useContext } from 'react';
import { IconButton, Box, CssBaseline } from '@mui/material';
import { Brightness4, Brightness7, Monitor } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const ThemeSwitcher = ({ children }) => {
  const [themeMode, setThemeMode] = useState('auto');
  const [isSystemDark, setIsSystemDark] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches);

  const updateThemeMode = (mode) => {
    setThemeMode(mode);
    localStorage.setItem('theme', mode);
    document.documentElement.classList.toggle('dark', mode === 'dark' || (mode === 'auto' && isSystemDark));
  };

  const toggleThemeMode = () => {
    const newMode = themeMode === 'light' ? 'dark' : themeMode === 'dark' ? 'auto' : 'light';
    updateThemeMode(newMode);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'auto';
    setThemeMode(storedTheme);
    document.documentElement.classList.toggle('dark', storedTheme === 'dark' || (storedTheme === 'auto' && isSystemDark));

    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event) => {
      setIsSystemDark(event.matches);
      if (themeMode === 'auto') {
        document.documentElement.classList.toggle('dark', event.matches);
      }
    };

    darkModeMediaQuery.addEventListener('change', handleChange);

    return () => {
      darkModeMediaQuery.removeEventListener('change', handleChange);
    };
  }, [themeMode, isSystemDark]);

  const getIcon = () => {
    if (themeMode === 'light') return <Brightness7 />;
    if (themeMode === 'dark') return <Brightness4 />;
    return <Monitor />;
  };

  const theme = createTheme({
    palette: {
      mode: themeMode === 'dark' || (themeMode === 'auto' && isSystemDark) ? 'dark' : 'light',
      ...(themeMode === 'dark' || (themeMode === 'auto' && isSystemDark) ? {
        background: {
          default: '#352F44',
          paper: '#352F44',
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
        }
      } : {
        background: {
          default: '#FAF0E6',
          paper: '#FAF0E6',
        },
        text: {
          primary: '#352F44',
          secondary: 'rgba(53, 47, 68, 0.7)',
        },
        action: {
          disabled: '#B9B4C7',
        },
        primary: {
          main: '#352F44',
        },
        secondary: {
          main: '#352F44',
        }
      }),
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
              backgroundColor: 'background.paper',
              '&:hover': {
                backgroundColor: 'background.default',
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
