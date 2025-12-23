"use client";
import React, { useState } from 'react';
import { Star } from 'lucide-react';

export default function ProductTabs() {
    const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'seller'>('specs');

    return (
        <div className="mt-8 bg-white rounded-[12px] border border-gray-200 shadow-sm overflow-hidden">
            {/* Tabs Header */}
            <div className="flex border-b border-gray-100">
                <button
                    onClick={() => setActiveTab('specs')}
                    className={`flex-1 py-4 text-sm font-semibold text-center transition-colors relative ${activeTab === 'specs' ? 'text-primary' : 'text-textmuted hover:text-textprimary'
                        }`}
                >
                    Specifications
                    {activeTab === 'specs' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"></span>}
                </button>
                <button
                    onClick={() => setActiveTab('reviews')}
                    className={`flex-1 py-4 text-sm font-semibold text-center transition-colors relative ${activeTab === 'reviews' ? 'text-primary' : 'text-textmuted hover:text-textprimary'
                        }`}
                >
                    Verified Reviews (3)
                    {activeTab === 'reviews' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"></span>}
                </button>
                <button
                    onClick={() => setActiveTab('seller')}
                    className={`flex-1 py-4 text-sm font-semibold text-center transition-colors relative ${activeTab === 'seller' ? 'text-primary' : 'text-textmuted hover:text-textprimary'
                        }`}
                >
                    Seller Info
                    {activeTab === 'seller' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"></span>}
                </button>
            </div>

            {/* Content */}
            <div className="p-6 min-h-[200px]">
                {activeTab === 'specs' && (
                    <div className="rounded-lg overflow-hidden border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {[
                                { label: "Material", value: "Polyester Blend" },
                                { label: "Condition", value: "Brand New" },
                                { label: "Size", value: "M (Medium)" },
                                { label: "Color", value: "Black" },
                                { label: "University", value: "UNILESA" },
                                { label: "State", value: "Osun State" },
                            ].map((item, idx) => (
                                <div key={idx} className={`flex px-4 py-3 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                    <span className="w-1/3 text-textmuted text-sm">{item.label}</span>
                                    <span className="w-2/3 text-textprimary font-medium text-sm">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="text-4xl font-bold text-textprimary">4.8</div>
                            <div className="flex flex-col">
                                <div className="flex text-yellow-400"><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} className="text-gray-300" /></div>
                                <span className="text-sm text-textmuted">Based on 3 ratings</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-6">
                            <div className="flex gap-4 mb-4">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                                <div>
                                    <h5 className="font-semibold text-sm">Tolu A.</h5>
                                    <div className="flex text-yellow-400 text-xs my-0.5"><Star fill="currentColor" size={12} /><Star fill="currentColor" size={12} /><Star fill="currentColor" size={12} /><Star fill="currentColor" size={12} /><Star fill="currentColor" size={12} /></div>
                                    <p className="text-textprimary text-sm mt-1">Exactly as described. Good quality skirt.</p>
                                    <span className="text-xs text-textmuted mt-1 block">2 days ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'seller' && (
                    <p className="text-textmuted text-sm">More details about The thrift vault...</p>
                )}
            </div>
        </div>
    );
}
