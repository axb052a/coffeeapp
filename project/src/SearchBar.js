// SearchBar.js
import React, { useState } from 'react';
import { TextField } from '@mui/material';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <TextField
        label="Search cafes"
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Enter text"
        fullWidth
      />
    </div>
  );
}

export default SearchBar;