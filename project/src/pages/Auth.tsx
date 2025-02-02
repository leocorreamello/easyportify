import React from 'react';
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
  },
};

export default function Auth({ theme, language }) {
  const [searchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = React.useState(searchParams.get('signup') === 'true');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [fullName, setFullName] = React.useState('');
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
      } else {
        await signIn(email, password);
      }
      navigate('/editor');
    } catch (err) {
      // Error is already handled in the store
      console.error(err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/editor');
    } catch (err) {
      // Error is already handled in the store
      console.error(err);
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
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {isSignUp && (
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  {t.fullName}
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t.email}
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t.password}
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={!import.meta.env.VITE_SUPABASE_URL}
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