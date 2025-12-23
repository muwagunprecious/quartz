"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { riderService } from '@/services/riderService';
import Button from '@/components/common/Button';

export default function SignupPage() {
    const { login } = useAuth();
    const [universities, setUniversities] = useState([]);

    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const { data } = await api.get('/public/universities');
                setUniversities(data);
                if (data.length > 0) {
                    setFormData(prev => ({ ...prev, university_id: data[0].id }));
                }
            } catch (error) {
                console.error('Failed to fetch universities', error);
            }
        };
        fetchUniversities();
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'STUDENT',
        university_id: '',
        whatsapp_number: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Rider specific state
    const [riderDocType, setRiderDocType] = useState('NIN');
    const [riderFile, setRiderFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Register
            await api.post('/auth/register', formData);

            // Auto login after register
            const { data } = await api.post('/auth/login', {
                email: formData.email,
                password: formData.password
            });

            // Store token for subsequent requests
            localStorage.setItem('token', data.access_token);

            // If Rider and has file, upload verification
            if (formData.role === 'RIDER' && riderFile) {
                try {
                    const fileData = new FormData();
                    fileData.append('images', riderFile);
                    // Manually set token in header for this request since context login isn't synchronous/immediate here
                    // Actually api interceptor reads from localStorage, so setting item above handles it.

                    const uploadRes = await riderService.uploadVerificationDocument(fileData);
                    await riderService.submitVerification(riderDocType, uploadRes.files[0].url);
                } catch (vError) {
                    console.error("Verification upload failed during signup", vError);
                    // Don't block signup success, but maybe warn user? 
                    // They can re-upload in dashboard.
                }
            }

            login(data.access_token, data.user);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/auth/login" className="font-medium text-primary hover:text-primary-dark">
                            Sign in
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="name" className="sr-only">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="university_id" className="sr-only">University</label>
                            <select
                                id="university_id"
                                name="university_id"
                                required
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                value={formData.university_id}
                                onChange={handleChange}
                            >
                                <option value="" disabled>Select your University</option>
                                {universities.map((uni: any) => (
                                    <option key={uni.id} value={uni.id}>
                                        {uni.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="role" className="sr-only">I am a...</label>
                            <select
                                id="role"
                                name="role"
                                required
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="STUDENT">Student (Buyer)</option>
                                <option value="SELLER">Seller</option>
                                <option value="RIDER">Delivery Agent</option>
                            </select>
                        </div>
                        {formData.role === 'SELLER' && (
                            <div className="mb-4">
                                <label htmlFor="whatsapp_number" className="sr-only">WhatsApp Number</label>
                                <input
                                    id="whatsapp_number"
                                    name="whatsapp_number"
                                    type="text"
                                    required
                                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                    placeholder="WhatsApp Number (e.g. +234...)"
                                    value={formData.whatsapp_number}
                                    onChange={handleChange}
                                />
                                <p className="text-[10px] text-gray-500 mt-1 px-1">Required for sellers to receive inquiries</p>
                            </div>
                        )}

                        {formData.role === 'RIDER' && (
                            <div className="mb-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Verification ID</label>
                                <p className="text-xs text-gray-500 mb-3">To become a delivery agent, you must upload a valid ID for admin verification.</p>

                                <div className="flex gap-2 mb-3">
                                    <button
                                        type="button"
                                        onClick={() => setRiderDocType('NIN')}
                                        className={`flex-1 py-1.5 px-2 text-xs font-medium rounded border ${riderDocType === 'NIN' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200'}`}
                                    >
                                        NIN Slip
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setRiderDocType('STUDENT_ID')}
                                        className={`flex-1 py-1.5 px-2 text-xs font-medium rounded border ${riderDocType === 'STUDENT_ID' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200'}`}
                                    >
                                        Student ID
                                    </button>
                                </div>

                                <input
                                    type="file"
                                    accept="image/*"
                                    required
                                    onChange={(e) => setRiderFile(e.target.files?.[0] || null)}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                />
                            </div>
                        )}
                        <div className="mb-4">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <Button
                            type="submit"
                            className="w-full"
                            isLoading={isLoading}
                        >
                            Sign up
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
