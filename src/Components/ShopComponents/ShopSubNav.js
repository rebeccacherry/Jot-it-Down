import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

function ShopSubNav() {
  return (
    <div id='subnav'>
      <AppBar position="static" style={{ background: '#F9F6EE' }} elevation={0}>
        <Container sx={{ maxWidth: 'xl' }}>
          <Toolbar disableGutters>
            <Typography
              variant="subtitle2"
              noWrap
              component={Link}
              to="../shop/shirts"
              sx={{
                fontSize: 12,
                ml: 2,
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: '#0C090A',
                letterSpacing: '.3rem',
                flexGrow: 1,
                fontFamily: 'helvetica',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              Shirts
            </Typography>

            <Typography
              variant="subtitle2"
              noWrap
              component={Link}
              to="../shop/healthProducts"
              sx={{
                fontSize: 12,
                ml: 2,
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: '#0C090A',
                letterSpacing: '.3rem',
                flexGrow: 1,
                fontFamily: 'helvetica',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              Health Products
            </Typography>

            <Typography
              variant="subtitle2"
              noWrap
              component={Link}
              to="../shop/mugs"
              sx={{
                fontSize: 12,
                ml: 2,
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: '#0C090A',
                letterSpacing: '.3rem',
                flexGrow: 1,
                fontFamily: 'helvetica',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              Mugs
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default ShopSubNav;
