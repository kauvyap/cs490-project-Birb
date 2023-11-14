const Task = require('../models/tasksModel');
const mongoose = require('mongoose');


// gets a single task from database
const getTasks = async (req, res) => {
    const username = req.params.id;

    Task.findOne({username: username}) 
    .then(dbUser => res.json({
        username: dbUser.username,
        topTasks: dbUser.topTasks,
        importantTasks: dbUser.importantTasks,
        otherTasks: dbUser.otherTasks,
    }))
    .catch(err => res.json({
        username: "User Not Found",
    }))
};

const createTasks = async (req, res) => {
    const username = req.body.username
    const topTasks = [null]
    const importantTasks = [null]
    const otherTasks = [null]

    try {
        const task = await Task.create({ username:username, topTasks: topTasks, importantTasks: importantTasks, otherTasks: otherTasks });
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};


// inserts a task into the database
const updateTasks = async (req, res) => {
    const username = req.params.id
    taskUpdated = {username:username, topTasks: req.body.topTasks, importantTasks: req.body.importantTasks, otherTasks: req.body.otherTasks}
    const user = await Task.findOneAndUpdate({username: username}, taskUpdated);

    if (!user) {
        return res.status(400).json({error: 'No such user'});
    }
            
    res.status(200).json(user)
};

// delete a user from the database
const deleteUserTasks = async (req, res) => {
    const username = req.params.id

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
    createTasks,
    updateTasks,
    deleteUserTasks,
};