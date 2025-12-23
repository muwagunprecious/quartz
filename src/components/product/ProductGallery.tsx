"use client";
import React, { useState } from 'react';
import { getImageUrl } from '@/lib/api';

interface ProductGalleryProps {
    images: string[];
}

export default function ProductGallery({ images = [] }: ProductGalleryProps) {
    const [activeImage, setActiveImage] = useState(0);

    const displayImages = images.length > 0 ? images : ["/placeholder-product.png"];

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="w-full aspect-[4/5] md:aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                <img
                    src={getImageUrl(displayImages[activeImage])}
                    alt="Product View"
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    Click to enlarge
                </div>
            </div>

            {/* Thumbnails */}
            {displayImages.length > 1 && (
                <div className="flex gap-4 overflow-x-auto py-2">
                    {displayImages.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveImage(idx)}
                            className={`flex-shrink-0 w-16 h-16 rounded-[6px] overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-primary' : 'border-transparent hover:border-gray-200'
                                }`}
                        >
                            <img src={getImageUrl(img)} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
