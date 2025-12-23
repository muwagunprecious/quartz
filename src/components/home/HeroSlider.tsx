"use client";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../common/Button';
import { api } from '@/lib/api';

const defaultSlides = [
    {
        id: 'default-1',
        title: "Back to School Deals",
        subtitle: "Up to 50% off on textbooks and stationery",
        cta_text: "Shop Now",
        image_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200",
        bgColor: "bg-blue-600"
    },
    {
        id: 'default-2',
        title: "Dorm Room Essentials",
        subtitle: "Make your space comfortable",
        cta_text: "Explore",
        image_url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1200",
        bgColor: "bg-orange-500"
    },
    {
        id: 'default-3',
        title: "Latest Gadgets",
        subtitle: "Laptops, phones and accessories",
        cta_text: "View Offers",
        image_url: "https://images.unsplash.com/photo-1593642632823-8f78536788c6?auto=format&fit=crop&q=80&w=1200",
        bgColor: "bg-purple-600"
    }
];

const bgColors = ["bg-blue-600", "bg-orange-500", "bg-purple-600", "bg-green-600", "bg-pink-600"];

interface Banner {
    id: string;
    title: string;
    subtitle?: string;
    cta_text?: string;
    image_url: string;
    is_active?: boolean;
}

export default function HeroSlider() {
    const [slides, setSlides] = useState<Banner[]>(defaultSlides);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await api.get('/public/banners');
                const activeBanners = response.data.filter((b: Banner) => b.is_active !== false);
                if (activeBanners.length > 0) {
                    setSlides(activeBanners);
                }
            } catch (error) {
                console.error('Failed to fetch banners, using defaults');
            } finally {
                setLoading(false);
            }
        };
        fetchBanners();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    // Helper to get full image URL
    const getImageUrl = (url: string) => {
        if (url.startsWith('http')) return url;
        return `http://127.0.0.1:5003${url}`;
    };

    return (
        <div className="w-full mb-8">
            {/* Primary Slider */}
            <div className="relative h-[300px] md:h-[380px] w-full max-w-[1000px] mx-auto rounded-[12px] overflow-hidden shadow-subtle group">
                {slides.map((slide, index) => {
                    const bgColor = (slide as any).bgColor || bgColors[index % bgColors.length];
                    return (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-opacity duration-500 flex ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                            {/* Left Content Overlay */}
                            <div className={`w-1/2 p-8 md:p-12 flex flex-col justify-center text-white z-20 ${bgColor} bg-opacity-90`}>
                                <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-2 leading-tight">
                                    {slide.title}
                                </h2>
                                <p className="font-inter text-lg opacity-90 mb-6 font-medium">
                                    {slide.subtitle || ''}
                                </p>
                                <div>
                                    <Button variant="primary" size="lg" className="shadow-lg">
                                        {slide.cta_text || 'Shop Now'}
                                    </Button>
                                </div>
                            </div>

                            {/* Right Image */}
                            <div className="w-1/2 relative h-full">
                                <img
                                    src={getImageUrl(slide.image_url)}
                                    alt={slide.title}
                                    className="w-full h-full object-cover"
                                />
                                {/* Gradient Overlay for smoothness */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${bgColor} to-transparent opacity-50`}></div>
                            </div>
                        </div>
                    );
                })}

                {/* Controls */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm z-30 opacity-0 group-hover:opacity-100 transition-opacity text-white"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm z-30 opacity-0 group-hover:opacity-100 transition-opacity text-white"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentSlide ? 'bg-primary w-6' : 'bg-white/50 hover:bg-white'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Secondary Banner */}
            <div className="mt-6 max-w-[1000px] mx-auto h-[120px] rounded-[10px] overflow-hidden relative flex items-center bg-gray-900 shadow-md">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-60" alt="Promo" />
                </div>
                <div className="relative z-10 w-full px-8 flex justify-between items-center text-white">
                    <div>
                        <h3 className="text-xl font-bold font-poppins">Sell on CampusMart</h3>
                        <p className="opacity-90 font-inter text-sm">Make money selling to your fellow students today.</p>
                    </div>
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                        Start Selling
                    </Button>
                </div>
            </div>
        </div>
    );
}

