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
<<<<<<< HEAD
userRoutes.delete('/:id', deleteUserTask);

=======
taskRoutes.delete('/:id', deleteUserTask);
>>>>>>> f9c315140dd3b23500b67552bc7d25f0485d73fe


 
module.exports = taskRoutes;