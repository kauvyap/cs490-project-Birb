const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const picSchema = new Schema({
    username: String,
    picture: String
}, {collection: 'pic'})

module.exports = mongoose.model('Pic', picSchema);