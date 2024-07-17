import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, ListItemIcon, Box, Divider, Badge, CssBaseline, Collapse, TextField, InputAdornment } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import FilterListIcon from '@mui/icons-material/FilterList';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ApartmentIcon from '@mui/icons-material/Apartment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import UploadIcon from '@mui/icons-material/Upload';
import SearchIcon from '@mui/icons-material/Search';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeSwitcher';

const Navbar = ({ isLoggedIn, notifications }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [youOpen, setYouOpen] = useState(false);
  const { themeMode } = useTheme();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleYou = () => {
    setYouOpen(!youOpen);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Filter', icon: <FilterListIcon />, path: '/filter' },
    { text: 'Configuration', icon: <SettingsIcon />, path: '/configuration' },
    { text: 'About', icon: <InfoIcon />, path: '/about' },
  ];

  const youItems = [
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
    { text: 'Favorites', icon: <FavoriteIcon />, path: '/favorites' },
    { text: 'My Flats', icon: <ApartmentIcon />, path: '/myflats' },
  ];

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          bgcolor: themeMode === 'dark' ? '#352F44' : '#FAF0E6',
          boxShadow: 'none',
          borderBottom: 'none',
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}
          >
            FlatTopia
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <TextField
              placeholder="Search"
              variant="outlined"
              size="small"
              sx={{
                bgcolor: themeMode === 'dark' ? '#5C5470' : '#B9B4C7', // Set background color based on theme
                borderRadius: 1,
                width: '100%',
                maxWidth: '500px',
                input: {
                  color: themeMode === 'dark' ? '#FAF0E6' : '#352F44',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" component={Link} to="/upload">
              <UploadIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} to="/notifications">
              <Badge color="secondary" badgeContent={notifications}>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" component={Link} to={isLoggedIn ? "/profile" : "/login"}>
              <PersonIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          width: drawerOpen ? 240 : 60,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerOpen ? 240 : 60,
            boxSizing: 'border-box',
            bgcolor: themeMode === 'dark' ? '#352F44' : '#FAF0E6',
            color: themeMode === 'dark' ? '#FAF0E6' : '#352F44',
            overflowX: 'hidden',
            paddingTop: '1.45vh',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: drawerOpen ? 'flex-end' : 'center',
            px: 2,
            py: 1,
          }}
        >
          <IconButton onClick={toggleDrawer} color="inherit">
            <MenuIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box
          sx={{
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.path}
                sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}
              >
                <ListItemIcon sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ display: drawerOpen ? 'block' : 'none' }} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {drawerOpen && (
              <>
                <ListItem
                  button
                  onClick={toggleYou}
                  sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}
                >
                  <ListItemIcon sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="You" sx={{ display: drawerOpen ? 'block' : 'none' }} />
                  {youOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                <Collapse in={youOpen && drawerOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {youItems.map((item) => (
                      <ListItem
                        button
                        key={item.text}
                        component={Link}
                        to={item.path}
                        sx={{
                          color: themeMode === 'dark' ? '#FAF0E6' : '#352F44',
                          pl: 4,
                        }}
                      >
                        <ListItemIcon sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            )}
          </List>
          <Divider />
          <List>
            {menuItems.slice(2).map((item) => (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.path}
                sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}
              >
                <ListItemIcon sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ display: drawerOpen ? 'block' : 'none' }} />
              </ListItem>
            ))}
          </List>
          <Box sx={{ textAlign: 'center', py: 2, display: drawerOpen ? 'block' : 'none' }}>
            <Typography variant="body2">&copy; 2024 FlatTopia</Typography>
          </Box>
        </Box>
      </Drawer>
      <Box sx={{ mt: 8 }}> {/* Adjust the margin-top to account for the fixed AppBar */}
        {/* Your main content goes here */}
      </Box>
    </>
  );
};

export default Navbar;
