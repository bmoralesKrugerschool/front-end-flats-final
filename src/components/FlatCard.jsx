import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { FaBed, FaBath, FaCar } from 'react-icons/fa';

const FlatCard = ({
  image,
  title,
  rentPrice,
  bedrooms,
  bathroom,
  areaSize,
  streetName,
  streetNumber,
  dateAvailable,
  hasAc,
  petsAllowed
}) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        bgcolor: 'background.paper',
        m: 2,
        borderRadius: 12,
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={image || 'https://res.cloudinary.com/dv7hsw3kg/image/upload/v1629890099/avatars/avatar-1_ayx1tj.png'}
        alt={title}
        sx={{
          objectFit: 'cover',
          borderBottom: '1px solid #ddd',
        }}
      />
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {streetName} {streetNumber}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" color="#8CABFF">
            ${rentPrice}
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <FaBed style={{ marginRight: '0.5rem' }} /> {bedrooms}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <FaBath style={{ marginRight: '0.5rem' }} /> {bathroom}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
              <FaCar style={{ marginRight: '0.5rem' }} /> {areaSize} m²
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="body2" color="text.secondary">
            {hasAc ? 'AC Included' : 'No AC'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Available: {new Date(dateAvailable).toLocaleDateString()}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Pets Allowed: {petsAllowed ? 'Yes' : 'No'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FlatCard;
