const express = require("express");
 
const {
    createPic,
    updatePic,
    getPic
} = require('../controllers/picController');

const picRoutes = express.Router();


picRoutes.post('/', createPic);
picRoutes.put('/:id', updatePic);
picRoutes.get('/:id', getPic);



module.exports = picRoutes;