"use client";
import React, { useState } from 'react';
import { Minus, Plus, ShoppingCart, Heart, Share2, AlertTriangle, MapPin } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';
import DeliveryRequestModal from '../delivery/DeliveryRequestModal';
import ProductReviews from './ProductReviews';
import { Product } from '@/services/productService';

interface ProductDetailsProps {
    product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const [quantity, setQuantity] = useState(1);
    const [isDeliveryModalOpen, setDeliveryModalOpen] = useState(false);

    const increment = () => setQuantity(q => q + 1);
    const decrement = () => setQuantity(q => Math.max(1, q - 1));

    const isOutOfStock = product.stock_status === 'OUT_OF_STOCK';

    // Construct WhatsApp message with product link
    // Assuming we have window.location.href available on client side for the full link
    const waNumber = product.whatsapp_number || product.seller?.user.name || "";
    // In real app, store proper WA number on seller or product. Schema has Product.whatsapp_number

    // Safe fallback for image in modal
    const mainImage = product.images && product.images.length > 0 ? product.images[0].url : '/placeholder-product.png';

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div>
                <div className="flex items-center justify-between">
                    <a href="#" className="text-deepblue text-sm font-medium hover:underline mb-1 inline-block">
                        Category: {product.category?.name || "General"}
                    </a>
                    <button className="text-gray-400 hover:text-gray-600">
                        <Share2 size={18} />
                    </button>
                </div>
                <h1 className="font-poppins font-bold text-2xl md:text-3xl text-textprimary mb-3">
                    {product.title}
                </h1>

                <div className="inline-flex items-center gap-1 bg-blue-50 text-deepblue px-3 py-1 rounded-full text-sm font-medium mb-4">
                    <MapPin size={14} />
                    Seller Location: {product.university?.name || "Campus"}
                </div>
            </div>

            {/* Price Block */}
            <div className="flex flex-col gap-1 border-b border-gray-100 pb-6">
                <div className="flex items-baseline gap-3">
                    <span className="font-inter font-bold text-3xl text-textprimary">₦{product.price.toLocaleString()}</span>
                    {/* {product.oldPrice && (
                        <span className="text-textmuted text-lg line-through decoration-gray-400">₦{product.oldPrice.toLocaleString()}</span>
                    )} */}
                    {product.condition && <Badge variant="neutral" className="ml-2">{product.condition}</Badge>}
                </div>
                <p className="text-xs text-textmuted mt-1">Found cheaper elsewhere? Let us know.</p>
                <div className="flex gap-2 mt-2">
                    <button className="text-xs text-red-500 font-medium hover:underline flex items-center gap-1">
                        <AlertTriangle size={12} />
                        Report Product
                    </button>
                </div>
            </div>

            {/* Stock & Quantity */}
            <div className="flex flex-col gap-4">
                {isOutOfStock ? (
                    <div className="flex items-center gap-2 text-red-500 font-medium text-sm">
                        <AlertTriangle size={16} fill="currentColor" />
                        Out of Stock
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-green-600 font-medium text-sm">
                        In Stock
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-200 rounded-[8px]">
                        <button onClick={decrement} disabled={isOutOfStock} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-600 disabled:opacity-50">
                            <Minus size={16} />
                        </button>
                        <div className="w-12 h-10 flex items-center justify-center font-medium border-x border-gray-200">
                            {quantity}
                        </div>
                        <button onClick={increment} disabled={isOutOfStock} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-600 disabled:opacity-50">
                            <Plus size={16} />
                        </button>
                    </div>

                    <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors">
                        <Heart size={20} />
                    </button>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 mt-2">
                {/* Visual Only - No Logic */}
                <Button
                    variant="primary"
                    size="lg"
                    disabled={isOutOfStock}
                    className="w-full h-12 text-base font-bold shadow-md cursor-pointer active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                    leftIcon={<ShoppingCart size={20} />}
                    onClick={() => { }}
                >
                    ADD TO CART
                </Button>

                <Button
                    onClick={() => setDeliveryModalOpen(true)}
                    variant="primary"
                    size="lg"
                    disabled={isOutOfStock}
                    className="w-full h-12 rounded-[20px] bg-[#1A73E8] hover:bg-[#1557B0] text-white font-semibold text-sm shadow-md shadow-blue-200/50 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <div className="flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 17h6" /><circle cx="9" cy="17" r="2" /><circle cx="15" cy="17" r="2" /><path d="M15 17h1.6a2 2 0 0 0 1.9-1.3l.5-1.7h-3.4" /><path d="M5 17h.6a2 2 0 0 0 1.9-1.3l.9-3.3a2 2 0 0 1 1.9-1.4h5.4a2 2 0 0 0 1.9-1.4l1-3.6H9" /></svg>
                    </div>
                    Request MartGo Delivery
                </Button>

                {/* Contact Seller Button */}
                {(product.whatsapp_number || product.seller?.user?.whatsapp_number) && (
                    <a
                        href={`https://wa.me/${(product.whatsapp_number || product.seller?.user?.whatsapp_number || '').replace(/\+/g, '').replace(/\s/g, '')}?text=${encodeURIComponent(
                            `Hi, I'm interested in your product: *${product.title}*\nPrice: ₦${product.price.toLocaleString()}\nLink: ${typeof window !== 'undefined' ? window.location.href : ''}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                        onClick={() => {
                            // Track click analytic
                            import('@/services/productService').then(({ productService }) => {
                                productService.incrementClicks(product.id).catch(console.error);
                            });
                        }}
                    >
                        <Button variant="secondary" size="lg" className="w-full h-12 text-base font-bold flex items-center justify-center gap-2 border-green-500 text-green-600 hover:bg-green-50">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" className="w-5 h-5" />
                            Contact Seller
                        </Button>
                    </a>
                )}
            </div>

            <DeliveryRequestModal
                isOpen={isDeliveryModalOpen}
                onClose={() => setDeliveryModalOpen(false)}
                productName={product.title}
                productImage={mainImage}
                productId={product.id}
            />

            <ProductReviews productId={product.id} />
        </div>
    );
}
