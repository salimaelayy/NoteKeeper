const NoteModel = require('../Models/NoteModel')


const getById = async (req, res, next) => {
    try {
      //get id
      const noteId = req.params.id
      //verify that server got the id
      console.log('Received request with ID:', noteId)
      const note = await NoteModel.findById(noteId)
      if (!note) {
        res.status(404).json({ error: 'permission not found' })
        return
      }
  
      res.json({ data: note })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'An error occurred' })
    }
  }

// Add note
const addNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNote = new NoteModel({ title, content });
    await newNote.save();
    return res.status(201).json(newNote);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};


const getAll = async (req, res) => {
  try {
    const notes = await NoteModel.find()
    return res.status(201).json({ notes })
  } catch (error) {
    return res.status(400).json({ error: error })
  }
}

//update
const updateNote = async (req, res) => {
  const { title, content } = req.body;
  const noteId = req.params.id;
  try {
      const updatedNote = await NoteModel.findByIdAndUpdate(noteId, { title, content }, { new: true });
      if (!updatedNote) {
          return res.status(404).send({ message: 'Note not found' });
      }
      res.status(200).json({ data: updatedNote });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
  }
};
const deleteNote = async (req, res) => {
  const noteId = req.params.id;
  try {
    const result = await NoteModel.findByIdAndDelete(noteId);
    if (!result) {
      return res.status(404).send({ message: 'Note not found' });
    }
    res.status(200).send({ message: 'Note deleted successfully' });
  } catch (e) {
    console.log('Error:', e);
    res.status(500).send('Server error');
  }
};


module.exports = {
  addNote,
  getById,
  getAll,
  updateNote,
  deleteNote
};