<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { X } from 'lucide-svelte';
  
  const dispatch = createEventDispatcher<{
    close: void;
    create: { title: string; content: string };
  }>();
  
  export let isOpen = false;
  
  let title = '';
  let content = '';
  let isSubmitting = false;
  
  function handleSubmit() {
    if (!title.trim() || !content.trim()) return;
    
    isSubmitting = true;
    dispatch('create', { title: title.trim(), content: content.trim() });
  }
  
  function handleClose() {
    title = '';
    content = '';
    isSubmitting = false;
    dispatch('close');
  }
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      handleClose();
    }
  }
  
  // Focus title input when modal opens
  let titleInput: HTMLInputElement;
  $: if (isOpen && titleInput) {
    setTimeout(() => titleInput.focus(), 100);
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
  <!-- Backdrop -->
  <div 
    class="fixed inset-0 bg-black/50 z-50 animate-fade-in"
    on:click={handleClose}
    on:keydown={(e) => e.key === 'Enter' && handleClose()}
    role="button"
    tabindex="0"
    aria-label="Close modal"
  ></div>
  
  <!-- Modal -->
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="card w-full max-w-2xl max-h-[90vh] overflow-hidden animate-slide-up">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Create New Note</h2>
        <button
          on:click={handleClose}
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Close modal"
        >
          <X class="w-5 h-5 text-gray-500" />
        </button>
      </div>
      
      <!-- Form -->
      <form on:submit|preventDefault={handleSubmit} class="p-6 space-y-4">
        <div>
          <label for="note-title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Title
          </label>
          <input
            id="note-title"
            bind:this={titleInput}
            bind:value={title}
            type="text"
            placeholder="Enter note title..."
            class="input-field"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label for="note-content" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Content
          </label>
          <textarea
            id="note-content"
            bind:value={content}
            placeholder="Write your note content here..."
            rows="8"
            class="input-field resize-none"
            required
            disabled={isSubmitting}
          ></textarea>
        </div>
        
        <!-- Actions -->
        <div class="flex justify-end gap-3 pt-4">
          <button
            type="button"
            on:click={handleClose}
            class="btn-secondary"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            class="btn-primary min-w-[100px] flex items-center justify-center"
            disabled={!title.trim() || !content.trim() || isSubmitting}
          >
            {#if isSubmitting}
              <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            {:else}
              Create Note
            {/if}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}