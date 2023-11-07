const express = require("express");
 
const {
    getTasks,
    updateTask,
    deleteUserTask
} = require('../controllers/taskController');

const taskRoutes = express.Router();


// GET a user's records
taskRoutes.get('/:id', getTasks);

// Update a user's record
taskRoutes.put('/:id', updateTask);

// DELETE a user'srecord
taskRoutes.delete('/:id', deleteUserTask);


 
module.exports = taskRoutes;