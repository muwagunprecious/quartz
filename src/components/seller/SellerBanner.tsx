import React from 'react';
import { Star, MessageCircle, ShieldCheck, Clock } from 'lucide-react';
import Button from '../common/Button';

interface SellerBannerProps {
    name: string;
    bio?: string;
    rating: number;
    productCount: number;
    university?: string;
    id: string;
    whatsappNumber?: string;
    logoUrl?: string;
    bannerUrl?: string;
}

export default function SellerBanner({ name = 'Seller', bio, rating = 0, productCount = 0, university, id, whatsappNumber, logoUrl, bannerUrl }: SellerBannerProps) {
    const bannerImage = bannerUrl || "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&q=80&w=1200";
    const logoImage = logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
    return (
        <div className="bg-white border rounded-[12px] overflow-hidden mb-6 shadow-sm">
            {/* Cover Image */}
            <div className="h-40 bg-gray-100 relative">
                <img
                    src={bannerImage}
                    alt="Cover"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Info Bar */}
            <div className="px-5 md:px-8 pb-6 flex flex-col md:flex-row md:items-end -mt-10 gap-4 md:gap-6 relative">
                {/* Profile Image */}
                <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-white shadow-sm shrink-0">
                    <img
                        src={logoImage}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Details */}
                <div className="flex-1 w-full md:w-auto mt-2 md:mt-0 pt-2 md:pt-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="font-poppins font-bold text-2xl text-textprimary mb-1 flex items-center gap-2">
                                {name}
                                <ShieldCheck size={20} className="text-primary" />
                            </h1>
                            <p className="text-textmuted text-sm font-inter">Verified Seller • {university || 'CampusMart'}</p>
                            {bio && <p className="text-gray-500 text-sm mt-1">{bio}</p>}
                        </div>

                        <div className="flex gap-3">
                            {whatsappNumber ? (
                                <a href={`https://wa.me/${whatsappNumber.replace(/\+/g, '').replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer">
                                    <Button variant="secondary" size="md" leftIcon={<MessageCircle size={18} />}>
                                        WhatsApp
                                    </Button>
                                </a>
                            ) : (
                                <Button variant="secondary" size="md" disabled leftIcon={<MessageCircle size={18} />}>
                                    WhatsApp
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 md:gap-6 mt-4 pt-4 border-t border-gray-100 overflow-x-auto pb-2 scrollbar-hide shrink-0">
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <div className="bg-orange-100 p-1.5 rounded-full text-orange-600"><Star size={16} fill="currentColor" /></div>
                            <div>
                                <p className="font-bold text-sm">{rating.toFixed(1)}</p>
                                <p className="text-xs text-textmuted">Rating</p>
                            </div>
                        </div>
                        <div className="w-[1px] h-8 bg-gray-200 flex-shrink-0"></div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <div className="bg-blue-100 p-1.5 rounded-full text-blue-600"><Clock size={16} /></div>
                            <div>
                                <p className="font-bold text-sm">~20m</p>
                                <p className="text-xs text-textmuted">Response</p>
                            </div>
                        </div>
                        <div className="w-[1px] h-8 bg-gray-200 flex-shrink-0"></div>
                        <div className="flex-shrink-0">
                            <p className="font-bold text-sm">{productCount}</p>
                            <p className="text-xs text-textmuted">Products</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
