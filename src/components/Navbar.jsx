import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, ListItemIcon, Box, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import FilterListIcon from '@mui/icons-material/FilterList';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import { login as loginUser } from '../servers/auth';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Filter', icon: <FilterListIcon />, path: '/filter' },
    { text: 'Configuration', icon: <SettingsIcon />, path: '/configuration' },
    { text: 'About', icon: <InfoIcon />, path: '/about' },
  ];

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: '#5C5470' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ display: { xs: 'block', sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: '#FAF0E6' }}>
              Real Estate App
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, color: '#FAF0E6' }}>
              {menuItems.map((item) => (
                <Link key={item.text} to={item.path} style={{ color: 'inherit', textDecoration: 'none', marginLeft: '16px' }}>
                  <IconButton color="inherit" aria-label={item.text} sx={{ display: 'flex', flexDirection: 'column' }}>
                    {item.icon}
                    <Typography variant="caption">{item.text}</Typography>
                  </IconButton>
                </Link>
              ))}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            bgcolor: '#352F44',
            color: '#FAF0E6',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text} component={Link} to={item.path} onClick={toggleDrawer(false)} sx={{ color: '#FAF0E6' }}>
                <ListItemIcon sx={{ color: '#FAF0E6' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="body2">&copy; 2024 Real Estate App</Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
