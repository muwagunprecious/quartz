"use client";
import React from 'react';
import { useDelivery } from '@/context/DeliveryContext';
import DeliveryCard from '@/components/martgo/DeliveryCard';
import { Truck, CheckCircle, Clock } from 'lucide-react';

export default function MartGoPage() {
    const { orders, updateOrderStatus, toggleRidersOnline, areRidersOnline } = useDelivery();

    const availableOrders = orders.filter(o => o.status === 'available');
    const ongoingOrders = orders.filter(o => o.status === 'ongoing');
    const completedOrders = orders.filter(o => o.status === 'completed');

    return (
        <div className="container mx-auto px-4 py-8">

            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
                        <Truck size={24} />
                    </div>
                    <div>
                        <h1 className="font-poppins font-bold text-2xl md:text-3xl text-deepblue">MartGo Dashboard</h1>
                        <p className="text-textmuted text-sm">Rider Delivery Management System</p>
                    </div>
                </div>

                {/* Simulator Toggle */}
                <button
                    onClick={toggleRidersOnline}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border ${areRidersOnline ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}
                >
                    <div className={`w-2 h-2 rounded-full ${areRidersOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                    {areRidersOnline ? 'Riders Online' : 'Riders Offline (Sim)'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Column A: Available */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-1 border-b-2 border-blue-500 pb-2 mb-4">
                        <h2 className="font-bold text-deepblue flex items-center gap-2">
                            <Truck size={18} className="text-blue-500" /> Available
                        </h2>
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-bold">{availableOrders.length}</span>
                    </div>

                    <div className="flex flex-col gap-4">
                        {availableOrders.length === 0 && (
                            <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-400">
                                <p>No new orders</p>
                            </div>
                        )}
                        {availableOrders.map(order => (
                            <DeliveryCard
                                key={order.id}
                                order={order}
                                onAccept={() => updateOrderStatus(order.id, 'ongoing')}
                            />
                        ))}
                    </div>
                </div>

                {/* Column B: Ongoing */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-1 border-b-2 border-orange-500 pb-2 mb-4">
                        <h2 className="font-bold text-deepblue flex items-center gap-2">
                            <Clock size={18} className="text-orange-500" /> Ongoing
                        </h2>
                        <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-bold">{ongoingOrders.length}</span>
                    </div>

                    <div className="flex flex-col gap-4">
                        {ongoingOrders.length === 0 && (
                            <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-400">
                                <p>No active deliveries</p>
                            </div>
                        )}
                        {ongoingOrders.map(order => (
                            <DeliveryCard
                                key={order.id}
                                order={order}
                                onMarkDelivered={() => updateOrderStatus(order.id, 'completed')}
                            />
                        ))}
                    </div>
                </div>

                {/* Column C: Completed */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-1 border-b-2 border-green-500 pb-2 mb-4">
                        <h2 className="font-bold text-deepblue flex items-center gap-2">
                            <CheckCircle size={18} className="text-green-500" /> Completed
                        </h2>
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold">{completedOrders.length}</span>
                    </div>

                    <div className="flex flex-col gap-4 opacity-75 grayscale-[0.3]">
                        {completedOrders.length === 0 && (
                            <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-400">
                                <p>History empty</p>
                            </div>
                        )}
                        {completedOrders.map(order => (
                            <DeliveryCard
                                key={order.id}
                                order={order}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
