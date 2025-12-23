
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function CategoryPage() {
    const params = useParams();
    const { slug } = params;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 capitalize">{slug} Category</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <p className="text-gray-500">Products for {slug} will appear here.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
