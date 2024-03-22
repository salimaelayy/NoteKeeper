const express = require('express');
const router = express.Router();
const NoteController = require('../Controllers/NoteController');

router.get('/:id', NoteController.getById);
router.post('/add', NoteController.addNote);
router.get('/all', NoteController.getAll);
router.put('/:id', NoteController.updateNote);
router.delete('/:id', NoteController.deleteNote);
module.exports = router;

