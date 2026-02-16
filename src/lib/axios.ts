import axios from 'axios';
import { MOCK_USER, MOCK_PROJECTS, MOCK_EVENTS, MOCK_STUDENT } from './mockData';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Mocking Interceptor for Demo Purpose
api.interceptors.request.use(
    async (config) => {
        // If we are in development and no real API is responding, or we want to force mock
        if (process.env.NODE_ENV === 'development') {
            const mockRoutes: Record<string, Record<string, unknown>> = {
                '/auth/login': { data: { user: MOCK_STUDENT, token: 'mock-token', refreshToken: 'mock-refresh' }, message: 'Login successful' },
                '/auth/register': { data: { user: MOCK_STUDENT, token: 'mock-token', refreshToken: 'mock-refresh' }, message: 'Registered' },
                '/user/profile': { data: MOCK_STUDENT, message: 'Profile fetched' },
                '/projects': { data: { items: MOCK_PROJECTS, page: 1, totalPages: 1, totalItems: 2 }, message: 'Projects fetched' },
                '/events': { data: { items: MOCK_EVENTS, page: 1, totalPages: 1, totalItems: 2 }, message: 'Events fetched' },
            };

            const route = Object.keys(mockRoutes).find(r => config.url?.includes(r));

            if (route) {
                // Short-circuit the request with a mock response
                config.adapter = async () => ({
                    data: mockRoutes[route],
                    status: 200,
                    statusText: 'OK',
                    headers: {},
                    config,
                });
            }
        }

        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Custom error for no internet or server down - can be used to fail-over to mock
        if (!error.response && process.env.NODE_ENV === 'development') {
            // We can handle specific failover here if needed
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
                    refreshToken,
                });

                const { token } = response.data.data;
                localStorage.setItem('token', token);

                originalRequest.headers.Authorization = `Bearer ${token}`;
                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
