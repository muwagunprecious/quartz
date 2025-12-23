"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from '@/components/product/ProductCard';
import { Search as SearchIcon, Filter } from 'lucide-react';
import { productService, Product } from '@/services/productService';
import Button from '@/components/common/Button';
import Loader from '@/components/common/Loader';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const initialQuery = searchParams.get('q') || '';
    const initialCategory = searchParams.get('category') || '';

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [filters, setFilters] = useState({
        category: initialCategory,
        minPrice: '',
        maxPrice: '',
        universityId: ''
    });

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const params: any = {};
            if (searchQuery) params.search = searchQuery;
            if (filters.category) params.category = filters.category;
            if (filters.universityId) params.universityId = filters.universityId;
            // Add price if supported by backend

            const data = await productService.getProducts(params);
            if (Array.isArray(data)) {
                setProducts(data);
            } else if (data.data && Array.isArray(data.data)) {
                setProducts(data.data);
            }
        } catch (error) {
            console.error("Search failed", error);
        } finally {
            setLoading(false);
        }
    }, [searchQuery, filters]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Update URL to match state (optional, for shareability)
        const params = new URLSearchParams();
        if (searchQuery) params.set('q', searchQuery);
        if (filters.category) params.set('category', filters.category);
        router.push(`/search?${params.toString()}`);

        fetchProducts();
    };

    return (
        <main className="min-h-screen pb-12 bg-gray-50 pt-6">
            <div className="container max-w-[1200px] mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-6">

                    {/* Filters Sidebar (Simplified) */}
                    <aside className="w-full md:w-64 flex-shrink-0 bg-white p-4 rounded-xl h-fit border border-gray-200">
                        <div className="flex items-center gap-2 font-bold mb-4 text-gray-700">
                            <Filter size={18} /> Filters
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block">Category</label>
                                <select
                                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                    value={filters.category}
                                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                >
                                    <option value="">All Categories</option>
                                    <option value="fashion">Fashion</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="books">Books</option>
                                    <option value="beauty">Beauty</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1 block">University</label>
                                <select
                                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                    value={filters.universityId}
                                    onChange={(e) => setFilters({ ...filters, universityId: e.target.value })}
                                >
                                    <option value="">All Campuses</option>
                                    <option value="unilag">UNILAG</option>
                                    <option value="oau">OAU</option>
                                    <option value="ui">UI</option>
                                </select>
                            </div>

                            <Button onClick={fetchProducts} className="w-full mt-2">Apply Filters</Button>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-grow">
                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="mb-6 relative">
                            <input
                                type="text"
                                placeholder="Search for products, brands and more..."
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
                                Search
                            </button>
                        </form>

                        {/* Results */}
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <Loader size="lg" />
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        title={product.title}
                                        price={product.price}
                                        image={product.images && product.images.length > 0 ? product.images[0].url : '/placeholder-product.png'}
                                        location={product.university?.name || "Campus"}
                                        rating={4.5}
                                        stock={product.stock_status === 'IN_STOCK' ? 10 : 0}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                                <SearchIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                                <p className="mt-1 text-gray-500">Try adjusting your search or filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
