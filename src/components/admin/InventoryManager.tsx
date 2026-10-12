'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Upload, X } from 'lucide-react';
import { ProductType, ProductCondition } from '@/types';
import { createProduct, updateProduct, deleteProduct } from '@/actions/products';

interface InventoryManagerProps {
  initialProducts: ProductType[];
  onProductsUpdated?: () => void;
}

export function InventoryManager({ initialProducts, onProductsUpdated }: InventoryManagerProps) {
  const [products, setProducts] = useState<ProductType[]>(initialProducts);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'mac' | 'iphone' | 'ipad' | 'watch' | 'airpods'>('mac');
  const [basePrice, setBasePrice] = useState<number>(65000);
  const [condition, setCondition] = useState<ProductCondition>('NEW_SEALED');
  const [batteryHealth, setBatteryHealth] = useState<number>(100);
  const [description, setDescription] = useState('');
  const [chip, setChip] = useState('Apple M3 Pro');
  const [stock, setStock] = useState<number>(4);
  const [colorName, setColorName] = useState('Space Black');
  const [colorHex, setColorHex] = useState('#1d1d1f');
  const [storageOption, setStorageOption] = useState('512GB');
  const [serialNumber, setSerialNumber] = useState('');

  // Base64 image
  const [base64Image, setBase64Image] = useState<string>('');
  const [imageFileName, setImageFileName] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setBase64Image(reader.result as string);
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
      condition,
      batteryHealth: condition !== 'NEW_SEALED' ? Number(batteryHealth) : 100,
      description: description || `Apple ${title} with Salem Group 1-year warranty.`,
      specs: {
        chip,
        storage: storageOption,
        color: colorName,
      },
      warrantyInfo: '1-Year Salem Warranty',
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
    setCondition('NEW_SEALED');
    setBatteryHealth(100);
    setDescription('');
    setBase64Image('');
    setImageFileName('');
    setSerialNumber('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product from PostgreSQL 18?')) return;
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
    <div className="space-y-6 text-[#1d1d1f]">
      {/* Title & Add */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-[34px] font-semibold text-[#1d1d1f] tracking-[-0.374px] font-display">
            Apple Inventory
          </h2>
          <p className="text-[17px] text-[#7a7a7a] mt-0.5">
            Manage catalog stock and store product images as Base64 in PostgreSQL 18.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-[9999px] bg-[#0066cc] text-[#ffffff] text-[14px] font-normal hover:bg-[#0071e3] apple-btn-active"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Inventory Table */}
      <div className="bg-[#ffffff] border border-[#e0e0e0] rounded-[18px] p-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="border-b border-[#e0e0e0] text-[#7a7a7a] text-[12px]">
                <th className="py-3 px-3 font-semibold">Preview</th>
                <th className="py-3 px-3 font-semibold">Title & Specs</th>
                <th className="py-3 px-3 font-semibold">Condition</th>
                <th className="py-3 px-3 font-semibold">Selling Price</th>
                <th className="py-3 px-3 font-semibold">Stock</th>
                <th className="py-3 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-[#f5f5f7] transition-colors">
                  <td className="py-3 px-3">
                    <div className="w-12 h-12 rounded-[8px] bg-[#f5f5f7] border border-[#e0e0e0] p-1 flex items-center justify-center">
                      {p.images?.[0] ? (
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-[10px] text-[#7a7a7a]">No img</span>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <span className="font-semibold text-[#1d1d1f] block">{p.title}</span>
                    <span className="text-[12px] text-[#7a7a7a]">
                      {p.category} {p.specs?.chip ? `• ${p.specs.chip}` : ''}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <span className="text-[12px] text-[#7a7a7a]">
                      {p.condition === 'NEW_SEALED' && 'Sealed Box'}
                      {p.condition === 'OPEN_BOX' && 'Open Box (100%)'}
                      {p.condition === 'CERTIFIED_PRE_OWNED' && `Pre-Owned (${p.batteryHealth}%)`}
                    </span>
                  </td>

                  <td className="py-3 px-3 font-semibold text-[#1d1d1f]">
                    {p.basePrice.toLocaleString()} EGP
                  </td>

                  <td className="py-3 px-3">
                    <input
                      type="number"
                      min="0"
                      value={p.stock}
                      onChange={(e) => handleUpdateStock(p.id, Number(e.target.value))}
                      className="w-16 bg-[#f5f5f7] border border-[#e0e0e0] rounded-[8px] px-2 py-1 text-center font-bold text-[14px] text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                    />
                  </td>

                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-1.5 text-[#7a7a7a] hover:text-[#ff3b30]"
                      title="Delete"
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

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#ffffff] border border-[#e0e0e0] rounded-[18px] p-8 my-8 text-[#1d1d1f]">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f5f5f7] text-[#7a7a7a] hover:text-[#1d1d1f] flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[12px] font-semibold text-[#7a7a7a] uppercase tracking-[0.2px] block mb-1">
              PostgreSQL 18
            </span>
            <h2 className="text-[34px] font-semibold text-[#1d1d1f] tracking-[-0.374px] leading-[1.2] mb-1 font-display">
              Add Apple Product
            </h2>
            <p className="text-[17px] text-[#7a7a7a] mb-6">
              Image will be converted to Base64 and stored in the database.
            </p>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[12px] text-[#7a7a7a] block mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    placeholder="MacBook Pro 14 M4 Pro"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#f5f5f7] border border-[#e0e0e0] rounded-[11px] px-3.5 py-2.5 text-[14px] text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                  />
                </div>

                <div>
                  <label className="text-[12px] text-[#7a7a7a] block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-[#f5f5f7] border border-[#e0e0e0] rounded-[11px] px-3.5 py-2.5 text-[14px] text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                  >
                    <option value="mac">Mac</option>
                    <option value="iphone">iPhone</option>
                    <option value="ipad">iPad</option>
                    <option value="watch">Watch</option>
                    <option value="airpods">AirPods</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[12px] text-[#7a7a7a] block mb-1">Price (EGP)</label>
                  <input
                    type="number"
                    required
                    value={basePrice}
                    onChange={(e) => setBasePrice(Number(e.target.value))}
                    className="w-full bg-[#f5f5f7] border border-[#e0e0e0] rounded-[11px] px-3.5 py-2.5 text-[14px] text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                  />
                </div>

                <div>
                  <label className="text-[12px] text-[#7a7a7a] block mb-1">Condition</label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value as any)}
                    className="w-full bg-[#f5f5f7] border border-[#e0e0e0] rounded-[11px] px-3.5 py-2.5 text-[14px] text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                  >
                    <option value="NEW_SEALED">Sealed Box</option>
                    <option value="OPEN_BOX">Open Box (100%)</option>
                    <option value="CERTIFIED_PRE_OWNED">Certified Pre-Owned</option>
                  </select>
                </div>

                <div>
                  <label className="text-[12px] text-[#7a7a7a] block mb-1">Stock</label>
                  <input
                    type="number"
                    min="1"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full bg-[#f5f5f7] border border-[#e0e0e0] rounded-[11px] px-3.5 py-2.5 text-[14px] text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                  />
                </div>
              </div>

              {/* Base64 Image Upload */}
              <div className="p-4 rounded-[11px] bg-[#f5f5f7] border border-dashed border-[#e0e0e0] space-y-2">
                <span className="text-[12px] font-semibold text-[#1d1d1f] block">
                  Product Image (Base64 in PostgreSQL 18)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-[12px] text-[#7a7a7a] file:mr-3 file:py-1 file:px-3 file:rounded-[9999px] file:border-0 file:text-[12px] file:font-semibold file:bg-[#0066cc] file:text-white cursor-pointer"
                />
                {base64Image && (
                  <div className="flex items-center gap-3 pt-2">
                    <img src={base64Image} alt="Preview" className="w-12 h-12 object-contain rounded-[8px] bg-white border border-[#e0e0e0]" />
                    <span className="text-[12px] text-[#34c759] font-medium">Base64 encoded ({Math.round(base64Image.length / 1024)} KB)</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[12px] text-[#7a7a7a] block mb-1">Chip</label>
                  <input
                    type="text"
                    value={chip}
                    onChange={(e) => setChip(e.target.value)}
                    className="w-full bg-[#f5f5f7] border border-[#e0e0e0] rounded-[11px] px-3.5 py-2.5 text-[14px] text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                  />
                </div>
                <div>
                  <label className="text-[12px] text-[#7a7a7a] block mb-1">Storage</label>
                  <input
                    type="text"
                    value={storageOption}
                    onChange={(e) => setStorageOption(e.target.value)}
                    className="w-full bg-[#f5f5f7] border border-[#e0e0e0] rounded-[11px] px-3.5 py-2.5 text-[14px] text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                  />
                </div>
                <div>
                  <label className="text-[12px] text-[#7a7a7a] block mb-1">Color</label>
                  <input
                    type="text"
                    value={colorName}
                    onChange={(e) => setColorName(e.target.value)}
                    className="w-full bg-[#f5f5f7] border border-[#e0e0e0] rounded-[11px] px-3.5 py-2.5 text-[14px] text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full py-3.5 rounded-[9999px] bg-[#0066cc] text-[#ffffff] text-[17px] font-normal hover:bg-[#0071e3] apple-btn-active transition-all mt-4"
              >
                {isSaving ? 'Saving to Database...' : 'Save to PostgreSQL 18'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
