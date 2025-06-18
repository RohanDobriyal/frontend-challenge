<script lang="ts">
  import { onMount } from 'svelte';
  import { FileText, Search as SearchIcon } from 'lucide-svelte';
  import { notesStore, filteredNotes } from '../stores/notes';
  import NoteItem from './NoteItem.svelte';
  import type { Note } from '../types';
  
  export let onEditNote: (note: Note) => void;
  
  // Load notes on component mount
  onMount(() => {
    notesStore.loadNotes();
  });
  
  async function handleDeleteNote(noteId: string) {
    try {
      await notesStore.deleteNote(noteId);
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  }
  
  function handleEditNote(note: Note) {
    onEditNote(note);
  }
</script>

<main class="max-w-4xl mx-auto px-4 py-8">
  {#if $notesStore.loading}
    <!-- Loading State -->
    <div class="flex items-center justify-center py-12">
      <div class="text-center">
        <div class="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p class="text-gray-600 dark:text-gray-400">Loading notes...</p>
      </div>
    </div>
  {:else if $notesStore.error}
    <!-- Error State -->
    <div class="card p-6 text-center">
      <div class="text-red-500 mb-2">
        <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Error Loading Notes</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-4">{$notesStore.error}</p>
      <button
        on:click={() => notesStore.loadNotes()}
        class="btn-primary"
      >
        Try Again
      </button>
    </div>
  {:else if $filteredNotes.length === 0}
    <!-- Empty State -->
    <div class="text-center py-12">
      {#if $notesStore.searchQuery}
        <!-- No Search Results -->
        <div class="text-gray-400 mb-4">
          <SearchIcon class="w-16 h-16 mx-auto" />
        </div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No notes found
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          No notes match your search for "{$notesStore.searchQuery}"
        </p>
        <button
          on:click={() => notesStore.setSearchQuery('')}
          class="btn-secondary"
        >
          Clear Search
        </button>
      {:else}
        <!-- No Notes -->
        <div class="text-gray-400 mb-4">
          <FileText class="w-16 h-16 mx-auto" />
        </div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No notes yet
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Create your first note to get started
        </p>
      {/if}
    </div>
  {:else}
    <!-- Notes Grid -->
    <div class="space-y-4">
      {#if $notesStore.searchQuery}
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Found {$filteredNotes.length} note{$filteredNotes.length === 1 ? '' : 's'} for "{$notesStore.searchQuery}"
        </div>
      {/if}
      
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {#each $filteredNotes as note (note.id)}
          <NoteItem 
            {note} 
            on:edit={(e) => handleEditNote(e.detail)}
            on:delete={(e) => handleDeleteNote(e.detail)}
          />
        {/each}
      </div>
    </div>
  {/if}
</main>