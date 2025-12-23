"use client";
import React, { useEffect, useState } from 'react';
import SellerBanner from '@/components/seller/SellerBanner';
import SellerFilters from '@/components/seller/SellerFilters';
import ProductCard from '@/components/product/ProductCard';
import Loader from '@/components/common/Loader';
import { sellerService } from '@/services/sellerService';

export default function SellerPage({ params }: { params: { id: string } }) {
    const [store, setStore] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStore = async () => {
            try {
                const data = await sellerService.getStore(params.id);
                setStore(data);
            } catch (err) {
                console.error("Failed to load store", err);
                setError("Failed to load store details.");
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchStore();
        }
    }, [params.id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader size="lg" />
        </div>
    );
    if (error || !store) return <div className="min-h-screen flex items-center justify-center text-red-500">{error || "Store not found"}</div>;

    const products = store.products || [];

    return (
        <main className="min-h-screen pb-12 bg-gray-50 pt-6">
            <div className="container max-w-[1200px] mx-auto px-4">
                <SellerBanner
                    id={store.id}
                    name={store.store_name || store.user?.name || "Seller"}
                    bio={store.bio || store.description}
                    rating={store.rating || 0}
                    productCount={products.length}
                    university={store.user?.university?.name}
                    whatsappNumber={store.user?.whatsapp_number}
                    logoUrl={store.logo_url}
                    bannerUrl={store.banner_url}
                />

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters */}
                    <div className="hidden lg:block lg:col-span-1">
                        <SellerFilters />
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-3">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-poppins font-semibold text-xl">All Products ({products.length})</h2>
                            <select className="bg-white border border-gray-200 rounded px-3 py-1.5 text-sm">
                                <option>Newest Arrivals</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                        </div>

                        {products.length === 0 ? (
                            <div className="bg-white p-12 text-center rounded-xl border border-gray-200 text-gray-500">
                                This seller hasn't listed any products yet.
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                {products.map((p: any) => (
                                    <ProductCard
                                        key={p.id}
                                        id={p.id}
                                        title={p.title}
                                        price={p.price}
                                        image={p.images?.[0]?.url || '/placeholder-product.png'}
                                        location={store.user?.university?.name || "Campus"}
                                        rating={4.5} // Placeholder for product specific rating
                                        stock={p.stock_status === 'IN_STOCK' ? 10 : 0}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
