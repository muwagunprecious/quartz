"use client";

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { School, Tag, Plus, Save, Trash2, Globe, Edit } from 'lucide-react';
import Badge from '@/components/common/Badge';

type Tab = 'universities' | 'categories' | 'platform';

export default function AdminSettings() {
    const [activeTab, setActiveTab] = useState<Tab>('universities');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<{ universities: any[], categories: any[] }>({
        universities: [],
        categories: []
    });

    // Form states
    const [showAdd, setShowAdd] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [newItem, setNewItem] = useState({ name: '', slug: '', city: '' });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [uniRes, catRes] = await Promise.all([
                api.get('/universities'),
                api.get('/categories')
            ]);
            setData({
                universities: uniRes.data,
                categories: catRes.data
            });
        } catch (error) {
            toast.error('Failed to load settings data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const endpoint = activeTab === 'universities' ? '/universities' : '/categories';
            await api.post(endpoint, newItem);
            toast.success(`${activeTab === 'universities' ? 'University' : 'Category'} created`);
            setShowAdd(false);
            setNewItem({ name: '', slug: '', city: '' });
            fetchData();
        } catch (error) {
            toast.error('Failed to create item');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        try {
            const endpoint = activeTab === 'universities' ? `/universities/${id}` : `/categories/${id}`;
            await api.delete(endpoint);
            toast.success('Item deleted successfully');
            fetchData();
        } catch (error) {
            toast.error('Failed to delete item');
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const endpoint = activeTab === 'universities' ? `/universities/${editingItem.id}` : `/categories/${editingItem.id}`;
            await api.patch(endpoint, editingItem);
            toast.success('Item updated successfully');
            setEditingItem(null);
            fetchData();
        } catch (error) {
            toast.error('Failed to update item');
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold font-poppins text-gray-900">Platform Settings</h1>
                <p className="text-gray-500 text-sm">Configure core platform data and global parameters.</p>
            </div>

            <div className="flex border-b border-gray-200">
                <TabButton
                    active={activeTab === 'universities'}
                    onClick={() => setActiveTab('universities')}
                    icon={<School size={18} />}
                    label="Universities"
                />
                <TabButton
                    active={activeTab === 'categories'}
                    onClick={() => setActiveTab('categories')}
                    icon={<Tag size={18} />}
                    label="Categories"
                />
                <TabButton
                    active={activeTab === 'platform'}
                    onClick={() => setActiveTab('platform')}
                    icon={<Globe size={18} />}
                    label="Global UI"
                />
            </div>

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold capitalize">{activeTab} Management</h2>
                    {activeTab !== 'platform' && (
                        <button
                            onClick={() => setShowAdd(!showAdd)}
                            className="flex items-center gap-2 px-4 py-2 bg-deepblue text-white rounded-lg hover:bg-deepblue/90 transition-all shadow-sm"
                        >
                            <Plus size={18} />
                            Add New
                        </button>
                    )}
                </div>

                {(showAdd || editingItem) && (
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-in slide-in-from-top-2 duration-300">
                        <form onSubmit={editingItem ? handleUpdate : handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-deepblue"
                                    value={editingItem ? editingItem.name : newItem.name}
                                    onChange={e => editingItem ? setEditingItem({ ...editingItem, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-') }) : setNewItem({ ...newItem, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Slug</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-deepblue bg-gray-50"
                                    value={editingItem ? editingItem.slug : newItem.slug}
                                    readOnly
                                />
                            </div>
                            {activeTab === 'universities' && (
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">City</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-deepblue"
                                        value={editingItem ? editingItem.city : newItem.city}
                                        onChange={e => editingItem ? setEditingItem({ ...editingItem, city: e.target.value }) : setNewItem({ ...newItem, city: e.target.value })}
                                    />
                                </div>
                            )}
                            <div className="md:col-span-3 flex justify-end gap-3 mt-2">
                                <button type="button" onClick={() => { setShowAdd(false); setEditingItem(null); }} className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-deepblue text-white rounded-lg font-medium shadow-md">
                                    {editingItem ? 'Update Item' : 'Create Item'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    {activeTab === 'universities' && (
                        <Table
                            headers={['University Name', 'Slug', 'City', 'Participation']}
                            loading={loading}
                            onDelete={handleDelete}
                            onEdit={(u: any) => setEditingItem(u)}
                            data={data.universities}
                            rows={data.universities.map(u => [
                                <div key="name" className="font-medium text-gray-900">{u.name}</div>,
                                <code key="slug" className="text-xs bg-gray-100 px-2 py-1 rounded">{u.slug}</code>,
                                <span key="city" className="text-gray-500">{u.city || 'N/A'}</span>,
                                <div key="stats" className="flex gap-2">
                                    <Badge variant="primary">{u._count.users} Users</Badge>
                                    <Badge variant="warning">{u._count.products} Items</Badge>
                                </div>
                            ])}
                        />
                    )}

                    {activeTab === 'categories' && (
                        <Table
                            headers={['Category Name', 'Slug', 'Usage Count']}
                            loading={loading}
                            onDelete={handleDelete}
                            onEdit={(c: any) => setEditingItem(c)}
                            data={data.categories}
                            rows={data.categories.map(c => [
                                <div key="name" className="font-medium text-gray-900">{c.name}</div>,
                                <code key="slug" className="text-xs bg-gray-100 px-2 py-1 rounded">{c.slug}</code>,
                                <Badge key="stats" variant="neutral">{c._count.products} Products</Badge>
                            ])}
                        />
                    )}

                    {activeTab === 'platform' && (
                        <div className="p-12 text-center text-gray-400">
                            Global platform UI settings (colors, logos, slogans) are managed via configuration files.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function TabButton({ active, onClick, icon, label }: any) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all border-b-2 ${active
                ? 'border-deepblue text-deepblue bg-deepblue/5'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
        >
            {icon}
            {label}
        </button>
    );
}

function Table({ headers, rows, loading, onEdit, onDelete, data: items }: any) {
    return (
        <table className="w-full text-left">
            <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                <tr>
                    {headers.map((h: string) => <th key={h} className="px-6 py-4">{h}</th>)}
                    <th className="px-6 py-4 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {loading ? (
                    <tr><td colSpan={headers.length + 1} className="p-12 text-center text-gray-400">Loading data...</td></tr>
                ) : rows.length === 0 ? (
                    <tr><td colSpan={headers.length + 1} className="p-12 text-center text-gray-400">No items found</td></tr>
                ) : (
                    rows.map((row: any, i: number) => (
                        <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                            {row.map((cell: any, j: number) => <td key={j} className="px-6 py-4 text-sm">{cell}</td>)}
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => onEdit(items[i])}
                                        className="p-2 text-gray-400 hover:text-deepblue rounded-lg hover:bg-blue-50 transition-colors"
                                    >
                                        <Plus className="rotate-45" size={16} /> {/* Using Plus rotated as a simple Edit icon or just use a proper one if available, but let's use Plus for simplicity for now or Save? No, let's use a generic icon. Wait, I have Save and Plus. Let's use Plus rotated. Actually let's just use text or dots. */}
                                    </button>
                                    <button
                                        onClick={() => onDelete(items[i].id)}
                                        className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}
