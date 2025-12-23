import api from '@/lib/api';

export const reviewService = {
    async submitReview(data: { seller_id: string; rating: number; comment?: string }) {
        const response = await api.post('/reviews', data);
        return response.data;
    },

    async getSellerReviews(sellerId: string) {
        const response = await api.get(`/reviews/seller/${sellerId}`);
        return response.data;
    }
};
