import api from '@/lib/axios';
import { Project, ProjectFilter, APIResponse, PaginatedResponse } from '@/types';

export const projectApi = {
    getProjects: async (filters?: ProjectFilter, page = 1, limit = 10): Promise<APIResponse<PaginatedResponse<Project>>> => {
        const response = await api.get('/projects', { params: { ...filters, page, limit } });
        return response.data;
    },
    getProjectById: async (id: string): Promise<APIResponse<Project>> => {
        const response = await api.get(`/projects/${id}`);
        return response.data;
    },
    createProject: async (projectData: Partial<Project>): Promise<APIResponse<Project>> => {
        const response = await api.post('/projects', projectData);
        return response.data;
    },
    updateProject: async (id: string, projectData: Partial<Project>): Promise<APIResponse<Project>> => {
        const response = await api.patch(`/projects/${id}`, projectData);
        return response.data;
    },
    deleteProject: async (id: string): Promise<APIResponse<void>> => {
        const response = await api.delete(`/projects/${id}`);
        return response.data;
    },
    bookmarkProject: async (id: string): Promise<APIResponse<void>> => {
        const response = await api.post(`/projects/${id}/bookmark`);
        return response.data;
    },
};
