import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const translations = {
  en: {
    createAccount: 'Create your account',
    signIn: 'Sign in to your account',
    fullName: 'Full Name',
    email: 'Email address',
    password: 'Password',
    signUp: 'Sign Up',
    signInButton: 'Sign In',
    alreadyHaveAccount: 'Already have an account? Sign in',
    dontHaveAccount: "Don't have an account? Sign up",
    signInWithGoogle: 'Sign in with Google',
    successMessage: 'Account created successfully! Redirecting to login...',
    fetchError: 'Failed to connect to the server. Please try again later.',
  },
  pt: {
    createAccount: 'Crie sua conta',
    signIn: 'Entre na sua conta',
    fullName: 'Nome Completo',
    email: 'Endereço de Email',
    password: 'Senha',
    signUp: 'Inscrever-se',
    signInButton: 'Entrar',
    alreadyHaveAccount: 'Já tem uma conta? Entre',
    dontHaveAccount: 'Não tem uma conta? Inscreva-se',
    signInWithGoogle: 'Entrar com Google',
    successMessage: 'Conta criada com sucesso! Redirecionando para login...',
    fetchError: 'Falha ao conectar ao servidor. Por favor, tente novamente mais tarde.',
  },
};

export default function Auth({ theme, language }) {
  const [searchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(searchParams.get('signup') === 'true');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [fetchError, setFetchError] = useState('');
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle, error, clearError } = useAuthStore();

  React.useEffect(() => {
    document.body.className = theme;
    clearError();
  }, [isSignUp, clearError, theme]);

  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        await signUp(email, password, fullName);
        localStorage.setItem('user', JSON.stringify({ email, fullName }));
        setSuccessMessage(t.successMessage);
        setTimeout(() => {
          setIsSignUp(false);
          setSuccessMessage('');
        }, 2000);
      } else {
        await signIn(email, password);
        navigate(`/portfolio/${email}`);
      }
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        setFetchError(t.fetchError);
      } else {
        console.error(err);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate(`/portfolio/${email}`);
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        setFetchError(t.fetchError);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900 text-gray-100'} flex flex-col justify-center py-12 sm:px-6 lg:px-8`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold">
          {isSignUp ? t.createAccount : t.signIn}
        </h2>
        {!import.meta.env.VITE_SUPABASE_URL && (
          <div className="mt-2 text-center text-sm text-amber-600 bg-amber-50 p-2 rounded">
            Please connect to Supabase using the "Connect to Supabase" button in the top right corner.
          </div>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className={`py-8 px-4 shadow sm:rounded-lg sm:px-10 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {isSignUp && (
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium">
                  {t.fullName}
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${theme === 'light' ? 'border-gray-300' : 'border-gray-700 bg-gray-700 text-gray-100'}`}
                />
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                {t.email}
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${theme === 'light' ? 'border-gray-300' : 'border-gray-700 bg-gray-700 text-gray-100'}`}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                {t.password}
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${theme === 'light' ? 'border-gray-300' : 'border-gray-700 bg-gray-700 text-gray-100'}`}
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</div>
            )}

            {fetchError && (
              <div className="text-red-600 text-sm bg-red-50 p-2 rounded">{fetchError}</div>
            )}

            {successMessage && (
              <div className="text-green-600 text-sm bg-green-50 p-2 rounded">{successMessage}</div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSignUp ? t.signUp : t.signInButton}
            </button>
          </form>

          <div className="mt-6">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="w-full text-center text-sm text-indigo-600 hover:text-indigo-500"
            >
              {isSignUp ? t.alreadyHaveAccount : t.dontHaveAccount}
            </button>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {t.signInWithGoogle}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}