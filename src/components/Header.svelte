<script lang="ts">
  import { Search, Moon, Sun, Plus } from 'lucide-svelte';
  import { theme, toggleTheme } from '../stores/theme';
  import { notesStore } from '../stores/notes';
  
  export let searchQuery = '';
  export let onCreateNote: () => void;
  
  function handleSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    searchQuery = target.value;
    notesStore.setSearchQuery(searchQuery);
  }
</script>

<header class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
  <div class="max-w-4xl mx-auto px-4 py-4">
    <div class="flex items-center justify-between gap-4">
      <!-- Logo/Title -->
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-sm">N</span>
        </div>
        <h1 class="text-xl font-bold text-gray-900 dark:text-white">Notes</h1>
      </div>
      
      <!-- Search Bar -->
      <div class="flex-1 max-w-md relative">
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          on:input={handleSearch}
          class="input-field pl-10 h-10"
        />
      </div>
      
      <!-- Actions -->
      <div class="flex items-center gap-2">
        <!-- Create Note Button -->
        <button
          on:click={onCreateNote}
          class="btn-primary flex items-center gap-2 h-10"
          aria-label="Create new note"
        >
          <Plus class="w-4 h-4" />
          <span class="hidden sm:inline">New Note</span>
        </button>
        
        <!-- Theme Toggle -->
        <button
          on:click={toggleTheme}
          class="btn-secondary p-2 h-10 w-10 flex items-center justify-center"
          aria-label="Toggle theme"
        >
          {#if $theme === 'light'}
            <Moon class="w-4 h-4" />
          {:else}
            <Sun class="w-4 h-4" />
          {/if}
        </button>
      </div>
    </div>
  </div>
</header>