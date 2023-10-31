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
    const username = req.params.id;

    User.findOne({username: username}) 
    .then(dbUser => res.json({
        username: dbUser.username,
        password: dbUser.password,
        fname: dbUser.fname,
        lname: dbUser.lname,
        pomodoro: dbUser.pomodoro
    }))
    .catch(err => res.json({
        username: "User Not Found",
        fname: "",
        lname: ""
    }))
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
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const updateUser = {username: req.body.username, password: hashPassword, fname: req.body.fname, lname: req.body.lname, pomodoro: req.body.pomodoro};

    const username = req.params.id

        
    const user = await User.findOneAndUpdate({username: username}, {
        ...updateUser
    })
    
    if (!user) {
        return res.status(400).json({error: 'No such user'});
    }
            
    res.status(200).json(user)
};

const updateOnlyUser = async (req, res) => {
    // const salt = await bcrypt.genSalt(10);
    // const hashpassword = await bcrypt.hash(req.body.password, salt);
    const updateUser = {username: req.body.username, fname: req.body.fname, lname: req.body.lname, pomodoro: req.body.pomodoro};

    const username = req.params.id

        
    const user = await User.findOneAndUpdate({username: username}, {
        ...updateUser
    })
    
    if (!user) {
        return res.status(400).json({error: 'No such user'});
    }
            
    res.status(200).json(user)
};

// const patchPassword = async (req, res) => {
//     const username = req.params.id;

//     User.findOne({username: username}) 
//     .then(dbUser => {
//         dbUser.password = req.body.password
//         res.json({Passwordchanged: true})
//     })
//     .catch(err => res.json({
//         username: "Username Not Found",
//     }))
// }

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    updateOnlyUser
};