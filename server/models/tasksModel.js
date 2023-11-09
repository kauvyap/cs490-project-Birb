const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subTasksSchema = new Schema({
    dateAssigned: String,
    title: String,
    description: String,
    priority: String,
    pomodoroTimers: Number,
    status: String
})

const tasksSchema = new Schema({
    "username": String,
    "topTasks": [subTasksSchema],
    "importantTasks": [subTasksSchema],
    "otherTasks": [subTasksSchema]
}, {collection: 'tasks'})

module.exports = mongoose.model('Tasks', tasksSchema);