const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subTaskSchema = new Schema({
    dateAssigned: String,
    title: String,
    description: String,
    pomodoroTimers: String,
    priority: String,
    status: String
})

const taskSchema = new Schema({
    "email": String,
    "order": [Number],
    "tasks": [subTaskSchema]
}, {collection: 'task'})

module.exports = mongoose.model('Task', taskSchema);