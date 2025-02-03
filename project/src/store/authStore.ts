import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  full_name?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => void;
  initialize: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,
  signIn: async (email, password) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
      if (storedUser && storedUser.email === email && storedUser.password === password) {
        set({ user: storedUser, error: null });
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
  signUp: async (email, password, fullName) => {
    try {
      const user = { id: '1', email, full_name: fullName, password };
      localStorage.setItem('user', JSON.stringify(user));
      set({ user, error: null });
    } catch (error) {
      set({ error: 'Failed to sign up' });
      throw error;
    }
  },
  signOut: () => {
    localStorage.removeItem('user');
    set({ user: null, error: null });
  },
  initialize: () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    set({ user, loading: false, error: null });
  },
  clearError: () => set({ error: null }),
}));