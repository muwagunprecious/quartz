"use client";
import React, { useEffect, useState } from 'react';
import Loader from '@/components/common/Loader';
import ProductGallery from '@/components/product/ProductGallery';
import ProductDetails from '@/components/product/ProductDetails';
import SellerInfoCard, { DeliveryCard } from '@/components/product/ProductSideCards';
// import ProductTabs from '@/components/product/ProductTabs';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import { productService, Product } from '@/services/productService';
import ProductRecommendations from '@/components/product/ProductRecommendations';
import ProductSpecs from '@/components/product/ProductSpecs';

export default function ProductPage({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await productService.getProductById(params.id);
                setProduct(data);
                // Background increment views
                productService.incrementViews(params.id).catch(console.error);
            } catch (err) {
                console.error("Failed to load product", err);
                setError("Failed to load product details.");
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchProduct();
        }
    }, [params.id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader size="lg" />
        </div>
    );
    if (error || !product) return <div className="min-h-screen flex items-center justify-center text-red-500">{error || "Product not found"}</div>;

    return (
        <main className="min-h-screen pb-12 bg-gray-50 pt-6">
            <div className="container max-w-[1200px] mx-auto px-4">
                {/* Breadcrumb (simplified) */}
                <div className="text-xs text-textmuted mb-4 flex items-center gap-2">
                    <span>Home</span> / <span>{product.category?.name || "Product"}</span> / <span className="text-textprimary">{product.title}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Use 60/40 Split */}
                    <div className="lg:col-span-7 xl:col-span-8 bg-white p-4 rounded-[12px] h-fit">
                        <ProductGallery images={product.images?.map(img => img.url) || []} />
                    </div>

                    <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
                        <div className="bg-white p-6 rounded-[12px] border border-gray-200 shadow-sm relative">
                            <ProductDetails product={product} />
                            <ProductSpecs specifications={product.specifications} />
                        </div>
                        <div>
                            <DeliveryCard
                                universityName={product.university?.name || "Campus"}
                                city={product.university?.name || "Lagos"} // Fallback as city not in minimal type
                            />
                            <SellerInfoCard
                                sellerName={product.seller?.user?.name || "Seller"}
                                role="Student Seller"
                                joinDate="Sep 2023"
                                rating={product.seller?.rating || 4.5}
                                sellerId={product.seller?.id}
                                whatsappNumber={product.seller?.user?.whatsapp_number}
                            />
                        </div>
                    </div>
                </div>

                {/* Tabs Section (Full Width below) */}
                <div className="mt-8">
                    {/* <ProductTabs /> - Removing Tabs as descriptions/reviews are inline or managed in Details */}
                </div>

                {/* Recommendations */}
                <ProductRecommendations categoryId={product.category?.id} currentProductId={product.id} />

                {/* Related Products Placeholder if needed, but Recs cover it */}
                {/* <div className="mt-12">
                    <FeaturedProducts />
                </div> */}
            </div>
        </main>
    );
}

