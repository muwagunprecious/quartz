"use client";

import { useState, useEffect } from 'react';

export function useWishlist() {
    const [wishlist, setWishlist] = useState<string[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('wishlist');
        if (saved) {
            setWishlist(JSON.parse(saved));
        }
    }, []);

    const toggleWishlist = (productId: string) => {
        let newWishlist;
        if (wishlist.includes(productId)) {
            newWishlist = wishlist.filter(id => id !== productId);
        } else {
            newWishlist = [...wishlist, productId];
        }
        setWishlist(newWishlist);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    };

    const isInWishlist = (productId: string) => wishlist.includes(productId);

    return { wishlist, toggleWishlist, isInWishlist };
}
