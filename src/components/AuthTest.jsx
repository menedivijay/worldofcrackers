import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import authService from '../services/authService';

const AuthTest = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [testResult, setTestResult] = useState('');

  const testApiConnection = async () => {
    try {
      setTestResult('Testing API connection...');
      
      // Test signup
      const signupResult = await authService.signup({
        fullname: 'Test User',
        username: 'testuser123',
        email: 'test@example.com',
        phone: '9876543210',
        password: 'testpass123'
      });
      
      if (signupResult.success) {
        setTestResult('✅ API connection successful! Signup test passed.');
      } else {
        setTestResult(`❌ Signup failed: ${signupResult.error}`);
      }
    } catch (error) {
      setTestResult(`❌ API connection failed: ${error.message}`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="p-3 border rounded">
        <h5>API Test Component</h5>
        <p>Please login to test API functionality.</p>
        <button 
          className="btn btn-primary btn-sm" 
          onClick={testApiConnection}
        >
          Test API Connection
        </button>
        {testResult && (
          <div className="mt-2 p-2 bg-light rounded">
            <small>{testResult}</small>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-3 border rounded">
      <h5>API Test Component</h5>
      <p>Welcome, {user?.username || 'User'}!</p>
      <p>User ID: {user?.id}</p>
      <button 
        className="btn btn-secondary btn-sm me-2" 
        onClick={testApiConnection}
      >
        Test API Connection
      </button>
      <button 
        className="btn btn-danger btn-sm" 
        onClick={logout}
      >
        Logout
      </button>
      {testResult && (
        <div className="mt-2 p-2 bg-light rounded">
          <small>{testResult}</small>
        </div>
      )}
    </div>
  );
};

export default AuthTest;
