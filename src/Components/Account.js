import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAuth } from '../store';
import { useNavigate, Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Account = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.id) {
      setFirstName(auth.firstName ? auth.firstName : '');
      setLastName(auth.lastName ? auth.lastName : '');
      setAddress(auth.address ? auth.address : '');
      setEmail(auth.email ? auth.email : '');
      setPhone(auth.phone ? auth.phone : '');
    }
  }, [auth]);

  const _update = async ev => {
    ev.preventDefault();
    dispatch(updateAuth({ firstName, lastName, address, email, phone }));
    navigate('/home');
  };

  return (
    <div style={{ margin: 'auto', maxWidth: '80%' }}>
      {auth.id ? (
        <div>
          <h4>Update Your Account</h4>
          <form onSubmit={_update}>
            <div style={{ marginBottom: 8 }} />
            <TextField
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={ev => setFirstName(ev.target.value)}
            />
            <div style={{ marginBottom: 8 }} />
            <TextField
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={ev => setLastName(ev.target.value)}
            />
            <div style={{ marginBottom: 8 }} />
            <TextField
              label="Address"
              variant="outlined"
              value={address}
              onChange={ev => setAddress(ev.target.value)}
            />
            <div style={{ marginBottom: 8 }} />
            <TextField
              label="E-mail"
              variant="outlined"
              value={email}
              onChange={ev => setEmail(ev.target.value)}
            />
            <div style={{ marginBottom: 8 }} />
            <TextField
              label="Phone"
              variant="outlined"
              value={phone}
              onChange={ev => setPhone(ev.target.value)}
            />

            <Button
              style={{ fontSize: 18 }}
              onClick={_update}
              disabled={
                firstName === auth.firstName &&
                lastName === auth.lastName &&
                address === auth.address &&
                email === auth.email &&
                phone === auth.phone
              }
            >
              Update Profile
            </Button>
          </form>
        </div>
      ) : (
        <div>
          <div style={{ position: 'relative' }}>
            <img
              src="static/images/clouds.jpg"
              alt="clouds"
              style={{
                width: '100%',
                height: 'auto',
                marginTop: '10px',
                marginBottom: '0px',
              }}
            />
            <img
              src="static/images/jotItDownLogo.png"
              alt="Jotit Down Logo"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(1.25)', // Adjust the scale to make it 25% bigger
                width: '275px', // Adjust the width based on the new scale
                height: '162.5px', // Adjust the height based on the new scale
                marginTop: '10px',
                marginBottom: '0px',
                zIndex: 1,
              }}
            />
            <Typography
              variant="subtitle2"
              gutterBottom
              style={{
                position: 'absolute',
                top: 'calc(50% + 162.5px - 70px)', // Adjust the top position to move the text upwards by 70px
                left: '50%',
                transform: 'translateX(-50%)', // Center the text horizontally
                textAlign: 'center',
                fontWeight: 'bold',
                zIndex: 1,
                color: '#000',
              }}
            >
              Your personal diary. Any time, any place. Jotit Down and go!
            </Typography>
          </div>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              my: 4,
            }}
          >
            <Typography variant="h5" gutterBottom>
              Please log in or register a new account to access your Account
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
  <Button
    component={Link}
    to="/register"
    variant="contained"
    color="primary"
    size="medium"
    sx={{
      color: '#333',
      backgroundColor: '#F9F6EE',
      '&:hover': { backgroundColor: '#F5F5F5', color: '#888' },
    }}
  >
    Register Here
  </Button>
  <Button
    component={Link}
    to="/login"
    variant="contained"
    color="primary"
    size="medium"
    sx={{
      color: '#333',
      backgroundColor: '#F9F6EE',
      '&:hover': { backgroundColor: '#F5F5F5', color: '#888' },
    }}
  >
    Login
  </Button>
</Box>

          </Box>
        </div>
      )}
    </div>
  );
};

export default Account;
