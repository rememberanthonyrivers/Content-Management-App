import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Save } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

function NotesApp() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      date: new Date().toLocaleString(),
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
    setTitle(newNote.title);
    setContent(newNote.content);
  };

  const saveNote = () => {
    if (!activeNote) return;
    
    const updatedNotes = notes.map(note => 
      note.id === activeNote.id 
        ? { ...note, title, content, date: new Date().toLocaleString() }
        : note
    );
    setNotes(updatedNotes);
  };

  const deleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
    if (activeNote?.id === noteId) {
      setActiveNote(null);
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-1/3 bg-white rounded-lg shadow-md p-4 h-[calc(100vh-4rem)]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Notes</h2>
              <button
                onClick={createNewNote}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                <PlusCircle size={20} />
                New Note
              </button>
            </div>
            <div className="overflow-y-auto h-[calc(100%-4rem)]">
              {notes.map(note => (
                <div
                  key={note.id}
                  className={`p-4 border-b cursor-pointer ${
                    activeNote?.id === note.id ? 'bg-indigo-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setActiveNote(note);
                    setTitle(note.title);
                    setContent(note.content);
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">{note.title}</h3>
                      <p className="text-sm text-gray-500">{note.date}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(note.id);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {note.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Editor */}
          <div className="w-2/3 bg-white rounded-lg shadow-md p-6 h-[calc(100vh-4rem)]">
            {activeNote ? (
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-2xl font-bold w-full bg-transparent border-none focus:outline-none"
                    placeholder="Note Title"
                  />
                  <button
                    onClick={saveNote}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    <Save size={20} />
                    Save
                  </button>
                </div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="flex-1 w-full p-4 bg-gray-50 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Start writing your note here..."
                />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <p>Select a note or create a new one to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotesApp;