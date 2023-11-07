const express = require("express");
 
const {
    getTasks,
    updateTask,
    deleteUserTask
} = require('../controllers/taskController');

const userRoutes = express.Router();


// GET a user's records
userRoutes.get('/:id', getTasks);

// Update a user's record
userRoutes.put('/:id', updateTask);

// DELETE a user'srecord
userRoutes.delete('/:id', deleteUserTask);






 
module.exports = taskRoutes;