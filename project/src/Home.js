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
              Welcome, {user.username} to Cafe Explorer!
            </Typography>
          ) : (
            <div>
              <Typography variant="h4" gutterBottom>
                Welcome to Cafe Explorer!
              </Typography>
            </div>
          )}
        </div>
        {user ? (
          <>
            <Typography variant="body18" paragraph>
              Cafe Explorer is your guide to discovering charming cafes in the Los Angeles area. Explore the coffee scene and find hidden gems to enjoy your favorite brews. Use the search functionality to locate cafes based on your preferences.
              Visit {' '}
              <NavLink to="/coffee-shops" style={{ textDecoration: 'none', color: coffeeBrownColor, fontWeight: 'bold', fontSize: '1.0em' }}>
                Coffee Shops
              </NavLink> to determine which cafes stand out to you. View their menu and reviews! If you are new to the coffee world, visit {' '}
              <NavLink to="/coffee-types" style={{ textDecoration: 'none', color: coffeeBrownColor, fontWeight: 'bold', fontSize: '1.0em' }}>
                Coffee Types
                </NavLink> to see the different types of coffee. 
            </Typography>
            <SearchBar onSearch={handleSearch} />
          </>
        ) : (
            <Typography variant="body18" paragraph>
              Welcome to Cafe Explorer! This app is your go-to resource for discovering cafes in the Los Angeles area. Whether you're a coffee enthusiast or just looking for a cozy spot to relax, Cafe Explorer has you covered. To get started, please{' '}
              <NavLink to="/login" style={{ textDecoration: 'none', color: coffeeBrownColor, fontWeight: 'bold', fontSize: '1.0em' }}>
                Log In
              </NavLink>{' '}
              or{' '}
              <NavLink to="/signup" style={{ textDecoration: 'none', color: coffeeBrownColor, fontWeight: 'bold', fontSize: '1.0em' }}>
                Sign Up
              </NavLink>
              . Explore the vibrant coffee culture of Los Angeles and find your new favorite cafe. Start your cafe-hopping adventure with Cafe Explorer today! 
              <br />
              Discover charming cafes, explore the coffee scene, and find hidden gems to enjoy your favorite brews. Use the search functionality to locate cafes based on your preferences. 
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
                        // Pass reviews as a prop to CoffeeShopsCard
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
