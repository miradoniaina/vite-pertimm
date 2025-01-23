import { useState, useEffect } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

export const useAuth = (): AuthState => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const token = localStorage.getItem('token');
    return {
      isAuthenticated: !!token,
      token: token,
    };
  });

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      setAuthState({
        isAuthenticated: !!token,
        token: token,
      });
    };

    // Check auth status on mount
    checkAuthStatus();

    // Listen for storage events to update auth state
    window.addEventListener('storage', checkAuthStatus);

    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  return authState;
};
