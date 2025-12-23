"use client";

import React, { useState } from 'react';
import { useDelivery } from '@/context/DeliveryContext';
import Button from '@/components/common/Button';
import { MapPin, Phone, User, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SellerDeliveryRequestPage() {
    const { createDeliveryRequest } = useDelivery();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        customerName: '',
        customerPhone: '',
        dropoffAddress: '',
        productName: '',
        price: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // Logic for seller request:
            // 1. Create a "Shadow" order or Manual Order via API (handled by context/api logic)
            // 2. Trigger delivery request
            // For now, using the same createDeliveryRequest context method
            // We might need to adjust it to handle "no product ID" if it's manual, OR user must select existing product.
            // Simplified: Passing manual strings. Context/API needs to handle this.

            await createDeliveryRequest({
                isSellerRequest: true,
                buyerName: formData.customerName,
                buyerPhone: formData.customerPhone,
                hostelName: formData.dropoffAddress, // Mapping to address field
                roomNumber: '',
                price: parseFloat(formData.price),
                productName: formData.productName
            });

            alert("Delivery Rider Requested!");
            router.push('/seller/dashboard');
        } catch (error) {
            alert("Failed to request rider");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 pb-12 pt-6">
            <div className="container max-w-[600px] mx-auto px-4">
                <h1 className="text-2xl font-bold font-poppins text-gray-900 mb-6">Request Delivery Rider</h1>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">What are you sending?</label>
                            <div className="relative">
                                <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    required
                                    type="text"
                                    placeholder="Product Name / Package Description"
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary"
                                    value={formData.productName}
                                    onChange={e => setFormData({ ...formData, productName: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Customer Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        required
                                        type="text"
                                        placeholder="Name"
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary"
                                        value={formData.customerName}
                                        onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Customer Phone</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        required
                                        type="tel"
                                        placeholder="080..."
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary"
                                        value={formData.customerPhone}
                                        onChange={e => setFormData({ ...formData, customerPhone: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Delivery Address (Dropoff)</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    required
                                    type="text"
                                    placeholder="Hostel, Room Number, or Off-campus address"
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary"
                                    value={formData.dropoffAddress}
                                    onChange={e => setFormData({ ...formData, dropoffAddress: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Delivery Offer (Price)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₦</span>
                                <input
                                    required
                                    type="number"
                                    placeholder="1000"
                                    className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Standard within campus: ₦1,000. Outside: ₦2,000+.</p>
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                className="w-full"
                                disabled={submitting}
                            >
                                {submitting ? "Requesting..." : "Find Rider Now"}
                            </Button>
                        </div>

                    </form>
                </div>
            </div>
        </main>
    );
}
