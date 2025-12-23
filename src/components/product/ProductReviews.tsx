"use client";

import React, { useState } from 'react';
import { Star, User } from 'lucide-react';
import Button from '@/components/common/Button';

export default function ProductReviews({ productId }: { productId: string }) {
    // Mock reviews
    const [reviews, setReviews] = useState([
        { id: 1, user: "Tobi A.", rating: 5, date: "2 days ago", comment: "Exactly as described. Fast delivery!" },
        { id: 2, user: "Chidinma O.", rating: 4, date: "1 week ago", comment: "Good quality but slightly delayed pickup." }
    ]);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(5);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In real app: api.post(`/products/${productId}/reviews`, ...)
        setReviews([{
            id: Date.now(),
            user: "You",
            rating: newRating,
            date: "Just now",
            comment: newComment
        }, ...reviews]);
        setNewComment("");
    };

    return (
        <div className="mt-8 pt-8 border-t border-gray-100">
            <h3 className="font-bold text-lg mb-4 text-gray-900">Reviews ({reviews.length})</h3>

            <div className="space-y-6 mb-8">
                {reviews.map(review => (
                    <div key={review.id} className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <User size={20} className="text-gray-400" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-sm text-gray-900">{review.user}</span>
                                <span className="text-xs text-gray-400">• {review.date}</span>
                            </div>
                            <div className="flex text-yellow-400 mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "text-yellow-400" : "text-gray-300"} />
                                ))}
                            </div>
                            <p className="text-sm text-gray-600">{review.comment}</p>
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-semibold text-sm mb-3">Write a Review</h4>
                <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map(star => (
                        <button key={star} type="button" onClick={() => setNewRating(star)} className="text-yellow-400">
                            <Star size={20} fill={star <= newRating ? "currentColor" : "none"} className={star <= newRating ? "text-yellow-400" : "text-gray-300"} />
                        </button>
                    ))}
                </div>
                <textarea
                    className="w-full p-3 rounded-lg border border-gray-200 text-sm focus:ring-primary focus:border-primary mb-3"
                    rows={3}
                    placeholder="Share your experience..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                />
                <Button type="submit" variant="primary" size="sm">Post Review</Button>
            </form>
        </div>
    );
}
