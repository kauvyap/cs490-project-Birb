const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recordSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Record', recordSchema);