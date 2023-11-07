const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subUserSchema = new Schema({
    timer: Number,
    short: Number,
    long: Number
})

const userSchema = new Schema({
    username: String,
    password: String,
    fname: String,
    lname: String,
    pomodoro: subUserSchema

}, {collection: 'user'})

module.exports = mongoose.model('User', userSchema);