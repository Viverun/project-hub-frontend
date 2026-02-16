import api from '@/lib/axios';
import { AuthResponse, APIResponse } from '@/types';

export const authApi = {
    login: async (credentials: Record<string, string>): Promise<APIResponse<AuthResponse>> => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },
    register: async (userData: Record<string, string>): Promise<APIResponse<AuthResponse>> => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    },
};
