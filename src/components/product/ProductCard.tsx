"use client";
import React from 'react';
import { Heart, Star, MapPin, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Badge from '../common/Badge';
import { useWishlist } from '@/hooks/useWishlist';
import { getImageUrl } from '@/lib/api';

interface ProductCardProps {
    id: string;
    title: string;
    price: number;
    oldPrice?: number;
    image: string;
    location: string;
    rating: number;
    stock: number;
    discount?: string;
}

export default function ProductCard({ id, title, price, oldPrice, image, location, rating, stock, discount }: ProductCardProps) {
    const isOutOfStock = stock === 0;

    const { isInWishlist, toggleWishlist } = useWishlist();
    const liked = isInWishlist(id);

    return (
        <div className="group bg-white rounded-[12px] border border-transparent hover:border-gray-200 hover:shadow-subtle transition-all duration-300 overflow-hidden relative flex flex-col h-full">
            {/* Image Area */}
            <Link href={`/product/${id}`} className="relative h-[200px] w-full bg-gray-100 overflow-hidden block">
                <img
                    src={getImageUrl(image)}
                    alt={title}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isOutOfStock ? 'opacity-50 grayscale' : ''}`}
                />

                {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <span className="bg-red-600 text-white px-3 py-1 rounded-md font-bold text-sm uppercase">Out of Stock</span>
                    </div>
                )}

                {discount && !isOutOfStock && (
                    <div className="absolute top-2 left-2">
                        <Badge variant="warning" className="bg-primary text-white">{discount}</Badge>
                    </div>
                )}

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(id);
                    }}
                    className={`absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm transition-all opacity-0 group-hover:opacity-100 ${liked ? 'text-red-500 opacity-100' : 'text-gray-400 hover:text-red-500'}`}
                >
                    <Heart size={18} fill={liked ? "currentColor" : "none"} />
                </button>
            </Link>

            {/* Content */}
            <div className="p-3 flex flex-col flex-grow">
                <Link href={`/product/${id}`} className="block">
                    <h3 className="text-textprimary font-medium text-[15px] leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                </Link>

                <div className="mt-auto">
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-textprimary font-bold text-lg font-inter">₦{price.toLocaleString()}</span>
                        {oldPrice && (
                            <span className="text-textmuted text-xs line-through">₦{oldPrice.toLocaleString()}</span>
                        )}
                    </div>

                    <div className="flex items-center gap-1 text-textmuted text-xs mb-3">
                        <MapPin size={12} />
                        <span className="line-clamp-1">{location}</span>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                        <div className="flex items-center gap-1 text-yellow-500">
                            <Star size={14} fill="currentColor" />
                            <span className="text-textmuted text-xs font-medium">{rating}</span>
                        </div>

                        <Link href={`/product/${id}`} className="text-primary text-xs font-semibold px-2 py-1 bg-orange-50 rounded hover:bg-orange-100 transition-colors">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
