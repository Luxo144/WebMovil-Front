import { 
  ChangePassword, 
  CreateUserDto, 
  LoginUserDto, 
  ResetPasswordDto, 
  UpdateUserDto, 
  RequestPasswordReset,
  ApiResponseSuccess,
  ApiResponseError,
  LoginSuccessResponse,
  UserDataResponse
} from '../types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';


const BASE_URL = "http://192.168.117.1:3009/auth";
const TOKEN_STORAGE_KEY = '@accessToken';

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

//register
export const register = async (userData: CreateUserDto): Promise<ApiResponseError | ApiResponseSuccess> => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  console.log('Datos enviados:', JSON.stringify(userData));
  const data = await response.json() as ApiResponseSuccess | ApiResponseError;; 
  return data;
};

//login
export const login = async (loginData: LoginUserDto): Promise<LoginSuccessResponse | ApiResponseError> => {
  console.log('Datos enviados:', JSON.stringify(loginData));
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  const data = await response.json() as LoginSuccessResponse | ApiResponseError;
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error durante el inicio de sesión');
  }

  if ('accessToken' in data) {
    await storeToken(data.accessToken.accessToken);
  }
  return data;
};


//logout
export const logout = async (): Promise<ApiResponseError | ApiResponseSuccess> => {
  const token = await getToken();
  if (!token) {
    throw new Error('No auth token found');
  }
  const response = await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json() as ApiResponseSuccess | ApiResponseError;
  await removeToken();
  return data;
};

//cambiar contraseña iniciado sesion change-password
export const resetPasswordLogin = async (change: ChangePassword, token: string): Promise<ApiResponseError | ApiResponseSuccess> => {
  const response = await fetch(`${BASE_URL}/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(change),

  });
  const data = await response.json() as ApiResponseSuccess | ApiResponseError;
  return data;
}

//obtener datos del usuario enviando el token
export const getUserData = async (token: string): Promise<UserDataResponse| ApiResponseError> => {
  const response = await fetch(`${BASE_URL}/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json() as UserDataResponse | ApiResponseError;
  return data;
};

//actualizar datos del usuario
export const updateUserData = async (userData: UpdateUserDto, token: string): Promise<ApiResponseError | ApiResponseSuccess> => {
  const response = await fetch(`${BASE_URL}/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json() as ApiResponseSuccess | ApiResponseError;
  return data;
};

//eliminar usuario
export const deleteUser = async (token: string): Promise<ApiResponseError | ApiResponseSuccess> => {
  const response = await fetch(`${BASE_URL}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json() as ApiResponseSuccess | ApiResponseError;
  return data;
};

export const requestPasswordReset = async (resetRequest: RequestPasswordReset): Promise<ApiResponseError| ApiResponseSuccess> => {
  const response = await fetch(`${BASE_URL}/request-password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resetRequest),
  });

  const data = await response.json() as ApiResponseSuccess | ApiResponseError ;
  return data;
};


export const resetPassword = async (resetData: ResetPasswordDto): Promise<ApiResponseError | ApiResponseSuccess> => {
  const response = await fetch(`${BASE_URL}/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resetData),
  });
  const data = await response.json() as ApiResponseSuccess | ApiResponseError;
  return data;
};
