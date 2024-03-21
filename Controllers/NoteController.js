const Note = require('../Models/NoteModel.js');

// Add note
const addNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNote = new Note({ title, content });
    await newNote.save();
    return res.status(201).json(newNote);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  addNote
};