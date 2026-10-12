'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './Navbar';
import { HeroBanner } from './HeroBanner';
import { CategoryPills } from './CategoryPills';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';
import { TradeInModal } from './TradeInModal';
import { CartDrawer } from './CartDrawer';
import { CODCheckoutModal } from './CODCheckoutModal';
import { OrderTrackingModal } from './OrderTrackingModal';
import { ProductType, ProductCategory, ProductCondition, CartItemType, OrderType } from '@/types';
import { getProducts } from '@/actions/products';
import { trackEvent } from '@/actions/analytics';
import { getClientSessionId, detectTrafficSource } from '@/lib/session';

interface StorefrontViewProps {
  initialProducts: ProductType[];
  usdRate: number;
  onToggleAdmin: () => void;
}

export function StorefrontView({ initialProducts, usdRate, onToggleAdmin }: StorefrontViewProps) {
  const [products, setProducts] = useState<ProductType[]>(initialProducts);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [activeCondition, setActiveCondition] = useState<ProductCondition | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'newest'>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState<'EGP' | 'USD'>('EGP');

  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTradeInOpen, setIsTradeInOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);

  const [sessionId, setSessionId] = useState('');
  const [trafficSource, setTrafficSource] = useState('Direct');

  const catalogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sid = getClientSessionId();
    const source = detectTrafficSource();
    setSessionId(sid);
    setTrafficSource(source);
  }, []);

  useEffect(() => {
    const filterAndSearch = async () => {
      if (!sessionId) return;
      const filtered = await getProducts({
        category: activeCategory,
        condition: activeCondition,
        query: searchQuery,
        sortBy,
        sessionId,
        trafficSource,
      });
      setProducts(filtered);
    };

    const timer = setTimeout(filterAndSearch, 300);
    return () => clearTimeout(timer);
  }, [activeCategory, activeCondition, searchQuery, sortBy, sessionId, trafficSource]);

  const handleAddToCart = async (item: CartItemType) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.productId === item.productId && i.variantId === item.variantId
      );
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx].quantity += item.quantity;
        return copy;
      }
      return [...prev, item];
    });

    if (sessionId) {
      await trackEvent({
        eventType: 'ADD_TO_CART',
        productId: item.productId,
        productTitle: item.title,
        sessionId,
        trafficSource,
        metadata: {
          price: item.price,
          variant: item.selectedColor,
          condition: item.condition,
        },
      });
    }

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCartItems((prev) => {
      const copy = [...prev];
      copy[index].quantity += delta;
      if (copy[index].quantity <= 0) {
        copy.splice(index, 1);
      }
      return copy;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDirectOrder = (item: CartItemType) => {
    handleAddToCart(item);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleProceedToCheckout = async () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);

    if (sessionId) {
      const cartValue = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
      await trackEvent({
        eventType: 'CHECKOUT_INITIATED',
        sessionId,
        trafficSource,
        metadata: {
          cartValue,
          itemsCount: cartItems.length,
        },
      });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#1d1d1f] flex flex-col font-sans">
      {/* Navigation */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTradeIn={() => setIsTradeInOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onToggleAdmin={onToggleAdmin}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currency={currency}
        onToggleCurrency={() => setCurrency((c) => (c === 'EGP' ? 'USD' : 'EGP'))}
      />

      {/* Hero Showcase Tiles (DESIGN.md alternating light & dark canvases) */}
      <HeroBanner
        onScrollToCatalog={() => catalogRef.current?.scrollIntoView({ behavior: 'smooth' })}
        onOpenTradeIn={() => setIsTradeInOpen(true)}
      />

      {/* Main Store Catalog Section */}
      <main ref={catalogRef} className="max-w-[1200px] mx-auto px-4 sm:px-8 py-16 flex-1 w-full">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-[34px] sm:text-[40px] font-semibold text-[#1d1d1f] tracking-[-0.28px] font-display">
            Explore All Models.
          </h2>
          <p className="text-[17px] text-[#7a7a7a] mt-1 font-normal">
            Certified Apple products with full local warranty and Cash on Delivery in Egypt.
          </p>
        </div>

        {/* Category Pills & Sub-Filters */}
        <CategoryPills
          selectedCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          selectedCondition={activeCondition}
          onSelectCondition={setActiveCondition}
          sortBy={sortBy}
          onSelectSort={setSortBy}
          totalCount={products.length}
        />

        {/* Product Cards Grid or Zero-Results */}
        {products.length === 0 ? (
          <div className="text-center py-24 px-4 bg-[#f5f5f7] border border-[#e0e0e0] rounded-[18px]">
            <h3 className="text-[28px] font-semibold text-[#1d1d1f] mb-2 font-display">
              No matching Apple products found
            </h3>
            <p className="text-[17px] text-[#7a7a7a] max-w-md mx-auto mb-6">
              We logged your search query. Our Salem Group inventory team will review availability.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                  setActiveCondition('ALL');
                }}
                className="px-6 py-2.5 rounded-[9999px] bg-[#0066cc] text-white text-[14px] font-normal hover:bg-[#0071e3] apple-btn-active"
              >
                Clear Search
              </button>
              <button
                onClick={() => setIsTradeInOpen(true)}
                className="px-6 py-2.5 rounded-[9999px] border border-[#0066cc] text-[#0066cc] text-[14px] font-normal hover:bg-[#0066cc]/5 apple-btn-active"
              >
                Trade In Old Device
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                usdRate={usdRate}
                onSelectProduct={setSelectedProduct}
                onQuickAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </main>

      {/* Apple Footer (DESIGN.md footer spec: #f5f5f7 parchment, fine-print 12px) */}
      <footer className="bg-[#f5f5f7] border-t border-[#e0e0e0] py-12 px-4 sm:px-8 text-[#7a7a7a] text-[12px]">
        <div className="max-w-[1024px] mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#e0e0e0] pb-6">
            <span className="font-semibold text-[#1d1d1f] text-[14px]">
               Salem Group — Apple Authorized Reseller
            </span>
            <div className="flex items-center gap-4 text-[12px]">
              <span>Cash on Delivery (COD)</span>
              <span>•</span>
              <span>Inspect Before Paying</span>
              <span>•</span>
              <span>Cairo Showroom</span>
            </div>
          </div>

          <p className="text-[11px] leading-[1.5]">
            1. Cash On Delivery available across all governorates in Egypt. Customers have the right to unbox, inspect hardware, and verify serial numbers prior to payment.
          </p>
          <p className="text-[11px] leading-[1.5]">
            Copyright © 2026 Salem Group. All rights reserved. Apple, the Apple logo, MacBook Pro, iPhone, iPad, and Apple Watch are trademarks of Apple Inc.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        currency={currency}
        usdRate={usdRate}
        onAddToCart={handleAddToCart}
        onDirectOrder={handleDirectOrder}
      />

      <TradeInModal
        isOpen={isTradeInOpen}
        onClose={() => setIsTradeInOpen(false)}
        currency={currency}
        usdRate={usdRate}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        currency={currency}
        usdRate={usdRate}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CODCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={() => setCartItems([])}
        currency={currency}
        usdRate={usdRate}
        sessionId={sessionId}
        trafficSource={trafficSource}
      />

      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
      />
    </div>
  );
}
