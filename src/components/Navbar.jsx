import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, ListItemIcon, Box, Divider, Collapse } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import FilterListIcon from '@mui/icons-material/FilterList';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [youOpen, setYouOpen] = useState(false);
  const { themeMode } = useTheme();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleYouClick = () => {
    setYouOpen(!youOpen);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Filter', icon: <FilterListIcon />, path: '/filter' },
    {
      text: 'You',
      icon: <PersonIcon />,
      subItems: [
        { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
        { text: 'Favorites', icon: <FavoriteIcon />, path: '/favorites' },
        { text: 'My Flats', icon: <ApartmentIcon />, path: '/myflats' },
      ],
    },
    { text: 'Configuration', icon: <SettingsIcon />, path: '/configuration' },
    { text: 'About', icon: <InfoIcon />, path: '/about' },
  ];

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: themeMode === 'dark' ? '#5C5470' : '#352F44' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#FAF0E6' }}>
            FlatTopia
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            bgcolor: themeMode === 'dark' ? '#352F44' : '#FAF0E6',
            color: themeMode === 'dark' ? '#FAF0E6' : '#352F44',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <List>
            {menuItems.map((item) =>
              item.subItems ? (
                <Box key={item.text}>
                  <ListItem button onClick={handleYouClick} sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                    <ListItemIcon sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                    {youOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={youOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem) => (
                        <ListItem button key={subItem.text} component={Link} to={subItem.path} onClick={toggleDrawer(false)} sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44', pl: 4 }}>
                          <ListItemIcon sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>{subItem.icon}</ListItemIcon>
                          <ListItemText primary={subItem.text} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              ) : (
                <ListItem button key={item.text} component={Link} to={item.path} onClick={toggleDrawer(false)} sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                  <ListItemIcon sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              )
            )}
          </List>
          <Divider />
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="body2">&copy; 2024 FlatTopia</Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
