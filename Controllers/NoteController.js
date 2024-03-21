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

module.exports = {
  addNote,
  getById,
  getAll
  
};