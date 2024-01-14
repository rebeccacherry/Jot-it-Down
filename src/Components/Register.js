import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../store';
import { useNavigate, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _register = async (ev) => {
    ev.preventDefault();
    const credentials = {
      username,
      password,
      firstName,
      lastName,
      email,
      address,
      phone,
    };

    try {
      dispatch(register(credentials));
      navigate('/login');
    } catch (ex) {
      console.log(ex);
    }
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
      bgcolor="#F5F5F5"
    >
      <img
        src="static/images/jotItDownLogo.png"
        alt="Jotit Down Logo"
        style={{ width: '220px', height: '130px', marginTop: '10px', marginBottom: '0px' }}
      />
      <Typography variant="subtitle2" gutterBottom>
        Your personal diary. Any time, any place. Jotit Down and go!
      </Typography>

      <img
        src="static/images/pencil.jpeg"
        alt="pencil"
        style={{ width: '40%', height: '40%', marginTop: '10px', marginBottom: '10px' }}
      />

      <Typography variant="body1" gutterBottom>
        Not registered? Create your account!
      </Typography>

      
        <form style={{ width: '80%', maxWidth: '500px' }} onSubmit={_register}>
          <TextField
            label="Create Username"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
            margin="normal"
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            label="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            margin="normal"
            variant="outlined"
            size="small"
            fullWidth
            type="password"
          />
          <TextField
            label="First Name"
            value={firstName}
            onChange={(ev) => setFirstName(ev.target.value)}
            margin="normal"
            variant="outlined"
            size="small"
            fullWidth
            
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(ev) => setLastName(ev.target.value)}
            margin="normal"
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
  label="Email"
  value={email}
  onChange={(ev) => setEmail(ev.target.value)}
  margin="normal"
  variant="outlined"
  size="small"
  fullWidth
/>
<TextField
  label="Address"
  value={address}
  onChange={(ev) => setAddress(ev.target.value)}
  margin="normal"
  variant="outlined"
  size="small"
  fullWidth
/>
<TextField
  label="Phone"
  value={phone}
  onChange={(ev) => setPhone(ev.target.value)}
  margin="normal"
  variant="outlined"
  size="small"
  fullWidth
/>

<Button
  type="submit"
  onClick={_register}
  variant="contained"
  color="primary"
  size="large"
  sx={{
    mt: 2,
    color: '#333',
    backgroundColor: '#F9F6EE',
    '&:hover': { backgroundColor: '#F5F5F5', color: '#888' },
  }}
>
  Register User
</Button>
</form>
</Box>

);
};

export default Register;

         

          









