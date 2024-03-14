// src/components/CoffeeShops.js
import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from '@mui/material';

function CoffeeShops() {
  const [coffeeShops, setCoffeeShops] = useState([]);

  useEffect(() => {
    // Fetch coffee shops data from the API
    fetch('/api/coffee-shops')
      .then((response) => response.json())
      .then((data) => setCoffeeShops(data.coffee_shops))
      .catch((error) => console.error('Error fetching coffee shops:', error));
  }, []);

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Coffee Shops
      </Typography>
      {coffeeShops.length === 0 ? (
        <Typography variant="body1">No coffee shops available.</Typography>
      ) : (
        <List>
          {coffeeShops.map((shop, index) => (
            <React.Fragment key={shop.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt={shop.name} src={shop.logo} />
                </ListItemAvatar>
                <ListItemText primary={shop.name} secondary={shop.location} />
              </ListItem>
              {shop.menus.length > 0 && (
                <List>
                  {shop.menus.map((menu, menuIndex) => (
                    <React.Fragment key={menuIndex}>
                      <ListItem>
                        <ListItemText primary={menu} />
                      </ListItem>
                      {menuIndex < shop.menus.length - 1 && <Divider />} {/* Add a divider between menu items */}
                    </React.Fragment>
                  ))}
                </List>
              )}
              {shop.reviews.length > 0 && (
                <List>
                  <Typography variant="h6">Reviews</Typography>
                  {shop.reviews.map((review, reviewIndex) => (
                    <ListItem key={reviewIndex}>
                      <ListItemText primary={`Rating: ${review.rating}`} secondary={`Comment: ${review.comment}`} />
                    </ListItem>
                  ))}
                </List>
              )}
              {index < coffeeShops.length - 1 && <Divider />} {/* Add a divider between coffee shops */}
            </React.Fragment>
          ))}
        </List>
      )}
    </Paper>
  );
}

export default CoffeeShops;
