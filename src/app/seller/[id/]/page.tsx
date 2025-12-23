"use client";

import React, { useState, useEffect } from 'react';
import SellerBanner from '@/components/seller/SellerBanner';
import ProductCard from '@/components/product/ProductCard';
import { sellerService } from '@/services/sellerService';
import { reviewService } from '@/services/reviewService';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/common/Button';
import { Star } from 'lucide-react';

export default function SellerPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const { user } = useAuth();
    const [seller, setSeller] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'products' | 'reviews'>('products');

    // Review form state
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchStore = async () => {
            try {
                const data = await sellerService.getStore(id);
                setSeller(data);
            } catch (error) {
                console.error("Failed to fetch store data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStore();
    }, [id]);

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            alert('Please login to leave a review');
            return;
        }
        setSubmitting(true);
        try {
            await reviewService.submitReview({
                seller_id: id,
                rating,
                comment
            });
            alert('Review submitted successfully!');
            setComment('');
            // Refresh data
            const updated = await sellerService.getStore(id);
            setSeller(updated);
        } catch (error: any) {
            alert(error.response?.data?.message || 'Failed to submit review');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading store...</div>;
    if (!seller) return <div className="min-h-screen flex items-center justify-center">Store not found</div>;

    return (
        <main className="min-h-screen pb-12 bg-gray-50 pt-6">
            <div className="container max-w-[1200px] mx-auto px-4">
                <SellerBanner
                    name={seller.store_name || seller.user.name}
                    bio={seller.bio}
                    rating={seller.rating}
                    productCount={seller.products?.length || 0}
                    university={seller.user.university?.name}
                    id={seller.id}
                />

                <div className="flex border-b border-gray-200 mb-8">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`px-6 py-3 font-medium text-sm transition-colors relative ${activeTab === 'products' ? 'text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Products ({seller.products?.length || 0})
                        {activeTab === 'products' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
                    </button>
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`px-6 py-3 font-medium text-sm transition-colors relative ${activeTab === 'reviews' ? 'text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Reviews ({seller.reviews?.length || 0})
                        {activeTab === 'reviews' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
                    </button>
                </div>

                {activeTab === 'products' ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {seller.products?.map((p: any) => (
                            <ProductCard key={p.id} {...p} images={p.images} rating={seller.rating} />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Reviews List */}
                        <div className="md:col-span-2 space-y-6">
                            {seller.reviews?.length === 0 ? (
                                <p className="text-gray-500 italic">No reviews yet. Be the first!</p>
                            ) : (
                                seller.reviews.map((r: any) => (
                                    <div key={r.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400">
                                                    {r.buyer.name[0]}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm">{r.buyer.name}</p>
                                                    <p className="text-xs text-gray-400">{new Date(r.created_at).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex text-orange-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={14} fill={i < r.rating ? "currentColor" : "none"} />
                                                ))}
                                            </div>
                                        </div>
                                        {r.comment && <p className="text-gray-600 text-sm leading-relaxed">{r.comment}</p>}
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Submit Review Form */}
                        <div className="md:col-span-1">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 sticky top-24">
                                <h3 className="font-bold mb-4">Leave a Review</h3>
                                <form onSubmit={handleReviewSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 uppercase mb-2">Rating</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <button
                                                    key={s}
                                                    type="button"
                                                    onClick={() => setRating(s)}
                                                    className={`p-1 transition-colors ${rating >= s ? 'text-orange-400' : 'text-gray-300'}`}
                                                >
                                                    <Star size={24} fill={rating >= s ? "currentColor" : "none"} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 uppercase mb-2">Your Comment</label>
                                        <textarea
                                            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-primary focus:border-primary"
                                            rows={4}
                                            placeholder="What was your experience with this seller?"
                                            value={comment}
                                            onChange={e => setComment(e.target.value)}
                                        />
                                    </div>
                                    <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
                                        {submitting ? 'Submitting...' : 'Post Review'}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
