const NoteModel = require('../Models/Note')


const readbyid = async (req, res, next) => {
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