import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import errorImage from '../../src/images/404-error.svg';


const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 font-sans">
      <Container maxWidth="md" className="py-12">
        <div className="flex flex-col items-center justify-center text-center text-white">
          <img
            src={errorImage}
            alt="404 Error"
            className="w-64 h-64 mb-8"
          />
          <Typography variant="h3" component="h1" className="mb-4">
            Error 404 Not Found
          </Typography>
          <Typography variant="body1" className="mb-8">
            The page you're looking for could not be found.
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            size="large"
          >
            Go to Home
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default NotFoundPage;

