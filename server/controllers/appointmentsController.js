const Appointment = require('../models/appointmentsModel');
const mongoose = require('mongoose');


const createAppointments = async (req, res) => {
    const username = req.body.username;
    const dailyAppointments = [null]

    try {
        const appointments = await Appointment.create({ username:username, dailyAppointments: dailyAppointments });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

// Update appointments for a specific username and date
const updateAppointments = async (req, res) => {
    const username = req.params.id;
    const date = req.body.date;
    const isPlanned = req.body.isPlanned;
    const updatedAppointments = req.body.updatedAppointments;

    try {
        const userAppointments = await Appointment.findOne({ username: username });
        if (!userAppointments) {
            return res.status(404).json({ error: 'User not found' });
        }

        const dailyAppointments = userAppointments.dailyAppointments;

        if (!dailyAppointments || dailyAppointments[0] === null || !Array.isArray(dailyAppointments)) {
            userAppointments.dailyAppointments = [{
                date: date,
                isPlanned: isPlanned,
                appointments: updatedAppointments,
            }]
            await userAppointments.save();
            return res.json(userAppointments);
        }
        
        // Find the subAppointmentsSchema with the specified date
        const existingAppointment = userAppointments.dailyAppointments.find(
            (appointment) => appointment.date === date
        );

        if (!existingAppointment) {
        // If the appointment for the given date doesn't exist, create a new entry
            userAppointments.dailyAppointments.push({
                date: date,
                isPlanned: isPlanned, // You may adjust this based on your requirements
                appointments: updatedAppointments,
            });
        } else {
            // If the appointment for the given date exists, update the existing entry
            existingAppointment.appointments = updatedAppointments;
        }
    
        await userAppointments.save();
        res.json(userAppointments);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateIsPlanned = async (req, res) => {
    // Update appointments for a specific username and date
    const username = req.params.id;
    const { date, isPlanned } = req.body;
  
    try {
        const userAppointments = await Appointment.findOne({ username });

        if (!userAppointments) {
            return res.status(404).json({ error: 'User not found' });
        }
        

        // Find the subAppointmentsSchema with the specified date
        const existingAppointment = userAppointments.dailyAppointments.find(
            (appointment) => appointment.date === date
        );

        if (!existingAppointment) {
            return res.status(404).json({ error: 'Appointments for the given date not found' });
        }

        // If the appointment for the given date exists, update the existing entry's isPlanned
        existingAppointment.isPlanned = isPlanned;

        await userAppointments.save();

        res.json(userAppointments);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

  

const getAppointments = async (req, res) => {
    const username = req.params.id;
    console.log(username)
    try {
        const appointmentData = await Appointment.findOne({username: username}).exec()
        res.json(appointmentData)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'User not found'})
    }
}

module.exports = {
    createAppointments,
    updateAppointments,
    updateIsPlanned,
    getAppointments
};