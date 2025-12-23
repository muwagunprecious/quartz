"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { riderService, RiderProfile } from '@/services/riderService';
import { getImageUrl } from '@/lib/api';
import Button from '@/components/common/Button';
import Loader from '@/components/common/Loader';
import { Upload, CheckCircle, AlertCircle, FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function RiderVerificationPage() {
    const router = useRouter();
    const [profile, setProfile] = useState<RiderProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [documentType, setDocumentType] = useState('NIN');
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const data = await riderService.getProfile();
            setProfile(data);
            if (data.verification_document_url) {
                setPreviewUrl(getImageUrl(data.verification_document_url));
            }
            if (data.verification_document_type) {
                setDocumentType(data.verification_document_type);
            }
        } catch (error) {
            console.error("Failed to load profile", error);
            toast.error("Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file && !profile?.verification_document_url) {
            toast.error("Please upload a document");
            return;
        }

        setSubmitting(true);
        try {
            let uploadedUrl = profile?.verification_document_url || '';

            if (file) {
                const formData = new FormData();
                formData.append('images', file);
                const uploadRes = await riderService.uploadVerificationDocument(formData);
                uploadedUrl = uploadRes.files[0].url;
            }

            await riderService.submitVerification(documentType, uploadedUrl);

            toast.success("Verification submitted successfully");
            fetchProfile(); // Refresh status
        } catch (error) {
            console.error("Verification failed", error);
            toast.error("Failed to submit verification");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader size="lg" />
            </div>
        );
    }

    const isVerified = profile?.verification_status === 'VERIFIED';
    const isPending = profile?.verification_status === 'PENDING';
    const isRejected = profile?.verification_status === 'REJECTED';

    return (
        <main className="min-h-screen bg-gray-50 pb-12 pt-6">
            <div className="container max-w-[600px] mx-auto px-4">
                <div className="mb-6">
                    <Link href="/delivery/dashboard" className="text-gray-500 hover:text-primary flex items-center gap-2 text-sm font-medium transition-colors">
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h1 className="text-2xl font-bold font-poppins text-gray-900">Identity Verification</h1>
                        <p className="text-gray-500 text-sm mt-1">To ensure safety, we need to verify your identity before you can start delivering orders.</p>
                    </div>

                    <div className="p-6 md:p-8">
                        {isVerified ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
                                    <CheckCircle size={32} />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2">You are Verified!</h2>
                                <p className="text-gray-500">Your account is fully active. You can now accept deliveries.</p>
                                <div className="mt-6 flex justify-center">
                                    <Link href="/delivery/dashboard">
                                        <Button variant="primary">Go to Dashboard</Button>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {isPending && profile?.verification_document_url && (
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3 text-yellow-800 text-sm mb-6">
                                        <div className="mt-0.5"><AlertCircle size={16} /></div>
                                        <div>
                                            <p className="font-semibold">Verification Pending</p>
                                            <p>Unless rejected, avoid resubmitting as it might reset your queue position.</p>
                                        </div>
                                    </div>
                                )}

                                {isRejected && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3 text-red-800 text-sm mb-6">
                                        <div className="mt-0.5"><AlertCircle size={16} /></div>
                                        <div>
                                            <p className="font-semibold">Verification Rejected</p>
                                            <p>Please upload a clearer document or ensuring it matches your profile.</p>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            className={`p-4 rounded-lg border text-left transition-all ${documentType === 'NIN' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 hover:bg-gray-50'}`}
                                            onClick={() => setDocumentType('NIN')}
                                        >
                                            <div className="font-semibold text-gray-900 mb-1">NIN Slip</div>
                                            <div className="text-xs text-gray-500">National Identity Number</div>
                                        </button>
                                        <button
                                            type="button"
                                            className={`p-4 rounded-lg border text-left transition-all ${documentType === 'STUDENT_ID' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 hover:bg-gray-50'}`}
                                            onClick={() => setDocumentType('STUDENT_ID')}
                                        >
                                            <div className="font-semibold text-gray-900 mb-1">Student ID</div>
                                            <div className="text-xs text-gray-500">University Identification Card</div>
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Document</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:bg-gray-50 transition-colors text-center cursor-pointer relative">
                                        <input
                                            type="file"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                        {previewUrl ? (
                                            <div className="relative h-48 w-full">
                                                <img
                                                    src={previewUrl}
                                                    alt="Preview"
                                                    className="w-full h-full object-contain rounded-lg"
                                                />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                                                    <span className="text-white font-medium flex items-center gap-2">
                                                        <Upload size={18} /> Change Image
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="py-8">
                                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mx-auto mb-3">
                                                    <Upload size={24} />
                                                </div>
                                                <p className="text-sm font-medium text-gray-900">Click to upload image</p>
                                                <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="w-full py-3"
                                        isLoading={submitting}
                                    >
                                        {isPending ? 'Update Verification' : 'Submit for Verification'}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
