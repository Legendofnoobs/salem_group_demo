'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProductType } from '@/types';
import { getProducts } from '@/actions/products';
import { useCart } from '@/context/CartContext';
import { Search, X, ShoppingBag, Sparkles } from 'lucide-react';
import { getClientSessionId, detectTrafficSource } from '@/lib/session';

interface SearchClientViewProps {
  initialQuery: string;
  initialProducts: ProductType[];
}

export function SearchClientView({ initialQuery, initialProducts }: SearchClientViewProps) {
  const router = useRouter();
  const { addToCart, currency, usdRate } = useCart();

  const [query, setQuery] = useState(initialQuery);
  const [products, setProducts] = useState<ProductType[]>(initialProducts);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState<string>('ALL');

  const suggestions = [
    'MacBook Pro M3 Max',
    'iPhone 16 Pro',
    'iPad Pro M4',
    'Apple Watch Ultra',
    'AirPods Pro 2',
    'Certified Pre-Owned',
  ];

  const handleSearch = async (searchStr: string) => {
    setIsSearching(true);
    const sid = getClientSessionId();
    const source = detectTrafficSource();

    const res = await getProducts({
      query: searchStr.trim() || undefined,
      sessionId: sid,
      trafficSource: source,
    });
    setProducts(res);
    setIsSearching(false);
  };

  const handleSuggestionClick = (sug: string) => {
    setQuery(sug);
    handleSearch(sug);
    router.replace(`/search?q=${encodeURIComponent(sug)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
    router.replace(`/search?q=${encodeURIComponent(query)}`);
  };

  const filteredProducts = selectedCondition === 'ALL'
    ? products
    : products.filter((p) => p.condition === selectedCondition);

  return (
    <div className="space-y-8">
      {/* Search Header Form */}
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h1 className="text-[32px] sm:text-[38px] font-semibold text-[#1d1d1f] tracking-tight font-display">
          Search Salem Catalog
        </h1>

        <form onSubmit={handleSubmit} className="relative flex items-center">
          <Search className="w-5 h-5 text-[#7a7a7a] absolute left-4 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by device name, chip, color, storage, or condition..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-12 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] focus:border-[#0066cc] focus:bg-white text-[15px] text-[#1d1d1f] outline-none transition-all shadow-xs"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                handleSearch('');
                router.replace('/search');
              }}
              className="absolute right-4 text-[#7a7a7a] hover:text-[#1d1d1f]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Search Suggestions */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[12px]">
          <span className="text-[#7a7a7a] font-medium mr-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#0066cc]" /> Popular Searches:
          </span>
          {suggestions.map((sug) => (
            <button
              key={sug}
              onClick={() => handleSuggestionClick(sug)}
              className="px-3 py-1 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] transition-colors cursor-pointer"
            >
              {sug}
            </button>
          ))}
        </div>
      </div>

      {/* Results Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#f0f0f0]">
        <div className="text-[14px] text-[#7a7a7a]">
          {query ? (
            <span>Results for &ldquo;<strong className="text-[#1d1d1f]">{query}</strong>&rdquo; (<strong className="text-[#1d1d1f]">{filteredProducts.length}</strong> devices)</span>
          ) : (
            <span>Showing all <strong className="text-[#1d1d1f]">{filteredProducts.length}</strong> in-stock devices</span>
          )}
        </div>

        {/* Condition Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {[
            { id: 'ALL', label: 'All Units' },
            { id: 'NEW_SEALED', label: 'Brand New Sealed' },
            { id: 'OPEN_BOX', label: 'Open Box' },
            { id: 'CERTIFIED_PRE_OWNED', label: 'Certified Pre-Owned' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCondition(tab.id)}
              className={`px-3 py-1 rounded-full text-[12px] whitespace-nowrap transition-colors cursor-pointer ${
                selectedCondition === tab.id
                  ? 'bg-[#1d1d1f] text-white font-medium'
                  : 'bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid or Zero Result Demand Logged */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 px-6 rounded-[22px] bg-[#f5f5f7] border border-[#e0e0e0] space-y-3">
          <h3 className="text-[22px] font-semibold text-[#1d1d1f]">
            No matching products found in stock
          </h3>
          <p className="text-[14px] text-[#7a7a7a] max-w-md mx-auto leading-relaxed">
            Your search for &ldquo;{query}&rdquo; has been recorded in our demand analytics. Our Salem Group procurement team will inspect supplier availability.
          </p>
          <div className="pt-2">
            <Link
              href="/collections/all"
              className="px-6 py-2.5 rounded-full bg-[#0066cc] text-white text-[13px] font-medium hover:bg-[#0071e3] transition-colors"
            >
              Explore Full In-Stock Catalog
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const rawPrice = product.salePrice || product.basePrice;
            const displayPrice = currency === 'USD'
              ? Math.round(rawPrice / usdRate)
              : rawPrice;

            return (
              <div
                key={product.id}
                className="group rounded-[18px] bg-white border border-[#e0e0e0] p-6 flex flex-col justify-between hover:border-[#b0b0b5] transition-all"
              >
                <div>
                  <Link href={`/products/${product.slug}`} className="aspect-4/3 w-full flex items-center justify-center p-3 mb-4 block">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-contain apple-product-shadow group-hover:scale-104 transition-transform duration-300"
                    />
                  </Link>

                  <span className="text-[11px] font-semibold text-[#0066cc] uppercase tracking-wider block mb-1">
                    {product.condition === 'NEW_SEALED' ? 'Brand New Sealed' : 'Certified Pre-Owned'}
                  </span>

                  <Link href={`/products/${product.slug}`}>
                    <h3 className="text-[17px] font-semibold text-[#1d1d1f] leading-snug group-hover:text-[#0066cc] transition-colors">
                      {product.title}
                    </h3>
                  </Link>

                  <p className="text-[13px] text-[#7a7a7a] mt-1 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-[#f0f0f0] flex items-end justify-between">
                  <div>
                    <span className="text-[17px] font-bold text-[#1d1d1f] block">
                      {currency === 'USD' ? `$${displayPrice.toLocaleString()}` : `${displayPrice.toLocaleString()} EGP`}
                    </span>
                    <span className="text-[11px] text-[#7a7a7a]">
                      Cash On Delivery (COD)
                    </span>
                  </div>

                  <Link
                    href={`/products/${product.slug}`}
                    className="px-4 py-2 rounded-full bg-[#0066cc] hover:bg-[#0071e3] text-white text-[13px] font-medium transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
