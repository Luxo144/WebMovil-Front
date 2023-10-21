import { RegisterData, LoginData, LoginResponse, PasswordResetRequest, PasswordReset,User, CreateProfileData, UpdateProfileData, UpdateUserData } from '../types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jsonwebtoken';

const BASE_URL = 'http://10.0.2.2:3002/auth';
const TOKEN_STORAGE_KEY = '@auth_token';

export const storeToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
  } catch (e) {
    console.error("Error al guardar el token", e);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
  } catch (e) {
    console.error("Error al obtener el token", e);
    return null;
  }
};

export const removeToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch (e) {
    console.error("Error al remover el token", e);
  }
};


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

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error durante el inicio de sesión');
  }

  const data: LoginResponse = await response.json();
  await storeToken(data.accessToken); // Guardamos el token en AsyncStorage después de iniciar sesión exitosamente
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

export const getProfile = async (id: number): Promise<User> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'GET',
  });
  
  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching profile');
  }

  const data: User = await response.json();
  return data;
};

export const getUserDetails = async (userId: number, token: string): Promise<Partial<User>> => {
  const response = await fetch(`${BASE_URL}/user/${userId}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching user details');
  }

  const fullData: User = await response.json();
  const filteredData = {
      name: fullData.first_name,
      email: fullData.email
  };
  return filteredData;
};


export const getUserDetailsCombined = async (token: string): Promise<any> => {
  const response = await fetch(`http://10.0.2.2:3002/auth/user-details`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching combined user details');
  }

  const data = await response.json();
  return data;
};



export const createProfile = async (profileData: CreateProfileData): Promise<User> => {
  const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error creating profile');
  }

  const data: User = await response.json();
  return data;
};

export const updateProfile = async (id: number, profileData: UpdateProfileData): Promise<void> => {
  const token = await getToken();
  if (!token) {
      throw new Error("No auth token found");
  }

  const response = await fetch(`${BASE_URL}/profile/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error updating profile');
  }
};

export const updateUser = async (id: number, userData: UpdateUserData): Promise<void> => {
  const token = await getToken();
  if (!token) {
      throw new Error("No auth token found");
  }

  const response = await fetch(`${BASE_URL}/user/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error updating user');
  }
};
