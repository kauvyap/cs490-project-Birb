require("dotenv").config({ path: "./config.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
// const authRoute = require('./routes/auth');
// const authDashboard = require('./routes/authDashboard');

const app = express();

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  console.log(req.path, req.method);
  next();
})

// app.use('/api/auth', authRoute);

// app.use('/api/dashboard', authDashboard);

app.use('/api/user', userRoutes);



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
