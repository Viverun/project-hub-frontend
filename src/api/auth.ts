import api from '@/lib/axios';
import { AuthResponse, APIResponse } from '@/types';

type BackendUser = {
    id: string;
    unique_id?: string;
    name?: string;
    username?: string;
    email: string;
    first_name?: string;
    last_name?: string;
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

function isEmailLike(value?: string): boolean {
    if (!value) return false;
    return value.includes('@');
}

function normalizeDisplayName(user: BackendUser): string {
    const first = (user.first_name || '').trim();
    const last = (user.last_name || '').trim();
    const fullName = [first, last].filter(Boolean).join(' ').trim();

    const candidates = [
        fullName,
        (user.name || '').trim(),
        first,
        (user.username || '').trim(),
    ].filter(Boolean);

    const best = candidates.find((candidate) => !isEmailLike(candidate));
    if (best) return best;

    const fallbackFromEmail = (user.email || '').split('@')[0]?.trim();
    return fallbackFromEmail || 'User';
}

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
    const fallbackUniqueId = user.id ? `PH-${String(user.id).split('-')[0].toUpperCase()}` : undefined;

    return {
        id: user.id,
        uniqueId: user.unique_id || fallbackUniqueId,
        name: normalizeDisplayName(user),
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
