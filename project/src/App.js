// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';
import CoffeeShops from './CoffeeShops';
import NavBar from './NavBar';
import UserProfile from './UserProfile';
import CoffeeTypes from './CoffeeTypes';
import About from './About';
import CoffeeQuiz from './CoffeeQuiz';
import Biography from './Biography'

function App() {
  const [user, setUser] = useState();
  const [coffeeShops, setCoffeeShops] = useState([]);

  useEffect(() => {
    fetch("/api/check_session", {
      method: 'GET',
      credentials: 'include',
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((userData) => {
            setUser(userData);
          });
        } else {
          setUser(null);
        }
      });
  }, []);

  useEffect(() => {
    fetch("/api/coffee-shops", {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setCoffeeShops(data.coffee_shops);
      })
      .catch((error) => console.error('Error fetching coffee shops:', error));
  }, []);

  return (
    <Router>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={<Home user={user} coffeeShops={coffeeShops} />}
        />
        <Route path="/login" element={<Login user={user} setUser={setUser} />} />
        <Route path="/logout" element={<Logout setUser={setUser} />} />
        <Route path="/signup" element={<Signup user={user} setUser={setUser} />} />
        <Route path="/coffee-shops" element={<CoffeeShops />} />
        <Route path="/profile" element={<UserProfile user={user} />} />
        <Route path="/coffee-types" element={<CoffeeTypes />} />
        <Route path="/about" element={<About />} />
        <Route path="/coffee-quiz" element={<CoffeeQuiz />} />
        <Route path="/biography" element={<Biography />} />
      </Routes>
    </Router>
  );
}

export default App;
