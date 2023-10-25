const express = require("express");
 
const {
  getRecords,
  getRecord,
  createRecord,
  deleteRecord,
  updateRecord
} = require('../controllers/recordController');

const recordRoutes = express.Router();


// GET all records
recordRoutes.get('/', getRecords);

// GET a single record
recordRoutes.get('/:id', getRecord);

// POST a new record
recordRoutes.post('/', createRecord);

// DELETE a record
recordRoutes.delete('/:id', deleteRecord);

// UPDATE a record
recordRoutes.put('/:id', updateRecord);
 
module.exports = recordRoutes;