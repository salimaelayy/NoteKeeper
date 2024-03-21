const express = require('express');
const router = express.Router();
const NoteController = require('../Controllers/NoteController');

router.get('/:id', NoteController.getById);

router.post('/add', NoteController.addNote);


module.exports = router;

