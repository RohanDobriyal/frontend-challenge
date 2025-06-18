import { writable, derived } from 'svelte/store';
import type { NotesState, Note } from '../types';
import { NotesAPI } from '../services/api';

// Create the main notes store
function createNotesStore() {
  const { subscribe, set, update } = writable<NotesState>({
    notes: [],
    loading: false,
    error: null,
    searchQuery: '',
  });

  return {
    subscribe,
    
    // Load all notes
    async loadNotes() {
      update(state => ({ ...state, loading: true, error: null }));
      
      try {
        const notes = await NotesAPI.getAllNotes();
        update(state => ({ ...state, notes, loading: false }));
      } catch (error) {
        update(state => ({ 
          ...state, 
          loading: false, 
          error: error instanceof Error ? error.message : 'Failed to load notes' 
        }));
      }
    },

    // Create a new note
    async createNote(title: string, content: string) {
      update(state => ({ ...state, loading: true, error: null }));
      
      try {
        const newNote = await NotesAPI.createNote({ title, content });
        update(state => ({ 
          ...state, 
          notes: [newNote, ...state.notes], 
          loading: false 
        }));
        return newNote;
      } catch (error) {
        update(state => ({ 
          ...state, 
          loading: false, 
          error: error instanceof Error ? error.message : 'Failed to create note' 
        }));
        throw error;
      }
    },

    // Update an existing note
    async updateNote(id: string, title: string, content: string) {
      update(state => ({ ...state, loading: true, error: null }));
      
      try {
        const updatedNote = await NotesAPI.updateNote(id, { title, content });
        update(state => ({
          ...state,
          notes: state.notes.map(note => note.id === id ? updatedNote : note),
          loading: false
        }));
        return updatedNote;
      } catch (error) {
        update(state => ({ 
          ...state, 
          loading: false, 
          error: error instanceof Error ? error.message : 'Failed to update note' 
        }));
        throw error;
      }
    },

    // Delete a note
    async deleteNote(id: string) {
      update(state => ({ ...state, loading: true, error: null }));
      
      try {
        await NotesAPI.deleteNote(id);
        update(state => ({
          ...state,
          notes: state.notes.filter(note => note.id !== id),
          loading: false
        }));
      } catch (error) {
        update(state => ({ 
          ...state, 
          loading: false, 
          error: error instanceof Error ? error.message : 'Failed to delete note' 
        }));
        throw error;
      }
    },

    // Update search query
    setSearchQuery(query: string) {
      update(state => ({ ...state, searchQuery: query }));
    },

    // Clear error
    clearError() {
      update(state => ({ ...state, error: null }));
    }
  };
}

export const notesStore = createNotesStore();

// Derived store for filtered notes based on search query
export const filteredNotes = derived(
  notesStore,
  ($notesStore) => {
    if (!$notesStore.searchQuery.trim()) {
      return $notesStore.notes;
    }
    
    const query = $notesStore.searchQuery.toLowerCase().trim();
    return $notesStore.notes.filter(note =>
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    );
  }
);