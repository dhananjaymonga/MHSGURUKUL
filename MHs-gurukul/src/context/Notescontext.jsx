import React, { createContext, useState, useContext } from 'react';

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [isAdmin] = useState(true);

  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, isAdmin }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}