import { api } from "@/lib/api/axios.config";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  firstName: string;
  lastName: string;
  role: "PATIENT" | "DOCTOR";
  phone?: string;
  language?: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data.data;
  },

  register: async (data: RegisterData) => {
    const response = await api.post("/auth/register", data);
    return response.data.data;
  },

  me: async () => {
    const response = await api.get("/auth/profile");
    return response.data.data;
  },

  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data.data;
  },
};
