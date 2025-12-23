"use client";

import React, { useEffect, useState } from 'react';
import ProductCard from '../product/ProductCard';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Loader from '@/components/common/Loader';
import { productService, Product } from '@/services/productService';

export default function FeaturedProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getProducts({ limit: 8 });
                // Ensure data is an array (handle paginated response if backend returns { data: [], total: ... })
                if (Array.isArray(data)) {
                    setProducts(data);
                } else if (data.data && Array.isArray(data.data)) {
                    setProducts(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch featured products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center py-10">
                <Loader />
            </div>
        );
    }

    if (products.length === 0) {
        return null; // Or show "No products found"
    }

    return (
        <section className="mb-12">
            <div className="flex items-center justify-between mb-6 px-2">
                <h3 className="font-poppins font-semibold text-xl text-textprimary">Recommended Products</h3>
                <Link href="/search" className="text-primary font-medium text-sm flex items-center hover:underline">
                    View All <ChevronRight size={16} />
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        image={product.images && product.images.length > 0 ? product.images[0].url : '/placeholder-product.png'}
                        location={product.university?.name || (product.seller?.store_name && `${product.seller.store_name} Store`) || "Campus"}
                        rating={4.5} // Placeholder until added to backend
                        stock={product.stock_status === 'IN_STOCK' ? 10 : 0}
                    />
                ))}
            </div>
        </section>
    );
}

