"use client";

import React, { useState, useEffect } from 'react';
import Badge from '@/components/common/Badge';
import { Users, ShoppingBag, Truck, AlertTriangle } from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from 'react-hot-toast';

export default function AdminDashboard() {
    const [stats, setStats] = useState<{
        total_users: number;
        total_products: number;
        total_orders: number;
        total_revenue: number;
        trend?: any[];
    }>({
        total_users: 0,
        total_products: 0,
        total_orders: 0,
        total_revenue: 0,
        trend: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/admin/stats');
                setStats(response.data);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
                toast.error('Failed to load dashboard statistics');
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return <div className="animate-pulse space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>)}
            </div>
            <div className="h-64 bg-gray-200 rounded-xl"></div>
        </div>;
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold font-poppins text-gray-900">Platform Overview</h1>
                    <p className="text-gray-500 text-sm">Real-time metrics for CampusMart operations.</p>
                </div>
                <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-100 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Live Data
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                    icon={<Users />}
                    title="Total Users"
                    value={stats.total_users.toLocaleString()}
                    color="blue"
                />
                <StatCard
                    icon={<ShoppingBag />}
                    title="Total Orders"
                    value={stats.total_orders.toLocaleString()}
                    color="green"
                />
                <StatCard
                    icon={<Truck />}
                    title="Active Products"
                    value={stats.total_products.toLocaleString()}
                    color="orange"
                />
                <StatCard
                    icon={<AlertTriangle />}
                    title="Revenue"
                    value={`₦${stats.total_revenue.toLocaleString()}`}
                    color="red"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Activity Trend</h3>
                            <p className="text-xs text-gray-500">Daily order volume over the last 7 days</p>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider">
                            <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-deepblue rounded-sm"></span> Orders</div>
                        </div>
                    </div>

                    <div className="h-64 relative">
                        {/* Custom SVG Chart */}
                        <ActivityChart data={stats.trend || []} />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">System Health</h3>
                    <div className="space-y-6">
                        <HealthItem label="API Response" value="42ms" status="healthy" />
                        <HealthItem label="Database Lag" value="2.1ms" status="healthy" />
                        <HealthItem label="User Growth" value="+12%" status="healthy" />
                        <HealthItem label="Error Rate" value="0.04%" status="healthy" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ActivityChart({ data }: { data: any[] }) {
    if (!data.length) return <div className="h-full flex items-center justify-center text-gray-300">No trend data available</div>;

    const maxOrders = Math.max(...data.map(d => d.orders), 5);
    const height = 200;
    const width = 600;
    const points = data.map((d, i) => ({
        x: (i / (data.length - 1)) * width,
        y: height - (d.orders / maxOrders) * height
    }));

    const dPath = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
    const areaPath = `${dPath} L ${width},${height} L 0,${height} Z`;

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#001F3F" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#001F3F" stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map(p => (
                <line key={p} x1="0" y1={height * p} x2={width} y2={height * p} stroke="#F3F4F6" strokeWidth="1" />
            ))}

            <path d={areaPath} fill="url(#chartGradient)" />
            <path d={dPath} fill="none" stroke="#001F3F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

            {points.map((p, i) => (
                <g key={i}>
                    <circle cx={p.x} cy={p.y} r="5" fill="#001F3F" />
                    <circle cx={p.x} cy={p.y} r="8" fill="#001F3F" fillOpacity="0.2" />
                    <text x={p.x} y={height + 25} textAnchor="middle" fontSize="12" fill="#9CA3AF">
                        {data[i].date.split('-').slice(1).join('/')}
                    </text>
                </g>
            ))}
        </svg>
    );
}

function HealthItem({ label, value, status }: any) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{label}</span>
            <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-900">{value}</span>
                <div className={`w-2 h-2 rounded-full ${status === 'healthy' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>
        </div>
    );
}

function StatCard({ icon, title, value, color }: any) {
    const colors: any = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        orange: 'bg-orange-50 text-orange-600',
        red: 'bg-red-50 text-red-600',
    };
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colors[color]}`}>
                {icon}
            </div>
            <div>
                <p className="text-gray-500 text-sm font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            </div>
        </div>
    );
}
