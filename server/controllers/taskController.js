const Task = require('../models/taskModel');
const mongoose = require('mongoose');


// gets a single task from database
const getTasks = async (req, res) => {
    const username = req.params.id;

    Task.findOne({username: username}) 
    .then(dbUser => res.json({
        username: dbUser.username,
        order: dbUser.order,
        tasks: dbUser.tasks,
    }))
    .catch(err => res.json({
        username: "User Not Found",
    }))
};


// inserts a task into the database
const updateTask = async (req, res) => {
    const username = req.body.username
    taskUpdated = {username:username, order: req.body.order, tasks: req.body.tasks}
    Task.findOneAndUpdate({username: username}, taskUpdated);

    try {
        const task = await Task.create({ username: username, password: hashpassword, fname: fname, lname: lname, pomodoro: pomodoro });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

// delete a user from the database
const deleteUserTask = async (req, res) => {
    const username = req.params.username

    if (!mongoose.Types.ObjectId.isValid(username)) {
        return res.status(404).json({ error: 'No such user' });
    }

    const user = await Task.findOneAndDelete({username: username});

    if (!user) {
        return res.status(404).json({ error: 'No such user' });
    }

    res.status(200).json(user);
};



module.exports = {
    getTasks,
    updateTask,
    deleteUserTask,
};