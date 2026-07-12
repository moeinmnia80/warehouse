export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id?: string;
  email: string;
  fullName: string;
  role: "admin" | "manager";
  gender: "male" | "female" | null;
}

export interface AuthResponse {
  status: "success" | "fail";
  message: string;
  data: {
    fullName: string;
    email: string;
    role: "admin" | "manager";
    gender: null | "male" | "female";
    id: string;
    token: string;
  };
}
export interface GetMe {
  status: "success" | "fail";
  message: string;
  data?: {
    fullName: string;
    email: string;
    role: "admin" | "manager";
    gender: null | "male" | "female";
    id?: string;
  };
}
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface ErrorResponse {
  data: {
    error: { code: string; message: string };
    status: "fail" | "success";
  };
  status: string;
}
