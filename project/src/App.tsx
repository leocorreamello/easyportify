import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Editor from './pages/Editor';
import Auth from './pages/Auth';
import Portfolio from './pages/Portfolio';
import Dashboard from './pages/Dashboard';
import { useAuthStore } from './store/authStore';

function App() {
  const { initialize } = useAuthStore();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <BrowserRouter>
      <div className={`min-h-screen bg-gradient-to-br from-indigo-50 to-white ${theme}`}>
        <Routes>
          <Route path="/" element={<Home theme={theme} setTheme={setTheme} language={language} setLanguage={setLanguage} />} />
          <Route path="/auth" element={<Auth theme={theme} language={language} />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/portfolio/:email" element={<Portfolio theme={theme} setTheme={setTheme} language={language} setLanguage={setLanguage} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;