const NoteModel = require('../Models/NoteModel');
const NoteController = require('../Controllers/NoteController');

jest.mock('../Models/NoteModel');

describe('NoteController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /notes', () => {
    test('should create a new note', async () => {
      const req = { body: { title: 'New Note', content: 'New Content' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      NoteModel.mockReturnValueOnce({ save: jest.fn().mockResolvedValueOnce({ _id: 'mock-id', ...req.body }) });

      await NoteController.addNote(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ _id: 'mock-id', ...req.body });
    });

    test('should return 400 if note creation fails', async () => {
      const req = { body: { title: 'Invalid Note' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      NoteModel.mockReturnValueOnce({ save: jest.fn().mockImplementationOnce(() => { throw new Error('Invalid data'); }) });

      await NoteController.addNote(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid data' });
    });
  });

  describe('GET /notes', () => {
    test('should return all notes', async () => {
      const mockNotes = [{ _id: 'mock-id-1', title: 'Note 1', content: 'Content 1' }];
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      NoteModel.find.mockResolvedValueOnce(mockNotes);

      await NoteController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ notes: mockNotes });
    });

    test('should return 400 if fetching notes fails', async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      NoteModel.find.mockRejectedValueOnce(new Error('Failed to fetch notes'));

      await NoteController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch notes' });
    });
  });

  describe('PUT /notes/:id', () => {
    test('should update a note', async () => {
      const req = { params: { id: 'mock-id' }, body: { title: 'Updated Note', content: 'Updated Content' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      NoteModel.findByIdAndUpdate.mockResolvedValueOnce({ _id: 'mock-id', ...req.body });

      await NoteController.updateNote(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ data: { _id: 'mock-id', ...req.body } });
    });

    test('should return 404 if note is not found', async () => {
      const req = { params: { id: 'invalid-id' }, body: { title: 'Updated Note', content: 'Updated Content' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      NoteModel.findByIdAndUpdate.mockResolvedValueOnce(null);

      await NoteController.updateNote(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Note not found' });
    });

    test('should return 500 if update fails', async () => {
      const req = { params: { id: 'invalid-id' }, body: { title: 'Updated Note', content: 'Updated Content' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      NoteModel.findByIdAndUpdate.mockRejectedValueOnce(new Error('Failed to update note'));

      await NoteController.updateNote(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred' });
    });
  });

  describe('DELETE /notes/:id', () => {
    test('should delete a note', async () => {
      const req = { params: { id: 'mock-id' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      NoteModel.findByIdAndDelete.mockResolvedValueOnce({ _id: 'mock-id', title: 'Deleted Note', content: 'Deleted Content' });

      await NoteController.deleteNote(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Note deleted successfully' });
    });

    test('should return 404 if note is not found', async () => {
      const req = { params: { id: 'invalid-id' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      NoteModel.findByIdAndDelete.mockResolvedValueOnce(null);

      await NoteController.deleteNote(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Note not found' });
    });

    test('should return 500 if delete fails', async () => {
      const req = { params: { id: 'invalid-id' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      NoteModel.findByIdAndDelete.mockRejectedValueOnce(new Error('Failed to delete note'));

      await NoteController.deleteNote(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred' });
    });
  });
});