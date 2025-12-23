import React from 'react';
import { Bell, User, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function TopBar() {
    return (
        <div className="bg-deepblue text-white h-[40px] flex items-center justify-center text-sm font-medium z-50 relative">
            <div className="container max-w-[1200px] flex justify-between px-4">
                <div className="flex items-center gap-2">
                    <span>Support: 0814-4065-5785</span>
                </div>

                <div className="flex items-center gap-6">
                    <Link href="/notifications" className="hover:opacity-80">
                        <Bell size={18} />
                    </Link>
                    <Link href="/profile" className="hover:opacity-80">
                        <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                            <User size={14} />
                        </div>
                    </Link>
                    <Link href="/cart" className="hover:opacity-80 relative">
                        <ShoppingCart size={18} />
                        <span className="absolute -top-1 -right-1.5 bg-primary text-white text-[10px] h-4 w-4 flex items-center justify-center rounded-full">
                            2
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
