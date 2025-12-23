"use client";

import Link from 'next/link';

interface ProductRecommendationsProps {
    categoryId?: string;
    currentProductId?: string;
}

export default function ProductRecommendations({ categoryId, currentProductId }: ProductRecommendationsProps) {
    // Mock recommendations for now
    const products = [
        { id: '1', title: 'Calculus Textbook', price: 4500, image: 'https://placehold.co/300x300?text=Calc' },
        { id: '2', title: 'Study Lamp', price: 8000, image: 'https://placehold.co/300x300?text=Lamp' },
        { id: '3', title: 'Hostel Mattress', price: 25000, image: 'https://placehold.co/300x300?text=Mattress' },
        { id: '4', title: 'Extension Box', price: 3500, image: 'https://placehold.co/300x300?text=Socket' },
    ];

    return (
        <section className="mt-12 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Products You Might Like</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Link href={`/product/${product.id}`} key={product.id} className="group block">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <h4 className="font-medium text-gray-900 truncate">{product.title}</h4>
                        <p className="text-primary font-bold">₦{product.price.toLocaleString()}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
