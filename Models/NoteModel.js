const mongoose = require('mongoose');
const defaultInspect = require('util').inspect;
const inspect = require('util').inspect;
inspect = inspect ? inspect : defaultInspect;
const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
  },
  date: {                                                                                                                                                                                                     
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model("Note", NoteSchema);
