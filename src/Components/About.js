import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const About = () => {
  const { auth } = useSelector(state => state);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      p={2}
      maxWidth={600}
      mx="auto"
      fontFamily="Helvetica"
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
        I'm Rebecca Cherry, the creator of this innovative online journal application. With JotIt Down, I wanted to provide a convenient and accessible way for everyone to keep a daily journal, no matter where they are or what they're up to.
        Living in the vibrant city of NYC, I wear multiple hats as a musician, software engineer, mom, and avid explorer. I have a deep love for learning and a passion for various interests like cooking, fitness, and immersing myself in the realms of arts, science, and wellness.
      </Typography>

      <Typography variant="body1" gutterBottom style={{ fontSize: '14px' }}>
        Throughout my journey, I've realized the power of journaling in nurturing personal growth and capturing precious memories, and this is why I created JotIt Down — a journaling tool that allows you to effortlessly jot down your thoughts, ideas, and experiences.
      </Typography>

      <Typography variant="body1" gutterBottom style={{ fontSize: '14px' }}>
        Whether you're an artist seeking creative inspiration, a parent navigating the ups and downs of daily life, or someone striving for personal wellness, JotIt Down is here to support and encourage you. Our user-friendly interface and intuitive features make journaling a delightful and personalized experience.
      </Typography>

      <Typography variant="body1" gutterBottom style={{ fontSize: '14px' }}>
        Join me and our community of journal enthusiasts on this incredible journey. Let's embrace the power of reflection, share our stories, and celebrate the beauty of self-expression together. JotIt Down is your companion to unlocking the extraordinary within the ordinary moments of life. Start your journaling adventure today and experience the limitless potential of your thoughts with JotIt Down.
      </Typography>

     </Box>
    </Box>
  );
};

export default About;
