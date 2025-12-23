"use client";

import React, { useState, useEffect } from 'react';
import Badge from '@/components/common/Badge';
import Loader from '@/components/common/Loader';
import { api } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { User, Shield, ShieldOff, CheckCircle, Search, Filter } from 'lucide-react';

export default function AdminUsers() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('');

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get('/admin/users', {
                params: { role: roleFilter || undefined }
            });
            setUsers(response.data);
        } catch (error) {
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [roleFilter]);

    const handleBanAction = async (userId: string, isBanned: boolean) => {
        try {
            const endpoint = isBanned ? `/admin/users/${userId}/unban` : `/admin/users/${userId}/ban`;
            await api.post(endpoint);
            toast.success(isBanned ? 'User unbanned' : 'User banned');
            fetchUsers();
        } catch (error) {
            toast.error('Failed to update user status');
        }
    };

    const handleVerifyRider = async (riderId: string) => {
        try {
            await api.post(`/admin/verify-rider/${riderId}`);
            toast.success('Rider verified');
            fetchUsers();
        } catch (error) {
            toast.error('Failed to verify rider');
        }
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-poppins text-gray-900">User Management</h1>
                    <p className="text-gray-500 text-sm">Monitor and moderate all platform participants.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-deepblue outline-none w-full md:w-64"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-deepblue outline-none bg-white"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="">All Roles</option>
                        <option value="STUDENT">Students</option>
                        <option value="SELLER">Sellers</option>
                        <option value="RIDER">Riders</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-600">User Details</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Role</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Status</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="p-12">
                                    <div className="flex justify-center">
                                        <Loader size="lg" />
                                    </div>
                                </td>
                            </tr>
                        ) : filteredUsers.length === 0 ? (
                            <tr><td colSpan={4} className="p-12 text-center text-gray-400">No users found</td></tr>
                        ) : (
                            filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                                                {user.name[0]}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{user.name}</div>
                                                <div className="text-xs text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                                            user.role === 'SELLER' ? 'bg-blue-100 text-blue-700' :
                                                user.role === 'RIDER' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-gray-100 text-gray-600'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.is_banned ? (
                                            <Badge variant="danger">Banned</Badge>
                                        ) : (
                                            <Badge variant="success">Active</Badge>
                                        )}
                                        {user.role === 'RIDER' && user.rider_profile?.verification_status === 'PENDING' && (
                                            <div className="mt-1"><Badge variant="warning">Verification Pending</Badge></div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            {user.role === 'RIDER' && user.rider_profile?.verification_status === 'PENDING' && (
                                                <button
                                                    onClick={() => handleVerifyRider(user.rider_profile.id)}
                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg title='Verify Rider'"
                                                >
                                                    <CheckCircle size={18} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleBanAction(user.id, user.is_banned)}
                                                className={`p-2 rounded-lg ${user.is_banned ? 'text-blue-600 hover:bg-blue-50' : 'text-red-600 hover:bg-red-50'}`}
                                                title={user.is_banned ? 'Unban User' : 'Ban User'}
                                            >
                                                {user.is_banned ? <Shield size={18} /> : <ShieldOff size={18} />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
