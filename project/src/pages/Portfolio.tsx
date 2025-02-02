import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Palette, Rocket, Users, Sun, Moon } from 'lucide-react';
import BrazilFlag from '../../favicon/brazil.png';
import USFlag from '../../favicon/eua.png';
import T1 from '../../project/public/template1.png';

const translations = {
  en: {
    welcome: 'Welcome',
    templates: 'Portfolio Templates',
    useTemplate: 'Use this template',
    premiumTemplates: 'Premium Templates',
  },
  pt: {
    welcome: 'Bem-vindo',
    templates: 'Modelos de Portfólio',
    useTemplate: 'Usar este modelo',
    premiumTemplates: 'Modelos Premium',
  },
};

const templates = [
  {
    id: 1,
    name: 'Template 1',
    image: '/project/public/template1.png',
    description: 'Description for Template 1',
  },
  {
    id: 2,
    name: 'Template 2',
    image: 'path/to/template2.jpg',
    description: 'Description for Template 2',
  },
  {
    id: 3,
    name: 'Template 3',
    image: 'path/to/template3.jpg',
    description: 'Description for Template 3',
  },
  {
    id: 4,
    name: 'Template 4',
    image: 'path/to/template4.jpg',
    description: 'Description for Template 4',
  },
  {
    id: 5,
    name: 'Template 5',
    image: 'path/to/template5.jpg',
    description: 'Description for Template 5',
  },
  {
    id: 6,
    name: 'Template 6',
    image: 'path/to/template6.jpg',
    description: 'Description for Template 6',
  },
];

const premiumTemplates = [
  {
    id: 7,
    name: 'Premium Template 1',
    image: 'path/to/premiumTemplate1.jpg',
    description: 'Description for Premium Template 1',
  },
  {
    id: 8,
    name: 'Premium Template 2',
    image: 'path/to/premiumTemplate2.jpg',
    description: 'Description for Premium Template 2',
  },
  {
    id: 9,
    name: 'Premium Template 3',
    image: 'path/to/premiumTemplate3.jpg',
    description: 'Description for Premium Template 3',
  },
];

export default function Portfolio({ theme, setTheme, language, setLanguage }) {
  const { email } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'pt' : 'en';
    setLanguage(newLanguage);
  };

  const t = translations[language];

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  const handleUseTemplate = () => {
    // Logic to use the selected template
    console.log('Using template:', selectedTemplate);
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gradient-to-br from-indigo-50 to-white' : 'bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100'}`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-600">EasyPortify</div>
        <div className="space-x-4 flex items-center">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? <Moon className="w-6 h-6 text-gray-500" /> : <Sun className="w-6 h-6 text-yellow-500" />}
          </button>
          <button className="language-toggle" onClick={toggleLanguage}>
            {language === 'en' ? <img src={BrazilFlag} alt="Portuguese" className="w-6 h-6" /> : <img src={USFlag} alt="English" className="w-6 h-6" />}
          </button>
          <button 
            onClick={() => navigate('/auth')} 
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {t.templates}
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">
            {t.welcome}, {user.fullName}
          </h1>
        </div>

        <section className="mt-24">
          <h1 className="text-5xl font-bold mb-6 text-center">{t.templates}</h1>
          <div className="grid md:grid-cols-3 gap-8">
            {templates.map((template) => (
              <div key={template.id} className="relative">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-auto rounded-lg cursor-pointer"
                  onClick={() => handleTemplateClick(template)}
                />
                {selectedTemplate && selectedTemplate.id === template.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center text-white p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">{template.name}</h3>
                    <p className="mb-4">{template.description}</p>
                    <button
                      onClick={handleUseTemplate}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                      {t.useTemplate}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <h1 className="text-5xl font-bold mb-6 text-center">{t.premiumTemplates}</h1>
          <div className="grid md:grid-cols-3 gap-8">
            {premiumTemplates.map((template) => (
              <div key={template.id} className="relative">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-auto rounded-lg cursor-pointer"
                  onClick={() => handleTemplateClick(template)}
                />
                {selectedTemplate && selectedTemplate.id === template.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center text-white p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">{template.name}</h3>
                    <p className="mb-4">{template.description}</p>
                    <button
                      onClick={handleUseTemplate}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                      {t.useTemplate}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className={`${theme === 'light' ? 'bg-gray-200 text-gray-900' : 'bg-gray-800 text-white'} py-4`}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">EasyPortify</h2>
              <p className="mt-1 text-sm">Create your professional portfolio with ease.</p>
            </div>
            <div className="space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900">
                Facebook
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900">
                Twitter
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900">
                LinkedIn
              </a>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">Your portfolio is your digital handshake.</p>
            <p className="mt-2 text-gray-400 text-sm">
              <a href="/terms" className="hover:text-gray-900">Terms of Service</a> | <a href="/privacy" className="hover:text-gray-900">Privacy Policy</a>
            </p>
            <p className="mt-2 text-gray-400 text-sm">&copy; 2025 EasyPortify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}