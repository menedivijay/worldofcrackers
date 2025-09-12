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
  };

  const updateUser = (username, updatedData) => {
      // Get existing users
      let users = JSON.parse(localStorage.getItem("users") || "[]");

      // Find index of the user
      const index = users.findIndex((u) => u.username === username);

      if (index === -1) {
        return false; // user not found
      }

      // Update user object (keep old data, override with new)
      users[index] = { ...users[index], ...updatedData };

      // Save back to localStorage
      localStorage.setItem("users", JSON.stringify(users));

      // If this is the logged-in user, update authUser and context
      const authUser = JSON.parse(localStorage.getItem("authUser"));
      if (authUser && authUser.username === username) {
        localStorage.setItem("authUser", JSON.stringify(users[index]));
        setUser(users[index]);
      }

      return true;
};

  const value = {
    user,
    login,
    signup,
    updateUser,
    setUser,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
