'use client';

import React, { useState } from 'react';
import { Package, Plus, Trash2, Edit2, Upload, Sparkles, BatteryCharging, ShieldCheck, Check, X, Image as ImageIcon } from 'lucide-react';
import { ProductType, ProductCondition } from '@/types';
import { createProduct, updateProduct, deleteProduct } from '@/actions/products';

interface InventoryManagerProps {
  initialProducts: ProductType[];
  onProductsUpdated?: () => void;
}

export function InventoryManager({ initialProducts, onProductsUpdated }: InventoryManagerProps) {
  const [products, setProducts] = useState<ProductType[]>(initialProducts);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states for Add Product
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'mac' | 'iphone' | 'ipad' | 'watch' | 'airpods'>('mac');
  const [basePrice, setBasePrice] = useState<number>(65000);
  const [salePrice, setSalePrice] = useState<number | undefined>(undefined);
  const [condition, setCondition] = useState<ProductCondition>('NEW_SEALED');
  const [batteryHealth, setBatteryHealth] = useState<number>(100);
  const [description, setDescription] = useState('');
  const [chip, setChip] = useState('Apple M3 Pro');
  const [warrantyInfo, setWarrantyInfo] = useState('1-Year Salem Comprehensive Warranty');
  const [stock, setStock] = useState<number>(4);
  const [colorName, setColorName] = useState('Space Black');
  const [colorHex, setColorHex] = useState('#1d1d1f');
  const [storageOption, setStorageOption] = useState('512GB');
  const [serialNumber, setSerialNumber] = useState('');

  // Base64 Image state
  const [base64Image, setBase64Image] = useState<string>('');
  const [imageFileName, setImageFileName] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  // Handle local file to Base64 conversion
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setBase64Image(result);
    };
    reader.readAsDataURL(file);
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !basePrice) return;

    setIsSaving(true);

    const imagesArray = base64Image ? [base64Image] : [];

    const res = await createProduct({
      title,
      category,
      basePrice: Number(basePrice),
      salePrice: salePrice ? Number(salePrice) : null,
      condition,
      batteryHealth: condition !== 'NEW_SEALED' ? Number(batteryHealth) : 100,
      description: description || `Premium Apple ${title} verified by Salem Group technicians.`,
      specs: {
        chip,
        storage: storageOption,
        color: colorName,
      },
      warrantyInfo,
      images: imagesArray,
      isFeatured: false,
      stock: Number(stock),
      variants: [
        {
          colorName,
          colorHex,
          storageOption,
          priceDelta: 0,
          serialNumber: serialNumber || undefined,
          stock: Number(stock),
        },
      ],
    });

    setIsSaving(false);

    if (res.success && res.product) {
      setProducts((prev) => [res.product as any, ...prev]);
      setIsAddModalOpen(false);
      resetForm();
      onProductsUpdated?.();
    }
  };

  const resetForm = () => {
    setTitle('');
    setBasePrice(65000);
    setSalePrice(undefined);
    setCondition('NEW_SEALED');
    setBatteryHealth(100);
    setDescription('');
    setBase64Image('');
    setImageFileName('');
    setSerialNumber('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this product from the database?')) return;
    const res = await deleteProduct(id);
    if (res.success) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      onProductsUpdated?.();
    }
  };

  const handleUpdateStock = async (id: string, newStock: number) => {
    const res = await updateProduct(id, { stock: newStock });
    if (res.success) {
      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, stock: newStock } : p)));
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Add Product Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-1">
            Catalog & Base64 Database Storage
          </span>
          <h2 className="text-2xl font-bold text-white">Apple Inventory Management</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Add new inventory, upload product images directly as Base64 into PostgreSQL 18, and edit stock.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Apple Product</span>
        </button>
      </div>

      {/* Inventory Table */}
      <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400 text-[11px]">
                <th className="py-3 px-3">Device Preview</th>
                <th className="py-3 px-3">Title & Category</th>
                <th className="py-3 px-3">Condition & Battery</th>
                <th className="py-3 px-3">Selling Price (EGP)</th>
                <th className="py-3 px-3">Stock Units</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-800/40 transition-colors">
                  {/* Thumbnail (Base64) */}
                  <td className="py-3 px-3">
                    <div className="w-12 h-12 rounded-xl bg-zinc-950 p-1 flex items-center justify-center border border-white/5 overflow-hidden">
                      {p.images?.[0] ? (
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-zinc-600" />
                      )}
                    </div>
                  </td>

                  {/* Title & Category */}
                  <td className="py-3 px-3 max-w-xs">
                    <span className="font-bold text-white block truncate">{p.title}</span>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                      {p.category} {p.specs?.chip ? `• ${p.specs.chip}` : ''}
                    </span>
                  </td>

                  {/* Condition & Battery */}
                  <td className="py-3 px-3">
                    {p.condition === 'NEW_SEALED' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                        Brand New Sealed
                      </span>
                    )}
                    {p.condition === 'OPEN_BOX' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-950 text-amber-300 border border-amber-500/30">
                        Open Box (100%)
                      </span>
                    )}
                    {p.condition === 'CERTIFIED_PRE_OWNED' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-950 text-purple-300 border border-purple-500/30">
                        Pre-Owned ({p.batteryHealth}%)
                      </span>
                    )}
                  </td>

                  {/* Price */}
                  <td className="py-3 px-3 font-semibold text-white">
                    {p.basePrice.toLocaleString()} EGP
                  </td>

                  {/* Stock Controls */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min="0"
                        value={p.stock}
                        onChange={(e) => handleUpdateStock(p.id, Number(e.target.value))}
                        className="w-16 bg-zinc-950 border border-white/10 rounded-lg px-2 py-1 text-center font-bold text-xs text-white focus:outline-none focus:border-zinc-500"
                      />
                      <span className="text-[10px] text-zinc-500">in stock</span>
                    </div>
                  </td>

                  {/* Delete */}
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal with Base64 Image Uploader */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-zinc-950 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Package className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                PostgreSQL 18 Product Creation
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">Add Apple Device</h2>
            <p className="text-xs text-zinc-400 mb-6">
              Upload an image file (auto-converted to Base64 in PostgreSQL) and specify hardware specs.
            </p>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-400 font-medium block mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MacBook Pro 14 M4 Pro"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 font-medium block mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
                  >
                    <option value="mac">MacBook / Mac</option>
                    <option value="iphone">iPhone</option>
                    <option value="ipad">iPad</option>
                    <option value="watch">Apple Watch</option>
                    <option value="airpods">AirPods</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 font-medium block mb-1">
                    Base Price (EGP) *
                  </label>
                  <input
                    type="number"
                    required
                    value={basePrice}
                    onChange={(e) => setBasePrice(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 font-medium block mb-1">
                    Condition *
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
                  >
                    <option value="NEW_SEALED">Brand New Sealed</option>
                    <option value="OPEN_BOX">Open Box (100% Battery)</option>
                    <option value="CERTIFIED_PRE_OWNED">Certified Pre-Owned</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 font-medium block mb-1">
                    Stock Count
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              {condition !== 'NEW_SEALED' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-zinc-900/60 border border-white/5">
                  <div>
                    <label className="text-xs text-zinc-400 font-medium block mb-1">
                      Battery Health %
                    </label>
                    <input
                      type="number"
                      min="70"
                      max="100"
                      value={batteryHealth}
                      onChange={(e) => setBatteryHealth(Number(e.target.value))}
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 font-medium block mb-1">
                      Device Serial / IMEI (Verification)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. C02H890MD6P"
                      value={serialNumber}
                      onChange={(e) => setSerialNumber(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
                    />
                  </div>
                </div>
              )}

              {/* Base64 Image Upload Component */}
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-dashed border-white/15 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white flex items-center gap-2">
                    <Upload className="w-4 h-4 text-blue-400" />
                    Product Image (Stored as Base64 in PostgreSQL)
                  </span>
                  {imageFileName && (
                    <span className="text-[10px] text-zinc-400 truncate max-w-[150px]">
                      {imageFileName}
                    </span>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-xs text-zinc-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer"
                />

                {base64Image && (
                  <div className="pt-2 flex items-center gap-3">
                    <div className="w-16 h-16 rounded-xl bg-zinc-950 border border-white/10 p-1 flex items-center justify-center overflow-hidden">
                      <img src={base64Image} alt="Preview" className="w-full h-full object-contain" />
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      <span className="text-emerald-400 font-semibold block">Base64 ready</span>
                      <span>String size: ~{Math.round(base64Image.length / 1024)} KB</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 font-medium block mb-1">
                    Processor / Chip
                  </label>
                  <input
                    type="text"
                    value={chip}
                    onChange={(e) => setChip(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 font-medium block mb-1">
                    Storage Option
                  </label>
                  <input
                    type="text"
                    value={storageOption}
                    onChange={(e) => setStorageOption(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 font-medium block mb-1">
                    Color Name
                  </label>
                  <input
                    type="text"
                    value={colorName}
                    onChange={(e) => setColorName(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full py-3 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-colors shadow-lg mt-4"
              >
                {isSaving ? 'Saving to Database...' : 'Save Product to PostgreSQL 18'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
