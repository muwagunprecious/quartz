import api from '@/lib/api';

export const universityService = {
    getAll: async () => {
        const response = await api.get('/universities');
        return response.data;
    },
    getOne: async (id: string) => {
        const response = await api.get(`/universities/${id}`);
        return response.data;
    },
    create: async (data: any) => {
        const response = await api.post('/universities', data);
        return response.data;
    },
    update: async (id: string, data: any) => {
        const response = await api.patch(`/universities/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        const response = await api.delete(`/universities/${id}`);
        return response.data;
    },
};
