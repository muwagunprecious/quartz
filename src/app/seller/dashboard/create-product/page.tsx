"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { productService } from '@/services/productService';
import Button from '@/components/common/Button';
import { Upload, X, Plus, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateProductPage() {
    const router = useRouter();
    const { user } = useAuth();

    if (!user?.whatsapp_number) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-orange-100 p-8 text-center">
                    <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 mx-auto mb-6">
                        <AlertCircle size={32} />
                    </div>
                    <h1 className="text-xl font-bold text-gray-900 mb-2">WhatsApp Number Required</h1>
                    <p className="text-gray-500 mb-8 text-sm">
                        To protect our buyers and ensure smooth transactions, you must provide a valid WhatsApp number before you can upload products.
                    </p>
                    <div className="flex flex-col gap-3">
                        <Link href="/seller/dashboard/settings">
                            <Button variant="primary" className="w-full">
                                Go to Store Settings
                            </Button>
                        </Link>
                        <Link href="/seller/dashboard" className="text-sm text-gray-500 hover:text-gray-700 font-medium flex items-center justify-center gap-2">
                            <ArrowLeft size={16} />
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    // Basic Fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [condition, setCondition] = useState('Brand New');
    const [universityId, setUniversityId] = useState(''); // Should ideally come from user profile

    // Images
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);

    // Specs
    const [specs, setSpecs] = useState<{ key: string, value: string }[]>([
        { key: 'Material', value: '' },
        { key: 'Color', value: '' }
    ]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setImages([...images, ...newFiles]);

            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            setPreviews([...previews, ...newPreviews]);
        }
    };

    const removeImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);

        const newPreviews = [...previews];
        URL.revokeObjectURL(newPreviews[index]); // Cleanup
        newPreviews.splice(index, 1);
        setPreviews(newPreviews);
    };

    const handleSpecChange = (index: number, field: 'key' | 'value', text: string) => {
        const newSpecs = [...specs];
        newSpecs[index][field] = text;
        setSpecs(newSpecs);
    };

    const addSpec = () => {
        setSpecs([...specs, { key: '', value: '' }]);
    };

    const removeSpec = (index: number) => {
        const newSpecs = [...specs];
        newSpecs.splice(index, 1);
        setSpecs(newSpecs);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        try {
            // 1. Upload Images
            const uploadedImageUrls: { url: string, order_index: number }[] = [];

            // In a real scenario, we might upload concurrently or batch
            // productService.uploadImages expects FormData with 'files'
            if (images.length > 0) {
                const formData = new FormData();
                images.forEach(file => formData.append('images', file));

                const uploadRes = await productService.uploadImages(formData);
                if (uploadRes && uploadRes.files) {
                    uploadRes.files.forEach((fileObj: any, idx: number) => {
                        uploadedImageUrls.push({ url: fileObj.url, order_index: idx });
                    });
                }
            }

            // 2. Create Product
            // Convert specs to JSON string if backend expects it, or description appended
            const specsDescription = specs
                .filter(s => s.key && s.value)
                .map(s => `**${s.key}:** ${s.value}`)
                .join('\n');

            const fullDescription = `${description}\n\n### Specifications\n${specsDescription}`;

            // Build product payload – only include category if selected
            const productData: any = {
                title,
                description: fullDescription,
                price: parseFloat(price),
                condition,
                images: uploadedImageUrls,
                // stock_status: 'IN_STOCK', // Default in backend
            };
            if (category) {
                productData.category_id = category;
            }

            await productService.createProduct(productData);

            alert('Product created successfully!');
            router.push('/seller/dashboard');
        } catch (error: any) { // Type as any to access properties
            console.error("Failed to create product", error);
            const errorMessage = error.response?.data?.message || error.message || "Failed to create product. Please try again.";
            alert(`Error: ${errorMessage}`);
        } finally {
            setUploading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 pb-12 pt-6">
            <div className="container max-w-[800px] mx-auto px-4">
                <h1 className="text-2xl font-bold font-poppins text-gray-900 mb-6">Upload New Product</h1>

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 space-y-8">

                    {/* Basic Info */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold border-b border-gray-100 pb-2">Basic Information</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
                            <input
                                type="text"
                                required
                                className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-primary focus:border-primary"
                                placeholder="e.g. Nike Air Max 90"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₦)</label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-primary focus:border-primary"
                                    placeholder="0.00"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                                <select
                                    className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-primary focus:border-primary"
                                    value={condition}
                                    onChange={e => setCondition(e.target.value)}
                                >
                                    <option value="Brand New">Brand New</option>
                                    <option value="Like New">Like New</option>
                                    <option value="Good">Good</option>
                                    <option value="Fair">Fair</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            {/* In real app, fetch these */}
                            <select
                                required
                                className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-primary focus:border-primary"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                <option value="fashion">Fashion</option>
                                <option value="electronics">Electronics</option>
                                <option value="books">Books</option>
                                <option value="beauty">Beauty & Health</option>
                                <option value="others">Others</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                required
                                rows={4}
                                className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-primary focus:border-primary"
                                placeholder="Describe your product..."
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Images */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold border-b border-gray-100 pb-2">Product Images</h2>

                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                            {previews.map((src, idx) => (
                                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                                    <img src={src} alt="preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(idx)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}

                            <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-gray-50 aspect-square">
                                <Upload className="text-gray-400 mb-2" />
                                <span className="text-xs text-gray-500 text-center">Add Image</span>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                        <p className="text-xs text-gray-500">First image will be the cover. Add up to 5 images.</p>
                    </div>

                    {/* Specifications */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                            <h2 className="text-lg font-semibold">Specifications</h2>
                            <Button type="button" variant="outline" size="sm" onClick={addSpec} leftIcon={<Plus size={14} />}>
                                Add Spec
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {specs.map((spec, idx) => (
                                <div key={idx} className="flex gap-4 items-center">
                                    <input
                                        type="text"
                                        placeholder="Key (e.g. Size)"
                                        className="flex-1 border border-gray-300 rounded-md p-2 text-sm"
                                        value={spec.key}
                                        onChange={e => handleSpecChange(idx, 'key', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Value (e.g. Medium)"
                                        className="flex-1 border border-gray-300 rounded-md p-2 text-sm"
                                        value={spec.value}
                                        onChange={e => handleSpecChange(idx, 'value', e.target.value)}
                                    />
                                    {specs.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeSpec(idx)}
                                            className="text-gray-400 hover:text-red-500"
                                        >
                                            <X size={18} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full"
                            isLoading={uploading}
                            disabled={uploading}
                        >
                            {uploading ? 'Creating Product...' : 'Publish Product'}
                        </Button>
                    </div>

                </form>
            </div>
        </main>
    );
}
