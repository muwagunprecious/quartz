import React from 'react';
import { Laptop, Shirt, Pizza, Dumbbell, Book, Home, Sparkles, Gamepad2 } from 'lucide-react';
import Link from 'next/link';

const categories = [
    { id: 1, name: 'Academics', icon: Book, color: 'bg-blue-100 text-blue-600' },
    { id: 2, name: 'Electronics', icon: Laptop, color: 'bg-orange-100 text-orange-600' },
    { id: 3, name: 'Dorm & Room', icon: Home, color: 'bg-purple-100 text-purple-600' },
    { id: 4, name: 'Fashion', icon: Shirt, color: 'bg-pink-100 text-pink-600' },
    { id: 5, name: 'Food', icon: Pizza, color: 'bg-yellow-100 text-yellow-600' },
    { id: 6, name: 'Health', icon: Sparkles, color: 'bg-teal-100 text-teal-600' },
    { id: 7, name: 'Sports', icon: Dumbbell, color: 'bg-red-100 text-red-600' },
    { id: 8, name: 'Gaming', icon: Gamepad2, color: 'bg-indigo-100 text-indigo-600' },
];

export default function CategoryRail() {
    return (
        <section className="mb-8">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-poppins font-semibold text-textprimary">Shop by Category</h2>
                <p className="text-textmuted text-base font-inter">Browse popular categories</p>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-6 px-4 snap-x justify-start md:justify-center scrollbar-hide">
                {categories.map((cat) => (
                    <Link href={`/category/${cat.id}`} key={cat.id} className="flex flex-col items-center gap-3 min-w-[80px] snap-center group cursor-pointer transition-transform hover:-translate-y-1">
                        <div className={`w-[80px] h-[80px] rounded-full flex items-center justify-center ${cat.color} transition-shadow group-hover:shadow-lg`}>
                            <cat.icon size={32} strokeWidth={1.5} />
                        </div>
                        <span className="text-sm font-medium font-inter text-textprimary group-hover:text-primary transition-colors text-center leading-tight">
                            {cat.name}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
