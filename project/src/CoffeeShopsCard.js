// CoffeeShopsCard.js
import React, { useState } from 'react';

const CoffeeShopsCard = ({ name, location, logo, menus, reviews }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '16px', marginBottom: '16px' }}>
      <img src={logo} alt={`${name} Logo`} style={{ maxWidth: '100%', marginTop: '10px' }} />
      <h3>{name}</h3>
      <h3>{location}</h3>
      {showMenu && (
        <div>
          <h4>Menu</h4>
          <ul>
            {menus.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={toggleMenu}>{showMenu ? 'Hide Menu' : 'View Menu'}</button>
      <button onClick={toggleReviews}>{showReviews ? 'Hide Reviews' : 'View Reviews'}</button>
      {showReviews && (
        <div>
          <h4>Reviews</h4>
          <ul>
            {reviews.map((review, index) => (
              <li key={index}>{`Rating: ${review.rating}, Comment: ${review.comment}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CoffeeShopsCard;
