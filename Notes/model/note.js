import mongoose, { model } from "mongoose";

const { Schema } = mongoose;
const noteSchema = new Schema({
  id: mongoose.ObjectId,
  title: {
    require: true,
    type: String,
  },
  note: {
    require: true,
    type: String,
  },
});
export const Note = mongoose.model("Note", noteSchema, "Notes");
