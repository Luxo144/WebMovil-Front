export interface ApiResponseSuccess {
    Message: string;
  }
  
  export interface ApiResponseError {
    status: number;
    error: {
        message: string;
        error: string;
        statusCode: number;
    };
  }