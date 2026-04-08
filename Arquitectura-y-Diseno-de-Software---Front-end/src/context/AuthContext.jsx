import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('imeet_token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('imeet_token');
    const storedUser = localStorage.getItem('imeet_user');
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('imeet_token');
        localStorage.removeItem('imeet_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('imeet_token', jwtToken);
    localStorage.setItem('imeet_user', JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('imeet_token');
    localStorage.removeItem('imeet_user');
  }, []);

  const hasRole = useCallback((role) => {
    if (!user) return false;
    return user.role === role;
  }, [user]);

  // 👇 AQUÍ ESTABA EL BUG: Cambiado de 'Administrador' a 'admin'
  const isAdmin = useCallback(() => hasRole('admin'), [hasRole]);
  const isOrganizer = useCallback(() => hasRole('organizer') || hasRole('admin'), [hasRole]);

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: !!token && !!user,
    login,
    logout,
    hasRole,
    isAdmin,
    isOrganizer,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}