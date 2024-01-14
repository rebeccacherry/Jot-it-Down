import React, { useState } from 'react';
import { attemptLogin } from '../store';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const onChange = ev => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = ev => {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
    navigate('/home');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      marginTop={10}
      p={2}
      maxWidth={600}
      mx="auto"
      pt={4}
      bgcolor="#F5F5F5"
    >
      <img
        src="static/images/jotItDownLogo.png"
        alt="Jotit Down Logo"
        style={{ width: '220px', height: '130px', marginTop: '3px', marginBottom: '0px', paddingBottom: '0px' }}
      />
      <Typography variant="subtitle2" gutterBottom>
        Your personal diary. Any time, any place. Jotit Down and go!
      </Typography>

      <img
        src="static/images/pencil.jpeg"
        alt="pencil"
        style={{ width: '40%', height: '40%', marginTop: '10px', marginBottom: '10px', paddingBottom: '0px' }}
      />


      <form style={{ margin: '10px 0' }}>
        <TextField
          label="Username"
          value={credentials.username}
          name="username"
          onChange={onChange}
        />
        <div style={{ marginBottom: '1rem' }} />
        <TextField
          id="filled-password-input"
          label="Password"
          name="password"
          type="password"
          value={credentials.password}
          onChange={onChange}
        />
        <Button
          type="submit"
          onClick={login}
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2, color: '#333', backgroundColor: '#F9F6EE', '&:hover': { backgroundColor: '#F5F5F5', color: '#888' } }}
        >
          Login
        </Button>
        <Button
  variant="contained"
  color="primary"
  size="large"
  sx={{
    mt: 2,
    color: '#333',
    backgroundColor: '#F9F6EE',
    '&:hover': {
      backgroundColor: '#F9F6EE',
    },
  }}
>
  <a href={`https://github.com/login/oauth/authorize?client_id=${window.client_id}`} style={{ textDecoration: 'none', color: '#333' }}>
    Login with Github
  </a>
</Button>
      </form>
      <Button component={Link} to={'/register'} 
      variant="text" 
      size="medium"
      sx={{ mt: 2, color: '333', backgroundColor: '#F9F6EE' }}
      >
        
        Not an existing customer? Register here
      </Button>
    </Box>
  );
};

export default Login;



