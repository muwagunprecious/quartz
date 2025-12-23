"use client";

import { useState, useEffect } from 'react';
import { Truck, X, Search, Bell } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface DeliveryRequestModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    productName?: string;
    productImage?: string;
    productId?: string;
}

type ModalStep = 'INPUT' | 'SEARCHING' | 'NOTIFIED';

export default function DeliveryRequestModal({
    isOpen: controlledIsOpen,
    onClose: controlledOnClose,
    productName
}: DeliveryRequestModalProps = {}) {
    const { isAuthenticated, user } = useAuth();
    const [localIsOpen, setLocalIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<ModalStep>('INPUT');
    const [countdown, setCountdown] = useState(30);
    const [formData, setFormData] = useState({
        item_name: productName || '',
        pickup_address: '',
        dropoff_address: '',
        description: ''
    });

    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : localIsOpen;
    const close = () => {
        if (isControlled && controlledOnClose) controlledOnClose();
        else setLocalIsOpen(false);
        // Reset state after closing
        setTimeout(() => {
            setStep('INPUT');
            setCountdown(30);
            setIsLoading(false);
        }, 300);
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isOpen && step === 'SEARCHING') {
            timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setStep('NOTIFIED');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isOpen, step]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await api.post('/deliveries', {
                ...formData,
                user_id: user?.id,
                status: 'PENDING'
            });
            // Instead of closing immediately, move to SEARCHING state
            setStep('SEARCHING');
            setCountdown(30);
            toast.success('Request sent! Looking for riders...');
        } catch (error) {
            toast.error('Failed to send request');
            setIsLoading(false);
        }
    };

    if (!isAuthenticated) return null;

    return (
        <>
            {!isControlled && (
                <button
                    onClick={() => setLocalIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-dark transition-all flex items-center gap-2"
                >
                    <Truck size={24} />
                    <span className="font-semibold">Request Delivery</span>
                </button>
            )}

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={close}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X size={24} />
                        </button>

                        {step === 'INPUT' && (
                            <>
                                <h2 className="text-xl font-bold mb-4">Request a Delivery</h2>
                                <p className="text-sm text-gray-500 mb-4">Need something moved? Let our riders handle it.</p>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                            value={formData.item_name}
                                            onChange={e => setFormData({ ...formData, item_name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Address</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                            value={formData.pickup_address}
                                            onChange={e => setFormData({ ...formData, pickup_address: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Dropoff Address</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                            value={formData.dropoff_address}
                                            onChange={e => setFormData({ ...formData, dropoff_address: e.target.value })}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-dark disabled:opacity-50"
                                    >
                                        {isLoading ? 'Sending...' : 'Find a Rider'}
                                    </button>
                                </form>
                            </>
                        )}

                        {step === 'SEARCHING' && (
                            <div className="text-center py-8">
                                <div className="relative inline-block mb-4">
                                    <div className="absolute inset-0 animate-ping rounded-full bg-primary/20"></div>
                                    <div className="bg-primary/10 p-4 rounded-full relative">
                                        <Search size={48} className="text-primary animate-pulse" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Finding nearby riders...</h3>
                                <p className="text-gray-500 mb-6">Please wait while we broadcast your request.</p>
                                <div className="text-3xl font-mono font-bold text-primary mb-2">
                                    00:{countdown.toString().padStart(2, '0')}
                                </div>
                                <p className="text-xs text-gray-400">Negotiating best prices...</p>
                            </div>
                        )}

                        {step === 'NOTIFIED' && (
                            <div className="text-center py-8">
                                <div className="bg-yellow-50 p-4 rounded-full inline-block mb-4">
                                    <Bell size={48} className="text-yellow-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Request Posted!</h3>
                                <p className="text-gray-600 mb-6">
                                    Your request has been broadcasted to all riders. We haven't received an immediate response, but don't worry!
                                </p>
                                <div className="bg-gray-50 p-4 rounded-lg mb-6 text-sm text-left">
                                    <p className="font-semibold text-gray-900 mb-1">What happens next?</p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                                        <li>Riders will see your request in their feed.</li>
                                        <li>You will be notified via email/app when a rider accepts.</li>
                                        <li>You can check status in "My Orders".</li>
                                    </ul>
                                </div>
                                <button
                                    onClick={close}
                                    className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-dark"
                                >
                                    Okay, got it
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
