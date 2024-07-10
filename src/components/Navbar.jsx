import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Button, Avatar } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const { isAuthenticated, user, logout } = useAuth();
  console.log(isAuthenticated, user )
  console.log('user', user.user.name , user)

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const getInitials = (name) => {
    console.log('name', name)
    if (!name) return 'UF';
    const names = user.user.name.split(' ');
    return names.map((n) => n[0]).join('');
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Mi Perfil</MenuItem>
      <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {[<MenuItem key="inicio" component={Link} to="/flats">Inicio</MenuItem>,
        <MenuItem key="categorias" component={Link} to="/">Categorías</MenuItem>,
        <MenuItem key="filtros" component={Link} to="/filters">Filtros</MenuItem>,
        <MenuItem key="sobre" component={Link} to="/about">Sobre</MenuItem>,
        <MenuItem key="faq" component={Link} to="/faq">FAQ</MenuItem>,
        isAuthenticated && (
          <MenuItem key="miPerfil" onClick={handleProfileMenuOpen}>Mi Perfil</MenuItem>
        ),
        isAuthenticated && (
          <MenuItem key="cerrarSesion" onClick={handleLogout}>Cerrar Sesión</MenuItem>
        ),
      ]}
    </Menu>
  );

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component={Link} to="/flats" style={{ color: 'inherit', textDecoration: 'none' }}>
            LOGO
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <div style={{ display: 'flex' }}>
            <Button color="inherit" component={Link} to="/flats">Products</Button>
            <Button color="inherit" component={Link} to="/">Pricing</Button>
            <Button color="inherit" component={Link} to="/blog">Blog</Button>
            {isAuthenticated ? (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {user.user.photoURL ? (
                  <Avatar alt={user.user.name} src={user.user.photoURL} />
                ) : (
                  <Avatar>{getInitials(user.user.name)}</Avatar>
                )}
              </IconButton>
            ) : (
              <Button color="inherit" component={Link} to="/login">Login</Button>
            )}
          </div>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="open drawer"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default Navbar;
