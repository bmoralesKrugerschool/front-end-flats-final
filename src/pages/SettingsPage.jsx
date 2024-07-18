import React, { useState } from 'react';
import { Container, Box, Typography, Button, Alert } from '@mui/material';
import { useTheme } from '../components/ThemeSwitcher';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SettingsPage = () => {
  const { themeMode } = useTheme();
  const [logoutMessage, setLogoutMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3006/api/v1/user/logout');

      if (response.status === 200) {
        setLogoutMessage('Logout successful!');
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Wait for 2 seconds before redirecting to login page
      }
    } catch (error) {
      if (error.response) {
        setLogoutMessage(`Error: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        setLogoutMessage('No response from server. Please try again later.');
      } else {
        setLogoutMessage(`An error occurred: ${error.message}`);
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{
        width: '100%',
        p: 4,
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: themeMode === 'dark' ? '#352F44' : '#FAF0E6',
        color: themeMode === 'dark' ? '#FAF0E6' : '#352F44',
      }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Settings
        </Typography>
        {logoutMessage && (
          <Alert severity={logoutMessage.includes('successful') ? 'success' : 'error'} sx={{ mb: 2 }}>
            {logoutMessage}
          </Alert>
        )}
        <Button variant="contained" fullWidth onClick={handleLogout}>
          Log Out
        </Button>
      </Box>
    </Container>
  );
};

export default SettingsPage;
