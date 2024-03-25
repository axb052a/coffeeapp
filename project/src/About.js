import React from 'react';
import { Typography, Container, Paper, Grid } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
            position: 'absolute',
            top: '64px',
            left: 0,
            width: '100%',
            height: 'calc(100% - 64px)',
            backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/025/939/952/large_2x/minimal-interior-design-coffee-cafe-bar-shop-with-beige-cozy-tone-style-and-with-glossy-ivory-white-round-corner-counter-coffee-machinery-with-generative-ai-free-photo.jpeg")', // Corrected background image URL
            backgroundSize: 'cover',
            overflow: 'auto',
            padding: '20px',
          }}
      >
        <Grid item xs={10}>
          <Paper
            elevation={3}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)', 
              padding: '20px',
            }}
          >
            <Typography variant="h4" gutterBottom>
              About Cafe Hopper
            </Typography>
            <Typography variant="body1" paragraph>
              Welcome to Cafe Hopper, your go-to destination for exploring the vibrant coffee scene in Los Angeles, San Francisco, San Diego and Orange County!
            </Typography>
            <Typography variant="body1" paragraph>
              Our application allows you to discover real coffee shops located in the Los Angeles, San Francisco, San Diego and Orange County area. While the coffee shops
              and their menus are authentic, please note that the prices displayed may not accurately reflect the actual prices.
              We strive to provide you with a taste of what each coffee shop has to offer, but we recommend verifying the prices
              directly with the coffee shop.
            </Typography>
            <Typography variant="body1" paragraph>
              Cafe Hopper is a full-stack web application developed by an emerging software engineer. As I continue to learn
              and grow in my career, I'll be making improvements and adjustments to the application to enhance the user experience
              and add new features.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
