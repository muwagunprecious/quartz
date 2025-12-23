"use client";
import React from 'react';
import { Search, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
    const { isAuthenticated, user, logout } = useAuth();
    return (
        <header className="bg-white h-[80px] shadow-sm sticky top-0 z-40">
            <div className="container max-w-[1200px] h-full mx-auto px-4 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/" className="flex-shrink-0">
                    <h1 className="font-poppins text-2xl font-bold text-deepblue tracking-tight">
                        Campus<span className="text-primary">Mart</span>
                    </h1>
                </Link>

                {/* Search Bar */}
                <div className="flex-1 max-w-[600px] relative">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for products"
                            className="w-full h-[40px] pl-10 pr-4 rounded-full border border-gray-300 bg-gray-50 text-textprimary placeholder-textmuted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-inter text-base"
                        />
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textmuted" size={20} />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-6 flex-shrink-0">
                    <Link href="/cart" className="flex items-center gap-2 group">
                        <div className="relative">
                            <ShoppingCart size={24} className="text-textprimary group-hover:text-primary transition-colors" />
                            <span className="absolute -top-2 -right-2 h-5 w-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                                2
                            </span>
                        </div>
                        <span className="hidden md:block font-inter font-medium text-sm text-textprimary group-hover:text-primary">
                            Cart
                        </span>
                    </Link>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-textprimary hidden md:block">
                                Hi, {user?.name?.split(' ')[0]}
                            </span>
                            <div className="relative group/profile">
                                <Link href={user?.role === 'SELLER' ? '/seller/dashboard' : '/profile'} className="flex items-center gap-2 text-textprimary hover:text-primary transition-colors">
                                    <User size={24} />
                                </Link>
                                {/* Simple Dropdown Hover */}
                                <div className="absolute right-0 top-full pt-2 w-48 hidden group-hover/profile:block">
                                    <div className="bg-white rounded-md shadow-lg py-1 border border-gray-100">
                                        <Link href={user?.role === 'SELLER' ? '/seller/dashboard' : '/profile'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            Dashboard
                                        </Link>
                                        <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link href="/auth/login" className="flex items-center gap-2 text-textprimary hover:text-primary transition-colors font-medium">
                            <User size={24} />
                            <span>Login</span>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
