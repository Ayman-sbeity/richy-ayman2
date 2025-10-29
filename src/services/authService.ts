export interface User {
  _id: string;
  name: string;
  email: string;
  type: string;
  token?: string;
}

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';

export const authService = {
  async register(userData: { name: string; email: string; password: string; type: string; phone?: string }): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return response.json();
  },

  async login(credentials: { email: string; password: string }): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return response.json();
  },
};