const express = require('express');
const router = express.Router();
const NoteController = require('../Controllers/NoteController');

router.get('/:id', NoteController.getById);

router.post('/add', addNote);


module.exports = router;

