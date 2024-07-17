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
  ];

  const youItems = [
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
    { text: 'Favorites', icon: <FavoriteIcon />, path: '/favorites' },
    { text: 'My Flats', icon: <ApartmentIcon />, path: '/myflats' },
  ];

  const settingsItems = [
    { text: 'Configuration', icon: <SettingsIcon />, path: '/configuration' },
    { text: 'About', icon: <InfoIcon />, path: '/about' },
  ];

  const userProfileImage = isLoggedIn ? '/path_to_user_image.jpg' : '/default_user_image.jpg'; // Rutas a las imágenes de perfil del usuario y por defecto

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
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ mr: 2, color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}
          >
            <MenuIcon />
          </IconButton>
          <img src={Logo} alt="FlatTopia Logo" style={{ height: '40px', marginRight: '8px' }} /> {/* Logo a la izquierda de FlatTopia */}
          <Typography variant="h6" sx={{ flexGrow: 1, color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
            FlatTopia
          </Typography>
          <Box
            sx={{
              position: 'relative',
              borderRadius: '4px',
              backgroundColor: themeMode === 'dark' ? '#5C5470' : '#B9B4C7',
              width: '100%',
              maxWidth: '600px', // Ajuste del ancho máximo de la barra de búsqueda
              display: 'flex',
              alignItems: 'center',
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
                <Avatar alt="User Profile" src={userProfileImage} />
              ) : (
                <PersonIcon />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          display: drawerOpen ? 'block' : 'none',
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            bgcolor: themeMode === 'dark' ? '#352F44' : '#FAF0E6',
            color: themeMode === 'dark' ? '#FAF0E6' : '#352F44',
            boxShadow: 'none',
            borderRight: 'none',
            marginTop: '64px',
          },
        }}
      >
        <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text} component={Link} to={item.path} sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                <ListItemIcon sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button onClick={toggleYou} sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
              <ListItemIcon sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="You" />
              {youOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            <Collapse in={youOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {youItems.map((item) => (
                  <ListItem button key={item.text} component={Link} to={item.path} sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44', pl: 4 }}>
                    <ListItemIcon sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>
          <Divider />
          <List>
            {settingsItems.map((item) => (
              <ListItem button key={item.text} component={Link} to={item.path} sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                <ListItemIcon sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="body2">&copy; 2024 FlatTopia</Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
