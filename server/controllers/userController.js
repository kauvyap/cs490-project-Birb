const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');

// gets all Users from database
const getUsers = async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
};

// gets a single user from database
const getUser = async (req, res) => {
    const { id } = req.params;

    // if user not found in database, return error
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ error: 'No such user' });
    }

    res.status(200).json(user);
};


// inserts a user into the database
const createUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);
    console.log()
    const username = req.body.username
    const fname= req.body.fname
    const lname = req.body.lname
    const pomodoro = req.body.pomodoro;

    try {
        const user = await User.create({ username: username, password: hashpassword, fname: fname, lname: lname, pomodoro: pomodoro });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

// delete a user from the database
const deleteUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' });
    }

    const user = await User.findOneAndDelete({_id: id});

    if (!user) {
        return res.status(404).json({ error: 'No such user' });
    }

    res.status(200).json(user);
};

// update a user from the database
const updateUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);
    const updateUser = {username: req.body.username, password: hashpassword, fname: req.body.fname, lname: req.body.lname, pomodoro: req.body.pomodoro};

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error: 'No such user'});
        }
        
        const user = await User.findOneAndUpdate({_id: id}, {
            ...updateUser
        })
        
        if (!user) {
            return res.status(400).json({error: 'No such user'});
        }
            
        res.status(200).json(user)
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
};