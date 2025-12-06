import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email, password) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Mock user data
        const user: User = {
          id: '1',
          email,
          firstName: 'John',
          lastName: 'Doe',
          phone: '0788888888',
        };

        set({ user, isAuthenticated: true });
      },

      register: async (userData) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const user: User = {
          id: Date.now().toString(),
          ...userData,
        };

        set({ user, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
