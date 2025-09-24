# Frontend-Backend API Integration

## Overview
This document describes the integration between the frontend React application and the backend NestJS API for user authentication.

## Changes Made

### 1. API Service (`src/services/authService.js`)
- Created a centralized service to handle all authentication API calls
- Implements signup, signin, and getUserProfile methods
- Includes proper error handling and response parsing
- Uses JWT token management

### 2. Updated Auth Hook (`src/hooks/useAuth.js`)
- Modified to use backend API instead of localStorage
- Added loading and error states
- Implements async/await pattern for API calls
- Maintains backward compatibility with existing components

### 3. Enhanced Login Component (`src/pages/Login.jsx`)
- Added loading states with spinner
- Implemented error display with Bootstrap Alert
- Added form validation and disabled states during API calls
- Improved user experience with proper feedback

### 4. API Configuration (`src/config/api.js`)
- Centralized API configuration
- Environment variable support for different environments
- Helper functions for URL building

### 5. Backend DTO Fix
- Fixed `user-login.dto.ts` to use `username` instead of `email` to match service implementation

## API Endpoints

### User Authentication
- **POST** `/user/signup` - Create new user account
- **POST** `/user/signin` - User login
- **GET** `/user/profile` - Get user profile (requires JWT token)

## Environment Setup

1. Set the backend URL in environment variables:
   ```bash
   REACT_APP_API_URL=http://localhost:3000
   ```

2. Ensure the backend is running on the specified port

## Usage

The authentication system now works seamlessly with the backend:

1. **Signup**: Users can create accounts with full name, username, email, phone, and password
2. **Login**: Users can sign in with username and password
3. **Token Management**: JWT tokens are automatically stored and managed
4. **Error Handling**: Proper error messages are displayed to users
5. **Loading States**: Visual feedback during API operations

## Error Handling

The system handles various error scenarios:
- Network errors
- Validation errors from backend
- Authentication failures
- Server errors

All errors are displayed to users in a user-friendly format.

## Security Features

- Passwords are hashed on the backend
- JWT tokens are used for authentication
- Tokens are stored securely in localStorage
- Automatic token cleanup on logout
