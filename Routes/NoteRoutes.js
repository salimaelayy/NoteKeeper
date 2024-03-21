const {Router} = require('express');
const { addNote } = require('../Controllers/NoteController');
const router = Router();

router.post('/add', addNote);

module.exports = router;