
'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function CartPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
                <div className="bg-white p-8 rounded-lg shadow text-center">
                    <p className="text-gray-500 mb-4">Your cart is currently empty.</p>
                    <button className="bg-primary text-white px-6 py-2 rounded">
                        Continue Shopping
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
}
