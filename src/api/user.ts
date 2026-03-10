import api from '@/lib/axios';
import { User, APIResponse } from '@/types';

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

function mapUser(user: BackendUser): User {
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

export const userApi = {
    getProfile: async (): Promise<APIResponse<User>> => {
        const response = await api.get('/user/profile');
        return {
            ...response.data,
            data: mapUser(response.data?.data || {}),
        };
    },
    updateProfile: async (userData: Partial<User>): Promise<APIResponse<User>> => {
        const payload: Record<string, unknown> = {};

        if (typeof userData.name === 'string') payload.first_name = userData.name;
        if (typeof userData.bio === 'string') payload.bio = userData.bio;
        if (typeof userData.avatarUrl === 'string') payload.profile_picture_url = userData.avatarUrl;
        if (typeof userData.githubUsername === 'string') payload.github_username = userData.githubUsername;
        if (typeof userData.leetCodeUrl === 'string') payload.leetcode_username = userData.leetCodeUrl;
        if (Array.isArray(userData.skills)) payload.skills = userData.skills;

        const response = await api.patch('/user/profile', payload);
        return {
            ...response.data,
            data: mapUser(response.data?.data || {}),
        };
    },
    getGitHubStats: async (username: string): Promise<APIResponse<Record<string, unknown>>> => {
        const response = await api.get(`/user/github/${username}`);
        return response.data;
    },
};
