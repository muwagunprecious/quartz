"use client";

import React, { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/auth/login');
                return;
            }

            if (user.role !== 'ADMIN') {
                router.push('/');
                return;
            }
            setAuthorized(true);
        }
    }, [user, loading, router]);

    if (loading || !authorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-deepblue"></div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
                    <h2 className="font-semibold text-gray-800">Admin Portal</h2>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">Welcome, Administrator</span>
                        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">A</div>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
