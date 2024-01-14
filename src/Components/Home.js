import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
const Home = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  

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
      <Typography variant="subtitle2" gutterBottom>
        Your personal diary. Any time, any place. Jotit Down and go!
      </Typography>

      <img
        src="static/images/pencil.jpeg"
        alt="pencil"
        style={{ width: '60%', height: 'auto', marginTop: '10px', marginBottom: '10px', paddingBottom: '0px' }}
      />

      <Box  
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="justify" 
      p={2}
      maxWidth={600}
      mx="auto" 
      fontFamily="Helvetica">
      
        <Typography variant="body1" gutterBottom style={{ fontSize: '14px' }}>
          Welcome {auth.firstName && auth.firstName.charAt(0).toUpperCase() + auth.firstName.slice(1)} to Jotit Down,
          the daily journal app that lets you effortlessly capture and reflect on the moments that matter most in your
          life.
        </Typography>
        <Typography variant="body1" gutterBottom style={{ fontSize: '14px' }}>
        Jotit Down is perfect for users of all ages and interests. Whether you want to capture your daily routines, your creative ideas, your travel adventures, or your personal
          reflections, Jotit Down makes it easy to record and reflect on the moments that make up your life, personal growth and development and helps you stay on track no matter how busy your schedule may be.
        </Typography>
        <Typography variant="body1"gutterBottom style={{ fontSize: '14px' }}>
          Begin with Jotit Down today and start documenting your life's journey, one thought at a time. 
        </Typography>
      </Box>

      <Button
        component={Link}
        to="/journals"
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 3, color: '#333', backgroundColor: '#F9F6EE',
        '&:hover': {
          backgroundColor: '#F5F5F5',
          color: '#888',
        }, }}
    >
      GO TO YOUR JOURNALS
    </Button>
  </Box>
);
};

export default Home;
