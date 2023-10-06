import { RegisterData, LoginData, LoginResponse, PasswordResetRequest, PasswordReset,User } from '../types/user';

const BASE_URL = 'http://10.0.2.2:3000/auth';

export const register = async (userData: RegisterData): Promise<User> => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  console.log('Datos enviados:', JSON.stringify(userData));
  const data = await response.json();
  return data;
};

export const login = async (loginData: LoginData): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) { // Si el código de estado HTTP no está en el rango 200-299
    const errorData = await response.json(); // Puedes agregar esto si el backend envía datos adicionales en el error
    throw new Error(errorData.message || 'Error durante el inicio de sesión'); // Lanza un error
  }

  const data: LoginResponse = await response.json();
  return data;
};


export const requestPasswordReset = async (resetRequest: PasswordResetRequest): Promise<void> => {
  const response = await fetch(`${BASE_URL}/request-password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resetRequest),
  });

  if (response.status === 404) {
    throw new Error('User not found');
  } else if (!response.ok) {
    throw new Error('Error during password reset request');
  }
};


export const resetPassword = async (resetData: PasswordReset): Promise<void> => {
  await fetch(`${BASE_URL}/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resetData),
  });
};
