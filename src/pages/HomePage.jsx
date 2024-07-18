import React, { useState, useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { FaArrowDown } from 'react-icons/fa';
import { IoHomeOutline } from 'react-icons/io5';
import FlatCard from '../components/FlatCard';
import bannerImage from '../images/FlatTopiaBanner.png';

const suggestedFlats = [
  {
    image: 'path-to-flat-image.jpg',
    title: 'Departamento de Alquiler en Manta',
    price: 650,
    bedrooms: 2,
    bathrooms: 1,
    area: 141,
    username: 'Username',
    date: 'Published on 15/07/2024',
  },
  // Añade más flats según sea necesario
];

const HomePage = () => {
  const [showArrow, setShowArrow] = useState(true);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShowArrow(false);
    } else {
      setShowArrow(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Container maxWidth={false} disableGutters>
      <Box sx={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <Box
          component="img"
          src={bannerImage}
          alt="FlatTopia"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {showArrow && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 50,
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              zIndex: 1,
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                mb: 1,
                transition: 'opacity 0.3s ease',
                animation: 'animate-bounce 1s infinite',
              }}
              className="animate-bounce"
            >
              Scroll Down
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{
                transition: 'opacity 0.3s ease',
                animation: 'animate-bounce 1s infinite',
              }}
              className="animate-bounce"
            >
              <FaArrowDown className="animate-bounce" style={{ fontSize: '2rem', marginTop: '-0.5rem' }} />
            </Typography>
          </Box>
        )}
      </Box>
      <Container>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, mb: 2 }}>
          <IoHomeOutline style={{ fontSize: '2rem', marginRight: '0.5rem' }} />
          <Typography variant="h4" component="h2">
            Suggested Flats
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {suggestedFlats.map((flat, index) => (
            <FlatCard key={index} {...flat} />
          ))}
        </Box>
      </Container>
    </Container>
  );
};

export default HomePage;
