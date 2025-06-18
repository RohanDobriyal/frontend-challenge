import type { Note, CreateNoteRequest, UpdateNoteRequest } from '../types';

// Mock data storage
let notesStorage: Note[] = [
  {
    id: '1',
    title: 'Welcome to Notes App',
    content: 'This is your first note! You can create, edit, and delete notes using this app. Try creating a new note or editing this one.',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '2',
    title: 'Meeting Notes - Q1 Planning',
    content: 'Discussed upcoming projects for Q1:\n- Implement new feature X\n- Optimize performance\n- User research for feature Y\n\nNext meeting: Monday 10 AM',
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '3',
    title: 'Shopping List',
    content: '• Groceries\n• Milk\n• Bread\n• Eggs\n• Apples\n• Cheese\n\n• Hardware store\n• Light bulbs\n• Screws',
    createdAt: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
    updatedAt: new Date(Date.now() - 1800000).toISOString(),
  },
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class NotesAPI {
  static async getAllNotes(): Promise<Note[]> {
    await delay(300);
    return [...notesStorage].sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  static async createNote(request: CreateNoteRequest): Promise<Note> {
    await delay(400);
    
    const newNote: Note = {
      id: Date.now().toString(),
      title: request.title,
      content: request.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    notesStorage.push(newNote);
    return newNote;
  }

  static async updateNote(id: string, request: UpdateNoteRequest): Promise<Note> {
    await delay(350);
    
    const noteIndex = notesStorage.findIndex(note => note.id === id);
    if (noteIndex === -1) {
      throw new Error('Note not found');
    }
    
    const updatedNote: Note = {
      ...notesStorage[noteIndex],
      title: request.title,
      content: request.content,
      updatedAt: new Date().toISOString(),
    };
    
    notesStorage[noteIndex] = updatedNote;
    return updatedNote;
  }

  static async deleteNote(id: string): Promise<void> {
    await delay(250);
    
    const noteIndex = notesStorage.findIndex(note => note.id === id);
    if (noteIndex === -1) {
      throw new Error('Note not found');
    }
    
    notesStorage.splice(noteIndex, 1);
  }
}