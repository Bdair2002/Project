import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import HotelIcon from '@mui/icons-material/Hotel';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import KingBedIcon from '@mui/icons-material/KingBed';
import useMediaQuery from '../../hooks/useMediaQuery';
import Tooltip from '@mui/material/Tooltip';
import { Logout } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import { Link, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useThemeContext } from '../../hooks/useThemeContext';
import { useNavigate } from 'react-router-dom';
import { DarkMode, LightMode } from '@mui/icons-material';
const drawerWidth = 240;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  position: 'static',
  boxSizing: 'border-box',
  anchor: 'top',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      },
    },
  ],
}));

export default function MiniDrawer() {
  const { isMobile } = useMediaQuery();
  const navigate = useNavigate();
  const { mode, toggleThemeMode } = useThemeContext();
  const auth = useAuth();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const list = () => (
    <List>
      {['Home', 'Cities', 'Hotels', 'Rooms'].map((text, index) => (
        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            onClick={() => {
              navigate(`${text === 'Home' ? `/admin` : `/admin/${text.toLowerCase()}`}`);
              setMobileOpen(false);
              handleDrawerClose();
            }}
            sx={[
              {
                minHeight: 48,
                px: 2.5,
              },
              open || mobileOpen
                ? {
                    justifyContent: 'initial',
                  }
                : {
                    justifyContent: 'center',
                  },
            ]}>
            <ListItemIcon
              sx={[
                {
                  minWidth: 0,
                  justifyContent: 'center',
                },
                open || mobileOpen
                  ? {
                      mr: 3,
                    }
                  : {
                      mr: 'auto',
                    },
              ]}>
              {index === 0 ? (
                <HomeIcon />
              ) : index == 1 ? (
                <LocationOnIcon />
              ) : index === 2 ? (
                <HotelIcon />
              ) : (
                <KingBedIcon />
              )}
            </ListItemIcon>
            <ListItemText
              primary={text}
              sx={[
                open || mobileOpen
                  ? {
                      opacity: 1,
                    }
                  : {
                      opacity: 0,
                    },
              ]}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => {
                isMobile ? setMobileOpen(!mobileOpen) : handleDrawerOpen();
              }}
              edge="start"
              sx={[
                {
                  marginRight: 5,
                },
                open && { display: 'none' },
              ]}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {`${isMobile ? 'Dashboard' : 'Traveller Dashboard'}`}
            </Typography>
          </Toolbar>

          <Box>
            <IconButton
              size="large"
              aria-label="theme menu"
              aria-haspopup="true"
              onClick={toggleThemeMode}
              color="inherit">
              {mode === 'light' ? <LightMode /> : <DarkMode />}
            </IconButton>
            <Tooltip sx={{ padding: '0 2rem' }} title="Logout">
              <IconButton
                color="inherit"
                onClick={() => {
                  auth.logout();
                }}
                component={Link}
                to="/login">
                <Logout />
                {!isMobile && <Typography>Logout</Typography>}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </AppBar>

      {/* Desktop Drawer */}
      <Drawer
        key={'desktopDrawer'}
        sx={{ display: `${isMobile ? 'none' : 'block'}` }}
        variant="permanent"
        open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {list()}
      </Drawer>

      {/* Mobile Drawer */}
      <MuiDrawer
        key={'mobileDrawer'}
        anchor="top"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}>
        <Box
          sx={{
            width: '100%',
            padding: theme.spacing(2),
            bgcolor: theme.palette.background.paper,
          }}>
          <IconButton onClick={() => setMobileOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
          {list()}
        </Box>
      </MuiDrawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}
