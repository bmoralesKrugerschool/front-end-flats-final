// src/pages/LoginPage.js

import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Container, Link, Grid, IconButton } from '@mui/material'; // Añadir Grid aquí
import { useTheme } from '../components/ThemeSwitcher';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'; // Importar iconos

const LoginPage = () => {
  const { themeMode } = useTheme();
  const [backgroundImage, setBackgroundImage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar contraseña
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { signIn, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchImage = async () => {
      const unsplashClientId = '2eICAWSF-EYZL2BumHCsX9C9DFsug-npLoFPQw01_Ok';
      const unsplashUrl = `https://api.unsplash.com/photos/random?query=house,apartment,indoor&client_id=${unsplashClientId}`;
      const pexelsApiKey = 'wY4V6AsdbhHxYHQ8lDDYf6gki3NuL9KJRA6cKEAiKHq0uJSIttxXs6yX';
      const pexelsUrl = `https://api.pexels.com/v1/search?query=house+apartment+indoor&per_page=1&page=${Math.floor(Math.random() * 10) + 1}`;

      try {
        const response = await axios.get(unsplashUrl);
        setBackgroundImage(response.data.urls.regular);
      } catch (error) {
        console.error('Error fetching image from Unsplash:', error);
        console.log('Trying alternative API (Pexels)...');

        try {
          const alternativeResponse = await axios.get(pexelsUrl, {
            headers: {
              Authorization: `Bearer ${pexelsApiKey}`
            }
          });

          setBackgroundImage(alternativeResponse.data.photos[0].src.large);
        } catch (alternativeError) {
          console.error('Error fetching image from Pexels:', alternativeError);
        }
      }
    };

    fetchImage();
  }, []);

  useEffect(() => { 
    if (isAuthenticated) {
      toast.success('User logged in successfully!');
      navigate('/getFlatsBerear');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (data) => {
    setTimeout(async () => {
      const response = await signIn(data);
      console.log('response:', response);
      if (response.code === 200 || response.code === 201) {

        toast.success('User logged in successfully!');
      } else {
        toast.error(`An error occurred: ${response.message || 'Unknown error'}`);
      }
    }, 2000);
  });

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', bgcolor: themeMode === 'dark' ? '#352F44' : '#FAF0E6' }}>
      <Box sx={{
        display: 'flex',
        width: '98%',
        height: '70vh',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        bgcolor: themeMode === 'dark' ? '#352F44' : '#FAF0E6',
        color: themeMode === 'dark' ? '#FAF0E6' : '#352F44',
      }}>
        <Box sx={{
          width: '50%',
          height: '100%',
          borderRadius: '10px 0 0 10px',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />

        <Box sx={{
          width: '50%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          borderRadius: '0 10px 10px 0',
          bgcolor: themeMode === 'dark' ? '#5C5470' : '#B9B4C7',
        }}>
          <Typography variant="h4" component="h1" sx={{ mb: 4, color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
            LOGIN
          </Typography>
          <form onSubmit={onSubmit} style={{ width: '100%' }}>
            <Grid container spacing={2}>
              
              
              <Grid item xs={12}>
                <TextField
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: 'Invalid email address'
                    }
                  })}
                  label="Email"
                  fullWidth
                  variant="outlined"
                  InputProps={{ startAdornment: <FaEnvelope /> }}
                  error={!!errors.email}
                  helperText={errors.email && errors.email.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('password', {
                    required: 'Password is required',
                    
                  })}
                  label="Password"
                  fullWidth
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    startAdornment: <FaLock />,
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </IconButton>
                    )
                  }}
                  error={!!errors.password}
                  helperText={errors.password && errors.password.message}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
              Register
            </Button>
          </form>
          {errors.backendMessage && (
            <Typography variant="body2" sx={{ color: 'red', mb: 2 }}>
              {errors.backendMessage}
            </Typography>
          )}
          <Typography variant="body2" sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
            Don't have an account yet? <Link href="/register" sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>Register!</Link>
          </Typography>
          <Typography variant="body2" sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44', mt: 1 }}>
            Forgot your password? <Link href="/send-code" sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>Reset Password!</Link>
          </Typography>
        </Box>
      </Box>
      <Toaster position="top-right" />
    </Container>
  );
};

export default LoginPage;
