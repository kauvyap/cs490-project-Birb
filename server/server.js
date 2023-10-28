require("dotenv").config({ path: "./config.env" });

const express = require("express");
const session = require('express-session');
const passport = require('./auth');
const mongoose = require("mongoose");
const cors = require("cors");
const recordRoutes = require("./routes/record");
const authRoutes = require('./routes/authRoutes');
require('./auth');

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

const app = express();

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,
  optionSuccessStatus:200,
}

app.use(cors(corsOptions));

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  console.log(req.path, req.method);
  next();
})

// Set up express-session middleware
app.use(session({
  secret: 'ec5bfb9ee016fa58e352a2fd1e91565f4a0fb5d30d52a59166c7fc74c120036d',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/records', recordRoutes);
app.use('/auth', authRoutes);
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { successRedirect: 'http://localhost:3000/home', failureRedirect: '/' }),
  (req, res) => {
    const redirectUrl = req.headers.referer || 'http://localhost:3000';
    res.redirect(redirectUrl);
  }
);


mongoose.connect(process.env.ATLAS_URI, {
  dbName: 'crush-it'
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log('Listening for requests on port', process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
