import api from '@/lib/api';

export interface RiderProfile {
    id: string;
    user_id: string;
    university_id: string;
    is_online: boolean;
    verification_status: 'PENDING' | 'VERIFIED' | 'REJECTED';
    verification_document_type?: string;
    verification_document_url?: string;
    phone_verified: boolean;
    user?: {
        name: string;
        email: string;
        whatsapp_number: string;
    };
    university?: {
        name: string;
    };
}

export const riderService = {
    async getProfile() {
        const response = await api.get('/riders/me');
        return response.data;
    },

    async updateStatus(isOnline: boolean) {
        const response = await api.patch('/riders/status', { is_online: isOnline });
        return response.data;
    },

    async uploadVerificationDocument(formData: FormData) {
        const response = await api.post('/uploads/riders/verification', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    async submitVerification(documentType: string, documentUrl: string) {
        const response = await api.patch('/riders/verification', {
            document_type: documentType,
            document_url: documentUrl
        });
        return response.data;
    }
};
