import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Image as ImageIcon,
    MessageSquare,
    Settings,
    LogOut,
    Menu,
    X
} from 'lucide-react';

const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Content', href: '/admin/content', icon: ImageIcon },
    { name: 'Complaints', href: '/admin/complaints', icon: MessageSquare },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-deepblue text-white min-h-screen hidden md:flex flex-col sticky top-0">
            <div className="p-6">
                <h2 className="text-xl font-bold font-poppins tracking-tight">CampusMart <span className="text-gold">Admin</span></h2>
            </div>

            <nav className="flex-1 mt-6 px-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                ? 'bg-white/10 text-gold font-medium border-l-4 border-gold'
                                : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10 mt-auto">
                <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        window.location.href = '/login';
                    }}
                    className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:text-red-300 transition-colors mt-2"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
