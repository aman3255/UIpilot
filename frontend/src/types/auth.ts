// User interface matching the Mongoose schema
export interface User {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Login payload
export interface LoginPayload {
  email: string;
  password: string;
}

// Signup payload
export interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
}

// Auth response structure
export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

// Auth context type
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (payload: LoginPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}