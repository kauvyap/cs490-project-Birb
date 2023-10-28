// config/auth.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: '1077808714159-bcuikd9k78ofsdhhhhq6ur49evb3u4oi.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:5000/auth/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
  // Check if the user already exists in the database
  const existingUser = await User.findOne({ googleId: profile.id });

  if (existingUser) {
    // User already exists
    return done(null, existingUser);
  }

  // Create a new user in the database
  const newUser = new User({
    googleId: profile.id,
    displayName: profile.displayName,
    // Add other fields as needed
  });

  await newUser.save();

  done(null, newUser);
}));

module.exports = passport;
