import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import aboutImage from '../../src/images/about-image.svg';

const AboutPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 font-sans">
      <Container maxWidth="md" className="py-12">
        <div className="flex flex-col items-center justify-center text-center text-white">
          <img
            src={aboutImage}
            alt="About Us"
            className="w-64 h-64 mb-8"
          />
          <Typography variant="h3" component="h1" className="mb-4">
            Welcome to Real Estate App
          </Typography>
          <Typography variant="body1" className="mb-8">
            Your ultimate platform for buying, selling, and renting apartments and houses.
          </Typography>
          <Typography variant="body1" className="mb-8">
            At Real Estate App, we offer a wide selection of properties to help you find your dream home. Our goal is to make the process of buying, selling, and renting real estate as smooth and efficient as possible, providing you with a seamless experience.
          </Typography>
          <Typography variant="body1" className="mb-8">
            Our platform is designed to be intuitive and user-friendly, with advanced search tools and filters to help you find exactly what you are looking for. Whether you are looking for your first home, an apartment to rent, or want to sell your property, we are here to assist you every step of the way.
          </Typography>
          <Typography variant="body1" className="mb-8">
            Join our community and discover why Real Estate App is the best choice for all your real estate needs. We look forward to helping you find your next home!
          </Typography>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            color="primary"
            size="large"
          >
            Join Now!
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default AboutPage;
