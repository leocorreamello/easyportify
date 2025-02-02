import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Editor from './pages/Editor';
import Auth from './pages/Auth';
import Portfolio from './pages/Portfolio';
import { useAuthStore } from './store/authStore';

function App() {
  const { initialize } = useAuthStore();
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');

  React.useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <BrowserRouter>
      <div className={`min-h-screen bg-gradient-to-br from-indigo-50 to-white ${theme}`}>
        <Routes>
          <Route path="/" element={<Home theme={theme} setTheme={setTheme} language={language} setLanguage={setLanguage} />} />
          <Route path="/auth" element={<Auth theme={theme} language={language} />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/:username/:slug" element={<Portfolio />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;