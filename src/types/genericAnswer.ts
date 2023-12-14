export interface ApiResponseSuccess {
    message: string;
  }
  
  export interface ApiResponseError {
    status: number;
    error: {
        message: string;
        error: string;
        statusCode: number;
    };
  }