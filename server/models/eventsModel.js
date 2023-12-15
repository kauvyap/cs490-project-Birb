const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const eventsSchema = new Schema({
    username: String,
    access_token: String,
}, {collection: 'events'})

module.exports = mongoose.model('Events', eventsSchema);