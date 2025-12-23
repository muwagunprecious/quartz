
'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function CategoriesPage() {
    const categories = [
        { name: 'Textbooks', slug: 'textbooks' },
        { name: 'Electronics', slug: 'electronics' },
        { name: 'Furniture', slug: 'furniture' },
        { name: 'Fashion', slug: 'fashion' },
        { name: 'Food', slug: 'food' },
        { name: 'Services', slug: 'services' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Browse Categories</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/category/${cat.slug}`}
                            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center font-medium text-gray-800"
                        >
                            {cat.name}
                        </Link>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
