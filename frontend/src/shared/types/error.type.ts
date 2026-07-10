export interface ErrorType {
  status: number;
  data: {
    error: { code: string; message: string; details: null | string };
    success: boolean;
  };
}
