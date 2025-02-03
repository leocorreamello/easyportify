import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Palette, Rocket, Users, Sun, Moon, LogOut, User, Edit3 } from 'lucide-react';
import BrazilFlag from '../../favicon/brazil.png';
import USFlag from '../../favicon/eua.png';
import Template1 from '../../public/template1.png';
import Template2 from '../../public/template2.png';
import Template3 from '../../public/template3.png';
import axios from 'axios';

const translations = {
  en: {
    welcome: 'Welcome',
    templates: 'Free Templates',
    useTemplate: 'Use this template',
    premiumTemplates: 'Premium Templates',
    close: 'Close',
    logout: 'Logout',
    email: 'Email',
    joinDate: 'Join Date',
    country: 'Country',
    changePhoto: 'Change Photo',
    footerTitle: 'EasyPortify',
    footerDescription: 'Create your professional portfolio with ease.',
    footerNote: 'Your portfolio is your digital handshake.',
    termsOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    footerRights: '&copy; 2025 EasyPortify. All rights reserved.',
  },
  pt: {
    welcome: 'Bem-vindo',
    templates: 'Modelos Grátis',
    useTemplate: 'Usar este modelo',
    premiumTemplates: 'Modelos Pagos',
    close: 'Fechar',
    logout: 'Sair',
    email: 'Email',
    joinDate: 'Data de Entrada',
    country: 'País',
    changePhoto: 'Trocar Foto',
    footerTitle: 'EasyPortify',
    footerDescription: 'Crie seu portfólio profissional com facilidade.',
    footerNote: 'Seu portfólio é seu aperto de mão digital.',
    termsOfService: 'Termos de Serviço',
    privacyPolicy: 'Política de Privacidade',
    footerRights: '&copy; 2025 EasyPortify. Todos os direitos reservados.',
  },
};

const templates = [
  {
    id: 1,
    name: 'Template 1',
    image: Template1,
    description: 'Description for Template 1',
    photos: [Template1, Template2, Template3],
  },
  {
    id: 2,
    name: 'Template 2',
    image: Template1,
    description: 'Description for Template 2',
    photos: ['path/to/photo1.jpg', 'path/to/photo2.jpg', 'path/to/photo3.jpg'],
  },
  {
    id: 3,
    name: 'Template 3',
    image: Template1,
    description: 'Description for Template 3',
    photos: ['path/to/photo1.jpg', 'path/to/photo2.jpg', 'path/to/photo3.jpg'],
  }
];

const premiumTemplates = [
  {
    id: 7,
    name: 'Premium Template 1',
    image: Template1,
    description: 'Description for Premium Template 1',
    photos: ['path/to/photo1.jpg', 'path/to/photo2.jpg', 'path/to/photo3.jpg'],
  },
  {
    id: 8,
    name: 'Premium Template 2',
    image: Template1,
    description: 'Description for Premium Template 2',
    photos: ['path/to/photo1.jpg', 'path/to/photo2.jpg', 'path/to/photo3.jpg'],
  },
  {
    id: 9,
    name: 'Premium Template 3',
    image: Template1,
    description: 'Description for Premium Template 3',
    photos: ['path/to/photo1.jpg', 'path/to/photo2.jpg', 'path/to/photo3.jpg'],
  },
];

export default function Portfolio({ theme, setTheme, language, setLanguage }) {
  const { email } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [expandedPhoto, setExpandedPhoto] = useState(null);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [country, setCountry] = useState(user?.country || '');

  useEffect(() => {
    if (!user?.country) {
      axios.get('https://ipapi.co/json/')
        .then(response => {
          setCountry(response.data.country_name);
        })
        .catch(error => {
          console.error('Error fetching country:', error);
        });
    }
  }, [user]);

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

  const handleClosePrompt = () => {
    setSelectedTemplate(null);
  };

  const handlePhotoClick = (photo) => {
    setExpandedPhoto(photo);
  };

  const handleClosePhoto = () => {
    setExpandedPhoto(null);
  };

  const handleLogout = async () => {
    // Logic to handle logout
    localStorage.removeItem('user');
    navigate('/auth');
  };

  const toggleProfilePopup = () => {
    setIsProfilePopupOpen(!isProfilePopupOpen);
  };

  const handlePhotoChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Logic to upload the new profile picture and update the user's profile
      console.log('New profile picture:', file);
    }
  };

  const formatJoinDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A';
    return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gradient-to-br from-indigo-50 to-white' : 'bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100'}`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-600">EasyPortify</div>
        <div className="space-x-4 flex items-center">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? <Moon className="w-6 h-6 text-gray-500" /> : <Sun className="w-6 h-6 text-yellow-500" />}
          </button>
          <button className="language-toggle" onClick={toggleLanguage}>
            {language === 'en' ? <img src={BrazilFlag} alt="Portuguese" className="w-6 h-6" /> : <img src={USFlag} alt="English" className="w-6 h-6" />}
          </button>
          <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleProfilePopup}>
            <div className="relative group">
              {user?.avatar_url ? (
                <img src={user.avatar_url} alt="Avatar" className="w-8 h-8 rounded-full" />
              ) : (
                <User className="w-8 h-8 text-gray-500" />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Edit3 className="w-4 h-4 text-white" />
              </div>
            </div>
            <span>{user.fullName}</span>
          </div>
          <button 
            onClick={handleLogout} 
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center space-x-2"
          >
            <LogOut className="w-5 h-5" />
            <span>{t.logout}</span>
          </button>
        </div>
      </nav>

      {isProfilePopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className={`p-8 rounded-lg max-w-sm w-full ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-800 text-gray-100'}`}>
            <h3 className="text-2xl font-semibold mb-6">{user?.fullName}</h3>
            <div className="flex items-center justify-center mb-4 relative group">
              {user?.avatar_url ? (
                <img src={user.avatar_url} alt="Avatar" className="w-24 h-24 rounded-full cursor-pointer" onClick={() => document.getElementById('fileInput').click()} />
              ) : (
                <User className="w-24 h-24 text-gray-500 cursor-pointer" onClick={() => document.getElementById('fileInput').click()} />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Edit3 className="w-6 h-6 text-white" />
              </div>
              <input type="file" id="fileInput" className="hidden" onChange={handlePhotoChange} />
            </div>
            <p className="mb-4"><strong>{t.email}:</strong> {user?.email}</p>
            <p className="mb-4"><strong>{t.joinDate}:</strong> {formatJoinDate(user?.created_at)}</p>
            <p className="mb-4"><strong>{t.country}:</strong> {country || 'Loading...'}</p>
            <button
              onClick={toggleProfilePopup}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}

      <main className="container mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">
            {t.welcome}, {user.fullName}
          </h1>
        </div>

        <section className={`mt-24 p-8 rounded-lg shadow-lg ${theme === 'light' ? 'bg-white' : 'bg-gray-700'}`}>
          <h1 className="text-5xl font-bold mb-6 text-center">{t.templates}</h1>
          <div className="grid md:grid-cols-3 gap-8">
            {templates.map((template) => (
              <div key={template.id} className={`relative group p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-800'}`}>
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-auto rounded-lg cursor-pointer border-4 border-transparent group-hover:border-indigo-600 transition-all duration-300"
                  onClick={() => handleTemplateClick(template)}
                />
                <h3 className="text-xl font-semibold mt-4">{template.name}</h3>
                <p className="text-gray-600">{template.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={`mt-24 p-8 rounded-lg shadow-lg ${theme === 'light' ? 'bg-white' : 'bg-gray-700'}`}>
          <h1 className="text-5xl font-bold mb-6 text-center">{t.premiumTemplates}</h1>
          <div className="grid md:grid-cols-3 gap-8">
            {premiumTemplates.map((template) => (
              <div key={template.id} className={`relative group p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-800'}`}>
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-auto rounded-lg cursor-pointer border-4 border-transparent group-hover:border-indigo-600 transition-all duration-300"
                  onClick={() => handleTemplateClick(template)}
                />
                <h3 className="text-xl font-semibold mt-4">{template.name}</h3>
                <p className="text-gray-600">{template.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className={`p-8 rounded-lg max-w-4xl w-full ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-800 text-gray-100'}`}>
            <h3 className="text-2xl font-semibold mb-6">{selectedTemplate.name}</h3>
            <div className="grid grid-cols-3 gap-6 mb-6">
              {selectedTemplate.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-auto rounded-lg cursor-pointer"
                  onClick={() => handlePhotoClick(photo)}
                />
              ))}
            </div>
            <p className="mb-6">{selectedTemplate.description}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleClosePrompt}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                {t.close}
              </button>
              <button
                onClick={handleUseTemplate}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                {t.useTemplate}
              </button>
            </div>
          </div>
        </div>
      )}

      {expandedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={handleClosePhoto}
              className="absolute top-4 right-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              {t.close}
            </button>
            <img src={expandedPhoto} alt="Expanded" className="w-auto h-auto max-w-3/4 max-h-3/4 rounded-lg" />
          </div>
        </div>
      )}

      <footer className={`${theme === 'light' ? 'bg-gray-300 text-gray-900' : 'bg-gray-900 text-white'} py-4`}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{t.footerTitle}</h2>
              <p className="mt-1 text-sm">{t.footerDescription}</p>
            </div>
            <div className="space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-100">
                Facebook
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-100">
                Twitter
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-100">
                LinkedIn
              </a>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">{t.footerNote}</p>
            <p className="mt-2 text-gray-400 text-sm">
              <a href="/terms" className="hover:text-gray-100">{t.termsOfService}</a> | <a href="/privacy" className="hover:text-gray-100">{t.privacyPolicy}</a>
            </p>
            <p className="mt-2 text-gray-400 text-sm" dangerouslySetInnerHTML={{ __html: t.footerRights }}></p>
          </div>
        </div>
      </footer>
    </div>
  );
}