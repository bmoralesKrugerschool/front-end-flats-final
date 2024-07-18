import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Divider,
  Badge,
  CssBaseline,
  Collapse,
  InputBase,
  Avatar
} from '@mui/material';
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
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeSwitcher';
import Logo from '../images/logo.svg';
import DefaultUserPicture from '../images/DefaultUserPicture.svg';

const Navbar = ({ isLoggedIn, notifications }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [youOpen, setYouOpen] = useState(true); // Cambié esto a true para que por defecto esté abierto
  const { themeMode } = useTheme();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Función para abrir "You" y bloquearlo
  const openYou = () => {
    if (!drawerOpen) {
      setDrawerOpen(true);
      setYouOpen(true);
    } else {
      setYouOpen(!youOpen);
    }
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Filter', icon: <FilterListIcon />, path: '/filter' },
  ];

  const youItems = [
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
    { text: 'Favorites', icon: <FavoriteIcon />, path: '/favorites' },
    { text: 'My Flats', icon: <ApartmentIcon />, path: '/myflats' },
    { text: 'Create Flats', icon: <ApartmentIcon />, path: '/flats/new' },
  ];

  const settingsItems = [
    { text: 'Configuration', icon: <SettingsIcon />, path: '/configuration' },
    { text: 'About', icon: <InfoIcon />, path: '/about' },
  ];

  const userProfileImage = isLoggedIn ? '/path_to_user_image.jpg' : DefaultUserPicture;

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          bgcolor: themeMode === 'dark' ? '#352F44' : '#FAF0E6',
          boxShadow: 'none',
          borderBottom: 'none',
          zIndex: 1300,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ mr: 2, color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}
            >
              <MenuIcon />
            </IconButton>
            <img src={Logo} alt="FlatTopia Logo" style={{ height: '40px', marginRight: '8px' }} />
            <Typography variant="h6" sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
              FlatTopia
            </Typography>
          </Box>
          <Box
            sx={{
              position: 'relative',
              borderRadius: '4px',
              backgroundColor: themeMode === 'dark' ? '#5C5470' : '#B9B4C7',
              maxWidth: '600px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              mx: 'auto'
            }}
          >
            <InputBase
              placeholder="Buscar"
              sx={{
                color: 'inherit',
                paddingLeft: '16px',
                flex: 1,
              }}
            />
            <IconButton type="submit" sx={{ p: 1 }}>
              <SearchIcon sx={{ color: 'inherit' }} />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" component={Link} to="/upload" sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
              <UploadIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} to="/notifications" sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
              <Badge color="secondary" badgeContent={notifications}>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" component={Link} to={isLoggedIn ? "/profile" : "/login"} sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
              {isLoggedIn ? (
                <Avatar alt="User Profile" src={userProfileImage} sx={{ border: '2px solid white' }} />
              ) : (
                <PersonIcon />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={drawerOpen}
        sx={{
          width: drawerOpen ? 240 : 60,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerOpen ? 240 : 60,
            boxSizing: 'border-box',
            bgcolor: themeMode === 'dark' ? '#352F44' : '#FAF0E6',
            color: themeMode === 'dark' ? '#FAF0E6' : '#352F44',
            boxShadow: 'none',
            borderRight: 'none',
            marginTop: '64px',
            transition: 'width 0.3s ease-in-out',
          },
        }}
      >
        <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          <List sx={{ mt: 2 }}>
            {menuItems.map((item) => (
              <ListItem button key={item.text} component={Link} to={item.path} sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                {drawerOpen && <ListItemText primary={item.text} />}
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button onClick={openYou} sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44', mt: 'auto', display: drawerOpen ? 'flex' : 'none' }}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="You" />
              {youOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            <Collapse in={youOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {youItems.map((item) => (
                  <ListItem button key={item.text} component={Link} to={item.path} sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44', pl: 4, mb: 2, display: drawerOpen ? 'flex' : 'none' }}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>
          <Divider />
          <List sx={{ mt: 'auto', mb: 2 }}>
            {settingsItems.map((item) => (
              <ListItem button key={item.text} component={Link} to={item.path} sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                {drawerOpen && <ListItemText primary={item.text} />}
              </ListItem>
            ))}
          </List>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            {drawerOpen && <Typography variant="body2">&copy;</Typography>}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
