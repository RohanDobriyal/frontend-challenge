# Notes CRUD Web App

A complete Notes application built with Svelte, TypeScript, and TailwindCSS featuring full CRUD operations, search functionality, and dark mode support.

## Features

**Core CRUD Operations**
- Create new notes with title and content
- Read/display all notes with pagination-like grid layout
- Update existing notes through inline editing modal
- Delete notes with confirmation dialog

 **Enhanced User Experience**
-  Real-time search functionality (searches both title and content)
-  Dark mode toggle with system preference detection
-  Fully responsive design (mobile, tablet, desktop)
-  Loading states and optimistic UI updates
-  Modern, clean interface with smooth animations

**Technical Implementation**
- Mock REST API simulation with realistic network delays
- Centralized state management using Svelte stores
- TypeScript for type safety
- Component-based architecture
- Accessible UI with proper ARIA labels and keyboard navigation

## Project Structure

```
src/
├── components/
│   ├── Header.svelte           # Main header with search and theme toggle
│   ├── NotesList.svelte        # Main notes listing with states
│   ├── NoteItem.svelte         # Individual note card component
│   ├── CreateNoteModal.svelte  # Modal for creating new notes
│   └── EditNoteModal.svelte    # Modal for editing existing notes
├── services/
│   └── api.ts                  # Mock API service with CRUD operations
├── stores/
│   ├── notes.ts                # Notes state management
│   └── theme.ts                # Theme state management
├── types/
│   └── index.ts                # TypeScript interfaces
├── app.css                     # Global styles and TailwindCSS utilities
├── App.svelte                  # Main application component
└── main.ts                     # Application entry point
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Run TypeScript and Svelte checks

## API Design

The application simulates a REST API with the following endpoints:

```typescript
GET    /notes          # Fetch all notes
POST   /notes          # Create a new note
PUT    /notes/:id      # Update an existing note
DELETE /notes/:id      # Delete a note
```

### Note Data Structure

```typescript
interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;    # ISO timestamp
  updatedAt: string;    # ISO timestamp
}
```

## Key Features Explained

###  Search Functionality
- Real-time search across note titles and content
- Case-insensitive matching
- Instant filtering without API calls
- Clear search results indication

###  Dark Mode
- System preference detection on first visit
- Manual toggle with persistent storage
- Smooth transitions between themes
- Consistent styling across all components

###  Responsive Design
- Mobile-first approach
- Responsive grid layout (1 column on mobile, 2-3 on larger screens)
- Touch-friendly button sizes
- Optimized modal sizes for different screen sizes

### Performance Optimizations
- Optimistic UI updates for better perceived performance
- Loading states to provide user feedback
- Efficient re-rendering with Svelte's reactivity
- Minimal bundle size with tree-shaking

## Trade-offs and Assumptions

### Trade-offs Made:
1. **Mock API vs Real Backend**: Used an in-memory mock API for simplicity. In production, this would connect to a real REST API or GraphQL endpoint.

2. **Client-side Search**: Implemented search on the frontend for better UX. With large datasets, server-side search with pagination would be more appropriate.

3. **Simple Validation**: Basic client-side validation only. Production apps would need comprehensive validation on both client and server.

4. **No User Authentication**: Focused on core CRUD functionality. Real apps would need user auth and note ownership.

### Assumptions Made:
- Notes are plain text (no rich text formatting)
- No collaborative editing requirements
- Browser localStorage is available for theme persistence
- Modern browser support (ES6+, CSS Grid, Flexbox)

## What I'd Build Next

### Short-term Improvements:
1. **Rich Text Editor**: Add markdown support or WYSIWYG editing
2. **Categories/Tags**: Organize notes with categories or tags
3. **Note Templates**: Quick-start templates for common note types
4. **Keyboard Shortcuts**: Power-user shortcuts for common actions
5. **Auto-save**: Automatic saving of drafts while typing

### Medium-term Features:
1. **Real Backend Integration**: Connect to actual REST API or GraphQL
2. **User Authentication**: Sign up, login, and user-specific notes
3. **Collaborative Editing**: Real-time collaboration features
4. **File Attachments**: Support for images and file uploads
5. **Advanced Search**: Full-text search with filters and sorting options

### Long-term Vision:
1. **Mobile App**: React Native or Flutter mobile application
2. **Offline Support**: PWA with offline-first capabilities
3. **Export/Import**: Backup and restore functionality
4. **API Integration**: Connect with external services (Google Drive, Notion, etc.)
5. **Analytics**: Usage analytics and insights dashboard

## Technical Decisions

### Why Svelte?
- Minimal boilerplate and excellent developer experience
- Compiled output results in smaller bundle sizes
- Built-in reactivity system eliminates need for external state management
- Excellent TypeScript support

### Why TailwindCSS?
- Utility-first approach speeds up development
- Consistent design system with built-in responsive utilities
- Easy dark mode implementation
- Smaller CSS bundle due to purging unused styles

### State Management
- Used Svelte stores for global state management
- Separated concerns with dedicated stores for notes and theme
- Reactive derived stores for computed values like filtered notes

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)  
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
