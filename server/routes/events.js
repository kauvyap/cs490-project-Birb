const express = require("express");
 
const {
    createTokens,
    getAccessToken,
    getEvents
} = require('../controllers/eventsController');

const eventsRoutes = express.Router();


// GET a user's records
eventsRoutes.put('/', createTokens);
eventsRoutes.get('/:id', getAccessToken);
eventsRoutes.post('/calendar/:id', getEvents);




 
module.exports = eventsRoutes;