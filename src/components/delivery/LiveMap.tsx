"use client";
import React from 'react';
import { MapPin, Navigation, Home, Zap } from 'lucide-react';

interface LiveMapProps {
    riderLocation?: { lat: number; lng: number };
}

export default function LiveMap({ riderLocation = { lat: 10, lng: 10 } }: LiveMapProps) {
    // Mock Map Concept: 
    // A simple 100x100 grid container.
    // Seller at (10, 10).
    // Buyer at (90, 90).
    // Rider interpolates between them.

    return (
        <div className="w-full h-48 bg-blue-50/50 rounded-xl relative overflow-hidden border border-blue-100 mb-4">
            {/* Background Grid - Map Texture */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'linear-gradient(#1A73E8 1px, transparent 1px), linear-gradient(90deg, #1A73E8 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }}></div>

            {/* Route Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="10%" y1="10%" x2="90%" y2="90%" stroke="#1A73E8" strokeWidth="2" strokeDasharray="4 4" className="opacity-30" />
            </svg>

            {/* Seller Marker (Start) */}
            <div className="absolute top-[10%] left-[10%] w-8 h-8 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-200 text-gray-400">
                    <Home size={12} />
                </div>
                <span className="text-[10px] font-bold text-gray-500 mt-1">Seller</span>
            </div>

            {/* Buyer Marker (End) */}
            <div className="absolute top-[90%] left-[90%] w-8 h-8 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-md shadow-orange-200">
                    <MapPin size={12} />
                </div>
                <span className="text-[10px] font-bold text-deepblue mt-1">You</span>
            </div>

            {/* Rider Marker (Animated) */}
            <div
                className="absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out z-10 flex flex-col items-center"
                style={{
                    top: `${riderLocation.lat}%`,
                    left: `${riderLocation.lng}%`
                }}
            >
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-300 ring-4 ring-blue-100 animate-pulse-slow">
                    <Zap size={16} fill="white" />
                </div>
                <div className="bg-white px-2 py-0.5 rounded-full shadow-sm text-[10px] font-bold text-blue-600 whitespace-nowrap mt-1 border border-blue-100">
                    Rider
                </div>
            </div>

        </div>
    );
}
