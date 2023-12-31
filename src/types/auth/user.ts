export interface User {
    id: number;
    email: string;
    password: string;
}

export interface Token{
  id: number;
  token: string;
  type: string;
  expires_at: Date;
  user_id: number;
}

export interface Profile{
  id: number;
  nickname: string;
  first_name: string;
  last_name: string;
  job_position: string;
  location: string;
  profile_picture: string;
  contact: string;
  user_id: number;
}

//datos de envio

export interface RegisterRequest {
  first_name: string;
  email: string;
  password: string;
}

export interface LoginRequest{
  email: string;
  password: string;
}

export interface ChangePassword{
  password: string;
  newPassword: string;
}

export interface ResetPasswordDto{
  token: string;
  newPassword: string;
}

export interface UpdateUserDto{
  email: string;
  nickname: string;
  first_name: string;
  last_name: string;
  job_position: string;
  location: string;
  profile_picture: string;
  contact: string;
}

export interface RequestPasswordReset{
  email: string;
}

// Específicas para operaciones de respuestas

export interface LoginSuccessResponse {
  accessToken: {
      accessToken: string;
      expiresIn: string; 
  };
}

export interface UserDataResponse {
  id: number;
  email: string;
  password_hash?: string; 
  is_active: boolean;
  is_verified: boolean;
  createdAt: string; 
  updatedAt: string; 
  profile: UserProfile;
}

export interface UserProfile {
  id: number;
  nickname: string;
  first_name: string;
  last_name: string;
  job_position: string;
  location: string;
  profile_picture: string;
  contact: string;
  createdAt: string; // O Date
  updatedAt: string; // O Date
}
