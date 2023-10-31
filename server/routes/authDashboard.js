const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const verify = require("./authVerify");

const router = require("express").Router();

router.get("/getUsername", verify, (req, res) => {
    return res.json({isLoggedIn: true, username: req.user.username});
})

// router.get("/allusers", verify, async (req, res) => {
//     try {
//         const results = await User.find().exec();
//         res.send(results);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

module.exports = router;