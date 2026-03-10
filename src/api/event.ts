import api from '@/lib/axios';
import { Event, APIResponse } from '@/types';

type CreateEventPayload = {
    title: string;
    description: string;
    location: string;
    start_date: string;
    end_date: string;
    capacity?: number;
    image_url?: string;
    tags?: string[];
};

type BackendEvent = {
    id: string;
    title: string;
    description: string;
    image_url?: string | null;
    location: string;
    start_date: string;
    end_date: string;
    attendee_count?: number;
    capacity?: number;
    tags?: string[];
    created_at?: string;
};

const mapBackendEvent = (event: BackendEvent): Event => ({
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.start_date,
    location: event.location,
    isOnline: false,
    interestedCount: event.attendee_count ?? 0,
    isInterested: false,
    thumbnailUrl: event.image_url ?? undefined,
    type: 'OTHER',
    createdAt: event.created_at ?? event.start_date,
});

export const eventApi = {
    getEvents: async (): Promise<APIResponse<Event[]>> => {
        const response = await api.get<APIResponse<BackendEvent[]>>('/events/');
        return {
            ...response.data,
            data: Array.isArray(response.data.data) ? response.data.data.map(mapBackendEvent) : [],
        };
    },
    getEventById: async (id: string): Promise<APIResponse<Event>> => {
        const response = await api.get<APIResponse<BackendEvent>>(`/events/${id}/`);
        return {
            ...response.data,
            data: mapBackendEvent(response.data.data),
        };
    },
    markInterest: async (id: string): Promise<APIResponse<void>> => {
        const response = await api.post(`/events/${id}/interest`);
        return response.data;
    },
    createEvent: async (eventData: CreateEventPayload): Promise<APIResponse<Event>> => {
        const response = await api.post<APIResponse<BackendEvent>>('/events/', eventData);
        return {
            ...response.data,
            data: mapBackendEvent(response.data.data),
        };
    },
};
