import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';

const FlatCard = ({ image, title, price, bedrooms, bathrooms, area, username, date }) => {
  return (
    <Card sx={{ maxWidth: 345, bgcolor: 'background.paper', m: 2 }}>
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h5" color="primary">${price}</Typography>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="body2" color="text.secondary">
            <FaBed /> {bedrooms}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <FaBath /> {bathrooms}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <FaRulerCombined /> {area} m²
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="body2">{username}</Typography>
          <Typography variant="body2" color="text.secondary">{date}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FlatCard;
