const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

const Joi = require("@hapi/joi");

const registerSchema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required()
});

router.post("/register", async (req, res) => {
    const usernameExist = await User.findOne({username: req.body.username});
    if (usernameExist) {
        res.status(400).send("Email already exists");
        return;
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        password: hashedPassword,
        fname: "First Name",
        lname: "Last Name",
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
    const user = await User.findOne({ username: req.body.username});
    if (!user) return res.status(400).send("Incorrect Username");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Incorrect Password");

    try {
        const {error} = await registerSchema.validateAsync(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        else {
            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
            res.header("auth-token", token).send(token);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;