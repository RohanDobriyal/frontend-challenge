<script lang="ts">
  import { onMount } from 'svelte';
  import { theme } from './stores/theme';
  import { notesStore } from './stores/notes';
  import Header from './components/Header.svelte';
  import NotesList from './components/NotesList.svelte';
  import CreateNoteModal from './components/CreateNoteModal.svelte';
  import EditNoteModal from './components/EditNoteModal.svelte';
  import type { Note } from './types';
  
  let searchQuery = '';
  let showCreateModal = false;
  let showEditModal = false;
  let editingNote: Note | null = null;
  
  // Initialize theme on mount
  onMount(() => {
    // Apply initial theme
    if ($theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  });
  
  function handleCreateNote() {
    showCreateModal = true;
  }
  
  async function handleCreateNoteSubmit(event: CustomEvent<{ title: string; content: string }>) {
    try {
      await notesStore.createNote(event.detail.title, event.detail.content);
      showCreateModal = false;
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  }
  
  function handleCreateNoteClose() {
    showCreateModal = false;
  }
  
  function handleEditNote(note: Note) {
    editingNote = note;
    showEditModal = true;
  }
  
  async function handleEditNoteSubmit(event: CustomEvent<{ id: string; title: string; content: string }>) {
    try {
      await notesStore.updateNote(event.detail.id, event.detail.title, event.detail.content);
      showEditModal = false;
      editingNote = null;
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  }
  
  function handleEditNoteClose() {
    showEditModal = false;
    editingNote = null;
  }
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
  <!-- Header -->
  <Header 
    bind:searchQuery 
    onCreateNote={handleCreateNote}
  />
  
  <!-- Main Content -->
  <NotesList onEditNote={handleEditNote} />
  
  <!-- Modals -->
  <CreateNoteModal 
    isOpen={showCreateModal}
    on:create={handleCreateNoteSubmit}
    on:close={handleCreateNoteClose}
  />
  
  <EditNoteModal 
    isOpen={showEditModal}
    note={editingNote}
    on:update={handleEditNoteSubmit}
    on:close={handleEditNoteClose}
  />
</div>