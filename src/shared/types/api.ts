export interface ApiError {
  code: string;
  message: string;
  details: Record<string, string[]>;
}

export type ApiResponse<T> =
  | {
      success: true;
      data: T;
      error: null;
    }
  | {
      success: false;
      data: null;
      error: ApiError;
    };
