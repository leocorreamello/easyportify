import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Palette, Rocket, Users, Sun, Moon } from 'lucide-react';
import BrazilFlag from '../../favicon/brazil.png';
import USFlag from '../../favicon/eua.png';

const translations = {
  en: {
    title: "Create Your Professional Portfolio in Minutes",
    description: "Stand out from the crowd with a beautiful, customizable portfolio that showcases your work effectively.",
    getStarted: "Get Started Now",
    beautifulDesign: "Beautiful Design",
    beautifulDesignDesc: "Choose from professionally designed templates that make your work shine.",
    easyToUse: "Easy to Use",
    easyToUseDesc: "Our intuitive editor makes creating your portfolio a breeze.",
    professionalNetwork: "Professional Network",
    professionalNetworkDesc: "Connect with other professionals and showcase your work to the world.",
    howItWorks: "How It Works",
    signUp: "Sign Up",
    signUpDesc: "Create an account to get started with your professional portfolio.",
    customize: "Customize",
    customizeDesc: "Use our intuitive editor to customize your portfolio to match your style.",
    publish: "Publish",
    publishDesc: "Publish your portfolio and share it with the world to showcase your work.",
    readyToCreate: "Ready to Create Your Portfolio?",
    readyToCreateDesc: "Start building your professional portfolio today and showcase your work to the world.",
    createPortfolio: "Get Started",
    login: "Login",
    signUpButton: "Sign Up"
  },
  pt: {
    title: "Crie seu Portfólio Profissional em Minutos",
    description: "Destaque-se da multidão com um portfólio bonito e personalizável que mostra seu trabalho de forma eficaz.",
    getStarted: "Comece Agora",
    beautifulDesign: "Design Bonito",
    beautifulDesignDesc: "Escolha entre modelos projetados profissionalmente que fazem seu trabalho brilhar.",
    easyToUse: "Fácil de Usar",
    easyToUseDesc: "Nosso editor intuitivo torna a criação do seu portfólio uma brisa.",
    professionalNetwork: "Rede Profissional",
    professionalNetworkDesc: "Conecte-se com outros profissionais e mostre seu trabalho para o mundo.",
    howItWorks: "Como Funciona",
    signUp: "Inscreva-se",
    signUpDesc: "Crie uma conta para começar com seu portfólio profissional.",
    customize: "Personalizar",
    customizeDesc: "Use nosso editor intuitivo para personalizar seu portfólio de acordo com seu estilo.",
    publish: "Publicar",
    publishDesc: "Publique seu portfólio e compartilhe-o com o mundo para mostrar seu trabalho.",
    readyToCreate: "Pronto para Criar Seu Portfólio?",
    readyToCreateDesc: "Comece a construir seu portfólio profissional hoje e mostre seu trabalho para o mundo.",
    createPortfolio: "Comece Agora",
    login: "Entrar",
    signUpButton: "Inscreva-se"
  }
};

export default function Home({ theme, setTheme, language, setLanguage }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'pt' : 'en';
    setLanguage(newLanguage);
  };

  const t = translations[language];

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
            {t.createPortfolio}
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">
            {t.title}
          </h1>
          <p className="text-xl mb-8">
            {t.description}
          </p>
          <Link
            to="/auth?signup=true"
            className="inline-block bg-indigo-600 text-white text-lg px-8 py-4 rounded-lg hover:bg-indigo-700 transition transform hover:scale-105"
          >
            {t.getStarted}
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className={`p-8 rounded-xl shadow-lg transform transition-transform hover:scale-105 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-700 text-gray-100'}`}>
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <Palette className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">{t.beautifulDesign}</h3>
            <p>
              {t.beautifulDesignDesc}
            </p>
          </div>
          <div className={`p-8 rounded-xl shadow-lg transform transition-transform hover:scale-105 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-700 text-gray-100'}`}>
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <Rocket className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">{t.easyToUse}</h3>
            <p>
              {t.easyToUseDesc}
            </p>
          </div>
          <div className={`p-8 rounded-xl shadow-lg transform transition-transform hover:scale-105 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-700 text-gray-100'}`}>
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">{t.professionalNetwork}</h3>
            <p>
              {t.professionalNetworkDesc}
            </p>
          </div>
        </div>
        
        <section className="mt-24">
          <h1 className="text-5xl font-bold mb-6 text-center">{t.howItWorks}</h1>
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`p-8 rounded-xl shadow-lg transform transition-transform hover:scale-105 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-700 text-gray-100'}`}>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-indigo-600 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">{t.signUp}</h3>
              <p>
                {t.signUpDesc}
              </p>
            </div>
            <div className={`p-8 rounded-xl shadow-lg transform transition-transform hover:scale-105 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-700 text-gray-100'}`}>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-indigo-600 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">{t.customize}</h3>
              <p>
                {t.customizeDesc}
              </p>
            </div>
            <div className={`p-8 rounded-xl shadow-lg transform transition-transform hover:scale-105 ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-700 text-gray-100'}`}>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-indigo-600 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">{t.publish}</h3>
              <p>
                {t.publishDesc}
              </p>
            </div>
          </div>
        </section>
        <section className="mt-24 text-center">
          <h1 className="text-5xl font-bold mb-6">{t.readyToCreate}</h1>
          <p className="text-xl mb-8">
            {t.readyToCreateDesc}
          </p>
          <Link
            to="/auth?signup=true"
            className="inline-block bg-indigo-600 text-white text-lg px-8 py-4 rounded-lg hover:bg-indigo-700 transition transform hover:scale-105"
          >
            {t.createPortfolio}
          </Link>
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