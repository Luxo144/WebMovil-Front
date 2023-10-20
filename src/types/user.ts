export interface User {
    id?: number;
    first_name: string;
    email: string;
    password?: string;
  }

export interface Token{
  id: number;
  token: string;
  type: string;
  expires_at: Date;
  user_id: number;
}

export interface profile{
  id: number;
  user_id: number;
  image: string;
  name_: string;
  nickname: string;
  job_title: string;
  organization: string;
  ubication: string;
  phone: string;
}

export interface PasswordReset{
  id: number;
  user_id: number;
  token: string;
  expires_at: Date;
}

export interface CreateProfileData {
  user: User;
  image?: string;
  name_: string;
  nickname?: string;
  job_title?: string;
  organization?: string;
  ubication?: string;
  phone?: string;
}

export interface LoginResponseDto {
  accessToken: string;
  expiresIn: Date;
}

export interface RegisterData {
    first_name: string;
    email: string;
    password: string;
  }
  
  export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    accessToken: string;
    expiresIn: Date;
  }
  
  export interface PasswordResetRequest {
    email: string;
  }
  
  export interface PasswordReset {
    email: string;
    token: string;
    newPassword: string;
  }

  export interface UpdateProfileData {
    name_: string;
    nickname: string;
    job_title: string;
    organization: string;
    ubication?: string;
    phone?: string;
  }

  export interface UpdateUserData {
    name: string;
    email: string;
  }
  