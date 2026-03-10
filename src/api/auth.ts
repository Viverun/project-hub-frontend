import api from '@/lib/axios';
import { AuthResponse, APIResponse } from '@/types';

type BackendUser = {
    id: string;
    username?: string;
    email: string;
    first_name?: string;
    profile_picture_url?: string;
    bio?: string;
    github_username?: string;
    leetcode_username?: string;
    role?: 'STUDENT' | 'DEPARTMENT';
    skills?: string[];
    followersCount?: number;
    followingCount?: number;
    projectsCount?: number;
    created_at?: string;
};

function resolveRole(user: BackendUser): 'STUDENT' | 'DEPARTMENT' {
    if (user.role === 'DEPARTMENT') return 'DEPARTMENT';

    const storedRole =
        typeof window !== 'undefined'
            ? localStorage.getItem('userRole')
            : null;
    if (storedRole === 'DEPARTMENT' || storedRole === 'STUDENT') {
        return storedRole;
    }

    const localPart = (user.email || '').split('@')[0] || '';
    const isLikelyStudent = /^\d+$/.test(localPart);
    return isLikelyStudent ? 'STUDENT' : 'DEPARTMENT';
}

function mapUser(user: BackendUser) {
    const normalizedRole = resolveRole(user);

    return {
        id: user.id,
        name: user.first_name || user.username || user.email?.split('@')[0] || 'User',
        email: user.email,
        role: normalizedRole,
        avatarUrl: user.profile_picture_url,
        bio: user.bio || '',
        skills: user.skills || [],
        githubUsername: user.github_username,
        leetCodeUrl: user.leetcode_username,
        followersCount: user.followersCount || 0,
        followingCount: user.followingCount || 0,
        projectsCount: user.projectsCount || 0,
        createdAt: user.created_at || new Date().toISOString(),
    };
}

export const authApi = {
    login: async (credentials: Record<string, string>): Promise<APIResponse<AuthResponse>> => {
        const response = await api.post('/auth/login', {
            email: credentials.email,
            password: credentials.password,
        });
        const data = response.data?.data || {};

        return {
            ...response.data,
            data: {
                user: mapUser(data.user || {}),
                token: data.token || data.access_token,
                refreshToken: data.refreshToken || data.refresh_token,
            },
        };
    },
    register: async (userData: Record<string, string>): Promise<APIResponse<AuthResponse>> => {
        const response = await api.post('/auth/register', {
            name: userData.name,
            email: userData.email,
            password: userData.password,
        });
        const data = response.data?.data || {};

        return {
            ...response.data,
            data: {
                user: mapUser(data.user || {}),
                token: data.token || data.access_token,
                refreshToken: data.refreshToken || data.refresh_token,
            },
        };
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    },
};
