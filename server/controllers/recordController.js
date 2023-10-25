const Record = require('../models/recordModel');
const mongoose = require('mongoose');

// gets all records from database
const getRecords = async (req, res) => {
    const records = await Record.find({});
    res.status(200).json(records);
};

// gets a single record from database
const getRecord = async (req, res) => {
    const { id } = req.params;

    // if record not found in database, return error
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such record' });
    }

    const record = await Record.findById(id);

    if (!record) {
        return res.status(404).json({ error: 'No such record' });
    }

    res.status(200).json(record);
};

// inserts a record into the database
const createRecord = async (req, res) => {
    const {name, position, level} = req.body;

    try {
        const record = await Record.create({ name, position, level });
        res.status(200).json(record);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

// delete a record from the database
const deleteRecord = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such record' });
    }

    const record = await Record.findOneAndDelete({_id: id});

    if (!record) {
        return res.status(404).json({ error: 'No such record' });
    }

    res.status(200).json(record);
};

// update a record from the database
const updateRecord = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error: 'No such record'})
        }
        
        const record = await Record.findOneAndUpdate({_id: id}, {
            ...req.body
        })
        
        if (!record) {
            return res.status(400).json({error: 'No such record'})
        }
            
        res.status(200).json(record)
};

module.exports = {
    getRecords,
    getRecord,
    createRecord,
    deleteRecord,
    updateRecord
};