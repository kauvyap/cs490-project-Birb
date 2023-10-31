const express = require("express");
 
const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  updateOnlyUser
} = require('../controllers/userController');

const userRoutes = express.Router();


// GET all records
userRoutes.get('/', getUsers);

// GET a single record
userRoutes.get('/:id', getUser);

// POST a new record
userRoutes.post('/', createUser);

// DELETE a record
userRoutes.delete('/:id', deleteUser);

// UPDATE a record
userRoutes.put('/password/:id', updateUser);

userRoutes.put('/:id', updateOnlyUser);

// userRoutes.patch('/:id', updateUser);


 
module.exports = userRoutes;