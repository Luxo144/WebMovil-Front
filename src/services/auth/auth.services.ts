import { 
  ChangePassword, 
  RegisterRequest, 
  LoginRequest, 
  ResetPasswordDto, 
  UpdateUserDto, 
  RequestPasswordReset,
  LoginSuccessResponse,
  UserDataResponse
} from '../../types/auth/user';
import { ApiResponseSuccess, ApiResponseError,} from '../../types/genericAnswer';
import { storeToken, getToken, removeToken } from '../token.service';
import { API_URL } from '@env';

const BASE_URL = `${API_URL}/auth`;


//register
export const registerUser = async (registerData: RegisterRequest): Promise<ApiResponseError | ApiResponseSuccess> => {
  try {
      const response = await fetch(`${BASE_URL}/register`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(registerData),
      });

      if (!response.ok) {
          const errorResponse: ApiResponseError = await response.json();
          return errorResponse;
      }

      const successResponse: ApiResponseSuccess = await response.json();
      return successResponse;
  } catch (error) {
      // Aquí deberías manejar los errores de red u otros errores inesperados
      console.error('Error during registration:', error);
      throw error;
  }
};

//login
export const login = async (loginData: LoginRequest): Promise<LoginSuccessResponse | ApiResponseError> => {
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
export const getUserData = async (token: string): Promise<UserDataResponse | ApiResponseError> => {
  const response = await fetch(`${BASE_URL}/me`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
  });

  if (!response.ok) {
      const errorResponse: ApiResponseError = await response.json();
      return errorResponse;
  }

  const data: UserDataResponse = await response.json();
  return data;
};


//actualizar datos del usuario
export const updateUserData = async (userData: UpdateUserDto, token: string): Promise<ApiResponseError | ApiResponseSuccess> => {
  console.log("update",userData);
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

//request password reset
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

//reset password con code
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
