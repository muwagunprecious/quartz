
'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ProfilePage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">My Profile</h1>
                <div className="bg-white p-8 rounded-lg shadow">
                    <p>Profile details will go here.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
