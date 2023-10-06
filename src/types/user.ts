
export interface User {
    id?: number;
    first_name: string;
    email: string;
    password?: string;
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
    token: string;
    newPassword: string;
  }
  