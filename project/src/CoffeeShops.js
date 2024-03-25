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
  TextField,
  Button,
} from '@mui/material';

function CoffeeShops() {
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [newReview, setNewReview] = useState({ rating: '', comment: '' });

  useEffect(() => {
    // Fetch coffee shops data from the API
    fetch('/api/coffee-shops')
      .then((response) => response.json())
      .then((data) => setCoffeeShops(data.coffee_shops))
      .catch((error) => console.error('Error fetching coffee shops:', error));
  }, []);

  const handleCreateReview = (coffeeShopId) => {
    // Check for empty inputs or invalid rating
    if (!newReview.rating || !newReview.comment || newReview.rating < 0 || newReview.rating > 5) {
      console.log('Please provide a valid rating (0-5) and a comment.');
      return;
    }
  
    // To create a new review
    fetch(`/api/coffee-shop-reviews/${coffeeShopId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReview),
    })
      .then((response) => response.json())
      .then(() => {
        // Refresh coffee shop data after adding review
        fetch('/api/coffee-shops')
          .then((response) => response.json())
          .then((data) => setCoffeeShops(data.coffee_shops))
          .catch((error) => console.error('Error fetching coffee shops:', error));
  
        // Reset new review state
        setNewReview({ rating: '', comment: '' });
      })
      .catch((error) => console.error('Error creating new review:', error));
  };
  
  const handleDeleteReview = (coffeeShopId, reviewId) => {
    // To delete a review
    fetch(`/api/coffee-shop-reviews/${coffeeShopId}/${reviewId}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Refresh coffee shop data after deleting review
        fetch('/api/coffee-shops')
          .then((response) => response.json())
          .then((data) => setCoffeeShops(data.coffee_shops))
          .catch((error) => console.error('Error fetching coffee shops:', error));
      })
      .catch((error) => console.error('Error deleting review:', error));
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Coffee Shops
      </Typography>
      {coffeeShops.length === 0 ? (
        <Typography variant="body1">No coffee shops available.</Typography>
      ) : (
        <List>
          {coffeeShops.map((shop) => (
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
                      {menuIndex < shop.menus.length - 1 && <Divider />} 
                    </React.Fragment>
                  ))}
                </List>
              )}
              {shop.reviews.length > 0 && (
                <List>
                  <Typography variant="h6">Reviews</Typography>
                  {shop.reviews.map((review) => (
                    <ListItem key={review.id}>
                      <ListItemText primary={`Rating: ${review.rating}`} secondary={`Comment: ${review.comment}`} />
                      <Button onClick={() => handleDeleteReview(shop.id, review.id)}>Delete Review</Button>
                    </ListItem>
                  ))}
                </List>
              )}
              <Divider />
              <div>
                <TextField
                  label="Rating: 0 - 5"
                  variant="outlined"
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                />
                <TextField
                  label="Comment:"
                  variant="outlined"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                />
                <Button onClick={() => handleCreateReview(shop.id)}>Add Review</Button>
              </div>
            </React.Fragment>
          ))}
        </List>
      )}
    </Paper>
  );
}

export default CoffeeShops;
