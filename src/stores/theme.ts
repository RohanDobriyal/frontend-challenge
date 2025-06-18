import { writable } from 'svelte/store';

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined';

// Initialize theme from localStorage or system preference
function getInitialTheme(): 'light' | 'dark' {
  if (!isBrowser) return 'light';
  
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export const theme = writable<'light' | 'dark'>(getInitialTheme());

// Update localStorage and document class when theme changes
theme.subscribe((value) => {
  if (!isBrowser) return;
  
  localStorage.setItem('theme', value);
  
  if (value === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

export function toggleTheme() {
  theme.update(current => current === 'light' ? 'dark' : 'light');
}