import { Note } from "../model/note.js";
export class NoteService {
  Add = (note) => {
    const repository = new Note({
      title,
      note,
    });
    return repository.save();
  };

  update = async (id, item) => {
    const result = await Task.findByIdAndUpdate({ _id: id }, item);
    if (result) return this.getOne(id);
    return null;
  };

  delete = (id) => Note.findByIdAndDelete({ _id: id });

  getOne = (id) => Note.findOne({ _id: id });

  getAll = (page = 1, limit = 10, filter) => {
    if (page <= 0) page = 1;
    if (limit <= 0) limit = 10;
    const flt = {};
    if (filter) {
      if (typeof filter == "string") {
        const filters = `${filter}`.split("__");
        flt[filter[0]] = filters[1];
      } else {
        [...filter].forEach((item) => {
          const filters = `${item}`.split("__");
          flt[filter[0]] = filters[1];
        });
      }
    }
    return Note.find(flt, {}, { limit, skip: (page - 1) * limit });
  };
}
