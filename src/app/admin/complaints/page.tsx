"use client";

import React, { useState, useEffect } from 'react';
import Badge from '@/components/common/Badge';
import Loader from '@/components/common/Loader';
import { api } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { MessageCircle, CheckCircle, XCircle, Clock, Send, User } from 'lucide-react';

export default function AdminComplaints() {
    const [complaints, setComplaints] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
    const [resolutionText, setResolutionText] = useState('');

    const fetchComplaints = async () => {
        setLoading(true);
        try {
            const response = await api.get('/admin/complaints', {
                params: { status: statusFilter || undefined }
            });
            setComplaints(response.data);
        } catch (error) {
            toast.error('Failed to load complaints');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, [statusFilter]);

    const handleResolve = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post(`/admin/complaints/${selectedComplaint.id}/resolve`, {
                response: resolutionText,
                status: 'RESOLVED'
            });
            toast.success('Complaint resolved');
            setSelectedComplaint(null);
            setResolutionText('');
            fetchComplaints();
        } catch (error) {
            toast.error('Failed to resolve complaint');
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-poppins text-gray-900">Complaints & Support</h1>
                    <p className="text-gray-500 text-sm">Review and resolve user-reported issues.</p>
                </div>

                <select
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-deepblue outline-none bg-white"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All Tickets</option>
                    <option value="PENDING">Pending</option>
                    <option value="RESOLVED">Resolved</option>
                    <option value="DISMISSED">Dismissed</option>
                </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Complaints List */}
                <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">
                    {loading ? (
                        <div className="flex justify-center p-12">
                            <Loader />
                        </div>
                    ) : complaints.length === 0 ? (
                        <div className="p-12 text-center text-gray-400 bg-white rounded-xl border border-dashed border-gray-200">
                            No complaints found in this category.
                        </div>
                    ) : (
                        complaints.map((complaint) => (
                            <div
                                key={complaint.id}
                                onClick={() => setSelectedComplaint(complaint)}
                                className={`p-5 rounded-xl border transition-all cursor-pointer ${selectedComplaint?.id === complaint.id
                                    ? 'bg-blue-50/50 border-deepblue ring-1 ring-deepblue'
                                    : 'bg-white border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-gray-900 truncate pr-4">{complaint.subject}</h3>
                                    <Badge variant={
                                        complaint.status === 'PENDING' ? 'warning' :
                                            complaint.status === 'RESOLVED' ? 'success' : 'neutral'
                                    }>
                                        {complaint.status}
                                    </Badge>
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">{complaint.description}</p>
                                <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium">
                                    <div className="flex items-center gap-1.5">
                                        <User size={12} />
                                        <span>{complaint.user?.name}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={12} />
                                        <span>{new Date(complaint.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Details & Resolution Section */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 h-fit lg:sticky lg:top-8">
                    {selectedComplaint ? (
                        <div className="space-y-6 animate-in zoom-in-95 duration-300">
                            <div className="flex items-center gap-3 text-deepblue">
                                <MessageCircle size={24} />
                                <h2 className="text-xl font-bold">Ticket Details</h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Subject</label>
                                    <p className="text-lg font-semibold text-gray-900">{selectedComplaint.subject}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">User Information</label>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-600 font-bold uppercase">{selectedComplaint.user?.name[0]}</div>
                                        <span className="text-sm text-gray-700 font-medium">{selectedComplaint.user?.name} ({selectedComplaint.user?.email})</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Description</label>
                                    <div className="mt-2 p-4 bg-gray-50 rounded-lg text-sm text-gray-700 leading-relaxed italic border-l-4 border-gray-200">
                                        "{selectedComplaint.description}"
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {selectedComplaint.status === 'PENDING' ? (
                                <form onSubmit={handleResolve} className="space-y-4">
                                    <label className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                                        <Send size={16} className="text-blue-500" />
                                        Official Resolution Response
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="Explain the steps taken to resolve this issue..."
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-deepblue resize-none text-sm"
                                        value={resolutionText}
                                        onChange={e => setResolutionText(e.target.value)}
                                    ></textarea>
                                    <div className="flex gap-3 pt-2">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                // Simplified dismissing
                                                api.post(`/admin/complaints/${selectedComplaint.id}/resolve`, { status: 'DISMISSED', response: 'Dismissed' });
                                                toast.success('Complaint dismissed');
                                                setSelectedComplaint(null);
                                                fetchComplaints();
                                            }}
                                            className="flex-1 py-3 px-4 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <XCircle size={18} />
                                            Dismiss
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 py-3 px-4 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 shadow-lg shadow-green-600/20 flex items-center justify-center gap-2 transition-all"
                                        >
                                            <CheckCircle size={18} />
                                            Resolve Ticket
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-4">
                                    <label className="text-sm font-semibold text-green-700 flex items-center gap-2">
                                        <CheckCircle size={16} />
                                        Resolution Summary
                                    </label>
                                    <div className="p-4 bg-green-50 rounded-lg text-sm text-green-800 leading-relaxed border border-green-100">
                                        {selectedComplaint.response || 'No response recorded.'}
                                    </div>
                                    <div className="text-xs text-gray-500 italic">This ticket was marked as {selectedComplaint.status.toLowerCase()} on {new Date(selectedComplaint.updated_at).toLocaleDateString()}.</div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center py-20 text-center space-y-4">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                                <MessageCircle size={32} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Select a Ticket</h3>
                                <p className="text-sm text-gray-500 max-w-[250px]">Choose a complaint from the list to view full details and take action.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
