import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import aboutImage from '../../src/images/about-image.svg';
import { useTheme } from '../components/ThemeSwitcher';

const AboutPage = () => {
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
            src={aboutImage}
            alt="About Us"
            className="w-96 h-auto mb-4"
            style={{ boxShadow: 'none', borderRadius: 0 }}
          />
          <Typography variant="h3" component="h1" className="mb-6" style={{ color: getTextPrimaryColor() }}>
            Welcome to FlatTopia
          </Typography>
          <Typography variant="body1" className="mb-6" style={{ color: getTextPrimaryColor() }}>
            Your ultimate platform for buying, selling, and renting apartments and houses.
          </Typography>
          <Typography variant="body1" className="mb-6" style={{ color: getTextPrimaryColor() }}>
            At FlatTopia, we offer a wide selection of properties to help you find your dream home. Our goal is to make the process of buying, selling, and renting real estate as smooth and efficient as possible, providing you with a seamless experience.
          </Typography>
          <Typography variant="body1" className="mb-6" style={{ color: getTextPrimaryColor() }}>
            Our platform is designed to be intuitive and user-friendly, with advanced search tools and filters to help you find exactly what you are looking for. Whether you are looking for your first home, an apartment to rent, or want to sell your property, we are here to assist you every step of the way.
          </Typography>
          <Typography variant="body1" className="mb-6" style={{ color: getTextPrimaryColor() }}>
            Join our community and discover why FlatTopia is the best choice for all your real estate needs. We look forward to helping you find your next home!
          </Typography>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            color="primary"
            size="large"
            style={{ marginTop: '1.5rem' }}
          >
            Join Now!
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default AboutPage;
