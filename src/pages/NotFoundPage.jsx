import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import errorImage from '../../src/images/404-error.svg';
import { useTheme } from '../components/ThemeSwitcher';

const NotFoundPage = () => {
  const { themeMode } = useTheme();

  const getPageBackground = () => {
    return themeMode === 'dark' ? '#352F44' : '#FAF0E6';
  };

  const getTextPrimaryColor = () => {
    return themeMode === 'light' ? '#352F44' : '#FAF0E6';
  };

  return (
    <div
      style={{
        background: getPageBackground(),
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: 'sans-serif',
        color: getTextPrimaryColor(),
      }}
    >
      <Container maxWidth="md" className="py-12">
        <div className="flex flex-col items-center justify-center text-white">
          <img
            src={errorImage}
            alt="404 Error"
            className="w-64 h-64 mb-8"
          />
          <Typography variant="h3" component="h1" className="mb-4" style={{ color: getTextPrimaryColor() }}>
            Error 404 Not Found
          </Typography>
          <Typography variant="body1" className="mb-8" style={{ color: getTextPrimaryColor() }}>
            The page you're looking for could not be found.
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            size="large"
            style={{ marginTop: '1.5rem' }}
          >
            Go to Home
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default NotFoundPage;
