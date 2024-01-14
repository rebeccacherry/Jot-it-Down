import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ShoppingCartSharp } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import auth from '../store/auth';
import Cart from './Cart'

export default function Nav() {
  const { auth, cart } = useSelector(state => state);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  let pages = [];
  auth.adminStatus === true ? (pages = ['Home', 'Journals', 'Shopping', 'About', 'Account', 'Admin']) : (pages = ['Home', 'Journals', 'shopping', 'About', 'Account']);
  let settings = [];
  auth.id
    ? (settings = ['Account', 'Home', 'Journals', 'Shopping', 'Cart', 'About', 'Admin',  'Logout'])
    : (settings = ['Account', 'Home', 'Journals', 'Shopping', 'About', 'Cart', 'Admin', 'Register', 'Login', ]);

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigateTo = page => {
    navigate(`/${page.toLowerCase()}`);
  };

  const getCartLength = () => {
    let sum = 0;
    cart.lineItems.forEach(product => {
      sum += product.quantity
    })
    return sum;
  };

  return (
    <AppBar position="static" style={{ background: '#F9F6EE', margin: 0, padding: 0 }}>
   
        <Toolbar disableGutters>

          {/* Admin link */}
          {auth.adminStatus && (
            <Typography
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              noWrap
              component={Link}
              to="/admin"
              sx={{
                fontSize: 14,
                ml: 2,
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'helvetica',
                fontWeight: 25,
                letterSpacing: '.1rem',
                color: '0C090A',
                textDecoration: 'none',
              }}
            >
              Admin
            </Typography>
          )}

          {/* Main logo */}
          <Box>
            <Link to="/">
              <img
                src="/static/images/JotItDownLogo.png"
                alt="JotIt Down Logo"
                style={{ width: '110px', height: 'auto', paddingLeft: '20px' }}
              />
            </Link>
          </Box>

                   {/* Mobile menu */}
                   <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="0C090A"
            >
              {/* Add menu icon here */}
            </IconButton>
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
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => navigateTo(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Additional mobile links */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            {settings.map((setting) => (
              <Typography
                key={setting}
                noWrap
                component={Link}
                to={`/${setting.toLowerCase()}`}
                sx={{
                  fontSize: 14,
                  ml: 2,
                  flexGrow: 1,
                  fontFamily: 'helvetica',
                  fontWeight: 35,
                  letterSpacing: '.2rem',
                  color: '0C090A',
                  textDecoration: 'none',
                }}
              >
                {setting.toUpperCase()}
              </Typography>
            ))}
          </Box>

          {/* Desktop links */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={`/${page.toLowerCase()}`}
                sx={{ my: 2, color: '0C090A', display: 'block',  marginLeft: '20px', }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <IconButton
              size="large"
              color="inherit"
            >
              <Badge badgeContent={getCartLength()} color="error">
                <Link to="/cart" ><ShoppingCartSharp sx={{ pr: 1, color: 'black'}}/></Link>
              </Badge>
            </IconButton>

          {/* User menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Menu">


              
            <IconButton onClick={handleOpenUserMenu} sx={{ width: 50, height: 50, marginRight: '20px'  }}>
  <Avatar alt="contact-book avatar" src="/static/images/contact-book-black.png" sx={{ width: 40, height: 40, padding: '30px' }} />
</IconButton>




            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => navigateTo(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
   
    </AppBar>
  );
}































