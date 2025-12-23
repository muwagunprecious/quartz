"use client";
import React from 'react';
import { MapPin, CheckCircle, Package, Truck } from 'lucide-react';
import Button from '../common/Button';
import { DeliveryOrder } from '@/context/DeliveryContext';
import { getImageUrl } from '@/lib/api';

interface DeliveryCardProps {
    order: DeliveryOrder;
    onAccept?: () => void;
}

export default function DeliveryCard({ order, onAccept }: DeliveryCardProps) {
    const isPending = order.status === 'PENDING';
    const isAccepted = order.status === 'ACCEPTED';
    const isDelivered = order.status === 'DELIVERED';

    return (
        <div className="bg-white rounded-2xl border border-gray-100/50 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
            {/* Header */}
            <div className="flex gap-4 p-5 border-b border-gray-100/50 bg-gray-50/30 backdrop-blur-sm">
                <div className="w-16 h-16 bg-white rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-gray-100 relative">
                    <img src={getImageUrl(order.productImage) || '/placeholder.png'} alt={order.productName || 'Product'} className="w-full h-full object-cover" />
                    {isDelivered && <div className="absolute inset-0 bg-green-900/20 flex items-center justify-center"><CheckCircle className="text-white" /></div>}
                </div>
                <div className="flex-grow">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-semibold text-deepblue text-base line-clamp-1">{order.productName || 'Product'}</h4>
                            <div className="flex items-center gap-2 text-xs text-textmuted mt-1">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider bg-blue-50 text-blue-600">
                                    Delivery
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-primary text-lg">₦{order.offered_price.toLocaleString()}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="p-5 space-y-5 flex-grow flex flex-col">
                {/* Route */}
                <div className="flex items-center gap-3 text-sm">
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                        <div className="w-0.5 h-6 bg-gray-200"></div>
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                            <p className="text-[10px] text-gray-400 font-bold uppercase">Pickup</p>
                            <p className="text-xs font-medium text-gray-700 truncate">{order.pickup_address}</p>
                        </div>
                        <div className="bg-orange-50 p-2 rounded-lg border border-orange-100">
                            <p className="text-[10px] text-orange-400 font-bold uppercase">Dropoff</p>
                            <p className="text-xs font-medium text-deepblue truncate">{order.dropoff_address}</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                {isPending && onAccept && (
                    <div className="mt-auto pt-2 space-y-2">
                        <Button
                            onClick={onAccept}
                            variant="primary"
                            className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all text-sm"
                        >
                            Accept for ₦{order.offered_price.toLocaleString()}
                        </Button>
                    </div>
                )}

                {isAccepted && (
                    <div className="mt-auto pt-2">
                        <div className="p-3 bg-blue-50 text-blue-800 text-center rounded-xl text-sm font-semibold border border-blue-100">
                            Delivery in Progress
                            <p className="text-[10px] font-normal opacity-70">Rider is on the way</p>
                        </div>
                    </div>
                )}

                {isDelivered && (
                    <div className="mt-auto pt-2">
                        <div className="w-full py-3 bg-gray-100 text-gray-500 text-center text-sm font-bold rounded-xl flex items-center justify-center gap-2">
                            <CheckCircle size={18} />
                            Complete
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
