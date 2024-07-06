import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, TextField, Typography, Container, Grid, IconButton, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [backendMessage, setBackendMessage] = useState('');
  const [themeMode, setThemeMode] = useState('auto'); 

  const toggleThemeMode = () => {
    const newMode = themeMode === 'light' ? 'dark' : themeMode === 'dark' ? 'auto' : 'light';
    setThemeMode(newMode);
    localStorage.setItem('theme', newMode);
    document.documentElement.classList.toggle('dark', newMode === 'dark');
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light');
    setThemeMode(storedTheme);
    document.documentElement.classList.toggle('dark', storedTheme === 'dark');
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await signIn(data);

      if (response.code === 200) {
        localStorage.setItem('token', response.token);
        navigate('/flats');
      } else {
        setBackendMessage(response.message || 'An error occurred during login. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setBackendMessage('An error occurred during login. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const goToRegister = () => {
    navigate('/register');
  };

  const theme = createTheme({
    palette: {
      mode: themeMode === 'dark' ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="flex items-center justify-center min-h-screen bg-gray-900 font-sans">
        <Container maxWidth="sm">
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
                LOGIN
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      id="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                          message: 'Invalid email address'
                        }
                      })}
                      label="Email"
                      fullWidth
                      variant="filled"
                      error={!!errors.email}
                      helperText={errors.email && errors.email.message}
                      InputProps={{
                        startAdornment: <FaEnvelope className="text-gray-400" />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', {
                        required: 'Password is required',
                      })}
                      label="Password"
                      fullWidth
                      variant="filled"
                      error={!!errors.password}
                      helperText={errors.password && errors.password.message}
                      InputProps={{
                        startAdornment: <FaLock className="text-gray-400" />,
                        endAdornment: (
                          <IconButton onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                          </IconButton>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" fullWidth variant="contained" color="primary">
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary" align="center">
                <Link component="button" variant="body2" onClick={goToRegister}>
                  Don't have an account? Register!
                </Link>
              </Typography>
              {backendMessage && <Typography variant="body2" color="error">{backendMessage}</Typography>}
            </Grid>
            <Grid item xs={12}>
              <div className="flex justify-center">
                <Button variant="text" onClick={toggleThemeMode}>
                  {themeMode === 'light' ? 'Switch to Dark Mode' : themeMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Auto Mode'}
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default LoginPage;
