import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, TextField, Typography, Container, Grid, IconButton, Link } from '@mui/material';
import ThemeSwitcher from '../components/ThemeSwitcher';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [backendMessage, setBackendMessage] = useState('');
  const [randomImage, setRandomImage] = useState(null);

  // API UNSPLASH
  const fetchRandomImage = async () => {
    try {
      const response = await fetch('https://api.unsplash.com/photos/random?query=house,apartment&client_id=2eICAWSF-EYZL2BumHCsX9C9DFsug-npLoFPQw01_Ok');
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      const data = await response.json();
      const image = {
        url: data.urls.regular,
        alt: data.alt_description
      };
      setRandomImage(image);
    } catch (error) {
      console.error('Error fetching random image:', error);
    }
  };

  useEffect(() => {
    fetchRandomImage();
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

  return (
    <ThemeSwitcher>
      <div className="flex items-center justify-center min-h-screen">
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <div>
                <Typography variant="h3" align="center" gutterBottom>
                  LOGIN
                </Typography>
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
                          startAdornment: <FaEnvelope />,
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
                          startAdornment: <FaLock />,
                          endAdornment: (
                            <IconButton onClick={togglePasswordVisibility}>
                              {showPassword ? <FaEyeSlash /> : <FaEye />}
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
                <Typography variant="body2" align="center">
                  <Link component="button" variant="body2" onClick={goToRegister}>
                    Don't have an account? Register!
                  </Link>
                </Typography>
                {backendMessage && <Typography variant="body2" color="error">{backendMessage}</Typography>}
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              {randomImage && (
                <div className="flex justify-center items-center h-full">
                  <div className="p-2">
                    <img src={randomImage.url} alt={randomImage.alt} className="max-w-full max-h-full" />
                  </div>
                </div>
              )}
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeSwitcher>
  );
}

export default LoginPage;
