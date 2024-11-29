import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Switch,
  Tooltip,
  Badge,
  Menu,
  MenuItem,
} from '@mui/material';
import { ShoppingCart, Logout, LightMode, DarkMode, Menu as MenuIcon } from '@mui/icons-material';
import { styled } from '@mui/system';
import { useThemeContext } from '../../hooks/useThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import useCart from '../../hooks/useCart';

const NavBar = () => {
  const navigate = useNavigate();

  const auth = useAuth();
  const cart = useCart();
  const { mode, toggleThemeMode } = useThemeContext();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    } else {
      navigate('/');
    }
  };

  const Logo = styled(Typography)(({ theme }) => ({
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginRight: '2rem',
    cursor: 'pointer',
    color: theme.palette.text.primary,
  }));

  const NavLink = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: '500',
    textTransform: 'none',
    margin: '0 10px',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  }));

  const navLinks = [
    { label: 'Featured Deals', sectionId: 'Featured-Deals' },
    { label: 'Recently Visited', sectionId: 'Recently-Visited' },
    { label: 'Trending Destinations', sectionId: 'Trending-Destinations' },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        borderRadius: '4rem',
        backgroundColor: mode === 'light' ? '#ffffff' : '#212121',
        color: mode === 'light' ? '#333' : '#ffffff',
        padding: '0 2rem',
        margin: '1rem 0',
      }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Logo
            onClick={() => {
              navigate('/userHome');
            }}
            sx={{ display: { xs: 'none', md: 'flex' } }}>
            Traveller
          </Logo>

          {/* Desktop Navigation Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navLinks.map(link => (
              <NavLink
                key={link.label}
                onClick={() => {
                  scrollToSection(link.sectionId);
                }}>
                {link.label}
              </NavLink>
            ))}
          </Box>

          {/* Mobile Menu */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Typography>Traveller</Typography>
            <Box>
              <IconButton
                size="large"
                aria-label="theme menu"
                aria-haspopup="true"
                onClick={toggleThemeMode}
                color="inherit">
                {mode === 'light' ? <LightMode /> : <DarkMode />}
              </IconButton>

              <IconButton
                size="large"
                aria-label="navigation menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit">
                <MenuIcon />
              </IconButton>

              <Tooltip title="Checkout">
                <IconButton
                  onClick={() => {
                    navigate('/cart');
                  }}
                  color="inherit"
                  sx={{ margin: '0 10px' }}>
                  <Badge
                    badgeContent={cart.bookings.length}
                    color="error"
                    max={99}
                    sx={{
                      position: 'relative',
                      marginRight: '0.5rem',
                    }}>
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}>
              {navLinks.map(link => (
                <MenuItem
                  key={link.label}
                  onClick={() => {
                    scrollToSection(link.sectionId);
                    handleCloseNavMenu();
                  }}>
                  <Typography textAlign="center">{link.label}</Typography>
                </MenuItem>
              ))}
              <IconButton
                size="large"
                aria-label="navigation menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => {
                  auth.logout();
                  navigate('/login');
                }}
                color="inherit">
                <Logout />
                <Typography variant="body2" sx={{ color: 'inherit', marginLeft: '5px' }}>
                  Logout
                </Typography>
              </IconButton>
            </Menu>
          </Box>
        </Box>

        {/* Right Section */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {/* Theme Toggle */}
          <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color="inherit" onClick={toggleThemeMode}>
                {mode === 'light' ? <LightMode /> : <DarkMode />}
              </IconButton>
              <Switch
                checked={mode === 'dark'}
                onChange={toggleThemeMode}
                color="default"
                inputProps={{ 'aria-label': 'theme toggle' }}
              />
            </Box>
          </Tooltip>

          {/* Cart */}
          <Tooltip title="Checkout">
            <IconButton
              onClick={() => {
                navigate('/cart');
              }}
              color="inherit"
              sx={{ margin: '0 10px' }}>
              <Badge
                badgeContent={cart.bookings.length}
                color="error"
                max={99}
                sx={{
                  position: 'relative',
                  marginRight: '0.5rem',
                }}>
                <ShoppingCart />
              </Badge>
              <Typography variant="body2" sx={{ color: 'inherit' }}>
                Checkout
              </Typography>
            </IconButton>
          </Tooltip>

          {/* Logout */}
          <Tooltip title="Logout">
            <IconButton
              color="inherit"
              onClick={() => {
                auth.logout();
              }}
              component={Link}
              to="/login">
              <Logout />
              <Typography variant="body2" sx={{ color: 'inherit', marginLeft: '5px' }}>
                Logout
              </Typography>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
