const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subTasksSchema = new Schema({
    dateAssigned: String,
    title: String,
    description: String,
    pomodoroTimers: String,
    priority: String,
    status: String
})

const tasksSchema = new Schema({
    "email": String,
    "topTasks": [subTasksSchema],
    "importantTasks": [subTasksSchema],
    "otherTasks": [subTasksSchema]
}, {collection: 'task'})

module.exports = mongoose.model('Tasks', tasksSchema);