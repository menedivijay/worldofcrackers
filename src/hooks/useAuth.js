import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem('authUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
    localStorage.removeItem('token');
    window.location.reload();
  };

  const updateUser = (updatedData) => {
    if (user) {
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      localStorage.setItem('authUser', JSON.stringify(updatedUser));
      return true;
    }
    return false;
  };

  const addOrder = (newOrder) => {
    if (user) {
      const key = `userOrders${user.username}`;
      const savedOrders = JSON.parse(localStorage.getItem(key) || "[]");
      savedOrders.push(newOrder);
      localStorage.setItem(key, JSON.stringify(savedOrders));
    }
  };

  const value = {
    user,
    updateUser,
    addOrder,
    logout,
    setUser,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
