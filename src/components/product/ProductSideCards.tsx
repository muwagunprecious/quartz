import React from 'react';
import { Truck, RotateCcw, ShieldCheck, MapPin, ExternalLink } from 'lucide-react';
import Button from '../common/Button';
import Link from 'next/link';

export function DeliveryCard({ universityName = "Campus", city = "" }: { universityName?: string, city?: string }) {
    return (
        <div className="bg-white rounded-[12px] border border-gray-200 p-5 shadow-sm mb-4">
            <h4 className="font-inter font-bold text-sm text-textprimary mb-4 uppercase text-gray-500 tracking-wider border-b border-gray-100 pb-2">Delivery & Returns</h4>

            <div className="space-y-4">
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-deepblue flex-shrink-0">
                        <RotateCcw size={16} />
                    </div>
                    <div>
                        <p className="font-semibold text-sm mb-0.5">1 Days Return</p>
                        <p className="text-textmuted text-xs">Free return within 24 hours of purchase if item is defective.</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-deepblue flex-shrink-0">
                        <Truck size={16} />
                    </div>
                    <div>
                        <p className="font-semibold text-sm mb-0.5">Pickup Available</p>
                        <p className="text-textmuted text-xs">Meet seller on {universityName} for pickup.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SellerInfoCard({ sellerName, role, joinDate, rating, sellerId, whatsappNumber }: { sellerName: string, role: string, joinDate: string, rating: number, sellerId?: string, whatsappNumber?: string }) {
    return (
        <div className="bg-white rounded-[12px] border border-gray-200 p-5 shadow-sm">
            <h4 className="font-inter font-bold text-sm text-textprimary mb-4 uppercase text-gray-500 tracking-wider border-b border-gray-100 pb-2">Seller Information</h4>

            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                    <div className="w-full h-full bg-purple-500 flex items-center justify-center text-white font-bold text-xl">{sellerName.charAt(0)}</div>
                </div>
                <div>
                    <h5 className="font-poppins font-semibold text-base text-deepblue">{sellerName}</h5>
                    <div className="flex items-center gap-2 text-xs text-textmuted mt-0.5">
                        <span className="bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded border border-orange-200 flex items-center gap-1">
                            <ShieldCheck size={10} /> {role}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs mb-4">
                <div className="bg-gray-50 py-2 rounded">
                    <span className="block font-bold text-lg text-textprimary">{rating}</span>
                    <span className="text-gray-500">Rating</span>
                </div>
                <div className="bg-gray-50 py-2 rounded">
                    <span className="block font-bold text-lg text-textprimary">{joinDate}</span>
                    <span className="text-gray-500">Joined</span>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                {whatsappNumber && (
                    <a href={`https://wa.me/${whatsappNumber.replace(/\+/g, '').replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer">
                        <Button variant="secondary" className="w-full h-10 text-sm font-semibold">
                            Contact on WhatsApp
                        </Button>
                    </a>
                )}
                {sellerId && (
                    <Link href={`/seller/${sellerId}`}>
                        <Button variant="outline" className="w-full h-10 text-sm font-semibold border-primary text-primary hover:bg-orange-50" rightIcon={<ExternalLink size={14} />}>
                            Visit Store
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}
