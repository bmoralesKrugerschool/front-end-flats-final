import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaEnvelope, FaLock, FaBirthdayCake, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button, TextField, Typography, Container, Grid, IconButton, Box, Alert, Link, MenuItem } from '@mui/material';
import { useTheme } from '../components/ThemeSwitcher';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [backendMessage, setBackendMessage] = useState('');
  const { themeMode } = useTheme();
  const [backgroundImage, setBackgroundImage] = useState('');
  const navigate = useNavigate();

  const password = watch('password');

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
              Authorization: pexelsApiKey
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

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setBackendMessage('Passwords do not match');
      return;
    }

    data.status = true;  // Set status to true by default

    try {
      const response = await axios.post('http://localhost:3006/api/v1/user/register', data); // Asegúrate de que esta URL es correcta

      if (response.status === 200 || response.status === 201) {
        setBackendMessage('User created successfully!');
        setTimeout(() => {
          navigate('/homepage'); // Redirigir a la página principal después del registro exitoso
        }, 2000); // Espera 2 segundos antes de redirigir
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setBackendMessage('Endpoint not found. Please check the URL.');
        } else {
          setBackendMessage(`An error occurred: ${error.response.data.message || 'Unknown error'}`);
        }
      } else if (error.request) {
        setBackendMessage('No response from server. Please try again later.');
      } else {
        setBackendMessage(`An error occurred: ${error.message}`);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{
        display: 'flex',
        width: '98%',
        height: '70vh', // Ajustar la altura según necesidad
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: themeMode === 'dark' ? '#352F44' : '#FAF0E6',
        color: themeMode === 'dark' ? '#FAF0E6' : '#352F44',
      }}>
        {/* Image Box */}
        <Box sx={{
          width: '50%',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '10px 0 0 10px',
        }} />

        {/* Form Box */}
        <Box sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          borderRadius: '0 10px 10px 0',
          bgcolor: themeMode === 'dark' ? '#5C5470' : '#B9B4C7',
        }}>
          <Typography variant="h4" component="h1" sx={{ mb: 4, color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
            REGISTER
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('firstName', { required: 'First name is required' })}
                  label="First Name"
                  fullWidth
                  variant="outlined"
                  InputProps={{ startAdornment: <FaUser /> }}
                  error={!!errors.firstName}
                  helperText={errors.firstName && errors.firstName.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('lastName', { required: 'Last name is required' })}
                  label="Last Name"
                  fullWidth
                  variant="outlined"
                  InputProps={{ startAdornment: <FaUser /> }}
                  error={!!errors.lastName}
                  helperText={errors.lastName && errors.lastName.message}
                />
              </Grid>
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
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long'
                    },
                    validate: value => /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value) || 'Password must include at least one uppercase letter, one number, and one special character'
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
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                  label="Confirm Password"
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
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword && errors.confirmPassword.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('birthDate', {
                    required: 'Birthdate is required',
                  })}
                  label="Birthdate"
                  fullWidth
                  variant="outlined"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{ startAdornment: <FaBirthdayCake /> }}
                  error={!!errors.birthDate}
                  helperText={errors.birthDate && errors.birthDate.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('role', { required: 'Role is required' })}
                  label="Role"
                  fullWidth
                  variant="outlined"
                  select
                  error={!!errors.role}
                  helperText={errors.role && errors.role.message}
                >
                  <MenuItem value="landlord">Landlord</MenuItem>
                  <MenuItem value="renter">Renter</MenuItem>
                </TextField>
              </Grid>
              {backendMessage && (
                <Grid item xs={12}>
                  <Alert severity={backendMessage.includes('successfully') ? 'success' : 'error'}>
                    {backendMessage}
                  </Alert>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                  Register
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" align="center">
                  Already have an account? <Link href="/login">Login</Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
