import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Button } from '@mui/material';
import { FaArrowDown } from 'react-icons/fa';
import { IoHomeOutline } from 'react-icons/io5';
import FlatCard from '../components/FlatCard';
import bannerImage from '../images/FlatTopiaBanner.png';

const HomePage = () => {
  const [showArrow, setShowArrow] = useState(true);
  const [flats, setFlats] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Función para manejar la recarga de la página
  const handlePageReload = () => {
    const hasVisited = localStorage.getItem('hasVisitedHomePage');
    if (!hasVisited) {
      localStorage.setItem('hasVisitedHomePage', 'true');
      window.location.reload();
    }
  };

  const fetchRandomFlats = async () => {
    try {
      const response = await fetch('http://localhost:3006/api/v1/flats/getFlats?page=1&city=CUENCA&minRentPrice=66&maxRentPrice=888&minAreaSize=88&maxAreaSize=99&limit=12');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setFlats(data.flats || []);
    } catch (error) {
      console.error('Error fetching random flats:', error.message);
    }
  };

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token'); // o usa cookies según tu implementación
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    handlePageReload();
    fetchRandomFlats();
    checkAuthStatus();
  }, []);

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
      <Container sx={{ mt: 4, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IoHomeOutline style={{ fontSize: '2rem', marginRight: '0.5rem' }} />
          <Typography variant="h4" component="h2">
            Suggested Flats
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {flats.length > 0 ? (
            flats.map((flat, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <Box sx={{ position: 'relative' }}>
                  <FlatCard
                    image={flat.img || 'https://res.cloudinary.com/dv7hsw3kg/image/upload/v1629890099/avatars/avatar-1_ayx1tj.png'}
                    title={`${flat.title} for ${flat.city} in ${flat.streetName}`}
                    rentPrice={flat.rentPrice}
                    bedrooms={flat.bedrooms}
                    bathroom={flat.bathroom}
                    areaSize={flat.areaSize}
                    streetName={flat.streetName}
                    streetNumber={flat.streetNumber}
                    dateAvailable={flat.dateAvailable}
                    hasAc={flat.hasAc}
                    petsAllowed={flat.petsAllowed}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      right: 16,
                      opacity: isLoggedIn ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                      '&:hover': {
                        opacity: 1,
                      },
                    }}
                  >
                    <Button variant="contained" color="primary" disabled={!isLoggedIn}>
                      {isLoggedIn ? 'Join Now!' : 'Login to Join'}
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box
                sx={{
                  p: 4,
                  textAlign: 'center',
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  No more flats available.
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Container>
  );
};

export default HomePage;
