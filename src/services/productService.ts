import api from '@/lib/api';

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    condition?: string;
    stock_status: 'IN_STOCK' | 'OUT_OF_STOCK';
    is_published: boolean;
    whatsapp_number?: string;
    specifications?: string;
    images: { url: string; order_index: number }[];
    seller?: {
        id: string;
        store_name: string;
        rating: number;
        user: { name: string; whatsapp_number?: string };
    };
    category?: { id: string; name: string };
    university?: { id: string; name: string };
}

export const productService = {
    async getProducts(params?: any) {
        const response = await api.get('/products', { params });
        return response.data;
    },

    async getProductById(id: string) {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    async createProduct(productData: any) {
        const response = await api.post('/products', productData);
        return response.data;
    },

    async uploadImages(formData: FormData) {
        const response = await api.post('/uploads/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    async getMyProducts() {
        const response = await api.get('/products/me');
        return response.data;
    },

    async getSellerStats() {
        const response = await api.get('/products/stats');
        return response.data;
    },

    async updateProduct(id: string, data: any) {
        const response = await api.patch(`/products/${id}`, data);
        return response.data;
    },

    async getCategories() {
        const response = await api.get('/products/categories'); // Adjust endpoint if needed
        return response.data;
    },

    async incrementViews(id: string) {
        return api.post(`/products/${id}/view`);
    },

    async incrementClicks(id: string) {
        return api.post(`/products/${id}/click`);
    }
};
