import React from 'react';
import { Box } from '@mui/material';

const Responsive = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
        padding: { xs: 2, sm: 4 },
      }}
    >
      {children}
    </Box>
  );
};

export default Responsive;
