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
import { ProductType, ProductCategory, ProductCondition, CartItemType } from '@/types';
import { getProducts } from '@/actions/products';
import { trackEvent } from '@/actions/analytics';
import { getClientSessionId, detectTrafficSource } from '@/lib/session';
import { ShieldCheck, Truck, RefreshCw, Award, ArrowRight, Phone, MapPin, Mail } from 'lucide-react';

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
      {/* 1. eCommerce Storefront Header & Nav */}
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

      {/* 2. Flagship Promotional Hero & Guarantees Strip */}
      <HeroBanner
        onScrollToCatalog={() => catalogRef.current?.scrollIntoView({ behavior: 'smooth' })}
        onOpenTradeIn={() => setIsTradeInOpen(true)}
      />

      {/* 3. Main Product Catalog Section */}
      <main ref={catalogRef} className="max-w-[1240px] mx-auto px-4 sm:px-8 py-12 sm:py-16 flex-1 w-full">
        {/* Section Title & Subtitle */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[12px] font-semibold text-[#0066cc] uppercase tracking-wider block mb-1">
              Salem Group Inventory
            </span>
            <h2 className="text-[32px] sm:text-[38px] font-semibold text-[#1d1d1f] tracking-[-0.32px] font-display">
              In-Stock Devices & Hardware
            </h2>
            <p className="text-[15px] sm:text-[17px] text-[#7a7a7a] mt-1 font-normal">
              Authentic sealed Apple stock and certified pre-owned units with Egyptian warranty and COD inspection.
            </p>
          </div>

          <div className="text-[13px] text-[#7a7a7a] font-medium shrink-0">
            Showing <span className="text-[#1d1d1f] font-semibold">{products.length}</span> verified devices
          </div>
        </div>

        {/* Category Filter Pills & Sort Toolbar */}
        <CategoryPills
          selectedCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          selectedCondition={activeCondition}
          onSelectCondition={setActiveCondition}
          sortBy={sortBy}
          onSelectSort={setSortBy}
          totalCount={products.length}
        />

        {/* Products Grid or Zero-Result Fallback */}
        {products.length === 0 ? (
          <div className="text-center py-20 px-6 bg-[#f5f5f7] border border-[#e0e0e0] rounded-[18px]">
            <h3 className="text-[26px] font-semibold text-[#1d1d1f] mb-2 font-display">
              No matching products found
            </h3>
            <p className="text-[15px] text-[#7a7a7a] max-w-md mx-auto mb-6">
              We recorded your search in our demand analytics. Our procurement team will review stock availability.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                  setActiveCondition('ALL');
                }}
                className="px-6 py-2.5 rounded-full bg-[#0066cc] text-white text-[14px] font-medium hover:bg-[#0071e3] apple-btn-active"
              >
                Clear Filters
              </button>
              <button
                onClick={() => setIsTradeInOpen(true)}
                className="px-6 py-2.5 rounded-full border border-[#0066cc] text-[#0066cc] text-[14px] font-medium hover:bg-[#0066cc]/5 apple-btn-active"
              >
                Trade In Your Device
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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

        {/* 4. Trade-In Mid-Page Banner */}
        <section className="mt-16 sm:mt-24 rounded-[20px] bg-[#f5f5f7] border border-[#e0e0e0] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#e0e0e0] text-[12px] font-semibold text-[#0066cc]">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Salem Trade-In Program</span>
            </div>
            <h3 className="text-[28px] sm:text-[34px] font-semibold text-[#1d1d1f] tracking-tight leading-tight">
              Upgrade to iPhone 16 Pro or MacBook M3 for Less.
            </h3>
            <p className="text-[15px] text-[#7a7a7a] leading-relaxed">
              Bring your used iPhone, iPad, or MacBook to our showroom or request courier collection. Get immediate valuation credit toward any new device.
            </p>
          </div>

          <button
            onClick={() => setIsTradeInOpen(true)}
            className="px-7 py-3.5 rounded-full bg-[#1d1d1f] hover:bg-[#333333] text-white text-[15px] font-medium transition-all apple-btn-active shrink-0 flex items-center gap-2 shadow-sm"
          >
            <span>Value Your Device</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>
      </main>

      {/* 5. Comprehensive Retail eCommerce Footer */}
      <footer className="bg-[#f5f5f7] border-t border-[#e0e0e0] pt-14 pb-10 px-4 sm:px-8 text-[#7a7a7a] text-[13px]">
        <div className="max-w-[1240px] mx-auto space-y-10">
          {/* Main Footer Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#e0e0e0]">
            {/* Col 1: Salem Group Brand & Contact */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#1d1d1f] text-white flex items-center justify-center font-bold text-[14px]">
                  SG
                </div>
                <span className="font-bold text-[16px] text-[#1d1d1f] tracking-tight">
                  SALEM GROUP
                </span>
              </div>
              <p className="text-[13px] text-[#7a7a7a] leading-relaxed">
                Egypt&apos;s premier independent retailer for authentic Apple hardware and certified pre-owned devices.
              </p>
              <div className="space-y-2 pt-1 text-[13px]">
                <div className="flex items-center gap-2 text-[#1d1d1f]">
                  <MapPin className="w-4 h-4 text-[#0066cc] shrink-0" />
                  <span>Abbas El Akkad, Nasr City, Cairo</span>
                </div>
                <div className="flex items-center gap-2 text-[#1d1d1f]">
                  <Phone className="w-4 h-4 text-[#0066cc] shrink-0" />
                  <span>+20 100 234 5678</span>
                </div>
              </div>
            </div>

            {/* Col 2: Customer Guarantees */}
            <div className="space-y-3">
              <h4 className="font-semibold text-[#1d1d1f] text-[14px]">Customer Guarantees</h4>
              <ul className="space-y-2 text-[13px]">
                <li>Cash On Delivery (All Egypt)</li>
                <li>Inspect Before Paying Courier</li>
                <li>1-Year Local Replacement Warranty</li>
                <li>Same-Day Cairo & Giza Dispatch</li>
                <li>Original Factory Sealed Boxes</li>
              </ul>
            </div>

            {/* Col 3: Hardware Categories */}
            <div className="space-y-3">
              <h4 className="font-semibold text-[#1d1d1f] text-[14px]">Categories</h4>
              <ul className="space-y-2 text-[13px]">
                <li><button onClick={() => setActiveCategory('mac')} className="hover:text-[#0066cc]">MacBook Pro & MacBook Air</button></li>
                <li><button onClick={() => setActiveCategory('iphone')} className="hover:text-[#0066cc]">iPhone 16 Pro & iPhone 15 Pro</button></li>
                <li><button onClick={() => setActiveCategory('ipad')} className="hover:text-[#0066cc]">iPad Pro M4 & iPad Air</button></li>
                <li><button onClick={() => setActiveCategory('watch')} className="hover:text-[#0066cc]">Apple Watch Ultra 2</button></li>
                <li><button onClick={() => setActiveCategory('airpods')} className="hover:text-[#0066cc]">AirPods Pro 2 (USB-C)</button></li>
              </ul>
            </div>

            {/* Col 4: Services & Operations */}
            <div className="space-y-3">
              <h4 className="font-semibold text-[#1d1d1f] text-[14px]">Store Services</h4>
              <ul className="space-y-2 text-[13px]">
                <li><button onClick={() => setIsTradeInOpen(true)} className="hover:text-[#0066cc]">Instant Trade-In Calculator</button></li>
                <li><button onClick={() => setIsTrackingOpen(true)} className="hover:text-[#0066cc]">Track Your Delivery</button></li>
                <li><button onClick={onToggleAdmin} className="hover:text-[#0066cc]">Merchant Operations Center</button></li>
                <li>Corporate & Fleet Procurement</li>
                <li>WhatsApp Dispatch Hotline</li>
              </ul>
            </div>
          </div>

          {/* Legal Disclaimer & Copyright Notice */}
          <div className="space-y-3 text-[11px] leading-relaxed text-[#86868b]">
            <p>
              <strong>Notice:</strong> Cash On Delivery is supported across Cairo, Giza, Alexandria, and all Egyptian governorates. All customers possess the explicit right to inspect device exterior packaging and verify authentic serial numbers prior to payment completion.
            </p>
            <p>
              <strong>Trademark Disclaimer:</strong> Salem Group is an independent Egyptian retailer of consumer electronics. Apple, MacBook, MacBook Pro, MacBook Air, iPhone, iPad, Apple Watch, and AirPods are registered trademarks of Apple Inc., registered in the United States and other countries. Salem Group is not affiliated with, sponsored by, or officially endorsed by Apple Inc.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-3 border-t border-[#e0e0e0]">
              <span>© 2026 Salem Group Egypt. All rights reserved. Commercial Registration #109482.</span>
              <div className="flex items-center gap-4">
                <span>Nasr City Showroom</span>
                <span>•</span>
                <span>New Cairo Showroom</span>
                <span>•</span>
                <span>Alexandria Logistics Hub</span>
              </div>
            </div>
          </div>
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
