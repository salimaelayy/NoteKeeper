import { NoteService } from "../services/note.service.js";
export class NoteController {
  constructor() {
    this.noteService = new NoteService();
  }

  Add = (recep) => this.noteService.Add(recep);

  update = (id, item) => this.noteService.update(id, item);

  getOne = (id) => this.noteService.getOne(id);

  delete = (id) => this.taskService.delete(id);

  getAll = (page, limit, filter) =>
    this.noteService.getAll(page, limit, filter);
}
