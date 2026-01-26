"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Plus, Save, Search, Trash2, Edit2, Package, Tag, Layers, Image as ImageIcon, Sparkles } from 'lucide-react';
import Image from 'next/image';

// Types matching lib/data.ts
interface Variant {
    id: string;
    name: string;
    color: string;
    image: string;
}

interface Size {
    id: string;
    label: string;
    price: number;
}

interface Specs {
    dimensions: string;
    material: string;
    shipping: string;
}

interface Product {
    id: string;
    slug: string;
    title: string;
    price: number;
    originalPrice: number;
    category: string;
    description: string;
    images: string[];
    longDescription: string;
    materialStory: string;
    careInstructions: string;
    storyImage: string;
    variants: Variant[];
    sizes?: Size[];
    specs: Specs;
    badges: string[];
}

const emptyProduct: Product = {
    id: '',
    slug: '',
    title: '',
    price: 0,
    originalPrice: 0,
    category: '',
    description: '',
    images: [],
    longDescription: '',
    materialStory: '',
    careInstructions: '',
    storyImage: '',
    variants: [],
    sizes: [],
    specs: { dimensions: '', material: '', shipping: '' },
    badges: []
};

const InputField = ({ label, value, onChange, type = "text", className = "" }: any) => (
    <div className={`space-y-1.5 ${className}`}>
        <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{label}</label>
        <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full p-2.5 text-sm bg-white border border-stone-200 rounded-md focus:ring-1 focus:ring-stone-900 focus:border-stone-900 transition-all"
        />
    </div>
);

const TextAreaField = ({ label, value, onChange, rows = 4 }: any) => (
    <div className="space-y-1.5">
        <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{label}</label>
        <textarea
            value={value}
            onChange={e => onChange(e.target.value)}
            rows={rows}
            className="w-full p-2.5 text-sm bg-white border border-stone-200 rounded-md focus:ring-1 focus:ring-stone-900 focus:border-stone-900 transition-all resize-none"
        />
    </div>
);

const Sidebar = ({
    searchTerm,
    setSearchTerm,
    setSelectedProduct,
    loading,
    filteredProducts,
    selectedProduct
}: any) => (
    <div className="w-80 border-r border-stone-200 h-screen bg-stone-50 flex flex-col fixed left-0 top-0 z-10">
        <div className="p-6 border-b border-stone-200 bg-stone-50">
            <h1 className="text-xl font-serif font-bold text-stone-900 mb-4">Guzel Dashboard</h1>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
            </div>
            <button
                onClick={() => setSelectedProduct({ ...emptyProduct, id: `${Date.now()}` })} // Unique numeric ID
                className="mt-4 w-full py-2 bg-stone-900 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-stone-800 transition-colors"
            >
                <Plus className="w-4 h-4" /> New Product
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {loading ? (
                <div className="flex justify-center p-8"><Loader2 className="animate-spin text-stone-400" /></div>
            ) : (
                filteredProducts.map((product: any) => (
                    <div
                        key={product.id}
                        onClick={() => setSelectedProduct(product)}
                        className={`p-3 rounded-lg cursor-pointer transition-all border ${selectedProduct?.id === product.id
                            ? 'bg-white border-stone-300 shadow-sm'
                            : 'hover:bg-stone-100 border-transparent'
                            }`}
                    >
                        <div className="font-medium text-stone-900 truncate">{product.title}</div>
                        <div className="text-xs text-stone-500 flex justify-between mt-1">
                            <span>{product.category}</span>
                            <span>${(product.price / 100).toFixed(2)}</span>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
);

export default function DashboardPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<'basic' | 'details' | 'media' | 'variants' | 'sizes'>('basic');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!selectedProduct) return;

        // Validation: Unique Size IDs
        if (selectedProduct.sizes) {
            const ids = selectedProduct.sizes.map(s => s.id);
            const duplicateIds = ids.filter((item, index) => ids.indexOf(item) !== index && item !== '');
            if (duplicateIds.length > 0) {
                alert(`Error: Duplicate Size IDs found: ${duplicateIds.join(', ')}. Please ensure all sizes have unique IDs.`);
                return;
            }
        }

        setSaving(true);

        try {
            let updatedProducts = [...products];
            const index = products.findIndex(p => p.id === selectedProduct.id);

            if (index >= 0) {
                updatedProducts[index] = selectedProduct;
            } else {
                updatedProducts.push(selectedProduct);
            }

            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProducts),
            });

            if (res.ok) {
                setProducts(updatedProducts);
                alert('Product saved successfully!');
            } else {
                alert('Failed to save product');
            }
        } catch (error) {
            console.error(error);
            alert('Error saving product');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        const updatedProducts = products.filter(p => p.id !== id);
        setProducts(updatedProducts);

        // Optimistic update
        if (selectedProduct?.id === id) setSelectedProduct(null);

        // Sync with server
        await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProducts),
        });
    };

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const updateField = (field: keyof Product, value: any) => {
        if (!selectedProduct) return;
        setSelectedProduct({ ...selectedProduct, [field]: value });
    };

    const updateSpec = (field: keyof Specs, value: string) => {
        if (!selectedProduct) return;
        setSelectedProduct({
            ...selectedProduct,
            specs: { ...selectedProduct.specs, [field]: value }
        });
    };

    // UI Components removed from here


    return (
        <div className="min-h-screen bg-white text-stone-900 font-sans pl-80">
            <Sidebar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setSelectedProduct={setSelectedProduct}
                loading={loading}
                filteredProducts={filteredProducts}
                selectedProduct={selectedProduct}
            />

            {selectedProduct ? (
                <main className="max-w-5xl mx-auto p-12">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8 sticky top-0 bg-white/80 backdrop-blur-md py-4 z-20 border-b border-stone-100">
                        <div>
                            <h2 className="text-2xl font-serif font-bold">{selectedProduct.title || 'Untitled Product'}</h2>
                            <p className="text-stone-500 text-sm">{selectedProduct.id}</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => handleDelete(selectedProduct.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete Product"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-6 py-2 bg-stone-900 text-white rounded-full flex items-center gap-2 hover:bg-stone-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Save Changes
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 border-b border-stone-200 mb-8">
                        {[
                            { id: 'basic', label: 'Basic Info', icon: Package },
                            { id: 'details', label: 'Story & Details', icon: Layers },
                            { id: 'media', label: 'Media', icon: ImageIcon },
                            { id: 'sizes', label: 'Sizes & Pricing', icon: Tag },
                            { id: 'variants', label: 'Start Variants', icon: Layers },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`px-4 py-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === tab.id
                                    ? 'border-stone-900 text-stone-900'
                                    : 'border-transparent text-stone-500 hover:text-stone-700'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Form Content */}
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                        {activeTab === 'basic' && (
                            <div className="grid grid-cols-2 gap-6">
                                <InputField label="Product ID" value={selectedProduct.id} onChange={(v: string) => updateField('id', v)} />
                                <InputField label="Slug" value={selectedProduct.slug} onChange={(v: string) => updateField('slug', v)} />
                                <InputField label="Title" value={selectedProduct.title} onChange={(v: string) => updateField('title', v)} className="col-span-2" />

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Category</label>
                                    <select
                                        value={selectedProduct.category}
                                        onChange={(e) => updateField('category', e.target.value)}
                                        className="w-full p-2.5 text-sm bg-white border border-stone-200 rounded-md focus:ring-1 focus:ring-stone-900 focus:border-stone-900 transition-all"
                                    >
                                        <option value="">Select Category</option>
                                        {[
                                            "Wood Frames",
                                            "Painted Frames",
                                            "Metal Frames",
                                            "Art Prints",
                                            "Home Decor",
                                            "Mirrors"
                                        ].map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField label="Price (in cents)" type="number" value={selectedProduct.price} onChange={(v: string) => updateField('price', parseInt(v))} />
                                    <InputField label="Original Price (0 if none)" type="number" value={selectedProduct.originalPrice} onChange={(v: string) => updateField('originalPrice', parseInt(v))} />
                                </div>
                                <TextAreaField label="Short Description" value={selectedProduct.description} onChange={(v: string) => updateField('description', v)} />
                                <InputField label="Badges (comma separated)" value={selectedProduct.badges.join(', ')} onChange={(v: string) => updateField('badges', v.split(',').map(s => s.trim()))} className="col-span-2" />
                            </div>
                        )}

                        {activeTab === 'details' && (
                            <div className="space-y-6">
                                <TextAreaField label="Long Description" value={selectedProduct.longDescription} onChange={(v: string) => updateField('longDescription', v)} rows={6} />
                                <TextAreaField label="Material Story" value={selectedProduct.materialStory} onChange={(v: string) => updateField('materialStory', v)} />
                                <TextAreaField label="Care Instructions" value={selectedProduct.careInstructions} onChange={(v: string) => updateField('careInstructions', v)} />
                                <InputField label="Story Image URL" value={selectedProduct.storyImage} onChange={(v: string) => updateField('storyImage', v)} />
                                {selectedProduct.storyImage && (
                                    <div className="relative h-40 w-full rounded-lg overflow-hidden border border-stone-200">
                                        <Image src={selectedProduct.storyImage} alt="Story" fill className="object-cover" />
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'media' && (
                            <div className="space-y-8">
                                {/* Main Image */}
                                <div className="p-4 rounded-lg border border-stone-200 bg-stone-50/50">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-4 flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-amber-500" /> Main Image (Studio Shot) - Index 0
                                    </h3>
                                    <div className="flex gap-4 items-start">
                                        <div className="relative w-32 h-40 rounded border border-stone-200 overflow-hidden bg-white shrink-0 shadow-sm">
                                            {selectedProduct.images[0] ? (
                                                <Image src={selectedProduct.images[0]} alt="Main" fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-stone-300 text-xs text-center p-2">No Image</div>
                                            )}
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <InputField
                                                label="Image URL"
                                                value={selectedProduct.images[0] || ''}
                                                onChange={(v: string) => {
                                                    const newImages = [...selectedProduct.images];
                                                    newImages[0] = v;
                                                    updateField('images', newImages);
                                                }}
                                            />
                                            <div>
                                                <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-md text-sm font-medium text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-colors cursor-pointer shadow-sm">
                                                    <ImageIcon className="w-4 h-4" /> Upload File
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={async (e) => {
                                                            const file = e.target.files?.[0];
                                                            if (!file) return;
                                                            const formData = new FormData();
                                                            formData.append('file', file);

                                                            // Helper for upload (could be extracted)
                                                            try {
                                                                const res = await fetch('/api/upload', { method: 'POST', body: formData });
                                                                const data = await res.json();
                                                                if (data.success) {
                                                                    const newImages = [...selectedProduct.images];
                                                                    newImages[0] = data.url;
                                                                    updateField('images', newImages);
                                                                } else {
                                                                    alert('Upload failed');
                                                                }
                                                            } catch (err) {
                                                                console.error(err);
                                                                alert('Upload error');
                                                            }
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Image */}
                                <div className="p-4 rounded-lg border border-stone-200 bg-stone-50/50">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-4 flex items-center gap-2">
                                        <Layers className="w-4 h-4 text-blue-500" /> Hover Image (Lifestyle) - Index 1
                                    </h3>
                                    <div className="flex gap-4 items-start">
                                        <div className="relative w-32 h-40 rounded border border-stone-200 overflow-hidden bg-white shrink-0 shadow-sm">
                                            {selectedProduct.images[1] ? (
                                                <Image src={selectedProduct.images[1]} alt="Hover" fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-stone-300 text-xs text-center p-2">No Image</div>
                                            )}
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <InputField
                                                label="Image URL"
                                                value={selectedProduct.images[1] || ''}
                                                onChange={(v: string) => {
                                                    const newImages = [...selectedProduct.images];
                                                    newImages[1] = v;
                                                    updateField('images', newImages);
                                                }}
                                            />
                                            <div>
                                                <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-md text-sm font-medium text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-colors cursor-pointer shadow-sm">
                                                    <ImageIcon className="w-4 h-4" /> Upload File
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={async (e) => {
                                                            const file = e.target.files?.[0];
                                                            if (!file) return;
                                                            const formData = new FormData();
                                                            formData.append('file', file);

                                                            try {
                                                                const res = await fetch('/api/upload', { method: 'POST', body: formData });
                                                                const data = await res.json();
                                                                if (data.success) {
                                                                    const newImages = [...selectedProduct.images];
                                                                    newImages[1] = data.url;
                                                                    updateField('images', newImages);
                                                                } else {
                                                                    alert('Upload failed');
                                                                }
                                                            } catch (err) {
                                                                console.error(err);
                                                                alert('Upload error');
                                                            }
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Gallery Images */}
                                <div className="p-4 border-t border-stone-200">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-4">Additional Gallery</h3>
                                    <div className="space-y-4">
                                        {selectedProduct.images.slice(2).map((img, idx) => {
                                            const realIndex = idx + 2;
                                            return (
                                                <div key={realIndex} className="flex gap-4 items-center group">
                                                    <div className="relative w-16 h-16 rounded border border-stone-200 overflow-hidden bg-stone-50 shrink-0">
                                                        {img && <Image src={img} alt={`Product ${realIndex}`} fill className="object-cover" />}
                                                    </div>
                                                    <div className="flex-1 flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={img}
                                                            onChange={e => {
                                                                const newImages = [...selectedProduct.images];
                                                                newImages[realIndex] = e.target.value;
                                                                updateField('images', newImages);
                                                            }}
                                                            className="flex-1 p-2 text-sm border border-stone-200 rounded focus:ring-1 focus:ring-stone-900"
                                                            placeholder="/product-pictures/..."
                                                        />
                                                        <label className="p-2 border border-stone-200 rounded hover:bg-stone-50 cursor-pointer text-stone-500" title="Upload Replacement">
                                                            <ImageIcon className="w-4 h-4" />
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                className="hidden"
                                                                onChange={async (e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (!file) return;
                                                                    const formData = new FormData();
                                                                    formData.append('file', file);

                                                                    try {
                                                                        const res = await fetch('/api/upload', { method: 'POST', body: formData });
                                                                        const data = await res.json();
                                                                        if (data.success) {
                                                                            const newImages = [...selectedProduct.images];
                                                                            newImages[realIndex] = data.url;
                                                                            updateField('images', newImages);
                                                                        }
                                                                    } catch (err) { console.error(err); }
                                                                }}
                                                            />
                                                        </label>
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            const newImages = selectedProduct.images.filter((_, i) => i !== realIndex);
                                                            updateField('images', newImages);
                                                        }}
                                                        className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            );
                                        })}

                                        <div className="flex gap-4 pt-4">
                                            <button
                                                onClick={() => updateField('images', [...selectedProduct.images, ''])}
                                                className="text-sm font-medium text-stone-600 hover:text-stone-900 flex items-center gap-2 px-4 py-2 border border-dashed border-stone-300 rounded-lg hover:border-stone-900 transition-colors"
                                            >
                                                <Plus className="w-4 h-4" /> Add URL Slot
                                            </button>
                                            <label className="text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-md">
                                                <Plus className="w-4 h-4" /> Upload New Gallery Image
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={async (e) => {
                                                        const file = e.target.files?.[0];
                                                        if (!file) return;
                                                        const formData = new FormData();
                                                        formData.append('file', file);

                                                        try {
                                                            const res = await fetch('/api/upload', { method: 'POST', body: formData });
                                                            const data = await res.json();
                                                            if (data.success) {
                                                                // Append to end
                                                                updateField('images', [...selectedProduct.images, data.url]);
                                                            }
                                                        } catch (err) { console.error(err); }
                                                    }}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'variants' && (
                            <div className="space-y-8">
                                <div className="grid grid-cols-3 gap-6">
                                    <InputField label="Dimensions" value={selectedProduct.specs.dimensions} onChange={(v: string) => updateSpec('dimensions', v)} />
                                    <InputField label="Material" value={selectedProduct.specs.material} onChange={(v: string) => updateSpec('material', v)} />
                                    <InputField label="Shipping" value={selectedProduct.specs.shipping} onChange={(v: string) => updateSpec('shipping', v)} />
                                </div>

                                <div className="border-t border-stone-200 pt-8">
                                    <h3 className="font-serif font-bold text-lg mb-4">Variants</h3>
                                    <div className="space-y-4">
                                        {selectedProduct.variants.map((variant, idx) => (
                                            <div key={idx} className="p-4 border border-stone-200 rounded-lg bg-stone-50/50 space-y-4 relative">
                                                <button
                                                    onClick={() => {
                                                        const newVariants = selectedProduct.variants.filter((_, i) => i !== idx);
                                                        updateField('variants', newVariants);
                                                    }}
                                                    className="absolute top-2 right-2 p-1 text-stone-400 hover:text-red-500"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <InputField label="Variant ID" value={variant.id} onChange={(v: string) => {
                                                        const newVariants = [...selectedProduct.variants];
                                                        newVariants[idx].id = v;
                                                        updateField('variants', newVariants);
                                                    }} />
                                                    <InputField label="Variant Name" value={variant.name} onChange={(v: string) => {
                                                        const newVariants = [...selectedProduct.variants];
                                                        newVariants[idx].name = v;
                                                        updateField('variants', newVariants);
                                                    }} />
                                                    <InputField label="Color (Hex or name)" value={variant.color} onChange={(v: string) => {
                                                        const newVariants = [...selectedProduct.variants];
                                                        newVariants[idx].color = v;
                                                        updateField('variants', newVariants);
                                                    }} />
                                                    <InputField label="Variant Image" value={variant.image} onChange={(v: string) => {
                                                        const newVariants = [...selectedProduct.variants];
                                                        newVariants[idx].image = v;
                                                        updateField('variants', newVariants);
                                                    }} />
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => updateField('variants', [...selectedProduct.variants, { id: '', name: '', color: '', image: '' }])}
                                            className="w-full py-3 border border-dashed border-stone-300 rounded-lg text-stone-500 hover:border-stone-900 hover:text-stone-900 transition-colors flex justify-center items-center gap-2"
                                        >
                                            <Plus className="w-4 h-4" /> Add Variant
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'sizes' && (
                            <div className="space-y-8">
                                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                                    <strong>Note:</strong> If no sizes are defined, the storefront will fallback to default standard sizes (12x16, 18x24, 24x36). Adding sizes here overrides the defaults.
                                </div>

                                <div className="space-y-4">
                                    {(selectedProduct.sizes || []).map((size, idx) => (
                                        <div key={idx} className="flex gap-4 items-center p-4 border border-stone-200 rounded-lg bg-stone-50/50">
                                            <div className="grid grid-cols-3 gap-4 flex-1">
                                                <InputField label="ID (e.g. 12x16)" value={size.id} onChange={(v: string) => {
                                                    const newSizes = [...(selectedProduct.sizes || [])];
                                                    newSizes[idx].id = v;
                                                    updateField('sizes', newSizes);
                                                }} />
                                                <InputField label="Label (e.g. 12&quot; x 16&quot;)" value={size.label} onChange={(v: string) => {
                                                    const newSizes = [...(selectedProduct.sizes || [])];
                                                    newSizes[idx].label = v;
                                                    updateField('sizes', newSizes);
                                                }} />
                                                <InputField label="Price (in cents)" type="number" value={size.price} onChange={(v: string) => {
                                                    const newSizes = [...(selectedProduct.sizes || [])];
                                                    newSizes[idx].price = parseInt(v);
                                                    updateField('sizes', newSizes);
                                                }} />
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const newSizes = selectedProduct.sizes!.filter((_, i) => i !== idx);
                                                    updateField('sizes', newSizes);
                                                }}
                                                className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded mt-5"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}

                                    <button
                                        onClick={() => updateField('sizes', [...(selectedProduct.sizes || []), { id: `${Date.now()}`, label: '', price: 0 }])}
                                        className="w-full py-3 border border-dashed border-stone-300 rounded-lg text-stone-500 hover:border-stone-900 hover:text-stone-900 transition-colors flex justify-center items-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" /> Add Size Option
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            ) : (
                <div className="flex flex-col items-center justify-center h-screen text-stone-400">
                    <Sparkles className="w-12 h-12 mb-4 text-stone-200" />
                    <p className="text-lg font-medium text-stone-500">Select a product to edit</p>
                    <p className="text-sm">or create a new one from the sidebar</p>
                </div>
            )}
        </div>
    );
}
