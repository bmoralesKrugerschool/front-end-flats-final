import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Container, Link, Snackbar } from '@mui/material';
import { useTheme } from '../components/ThemeSwitcher';
import { useNavigate } from 'react-router-dom';
import { login } from '../servers/auth';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';

const LoginPage = () => {
  const { themeMode } = useTheme();
  const [backgroundImage, setBackgroundImage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [backendMessage, setBackendMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const navigate = useNavigate();

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

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setShowAlert(true);
      return;
    }

    try {
      const response = await login({ email, password });

      if (response.code === 200 && response.data) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setSuccessMessage('Login successful!');
        setOpenSuccessSnackbar(true);
        setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
      } else {
        setBackendMessage(response.message || 'An error occurred during login. Please try again.');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setBackendMessage('An error occurred during login. Please try again.');
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleCloseSuccessSnackbar = () => {
    setOpenSuccessSnackbar(false);
  };

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
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              type="submit"
              variant="contained"
              sx={{
                bgcolor: themeMode === 'dark' ? '#FAF0E6' : '#352F44',
                color: themeMode === 'dark' ? '#352F44' : '#FAF0E6',
                mb: 2
              }}
              fullWidth
            >
              LOGIN
            </Button>
          </form>
          {backendMessage && (
            <Typography variant="body2" sx={{ color: 'red', mb: 2 }}>
              {backendMessage}
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
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        message="Please fill in both email and password fields."
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSuccessSnackbar}
        message={successMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Container>
  );
};

export default LoginPage;
