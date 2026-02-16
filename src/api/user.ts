import api from '@/lib/axios';
import { User, APIResponse } from '@/types';

export const userApi = {
    getProfile: async (): Promise<APIResponse<User>> => {
        const response = await api.get('/user/profile');
        return response.data;
    },
    updateProfile: async (userData: Partial<User>): Promise<APIResponse<User>> => {
        const response = await api.patch('/user/profile', userData);
        return response.data;
    },
    getGitHubStats: async (username: string): Promise<APIResponse<Record<string, unknown>>> => {
        const response = await api.get(`/user/github/${username}`);
        return response.data;
    },
};
