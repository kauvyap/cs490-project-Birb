const express = require("express");
 
const {
    getTasks,
    createTasks,
    updateTasks,
    deleteUserTasks
} = require('../controllers/tasksController');

const tasksRoutes = express.Router();


// GET a user's records
tasksRoutes.get('/:id', getTasks);

// Update a user's record
tasksRoutes.post('/', createTasks);

// Update a user's record
tasksRoutes.put('/:id', updateTasks);

// DELETE a user'srecord
tasksRoutes.delete('/:id', deleteUserTasks);



 
module.exports = tasksRoutes;