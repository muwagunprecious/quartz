"use client";

import React from 'react';
import Link from 'next/link';
import Button from '@/components/common/Button';
import Loader from '@/components/common/Loader';
import { productService } from '@/services/productService';
import { sellerService } from '@/services/sellerService';
import { Plus, Package, TrendingUp, BarChart, Truck, Star } from 'lucide-react';
import { getImageUrl } from '@/lib/api';

export default function SellerDashboard() {
    const [stats, setStats] = React.useState({ totalProducts: 0, totalViews: 0, totalClicks: 0, clickThroughRate: "0", rating: 0 });
    const [products, setProducts] = React.useState<any[]>([]);
    const [profile, setProfile] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const loadData = async () => {
            try {
                const [statsData, productsData, profileData] = await Promise.all([
                    productService.getSellerStats(),
                    productService.getMyProducts(),
                    sellerService.getProfile()
                ]);
                setStats({ ...statsData, rating: profileData.rating });
                setProfile(profileData);
                // Handle pagination wrapper if exists
                setProducts(Array.isArray(productsData) ? productsData : productsData.data || []);
            } catch (e) {
                console.error("Failed to load seller data", e);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const toggleStock = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'IN_STOCK' ? 'OUT_OF_STOCK' : 'IN_STOCK';
        try {
            await productService.updateProduct(id, { stock_status: newStatus });
            setProducts(prev => prev.map(p => p.id === id ? { ...p, stock_status: newStatus } : p));
        } catch (e) {
            alert("Failed to update stock");
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 pb-12 pt-6">
            <div className="container max-w-[1200px] mx-auto px-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold font-poppins text-gray-900">Seller Dashboard</h1>
                        <p className="text-gray-500 text-sm">Manage your inventory and track performance.</p>
                    </div>
                    <div className="flex flex-wrap gap-2 lg:gap-3">
                        {profile && (
                            <Link href={`/seller/${profile.id}`} className="flex-1 sm:flex-none">
                                <Button variant="outline" className="w-full">
                                    Visit Store
                                </Button>
                            </Link>
                        )}
                        <Link href="/seller/dashboard/delivery-request" className="flex-1 sm:flex-none">
                            <Button variant="outline" leftIcon={<Truck size={18} />} className="w-full">
                                Request Rider
                            </Button>
                        </Link>
                        <Link href="/seller/dashboard/settings" className="flex-1 sm:flex-none">
                            <Button variant="outline" className="w-full">
                                Store Settings
                            </Button>
                        </Link>
                        <Link href="/seller/dashboard/create-product" className="w-full sm:w-auto">
                            <Button variant="primary" leftIcon={<Plus size={18} />} className="w-full">
                                Upload New Product
                            </Button>
                        </Link>
                    </div>
                </div>

                {profile && !profile.user?.whatsapp_number && (
                    <div className="mb-6 bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                                <Plus size={20} className="rotate-45" /> {/* Using Plus rotated as a close/alert cross or just use another icon */}
                            </div>
                            <div>
                                <h4 className="font-bold text-orange-900 text-sm">WhatsApp Number Missing</h4>
                                <p className="text-orange-700 text-xs">You must add your WhatsApp number in settings to upload products and receive inquiries.</p>
                            </div>
                        </div>
                        <Link href="/seller/dashboard/settings">
                            <Button variant="outline" size="sm" className="border-orange-200 text-orange-700 hover:bg-orange-100 whitespace-nowrap">
                                Add Number
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <Package size={20} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs font-medium">Submissions</p>
                            <h3 className="text-xl font-bold text-gray-900">{products.length || stats.totalProducts}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                            <BarChart size={20} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs font-medium">Views</p>
                            <h3 className="text-xl font-bold text-gray-900">{stats.totalViews}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                            <TrendingUp size={20} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs font-medium">Clicks</p>
                            <h3 className="text-xl font-bold text-gray-900">{stats.totalClicks}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                            <Star size={20} fill="currentColor" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs font-medium">Rating</p>
                            <h3 className="text-xl font-bold text-gray-900">{stats.rating.toFixed(1)} / 5.0</h3>
                        </div>
                    </div>
                </div>

                {/* Recent Products / Inventory */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900">Your Inventory</h3>
                        <Button variant="outline" size="sm">View All</Button>
                    </div>
                    <div className="p-0">
                        {loading ? (
                            <div className="p-8 flex justify-center text-gray-500">
                                <Loader size="lg" />
                            </div>
                        ) : products.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">No products found. Start selling!</div>
                        ) : (
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">Product</th>
                                        <th className="px-6 py-3 font-medium">Price</th>
                                        <th className="px-6 py-3 font-medium">Status</th>
                                        <th className="px-6 py-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {products.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-100 rounded-md overflow-hidden">
                                                        <img src={getImageUrl(product.images?.[0]?.url) || '/placeholder.png'} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                    <span className="font-medium text-sm text-gray-900 line-clamp-1">{product.title}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">₦{product.price.toLocaleString()}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.stock_status === 'IN_STOCK' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {product.stock_status === 'IN_STOCK' ? 'In Stock' : 'Out of Stock'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => toggleStock(product.id, product.stock_status)}
                                                    className="text-primary hover:text-primary-dark text-sm font-medium transition-colors"
                                                >
                                                    {product.stock_status === 'IN_STOCK' ? 'Mark Out of Stock' : 'Restock'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
