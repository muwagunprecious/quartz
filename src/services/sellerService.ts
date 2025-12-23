import api from '@/lib/api';

export const sellerService = {
    async getProfile() {
        const response = await api.get('/sellers/profile');
        return response.data;
    },

    async updateProfile(data: any) {
        const response = await api.patch('/sellers/profile', data);
        return response.data;
    },

    async getStore(storeId: string) {
        const response = await api.get(`/sellers/${storeId}`);
        return response.data;
    },

    async uploadProfileImage(formData: FormData) {
        const response = await api.post('/uploads/profiles', formData);
        return response.data;
    }
};
