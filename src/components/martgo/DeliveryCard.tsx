"use client";
import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, CheckCircle, Package, Truck, Hash, DollarSign, Navigation } from 'lucide-react';
import Button from '../common/Button';
import { DeliveryOrder, useDelivery } from '@/context/DeliveryContext';

interface DeliveryCardProps {
    order: DeliveryOrder;
    onAccept?: () => void;
}

export default function DeliveryCard({ order }: DeliveryCardProps) {
    const { updateDeliveryStage, verifyDelivery, sendRiderOffer } = useDelivery();
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [inputCode, setInputCode] = useState("");
    const [error, setError] = useState("");
    const [negotiateMode, setNegotiateMode] = useState(false);
    const [offerPrice, setOfferPrice] = useState(order.price.toString());

    const isAvailable = order.status === 'available';
    const isNegotiating = order.status === 'negotiating';
    const isOngoing = order.status === 'ongoing';
    const isCompleted = order.status === 'completed';

    const stages = [
        { id: 'picked_up', label: 'Picked Up Item', icon: Package, buttonText: "Confirm Pickup" },
        { id: 'on_way', label: 'On My Way', icon: Truck, buttonText: "Start Journey" },
        { id: 'at_gate', label: 'At The Gate', icon: MapPin, buttonText: "Arrived at Gate" },
        { id: 'delivered', label: 'Delivered', icon: CheckCircle, buttonText: "Complete Delivery" },
    ];

    const currentStageIndex = stages.findIndex(s => s.id === order.deliveryStage);

    // Calculate next action
    const nextStageIndex = currentStageIndex + 1;
    const nextStage = stages[nextStageIndex] || stages[stages.length - 1]; // Cap at last
    const isLastStage = currentStageIndex === stages.length - 1;

    const handleNextAction = () => {
        if (isLastStage && !showCodeInput) {
            setShowCodeInput(true);
        } else {
            updateDeliveryStage(order.id, nextStage.id as any);
        }
    };

    const handleStageClick = (stageId: string) => {
        // Legacy direct click
        if (stageId === 'delivered') setShowCodeInput(true);
        else updateDeliveryStage(order.id, stageId as any);
    };

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        if (verifyDelivery(order.id, inputCode)) {
            setShowCodeInput(false);
            setError("");
        } else {
            setError("Incorrect Code");
        }
    };

    const handleSendOffer = () => {
        sendRiderOffer(order.id, parseInt(offerPrice));
        setNegotiateMode(false);
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100/50 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">

            {/* Header */}
            <div className="flex gap-4 p-5 border-b border-gray-100/50 bg-gray-50/30 backdrop-blur-sm">
                <div className="w-16 h-16 bg-white rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-gray-100 relative">
                    <img src={order.productImage} alt={order.productName} className="w-full h-full object-cover" />
                    {isCompleted && <div className="absolute inset-0 bg-green-900/20 flex items-center justify-center"><CheckCircle className="text-white" /></div>}
                </div>
                <div className="flex-grow">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-semibold text-deepblue text-base line-clamp-1">{order.productName}</h4>
                            <div className="flex items-center gap-2 text-xs text-textmuted mt-1">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${order.locationType === 'inside' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                                    {order.locationType === 'inside' ? 'Campus' : 'External'}
                                </span>
                                <span>• {order.preferredTime}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-primary text-lg">₦{order.price.toLocaleString()}</div>
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
                            <p className="text-xs font-medium text-gray-700 truncate">{order.pickupLocation}</p>
                        </div>
                        <div className="bg-orange-50 p-2 rounded-lg border border-orange-100">
                            <p className="text-[10px] text-orange-400 font-bold uppercase">Dropoff</p>
                            <p className="text-xs font-medium text-deepblue truncate">{order.hostelName}, {order.roomNumber}</p>
                        </div>
                    </div>
                </div>

                {/* Negotiation / Actions */}
                {isAvailable ? (
                    <div className="mt-auto pt-2 space-y-2">
                        {!negotiateMode ? (
                            <>
                                <Button
                                    onClick={() => sendRiderOffer(order.id, order.price)}
                                    variant="primary"
                                    className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all text-sm"
                                >
                                    Accept for ₦{order.price.toLocaleString()}
                                </Button>
                                <Button
                                    onClick={() => setNegotiateMode(true)}
                                    variant="outline"
                                    className="w-full h-10 rounded-xl font-bold border-gray-200 text-gray-600 hover:bg-gray-50 transition-all text-sm"
                                >
                                    Negotiate Price
                                </Button>
                            </>
                        ) : (
                            <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 animate-in fade-in zoom-in-95">
                                <label className="text-xs font-bold text-gray-500 mb-1 block">Propose New Price</label>
                                <div className="flex gap-2">
                                    <div className="relative flex-grow">
                                        <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="number"
                                            value={offerPrice}
                                            onChange={e => setOfferPrice(e.target.value)}
                                            className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-300 text-sm font-bold text-deepblue focus:outline-none focus:border-primary"
                                        />
                                    </div>
                                    <Button onClick={handleSendOffer} size="sm" variant="primary" className="font-bold">Send</Button>
                                </div>
                                <button onClick={() => setNegotiateMode(false)} className="text-[10px] text-gray-400 underline mt-2 w-full text-center">Cancel</button>
                            </div>
                        )}
                    </div>
                ) : isNegotiating ? (
                    <div className="mt-auto pt-2">
                        <div className="p-3 bg-blue-50 text-blue-800 text-center rounded-xl text-sm font-semibold border border-blue-100 animate-pulse">
                            Offer Sent: ₦{parseInt(offerPrice).toLocaleString()}
                            <p className="text-[10px] font-normal opacity-70">Waiting for buyer...</p>
                        </div>
                    </div>
                ) : isOngoing ? (
                    <div className="space-y-4">
                        <div className="h-px bg-gray-100 my-2"></div>

                        {/* Status Visualizer */}
                        <div className="grid grid-cols-4 gap-1">
                            {stages.map((stage, idx) => {
                                const isActive = idx <= currentStageIndex;
                                const Icon = stage.icon;
                                return (
                                    <div key={stage.id} className={`flex flex-col items-center gap-1 p-1 rounded-lg ${isActive ? 'text-primary' : 'text-gray-300'}`}>
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${isActive ? 'bg-primary text-white border-primary' : 'bg-gray-50 border-gray-200'}`}>
                                            <Icon size={12} />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Main Action Button */}
                        {!showCodeInput ? (
                            <Button
                                onClick={handleNextAction}
                                variant="primary"
                                className={`w-full h-12 rounded-xl font-bold shadow-md flex items-center justify-center gap-2 ${isLastStage ? 'bg-green-600 hover:bg-green-700' : ''}`}
                            >
                                {isLastStage ? <CheckCircle size={18} /> : <Navigation size={18} />}
                                {isLastStage ? "Mark Delivered" : nextStage.buttonText}
                            </Button>
                        ) : (
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 animate-in slide-in-from-bottom-2">
                                <p className="text-sm font-bold text-gray-700 mb-2">Ask buyer for code:</p>
                                <form onSubmit={handleVerify} className="flex gap-2">
                                    <input
                                        type="text"
                                        maxLength={6}
                                        placeholder="000000"
                                        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-mono text-center tracking-widest text-lg"
                                        value={inputCode}
                                        onChange={e => setInputCode(e.target.value)}
                                    />
                                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md hover:bg-orange-600 transition-colors">
                                        Verify
                                    </button>
                                </form>
                                {error && <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>}
                            </div>
                        )}

                        <a
                            href={`https://wa.me/234${order.phoneNumber.replace(/^0/, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 transition-colors text-sm font-semibold border border-green-200"
                        >
                            <MessageCircle size={16} /> Chat Buyer
                        </a>
                    </div>
                ) : (
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
