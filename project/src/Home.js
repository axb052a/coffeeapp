// Home.js
import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, Grid, CircularProgress } from '@mui/material';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import CoffeeShopsCard from './CoffeeShopsCard';

function Home({ user }) {
  const [coffeeList, setCoffeeList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch coffee data
    fetch('/api/coffee-shops', { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        setCoffeeList(data.coffee_shops);
        setSearchResults(data.coffee_shops);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching coffee:', error));
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm || searchTerm.trim() === '') {
      setSearchResults(coffeeList);
    } else {
      setSearchResults(
        coffeeList.filter((coffee) =>
          coffee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          coffee.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          coffee.menus.some((menu) => menu.toLowerCase().includes(searchTerm.toLowerCase())) ||
          coffee.reviews.some((review) =>
            review.comment.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      );
    }
  };
  
    const coffeeBrownColor = '#3E2723';

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      style={{
        backgroundImage: 'url("https://img.freepik.com/free-photo/cute-brown-border-with-coffee-beans-shadow-background_53876-108697.jpg")',
        backgroundSize: 'cover',
      }}
    >
      <Paper
        elevation={3}
        style={{
          padding: '20px',
          margin: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          textAlign: 'center',
        }}
      >
        <div>
          {user ? (
            <Typography variant="h5" gutterBottom>
              Welcome, {user.username} to Cafe Hopper!
            </Typography>
          ) : (
            <div>
              <Typography variant="h4" gutterBottom>
                Welcome to Cafe Hopper!
              </Typography>
            </div>
          )}
        </div>
        {user ? (
          <>
            <Typography variant="body18" paragraph>
              Cafe Hopper is your guide to discovering charming cafes in the Los Angeles, San Diego, Orange County and San Francisco area. Explore the coffee scene and find hidden gems to enjoy your favorite brews. Use the search functionality to locate cafes based on your preferences.
              Visit {' '}
              <NavLink to="/coffee-shops" style={{ textDecoration: 'none', color: coffeeBrownColor, fontWeight: 'bold', fontSize: '1.0em' }}>
                Coffee Shops
              </NavLink> to determine which cafes stand out to you. Leave your reveiw if you have visited them. View their menu and reviews! If you are new to the coffee world, visit {' '}
              <NavLink to="/coffee-types" style={{ textDecoration: 'none', color: coffeeBrownColor, fontWeight: 'bold', fontSize: '1.0em' }}>
                Coffee Types
                </NavLink> to see the different types of coffee. Take the quiz to test your coffee knowledge at {' '}
                <NavLink to="/coffee-quiz" style={{ textDecoration: 'none', color: coffeeBrownColor, fontWeight: 'bold', fontSize: '1.0em' }}>
                Coffee Quiz
                </NavLink> .  
            </Typography>
            <SearchBar onSearch={handleSearch} />
          </>
        ) : (
            <Typography variant="body18" paragraph>
              Welcome to Cafe Hopper! This app is your go-to resource for discovering cafes in the Los Angeles, San Diego, Orange County and San Francisco area. Whether you're a coffee enthusiast or just looking for a cozy spot to relax, Cafe Explorer has you covered. To get started, please{' '}
              <NavLink to="/login" style={{ textDecoration: 'none', color: coffeeBrownColor, fontWeight: 'bold', fontSize: '1.0em' }}>
                Log In
              </NavLink>{' '}
              or{' '}
              <NavLink to="/signup" style={{ textDecoration: 'none', color: coffeeBrownColor, fontWeight: 'bold', fontSize: '1.0em' }}>
                Sign Up
              </NavLink>
              . Explore the vibrant coffee culture of Los Angeles and find your new favorite cafe. Start your cafe-hopping adventure with Cafe Explorer today! 
              <br />
              Discover charming cafes, explore the coffee scene, and find hidden gems to enjoy your favorite brews. Use the search functionality to locate cafes based on your preferences. Visit
              {' '}<NavLink to="/about" style={{ textDecoration: 'none', color: coffeeBrownColor, fontWeight: 'bold', fontSize: '1.0em' }}>
                About
              </NavLink>{' '}
              to learn more about the app and its functionality. Read my 
              {' '}<NavLink to="/biography" style={{ textDecoration: 'none', color: coffeeBrownColor, fontWeight: 'bold', fontSize: '1.0em' }}>
                Biography
              </NavLink>{' '}
              to learn and get to know me on a personal level as a software engineer. 
            </Typography>        
            )}
      </Paper>
      <Grid container spacing={3}>
        {user && (
          <Grid item xs={12}>
            {loading ? (
              <CircularProgress />
            ) : (
              <Grid container spacing={3}>
                {Array.isArray(searchResults) ? (
                  searchResults.map((coffee) => (
                    <Grid item key={coffee.id} xs={12} sm={6} md={4} lg={3}>
                      <CoffeeShopsCard
                        name={coffee.name}
                        location={coffee.location}
                        logo={coffee.logo}
                        menus={coffee.menus}
                        reviews={coffee.reviews}
                      />
                    </Grid>
                  ))
                ) : (
                  <p>Error</p>
                )}
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default Home;
