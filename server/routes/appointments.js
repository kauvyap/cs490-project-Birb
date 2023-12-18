const express = require("express");
 
const {
    getAppointments,
    createAppointments,
    updateAppointments,
    updateIsPlanned
} = require('../controllers/appointmentsController');

const appointmentsRoutes = express.Router();

appointmentsRoutes.get('/:id', getAppointments);
appointmentsRoutes.post('/', createAppointments);
appointmentsRoutes.put('/:id', updateAppointments);
appointmentsRoutes.put('/isPlanned/:id', updateIsPlanned);

 
module.exports = appointmentsRoutes;