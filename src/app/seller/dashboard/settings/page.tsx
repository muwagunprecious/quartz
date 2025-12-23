"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { sellerService } from '@/services/sellerService';
import Button from '@/components/common/Button';
import Loader from '@/components/common/Loader';
import { Store, Save, ArrowLeft, Camera, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function StoreSettingsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form fields
    const [storeName, setStoreName] = useState('');
    const [description, setDescription] = useState('');
    const [bio, setBio] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [logoUrl, setLogoUrl] = useState('');
    const [bannerUrl, setBannerUrl] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await sellerService.getProfile();
                setStoreName(profile.store_name || '');
                setDescription(profile.description || '');
                setBio(profile.bio || '');
                setWhatsappNumber(profile.user?.whatsapp_number || '');
                setLogoUrl(profile.logo_url || '');
                setBannerUrl(profile.banner_url || '');
            } catch (error) {
                console.error("Failed to fetch seller profile", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await sellerService.updateProfile({
                store_name: storeName,
                description,
                bio,
                whatsapp_number: whatsappNumber,
                logo_url: logoUrl,
                banner_url: bannerUrl
            });
            alert('Store settings updated successfully!');
            router.push('/seller/dashboard');
        } catch (error) {
            console.error("Failed to update store settings", error);
            alert('Failed to update store settings. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'banner') => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('images', file);

        try {
            const result = await sellerService.uploadProfileImage(formData);
            const url = result.files[0].url;
            if (type === 'logo') setLogoUrl(url);
            else setBannerUrl(url);
        } catch (error) {
            console.error("Upload failed", error);
            alert("Failed to upload image");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader size="lg" />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 pb-12 pt-6">
            <div className="container max-w-[800px] mx-auto px-4">
                <div className="mb-6">
                    <Link href="/seller/dashboard" className="text-gray-500 hover:text-primary flex items-center gap-2 text-sm font-medium transition-colors">
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </Link>
                </div>

                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Store size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold font-poppins text-gray-900">Store Settings</h1>
                        <p className="text-gray-500 text-sm">Customize how your store appears to buyers.</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                    {/* Banner Section */}
                    <div className="h-40 bg-gray-100 relative group">
                        <img
                            src={bannerUrl || 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&q=80&w=1200'}
                            alt="Banner"
                            className="w-full h-full object-cover"
                        />
                        <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white font-medium gap-2">
                            <Camera size={20} />
                            Change Banner
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'banner')} />
                        </label>
                    </div>

                    <div className="px-8 pb-8 flex flex-col items-center sm:items-start -mt-12 sm:flex-row sm:gap-6">
                        {/* Logo Upload */}
                        <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-md relative group overflow-hidden">
                            <img
                                src={logoUrl || `https://ui-avatars.com/api/?name=${storeName || 'Store'}&background=random`}
                                alt="Logo"
                                className="w-full h-full object-cover"
                            />
                            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white">
                                <Camera size={18} />
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'logo')} />
                            </label>
                        </div>
                        <div className="mt-4 sm:mt-14">
                            <h2 className="text-lg font-bold text-gray-900">{storeName || 'Your Store Name'}</h2>
                            <p className="text-sm text-gray-500">Update your store identity</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-5 md:p-8 rounded-xl shadow-sm border border-gray-200 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                        <input
                            type="text"
                            required
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            placeholder="e.g. Usman's Tech Hub"
                            value={storeName}
                            onChange={e => setStoreName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Short Bio</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            placeholder="A brief tagline for your store..."
                            value={bio}
                            onChange={e => setBio(e.target.value)}
                        />
                        <p className="mt-1 text-xs text-gray-500">Appears under your store name on focus areas.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            placeholder="e.g. +234 812 345 6789"
                            value={whatsappNumber}
                            onChange={e => setWhatsappNumber(e.target.value)}
                        />
                        <p className="mt-1 text-xs text-gray-500">How buyers will contact you for inquiries.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
                        <textarea
                            rows={5}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            placeholder="Tell buyers more about what you sell and your service..."
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="pt-4">
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full"
                            isLoading={saving}
                            disabled={saving}
                            leftIcon={<Save size={18} />}
                        >
                            {saving ? 'Saving changes...' : 'Save Store Settings'}
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
}
