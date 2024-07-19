import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardMedia, Typography, Box, Tooltip } from '@mui/material';
import { FaBed, FaBath, FaArrowsAltH } from 'react-icons/fa';

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
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      {image && <CardMedia component="img" height="140" image={image} alt={title} />}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="h6" color="text.primary" sx={{ mb: 1 }}>
          ${rentPrice}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Tooltip title={`Bedrooms: ${bedrooms}`}>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <FaBed style={{ marginRight: '0.5rem' }} /> {bedrooms}
            </Typography>
          </Tooltip>
          <Tooltip title={`Bathrooms: ${bathroom}`}>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <FaBath style={{ marginRight: '0.5rem' }} /> {bathroom}
            </Typography>
          </Tooltip>
          <Tooltip title={`Area: ${areaSize} sq ft`}>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
              <FaArrowsAltH style={{ marginRight: '0.5rem' }} /> {areaSize}
            </Typography>
          </Tooltip>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {streetName}, {streetNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Available: {new Date(dateAvailable).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {hasAc ? 'AC Available' : 'No AC'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {petsAllowed ? 'Pets Allowed' : 'No Pets'}
        </Typography>
      </CardContent>
    </Card>
  );
};

FlatCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  rentPrice: PropTypes.number.isRequired,
  bedrooms: PropTypes.number.isRequired,
  bathroom: PropTypes.number.isRequired,
  areaSize: PropTypes.number.isRequired,
  streetName: PropTypes.string.isRequired,
  streetNumber: PropTypes.string.isRequired,
  dateAvailable: PropTypes.string.isRequired,
  hasAc: PropTypes.bool.isRequired,
  petsAllowed: PropTypes.bool.isRequired,
};

export default FlatCard;
