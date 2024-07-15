import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Container, Link } from '@mui/material';
import { useTheme } from '../components/ThemeSwitcher';
import axios from 'axios';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';

const LoginPage = () => {
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
  
  

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', bgcolor: themeMode === 'dark' ? '#352F44' : '#FAF0E6' }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        height: '50vh',
      }}>
        {/* Box del formulario*/}
        <Box sx={{
          width: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          borderRadius: '2px 0 0 2px',
          bgcolor: themeMode === 'dark' ? '#5C5470' : '#B9B4C7',
          boxShadow: themeMode === 'dark' ? '0 4px 12px rgba(0, 0, 0, 0.5)' : '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <Typography variant="h4" component="h1" sx={{ mb: 4, color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
            LOGIN
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            InputLabelProps={{
              style: { color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }
            }}
            InputProps={{
              style: { color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' },
              startAdornment: <MailIcon />
            }}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type="password"
            InputLabelProps={{
              style: { color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }
            }}
            InputProps={{
              style: { color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' },
              startAdornment: <LockIcon />
            }}
            sx={{ mb: 3 }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: themeMode === 'dark' ? '#FAF0E6' : '#352F44',
              color: themeMode === 'dark' ? '#352F44' : '#FAF0E6',
              mb: 2
            }}
          >
            LOGIN
          </Button>
          <Typography variant="body2" sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
            Don't have an account yet? <Link href="/register" sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>Register!</Link>
          </Typography>
        </Box>
        
        {/* Box de la foto traída por la API */}
        <Box sx={{
          width: '60vh',
          height: '100%',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '0 2px 2px 0',
        }} />
      </Box>
    </Container>
  );
};

export default LoginPage;
