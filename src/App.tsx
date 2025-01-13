import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Save, Mail, Lock, LogIn } from 'lucide-react';
import NotesApp from './components/NotesApp';
import Auth from './components/Auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);

  if (!isAuthenticated) {
    return <Auth isLoginView={isLoginView} setIsLoginView={setIsLoginView} setIsAuthenticated={setIsAuthenticated} />;
  }

  return <NotesApp />;
}

export default App;