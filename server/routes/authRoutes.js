const express = require('express');
const passport = require('passport');

const router = express.Router();

// Route to initiate Google OAuth authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route after successful Google OAuth authentication
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to the frontend or handle as needed
    res.redirect('http://localhost:3000'); // Update with your frontend URL
  });

module.exports = router;
