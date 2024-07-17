import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaEnvelope, FaLock, FaBirthdayCake, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container, Grid, IconButton, Box, Alert, AlertTitle } from '@mui/material';
import { useTheme } from '../components/ThemeSwitcher';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [backendMessage, setBackendMessage] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { themeMode } = useTheme();
  const [backgroundImage, setBackgroundImage] = useState('');

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
    try {
      const emailExists = await checkEmailExists(data.email);
      if (emailExists) {
        setBackendMessage('Email already exists. Please use a different email.');
        return;
      }

      const formattedBirthdate = data.birthDate.replace(/-/g, '/');
      const modifiedData = { ...data, birthDate: formattedBirthdate };

      const response = await signUp(modifiedData);
      if (response && response.data) {
        setBackendMessage('User created successfully!');
        localStorage.setItem('token', response.data.token); // Assuming your response structure includes a token
        navigate('/flats');
      } else {
        setBackendMessage('Failed to create user. Please try again.');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setBackendMessage('An error occurred. Please try again.');
    }
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(`http://localhost:3006/api/v1/user/check-email?email=${encodeURIComponent(email)}`);
      return response.data.exists;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  const validateAge = (value) => {
    const today = new Date();
    const birthDate = new Date(value);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 18;
  };

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,20}$/;
    return passwordRegex.test(value);
  };

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', bgcolor: themeMode === 'dark' ? '#352F44' : '#FAF0E6' }}>
      <Box sx={{
        display: 'flex',
        width: '98%',
        height: '50vh',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: themeMode === 'dark' ? '0 4px 12px rgba(0, 0, 0, 0.5)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
        bgcolor: themeMode === 'dark' ? '#5C5470' : '#B9B4C7',
        position: 'relative',
      }}>
        {/* Image Box */}
        <Box sx={{
          width: '61vh',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '10px 0 0 10px',
        }} />
        
        {/* Form Box */}
        <Box sx={{
          width: '61vh',
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
                  id="name"
                  {...register('name', { required: 'First name is required' })}
                  label="First Name"
                  fullWidth
                  variant="outlined"
                  className={`mb-4 ${errors.name ? 'border border-red-500' : ''}`}
                  InputProps={{
                    startAdornment: <FaUser className="text-gray-400" />
                  }}
                  error={!!errors.name}
                  helperText={errors.name && errors.name.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastName"
                  {...register('lastName', { required: 'Last name is required' })}
                  label="Last Name"
                  fullWidth
                  variant="outlined"
                  className={`mb-4 ${errors.lastName ? 'border border-red-500' : ''}`}
                  InputProps={{
                    startAdornment: <FaUser className="text-gray-400" />
                  }}
                  error={!!errors.lastName}
                  helperText={errors.lastName && errors.lastName.message}
                />
              </Grid>
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
                  variant="outlined"
                  className={`mb-4 ${errors.email ? 'border border-red-500' : ''}`}
                  InputProps={{
                    startAdornment: <FaEnvelope className="text-gray-400" />
                  }}
                  error={!!errors.email}
                  helperText={errors.email && errors.email.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long'
                    },
                    maxLength: {
                      value: 20,
                      message: 'Password must be at most 20 characters long'
                    },
                    validate: {
                      containsDigit: value => /\d/.test(value) || 'Password must contain at least one digit',
                      containsUppercase: value => /[A-Z]/.test(value) || 'Password must contain at least one uppercase letter',
                      containsSymbol: value => /[!@#$%^&*()_+]/.test(value) || 'Password must contain at least one symbol',
                    }
                  })}
                  label="Password"
                  fullWidth
                  variant="outlined"
                  className={`mb-4 ${errors.password ? 'border border-red-500' : ''}`}
                  InputProps={{
                    startAdornment: <FaLock className="text-gray-400" />,
                    endAdornment: (
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                      </IconButton>
                    )
                  }}
                  error={!!errors.password}
                  helperText={errors.password && errors.password.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="birthDate"
                  {...register('birthDate', {
                    required: 'Birthdate is required',
                    validate: {
                      validAge: validateAge,
                    }
                  })}
                  type="date"
                  label="Birthdate"
                  fullWidth
                  variant="outlined"
                  className={`mb-4 ${errors.birthDate ? 'border border-red-500' : ''}`}
                  InputProps={{
                    startAdornment: <FaBirthdayCake className="text-gray-400" />
                  }}
                  error={!!errors.birthDate}
                  helperText={errors.birthDate && errors.birthDate.type === 'validAge' ? 'You must be at least 18 years old' : errors.birthDate && errors.birthDate.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="phone"
                  {...register('phone', { required: 'Phone number is required' })}
                  label="Phone Number"
                  fullWidth
                  variant="outlined"
                  className={`mb-4 ${errors.phone ? 'border border-red-500' : ''}`}
                  InputProps={{
                    startAdornment: <FaUser className="text-gray-400" />
                  }}
                  error={!!errors.phone}
                  helperText={errors.phone && errors.phone.message}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, mb: 2 }}>
              Create User
            </Button>
          </form>
        </Box>
      </Box>
      {backendMessage && (
        <Alert
          severity="error"
          sx={{
            mt: 2,
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            bgcolor: themeMode === 'dark' ? '#FF6B6B' : '#FFCCCB',
            color: themeMode === 'dark' ? '#FFFFFF' : '#352F44',
            borderColor: themeMode === 'dark' ? '#FF6B6B' : '#FFCCCB'
          }}
        >
          <AlertTitle>{themeMode === 'dark' ? 'Error' : 'Error'}</AlertTitle>
          {backendMessage}
        </Alert>
      )}
    </Container>
  );
};

export default RegisterPage;
