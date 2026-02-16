import api from '@/lib/axios';
import { Event, APIResponse } from '@/types';

export const eventApi = {
    getEvents: async (): Promise<APIResponse<Event[]>> => {
        const response = await api.get('/events');
        return response.data;
    },
    getEventById: async (id: string): Promise<APIResponse<Event>> => {
        const response = await api.get(`/events/${id}`);
        return response.data;
    },
    markInterest: async (id: string): Promise<APIResponse<void>> => {
        const response = await api.post(`/events/${id}/interest`);
        return response.data;
    },
};
