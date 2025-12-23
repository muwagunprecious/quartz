"use client";
import React, { useState } from 'react';
import { Filter } from 'lucide-react';

export default function SellerFilters() {
    const [priceRange, setPriceRange] = useState(100000);

    return (
        <div className="bg-white border border-gray-200 rounded-[12px] p-5 sticky top-24">
            <div className="flex items-center gap-2 mb-4">
                <Filter size={18} className="text-primary" />
                <h3 className="font-poppins font-semibold text-base">Filters</h3>
            </div>

            {/* Category */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3">Category</h4>
                <div className="space-y-2">
                    {['All Products', 'Fashion', 'Electronics', 'Books', 'Dorm Essentials'].map((cat, i) => (
                        <label key={i} className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary cursor-pointer">
                            <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                            {cat}
                        </label>
                    ))}
                </div>
            </div>

            {/* Price */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3">Price Range</h4>
                <input
                    type="range"
                    min="0"
                    max="200000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>₦0</span>
                    <span>₦{priceRange.toLocaleString()}</span>
                </div>
            </div>

            {/* Condition */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3">Condition</h4>
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" /> Brand New</label>
                    <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" /> Used</label>
                    <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" /> Refurbished</label>
                </div>
            </div>

            <button className="w-full py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded hover:bg-gray-200 transition-colors">
                Reset Filters
            </button>
        </div>
    );
}
