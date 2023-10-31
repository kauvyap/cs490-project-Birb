const express = require("express");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyJWT = require("./verifyJWT");

const Joi = require("@hapi/joi");

router.get("/getUsername", (req, res) => {
    const token = req.headers["x-access-token"].split(' ')[1]
    if (token !== '') {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.json({isLoggedIn: false, message: "Failed to Authenticate"})
            }
            req.user = {};
            req.user.id = decoded.id;
            req.user.username = decoded.username;
            return res.json({isLoggedIn: true, username: req.user.username});
        })
    }
    else {
        res.json({message: "Incorrect Token Given", isLoggedIn: false});
    }
})


const pomodoroSchema = Joi.object({
    timer: Joi.number(),
    short: Joi.number(), 
    long: Joi.number()
})

const registerSchema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
    fname: Joi.string(),
    lname: Joi.string(),
    pomodoro: pomodoroSchema
});

router.post("/register", async (req, res) => {
    const usernameExist = await User.findOne({username: req.body.username});
    if (usernameExist) {
        res.status(400).json({error: "Username already exists"});
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        password: hashedPassword,
        fname: req.body.fname,
        lname: req.body.lname,
        pomodoro: {timer: req.body.pomodoro.timer, short: req.body.pomodoro.short, long: req.body.pomodoro.long}
    })

    try {
        const {error} = await registerSchema.validateAsync(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }
        else {
            const saveUser = await user.save();
            res.status(200).send("user created");
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});



const loginSchema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required()
})

router.post("/login", async (req, res) => {

    if (!req.body) return res.status(404).json({error: "Username does not exist"});

    // const validationError = loginSchema.validate(req.body).error;

    // if (validationError) {
    //     return res.status(404).json({error: "Username does not exist"});
    // } else {
    return User.findOne({ username: req.body.username})
    .then(dbUser => {
        if (!dbUser) {
            return res.status(404).json({error: "Username does not exist"});
        } else {
            bcrypt.compare(req.body.password, dbUser.password)
            .then(isCorrect => {
                if (isCorrect) {
                    const payload = {
                        id: dbUser._id,
                        username: dbUser.username,
                    }
                    jwt.sign(
                        payload,
                        process.env.TOKEN_SECRET,
                        {expiresIn: 86400},
                        (err, token) => {
                            return res.json({message: "Success", token: "Bearer " + token})
                        }
                    )
                } else {
                    return res.status(400).json({error: "Invalid Password"});
                }
            })
        }
    })
    
})

module.exports = router;