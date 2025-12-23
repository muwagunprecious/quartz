"use client";

import React, { useState } from 'react';
import { useDelivery, DeliveryOrder } from '@/context/DeliveryContext';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import { MapPin, Navigation, Package, CheckCircle, Truck, Clock } from 'lucide-react';
import Link from 'next/link';
import { riderService, RiderProfile } from '@/services/riderService';

export default function DeliveryDashboard() {
    const { orders, acceptDelivery, activeDelivery, updateStatus } = useDelivery();
    const [activeTab, setActiveTab] = useState<'available' | 'ongoing'>('available');

    // Filter logic
    const availableOrders = orders.filter(o => o.status === 'PENDING');
    const myOrders = orders.filter(o => o.status !== 'PENDING' && o.status !== 'CANCELLED' && o.status !== 'DELIVERED');
    // Simplified filter assuming rider context handles "my" vs "global" separation, 
    // or context provides pre-filtered lists. For now, assuming Global context has everything (simpler for demo).
    // In real app, `orders` should be 'available near me', `activeDelivery` is mine.

    const handleAccept = async (id: string) => {
        try {
            await acceptDelivery(id);
            setActiveTab('ongoing');
        } catch (e) {
            alert("Failed to accept delivery");
        }
    };

    const handleUpdateStatus = async (id: string, status: any) => {
        try {
            await updateStatus(id, status);
        } catch (e) {
            alert("Failed to update status");
        }
    };

    const [profile, setProfile] = useState<RiderProfile | null>(null);

    // Fetch profile to check verification status
    React.useEffect(() => {
        riderService.getProfile().then(setProfile).catch(() => { });
    }, []);

    return (
        <main className="min-h-screen bg-gray-50 pb-12 pt-6">
            <div className="container max-w-[1000px] mx-auto px-4">

                {profile?.verification_status === 'PENDING' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-yellow-800">Verification Pending</h3>
                            <p className="text-sm text-yellow-700">Your account is under review. You cannot accept orders yet.</p>
                        </div>
                        <Link href="/delivery/dashboard/verification">
                            <Button variant="outline" size="sm" className="bg-white border-yellow-300 text-yellow-800 hover:bg-yellow-100">
                                View Status
                            </Button>
                        </Link>
                    </div>
                )}

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold font-poppins text-gray-900">Delivery Dashboard</h1>
                        <p className="text-gray-500 text-sm">Find and manage your deliveries.</p>
                    </div>

                    <div className="flex gap-2 bg-white p-1.5 rounded-lg border border-gray-200 shadow-sm">
                        <button
                            onClick={() => setActiveTab('available')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'available' ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            Available Requests
                        </button>
                        <button
                            onClick={() => setActiveTab('ongoing')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'ongoing' ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            Active Deliveries
                        </button>
                        <Link
                            href="/delivery/dashboard/verification"
                            className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-1"
                        >
                            Verify Identity
                        </Link>
                    </div>
                </div>

                {activeTab === 'available' ? (
                    <div className="space-y-4">
                        {availableOrders.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                                <Truck className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900">No requests available</h3>
                                <p className="mt-1 text-gray-500">Wait for new delivery requests to appear.</p>
                            </div>
                        ) : (
                            availableOrders.map(order => (
                                <DeliveryCard
                                    key={order.id}
                                    order={order}
                                    action={
                                        <Button onClick={() => handleAccept(order.id)} variant="primary" size="sm">
                                            Accept Request
                                        </Button>
                                    }
                                />
                            ))
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {myOrders.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                                <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900">No active deliveries</h3>
                                <p className="mt-1 text-gray-500">Accept a request to start delivering.</p>
                            </div>
                        ) : (
                            myOrders.map(order => (
                                <DeliveryCard
                                    key={order.id}
                                    order={order}
                                    showStatusControls
                                    onUpdateStatus={(status) => handleUpdateStatus(order.id, status)}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}

function DeliveryCard({ order, action, showStatusControls, onUpdateStatus }: { order: DeliveryOrder, action?: React.ReactNode, showStatusControls?: boolean, onUpdateStatus?: (s: string) => void }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm transition-all hover:shadow-md">
            <div className="flex flex-col md:flex-row gap-6">

                {/* Product Info */}
                <div className="flex gap-4 min-w-[300px]">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {order.productImage ? (
                            <img src={order.productImage} alt={order.productName} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Package size={24} />
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{order.productName || "Product"}</h3>
                            <Badge variant={order.status === 'PENDING' ? 'warning' : 'primary'}>{order.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">Order #{order.id.substring(0, 6)}</p>
                        <div className="font-bold text-lg text-primary">₦{order.offered_price?.toLocaleString()}</div>
                    </div>
                </div>

                {/* Route Info */}
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <MapPin size={12} /> Pickup (Seller)
                        </label>
                        <p className="text-sm font-medium text-gray-800">{order.pickup_address}</p>
                        <p className="text-xs text-gray-500">{order.sellerName}</p>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <Navigation size={12} /> Dropoff (Buyer)
                        </label>
                        <p className="text-sm font-medium text-gray-800">{order.dropoff_address}</p>
                        <p className="text-xs text-gray-500">{order.buyerName}</p>
                    </div>
                </div>

                {/* Action */}
                <div className="flex items-center justify-end md:w-[200px] border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                    {action}

                    {showStatusControls && onUpdateStatus && (
                        <div className="flex flex-col gap-2 w-full">
                            <p className="text-xs text-center font-medium text-gray-500 mb-1">Update Status</p>
                            <div className="flex gap-1 justify-center">
                                <button
                                    onClick={() => onUpdateStatus('PICKED_UP')}
                                    title="Picked Up"
                                    className={`p-2 rounded-lg border ${order.status === 'PICKED_UP' ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                                >
                                    <Package size={16} />
                                </button>
                                <button
                                    onClick={() => onUpdateStatus('ON_MY_WAY')}
                                    title="On My Way"
                                    className={`p-2 rounded-lg border ${order.status === 'ON_MY_WAY' ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                                >
                                    <Truck size={16} />
                                </button>
                                <button
                                    onClick={() => onUpdateStatus('AT_THE_GATE')}
                                    title="At Gate"
                                    className={`p-2 rounded-lg border ${order.status === 'AT_THE_GATE' ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                                >
                                    <MapPin size={16} />
                                </button>
                                <button
                                    onClick={() => onUpdateStatus('DELIVERED')}
                                    title="Delivered"
                                    className={`p-2 rounded-lg border ${order.status === 'DELIVERED' ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                                >
                                    <CheckCircle size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
