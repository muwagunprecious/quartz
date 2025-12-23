"use client";

import React, { useState, useEffect } from 'react';
import Badge from '@/components/common/Badge';
import { api } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { Image as ImageIcon, Plus, Trash2, Power, Layout, Bell, Send } from 'lucide-react';

export default function AdminContent() {
    const [banners, setBanners] = useState<any[]>([]);
    const [pageControls, setPageControls] = useState<any[]>([]);
    const [universities, setUniversities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Notification state
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationTarget, setNotificationTarget] = useState<'ALL' | 'UNIVERSITY'>('ALL');
    const [selectedUniversityId, setSelectedUniversityId] = useState('');

    // Form state for new banner
    const [showAddBanner, setShowAddBanner] = useState(false);
    const [bannerImage, setBannerImage] = useState<File | null>(null);
    const [newBanner, setNewBanner] = useState({
        title: '',
        subtitle: '',
        cta_text: ''
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [bannersRes, controlsRes, universitiesRes] = await Promise.all([
                api.get('/admin/banners'),
                api.get('/admin/page-controls'),
                api.get('/admin/universities')
            ]);
            setBanners(bannersRes.data);
            setPageControls(controlsRes.data);
            setUniversities(universitiesRes.data);
        } catch (error) {
            toast.error('Failed to load content data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateBanner = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', newBanner.title);
            formData.append('subtitle', newBanner.subtitle);
            formData.append('cta_text', newBanner.cta_text);
            if (bannerImage) {
                formData.append('image', bannerImage);
            }
            await api.post('/admin/banners', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Banner created');
            setShowAddBanner(false);
            setNewBanner({ title: '', subtitle: '', cta_text: '' });
            setBannerImage(null);
            fetchData();
        } catch (error) {
            toast.error('Failed to create banner');
        }
    };

    const handleToggleBanner = async (id: string, currentStatus: boolean) => {
        try {
            await api.post(`/admin/banners/${id}/toggle`, { is_active: !currentStatus });
            toast.success('Banner visibility updated');
            fetchData();
        } catch (error) {
            toast.error('Failed to update banner');
        }
    };

    const handleUpdatePageControl = async (page: string, section: string, isEnabled: boolean) => {
        try {
            await api.post('/admin/page-controls', {
                page,
                section,
                is_enabled: !isEnabled
            });
            toast.success('Section visibility updated');
            fetchData();
        } catch (error: any) {
            console.error('Failed to update section:', error.response?.data || error.message);
            toast.error('Failed to update section');
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold font-poppins text-gray-900">Content Management</h1>
                <p className="text-gray-500 text-sm">Control what users see on the platform.</p>
            </div>

            {/* Banners Section */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                        <ImageIcon size={20} className="text-deepblue" />
                        Hero Banners
                    </h2>
                    <button
                        onClick={() => setShowAddBanner(!showAddBanner)}
                        className="flex items-center gap-2 px-4 py-2 bg-deepblue text-white rounded-lg hover:bg-deepblue/90 transition-colors shadow-sm"
                    >
                        <Plus size={18} />
                        Add New Banner
                    </button>
                </div>

                {showAddBanner && (
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-in slide-in-from-top duration-300 mb-6">
                        <form onSubmit={handleCreateBanner} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-deepblue"
                                    value={newBanner.title}
                                    onChange={e => setNewBanner({ ...newBanner, title: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Subtitle</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-deepblue"
                                    value={newBanner.subtitle}
                                    onChange={e => setNewBanner({ ...newBanner, subtitle: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Banner Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-deepblue file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-deepblue/10 file:text-deepblue hover:file:bg-deepblue/20"
                                    onChange={e => setBannerImage(e.target.files?.[0] || null)}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">CTA Text (Button Label)</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-deepblue"
                                    value={newBanner.cta_text}
                                    onChange={e => setNewBanner({ ...newBanner, cta_text: e.target.value })}
                                />
                            </div>
                            <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAddBanner(false)}
                                    className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-deepblue text-white rounded-lg hover:bg-deepblue/90 shadow-md transition-all font-medium"
                                >
                                    Save Banner
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        [1, 2, 3].map(i => <div key={i} className="h-48 bg-gray-100 rounded-xl animate-pulse"></div>)
                    ) : banners.length === 0 ? (
                        <div className="col-span-full py-12 text-center text-gray-400 bg-white rounded-xl border border-dashed border-gray-300">
                            No banners configured. Add one to start.
                        </div>
                    ) : (
                        banners.map((banner) => (
                            <div key={banner.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm group">
                                <div className="h-40 relative">
                                    <img src={banner.image_url} alt={banner.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <button
                                            onClick={() => handleToggleBanner(banner.id, banner.is_active)}
                                            className={`p-2 rounded-full ${banner.is_active ? 'bg-white text-orange-600' : 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'}`}
                                            title={banner.is_active ? 'Disable' : 'Enable'}
                                        >
                                            <Power size={20} />
                                        </button>
                                    </div>
                                    {!banner.is_active && (
                                        <div className="absolute top-3 right-3">
                                            <Badge variant="danger">Inactive</Badge>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 truncate">{banner.title}</h3>
                                    <p className="text-xs text-gray-500 truncate mb-1">{banner.subtitle || 'No subtitle'}</p>
                                    <div className="text-[10px] text-blue-600 mt-2 font-medium uppercase tracking-wider">{banner.cta_text || 'SHOP NOW'}</div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            <hr className="border-gray-100" />

            {/* Page Section Control */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                    <Layout size={20} className="text-deepblue" />
                    Site Section Controls
                </h2>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
                            <tr>
                                <th className="px-6 py-4">Page</th>
                                <th className="px-6 py-4">Section</th>
                                <th className="px-6 py-4">Visibility</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {/* Predefined common sections or dynamic ones from DB */}
                            {[
                                { page: 'landing', section: 'featured_products', label: 'Featured Products' },
                                { page: 'landing', section: 'categories', label: 'Categories Row' },
                                { page: 'landing', section: 'recommendations', label: 'Recommended for You' }
                            ].map((item) => {
                                const control = pageControls.find(c => c.page_name === item.page && c.section_name === item.section);
                                const isEnabled = control ? control.is_enabled : true;

                                return (
                                    <tr key={`${item.page}-${item.section}`} className="hover:bg-gray-50/50">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-700 capitalize">{item.page}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{item.label}</td>
                                        <td className="px-6 py-4">
                                            {isEnabled ? (
                                                <Badge variant="success">Visible</Badge>
                                            ) : (
                                                <Badge variant="danger">Hidden</Badge>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleUpdatePageControl(item.page, item.section, isEnabled)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${isEnabled
                                                    ? 'text-red-600 hover:bg-red-50'
                                                    : 'bg-green-600 text-white shadow-lg shadow-green-600/20 hover:bg-green-700'
                                                    }`}
                                            >
                                                {isEnabled ? 'Hide Section' : 'Show Section'}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>

            <hr className="border-gray-100" />

            {/* Notifications Section */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                    <Bell size={20} className="text-deepblue" />
                    Send Notification
                </h2>
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-deepblue resize-none"
                                placeholder="Write your notification message here..."
                                value={notificationMessage}
                                onChange={e => setNotificationMessage(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-deepblue"
                                    value={notificationTarget}
                                    onChange={e => setNotificationTarget(e.target.value as 'ALL' | 'UNIVERSITY')}
                                >
                                    <option value="ALL">All Users</option>
                                    <option value="UNIVERSITY">Specific University</option>
                                </select>
                            </div>
                            {notificationTarget === 'UNIVERSITY' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-deepblue"
                                        value={selectedUniversityId}
                                        onChange={e => setSelectedUniversityId(e.target.value)}
                                    >
                                        <option value="">Select a university</option>
                                        {universities.map(uni => (
                                            <option key={uni.id} value={uni.id}>{uni.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={async () => {
                                    if (!notificationMessage.trim()) {
                                        toast.error('Please enter a message');
                                        return;
                                    }
                                    if (notificationTarget === 'UNIVERSITY' && !selectedUniversityId) {
                                        toast.error('Please select a university');
                                        return;
                                    }
                                    try {
                                        await api.post('/admin/notifications', {
                                            message: notificationMessage,
                                            university_id: notificationTarget === 'UNIVERSITY' ? selectedUniversityId : undefined
                                        });
                                        toast.success('Notification sent!');
                                        setNotificationMessage('');
                                        setNotificationTarget('ALL');
                                        setSelectedUniversityId('');
                                    } catch (error) {
                                        toast.error('Failed to send notification');
                                    }
                                }}
                                className="flex items-center gap-2 px-6 py-2 bg-deepblue text-white rounded-lg hover:bg-deepblue/90 shadow-md transition-all font-medium"
                            >
                                <Send size={18} />
                                Send Notification
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
