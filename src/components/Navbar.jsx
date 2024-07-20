import React, { useContext, useState } from 'react';
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
  Collapse,
  Avatar,
  Badge,
  Popover,
  CssBaseline,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import FilterListIcon from '@mui/icons-material/FilterList';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ApartmentIcon from '@mui/icons-material/Apartment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import UploadIcon from '@mui/icons-material/Upload';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeSwitcher';
import { AuthContext } from '../context/AuthContext';
import Logo from '../images/logo.svg';
import DefaultUserPicture from '../images/DefaultUserPicture.svg';

const Navbar = ({ notifications }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [youOpen, setYouOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const { themeMode } = useTheme();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const openYou = () => {
    setYouOpen(!youOpen);
  };

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;

  // Menu items
  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Filter', icon: <FilterListIcon />, path: '/flats' },
  ];

  const youItems = [
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
    { text: 'Favorites', icon: <FavoriteIcon />, path: '/favorites' },
    { text: 'My Flats', icon: <ApartmentIcon />, path: '/myflats' },
  ];

  const guestMenuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
  ];

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" sx={{ bgcolor: themeMode === 'dark' ? '#352F44' : '#FAF0E6', boxShadow: 'none', borderBottom: 'none', zIndex: 1300 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer} sx={{ mr: 2, color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
              <MenuIcon />
            </IconButton>
            <img src={Logo} alt="FlatTopia Logo" style={{ height: '40px', marginRight: '8px' }} />
            <Typography variant="h6" sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
              FlatTopia
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
            Welcome to FlatTopia!
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isAuthenticated ? (
              <>
                <IconButton color="inherit" component={Link} to="/myflats/new" sx={{ ml: 2, color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                  <UploadIcon />
                </IconButton>
                <IconButton color="inherit" onClick={handleNotificationClick} sx={{ ml: 2, color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                  <NotificationsIcon />
                  {notifications > 0 && (
                    <Badge badgeContent={notifications} color="error" sx={{ '& .MuiBadge-dot': { backgroundColor: themeMode === 'dark' ? '#FAF0E6' : '#352F44' } }} />
                  )}
                </IconButton>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleNotificationClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <Box sx={{ p: 2, width: 300 }}>
                    {notifications > 0 ? (
                      <Typography variant="body2">You have {notifications} new notifications</Typography>
                    ) : (
                      <Typography variant="body2">No new notifications</Typography>
                    )}
                    {/* Aquí podrías mapear las notificaciones si tienes una lista */}
                  </Box>
                </Popover>
                <IconButton color="inherit" component={Link} to="/profile" sx={{ ml: 2, color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                  <Avatar alt="User Profile" src={DefaultUserPicture} sx={{ border: '2px solid white' }} />
                </IconButton>
              </>
            ) : (
              <IconButton color="inherit" component={Link} to="/login" sx={{ ml: 2, color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                <PersonIcon />
                <Typography variant="body2" sx={{ ml: 1 }}>Login</Typography>
              </IconButton>
            )}
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
            height: 'calc(100vh - 64px)',
            marginTop: '64px',
            transition: 'width 0.3s ease-in-out',
            overflowX: 'hidden',
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          <List sx={{ mt: 2 }}>
            {(isAuthenticated ? menuItems : guestMenuItems).map((item) => (
              <ListItem button key={item.text} component={Link} to={item.path} sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                {drawerOpen && <ListItemText primary={item.text} />}
              </ListItem>
            ))}
          </List>
          {isAuthenticated && (
            <>
              <Divider />
              <List sx={{ mb: 2 }}>
                <ListItem button onClick={openYou} sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44', display: drawerOpen ? 'flex' : 'none' }}>
                  <ListItemIcon><PersonIcon /></ListItemIcon>
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
            </>
          )}
          <List sx={{ mb: 2 }}>
            <ListItem button component={Link} to="/about" sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
              <ListItemIcon><InfoIcon /></ListItemIcon>
              {drawerOpen && <ListItemText primary="About" />}
            </ListItem>
            {isAuthenticated && (
              <ListItem button onClick={() => { logout(); navigate('/'); }} sx={{ color: themeMode === 'dark' ? '#FAF0E6' : '#352F44' }}>
                <ListItemIcon><LogoutIcon /></ListItemIcon>
                {drawerOpen && <ListItemText primary="Log Out" />}
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
