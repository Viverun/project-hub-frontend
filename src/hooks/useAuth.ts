'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/api/auth';
import { userApi } from '@/api/user';
import { User } from '@/types';
import { useQueryClient } from '@tanstack/react-query';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const queryClient = useQueryClient();

    const fetchProfile = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await userApi.getProfile();
            setUser(response.data);
            queryClient.setQueryData(['profile'], response.data);
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
        } finally {
            setIsLoading(false);
        }
    }, [queryClient]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && !user) {
            fetchProfile();
        }
    }, [fetchProfile, user]);

    const login = useCallback(async (credentials: Record<string, string>) => {
        setIsLoading(true);
        try {
            const response = await authApi.login(credentials);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            setUser(response.data.user);
            queryClient.setQueryData(['profile'], response.data.user);
            router.push('/dashboard');
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [router, queryClient]);

    const register = useCallback(async (userData: Record<string, string>) => {
        setIsLoading(true);
        try {
            const response = await authApi.register(userData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            setUser(response.data.user);
            queryClient.setQueryData(['profile'], response.data.user);
            router.push('/dashboard');
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [router, queryClient]);

    const logout = useCallback(() => {
        authApi.logout();
        setUser(null);
        queryClient.removeQueries({ queryKey: ['profile'] });
        router.push('/login');
    }, [router, queryClient]);

    return {
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user || (typeof window !== 'undefined' && !!localStorage.getItem('token')),
    };
}
