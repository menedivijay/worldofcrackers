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

  const login = (username, password) => {
    // Get all users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Find user with matching credentials
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('authUser', JSON.stringify(foundUser));
      return true;
    }

    return false;
  };

  const signup = (fullname, username, email, phone, password) => {
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if username already exists
    if (users.find((u) => u.username === username)) {
      return false;
    }

    // Create new user
    const newUser = { fullname, username,email, phone, password };
    users.push(newUser);

    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('authUser', JSON.stringify(newUser));

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
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
    login,
    signup,
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
