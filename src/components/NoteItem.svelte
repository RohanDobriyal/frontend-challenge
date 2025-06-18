<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { CreditCard as Edit3, Trash2, Calendar } from 'lucide-svelte';
  import type { Note } from '../types';
  
  const dispatch = createEventDispatcher<{
    edit: Note;
    delete: string;
  }>();
  
  export let note: Note;
  
  function handleEdit() {
    dispatch('edit', note);
  }
  
  function handleDelete() {
    if (confirm(`Are you sure you want to delete "${note.title}"?`)) {
      dispatch('delete', note.id);
    }
  }
  
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return minutes <= 0 ? 'Just now' : `${minutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    }
  }
  
  function truncateContent(content: string, maxLength: number = 150) {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  }
</script>

<article class="card p-6 hover:shadow-md transition-all duration-200 group">
  <!-- Header -->
  <div class="flex items-start justify-between gap-4 mb-3">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1">
      {note.title}
    </h3>
    
    <!-- Actions -->
    <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <button
        on:click={handleEdit}
        class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        aria-label="Edit note"
        title="Edit note"
      >
        <Edit3 class="w-4 h-4 text-gray-500 hover:text-blue-600" />
      </button>
      
      <button
        on:click={handleDelete}
        class="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        aria-label="Delete note"
        title="Delete note"
      >
        <Trash2 class="w-4 h-4 text-gray-500 hover:text-red-600" />
      </button>
    </div>
  </div>
  
  <!-- Content -->
  <div class="mb-4">
    <p class="text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
      {truncateContent(note.content)}
    </p>
  </div>
  
  <!-- Footer -->
  <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
    <Calendar class="w-3 h-3" />
    <time datetime={note.updatedAt} title={new Date(note.updatedAt).toLocaleString()}>
      {formatDate(note.updatedAt)}
    </time>
    {#if note.updatedAt !== note.createdAt}
      <span class="text-xs">• edited</span>
    {/if}
  </div>
</article>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>