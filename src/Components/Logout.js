import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Logout = () => {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _logout = (user) => {
    dispatch(logout(user));
    navigate('/');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      p={2}
      maxWidth={600}
      mx="auto"
    >
      <img
        src="static/images/jotItDownLogo.png"
        alt="Jotit Down Logo"
        style={{ width: '220px', height: '130px', marginTop: '3px', marginBottom: '0px', paddingBottom: '0px' }}
      />
      
      <img
        src="static/images/pencil.jpeg"
        alt="pencil"
        style={{ width: '40%', height: '40%', marginTop: '10px', marginBottom: '10px', paddingBottom: '0px' }}
      />

      {auth.id ? (
        <div>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to log out?
          </Typography>
          <Button variant="contained" onClick={(user) => _logout(user)} sx={{ mt: 2, color: '#333', backgroundColor: '#F5F5F5', '&:hover': { backgroundColor: '#F5F5F5', color: '#888' } }}>
            Logout
          </Button>
        </div>
      ) : (
        <div>
          <Typography variant="h5" gutterBottom>
            We love that you want to use your Journal! Please login or register to have full access to your account and personal journals before you forget to JotIt Down!
          </Typography>
          <Typography variant="body1" gutterBottom>
            <Link to={`/register`}>Register Here</Link> or <Link to="/login">Login</Link>
          </Typography>
        </div>
      )}
    </Box>
  );
};

export default Logout;




