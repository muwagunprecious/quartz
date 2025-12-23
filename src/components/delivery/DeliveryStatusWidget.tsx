"use client";
import React, { useEffect, useState } from 'react';
import { useDelivery, DeliveryOrder } from '@/context/DeliveryContext';
import { Check, XCircle, Package, Truck, MapPin, CheckCircle, ChevronDown, ChevronUp, User, Phone, AlertCircle } from 'lucide-react';

export default function DeliveryStatusWidget() {
    const { orders, acceptRiderOffer, declineRiderOffer } = useDelivery();
    const [activeOrder, setActiveOrder] = useState<DeliveryOrder | null>(null);
    const [isExpanded, setIsExpanded] = useState(true);

    // Filter for ANY active state: pending_rider, negotiating, ongoing
    useEffect(() => {
        const current = orders.find(o =>
            o.status === 'pending_rider' ||
            o.status === 'negotiating' ||
            o.status === 'ongoing'
        );
        setActiveOrder(current || null);
    }, [orders]);

    if (!activeOrder) return null;

    const isPendingRider = activeOrder.status === 'pending_rider';
    const isNegotiating = activeOrder.status === 'negotiating';
    const isOngoing = activeOrder.status === 'ongoing';

    const stages = [
        { id: 'picked_up', label: 'Picked Up Item', icon: Package },
        { id: 'on_way', label: 'On My Way', icon: Truck },
        { id: 'at_gate', label: 'At The Gate', icon: MapPin },
        { id: 'delivered', label: 'Delivered', icon: CheckCircle },
    ];

    const currentStageIndex = stages.findIndex(s => s.id === activeOrder.deliveryStage);

    return (
        <div className="fixed bottom-4 right-4 z-50 w-full max-w-[360px] animate-in slide-in-from-bottom-10 duration-500">

            {/* 1. No Riders Online Alert (Special Case) */}
            {isPendingRider && (
                <div className="bg-white rounded-[24px] shadow-2xl border border-gray-100 p-5 m-4 md:m-0 text-center animate-pulse-slow">
                    <div className="mx-auto w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-3">
                        <AlertCircle className="text-orange-500" />
                    </div>
                    <h3 className="font-bold text-gray-800">No Riders Online</h3>
                    <p className="text-xs text-gray-500 mt-1">Your request is pending. You'll be notified when a rider becomes available.</p>
                </div>
            )}

            {/* Main Widget (Negotiating or Ongoing) */}
            {!isPendingRider && (
                <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100/50 overflow-hidden m-4 md:m-0 backdrop-blur-xl">

                    {/* Header with Rider Info */}
                    <div
                        className="bg-white/80 p-4 flex items-center justify-between border-b border-gray-50 cursor-pointer"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
                                    <User size={20} className="text-gray-400" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                                <h3 className="font-bold text-deepblue text-sm">John Doe</h3>
                                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                    <span>⭐ 4.9</span>
                                    <span>•</span>
                                    <span>Toyota Camry</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                                <Phone size={14} />
                            </button>
                            <button className="text-gray-300 hover:text-gray-500">
                                {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                            </button>
                        </div>
                    </div>

                    {isExpanded && (
                        <div className="p-5 max-h-[70vh] overflow-y-auto bg-white/50">

                            {/* 2. Negotiation State */}
                            {isNegotiating && (
                                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                                    <div className="bg-blue-50/50 p-4 rounded-[20px] border border-blue-100 text-center relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-5">
                                            <Truck size={60} className="text-blue-600" />
                                        </div>
                                        <p className="text-sm font-semibold text-deepblue">Price Update Request</p>
                                        <p className="text-xs text-gray-500 mt-1 mb-2">The rider wants to adjust the delivery price.</p>
                                        <div className="inline-block bg-white px-4 py-1 rounded-full shadow-sm border border-blue-100">
                                            <span className="text-lg font-bold text-[#1A73E8]">₦{activeOrder.riderOfferPrice?.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => declineRiderOffer(activeOrder.id)}
                                            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-50 text-gray-600 font-bold text-sm hover:bg-gray-100 transition-colors"
                                        >
                                            <XCircle size={16} /> Decline
                                        </button>
                                        <button
                                            onClick={() => acceptRiderOffer(activeOrder.id)}
                                            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1A73E8] text-white font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-600 transition-colors"
                                        >
                                            <Check size={16} /> Accept
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* 3. Ongoing / Tracking State */}
                            {isOngoing && (
                                <div className="space-y-6 animate-in fade-in duration-500">

                                    {/* Accepted Message (If rider accepted exactly) */}
                                    <div className="bg-green-50 border border-green-100 rounded-xl p-3 flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                        <p className="text-xs text-green-800 font-medium">
                                            A rider has accepted your delivery request for ₦{activeOrder.price.toLocaleString()}.
                                        </p>
                                    </div>

                                    {/* Verification Code Card - USER ONLY */}
                                    <div className="bg-[#1A73E8] text-white p-5 rounded-[22px] shadow-lg shadow-blue-200 text-center relative overflow-hidden group">
                                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-110 transition-transform duration-700"></div>
                                        <div className="relative z-10">
                                            <p className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-80 mb-2">Verification Code</p>
                                            <div className="text-4xl font-mono font-bold tracking-widest mb-2 text-white drop-shadow-sm">
                                                {activeOrder.verificationCode || '...'}
                                            </div>
                                            <div className="flex items-center justify-center gap-1.5 opacity-80">
                                                <div className="w-1 h-1 bg-white rounded-full"></div>
                                                <p className="text-[10px]">Your rider will request this code upon delivery</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status Tracker (No Map) */}
                                    <div className="space-y-0 relative pl-2">
                                        {/* Connecting Line */}
                                        <div className="absolute left-[19px] top-4 bottom-8 w-[2px] bg-gray-100 z-0">
                                            <div
                                                className="w-full bg-[#1A73E8] transition-all duration-700 ease-in-out"
                                                style={{ height: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
                                            ></div>
                                        </div>

                                        {stages.map((stage, idx) => {
                                            const isCompleted = idx <= currentStageIndex;
                                            const isCurrent = idx === currentStageIndex;
                                            const Icon = stage.icon;

                                            return (
                                                <div key={stage.id} className="flex gap-4 relative z-10 pb-6 last:pb-0 group">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-[3px] transition-all duration-500 ${isCompleted ? 'bg-[#1A73E8] border-[#1A73E8] text-white shadow-md shadow-blue-100' : 'bg-white border-gray-100 text-gray-300'}`}>
                                                        <Icon size={12} strokeWidth={3} />
                                                    </div>
                                                    <div className={`flex-1 pt-1 transition-all duration-500 ${isCompleted ? 'translate-x-0 opacity-100' : 'translate-x-2'}`}>
                                                        <p className={`text-sm font-bold transition-colors duration-300 ${isCurrent ? 'text-[#1A73E8]' : isCompleted ? 'text-deepblue' : 'text-gray-300'}`}>
                                                            {stage.label}
                                                        </p>
                                                        {activeOrder.timestamps[stage.id as keyof typeof activeOrder.timestamps] && (
                                                            <p className="text-[10px] text-gray-400 font-medium mt-0.5 animate-in slide-in-from-left-2 fade-in">
                                                                {new Date(activeOrder.timestamps[stage.id as keyof typeof activeOrder.timestamps]!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
