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
import { SearchX, Sparkles, MessageCircle, RefreshCw } from 'lucide-react';

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

  // Modals & Drawers state
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTradeInOpen, setIsTradeInOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);

  // Session & Traffic detection
  const [sessionId, setSessionId] = useState('');
  const [trafficSource, setTrafficSource] = useState('Direct');

  const catalogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sid = getClientSessionId();
    const source = detectTrafficSource();
    setSessionId(sid);
    setTrafficSource(source);
  }, []);

  // Filter products dynamically
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

  // Cart operations
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

    // Track analytics event: ADD_TO_CART
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

  const handleOrderSuccess = (order: OrderType) => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
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

      {/* Hero Banner */}
      <HeroBanner
        onScrollToCatalog={() => catalogRef.current?.scrollIntoView({ behavior: 'smooth' })}
        onOpenTradeIn={() => setIsTradeInOpen(true)}
      />

      {/* Product Catalog Section */}
      <main ref={catalogRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        {/* Category Pills & Filters */}
        <CategoryPills
          selectedCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          selectedCondition={activeCondition}
          onSelectCondition={setActiveCondition}
          sortBy={sortBy}
          onSelectSort={setSortBy}
          totalCount={products.length}
        />

        {/* Product Grid or Zero-Results View */}
        {products.length === 0 ? (
          <div className="text-center py-20 px-4 rounded-3xl bg-zinc-950/60 border border-white/10 my-8">
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center mx-auto mb-4 text-zinc-500">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No matching Apple devices found
            </h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto mb-6">
              We logged this search query ({searchQuery ? `"${searchQuery}"` : 'selected filters'}). Our procurement team will review restocking options for Salem Group.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                  setActiveCondition('ALL');
                }}
                className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors"
              >
                Clear Filters
              </button>
              <button
                onClick={() => setIsTradeInOpen(true)}
                className="px-6 py-2.5 rounded-full bg-zinc-900 border border-white/20 text-white font-medium text-xs hover:bg-zinc-800 transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                <span>Trade In an Old Device</span>
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

      {/* Footer */}
      <footer className="border-t border-white/10 bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="font-bold text-white tracking-wider"> SALEM GROUP</span>
            <span>•</span>
            <span>Authorized Apple Experience & Certified Reseller</span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <span>Cash On Delivery with Inspection</span>
            <span>•</span>
            <span>1-Year Official Warranty</span>
            <span>•</span>
            <span>Cairo Showroom</span>
          </div>
        </div>
      </footer>

      {/* PDP Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        currency={currency}
        usdRate={usdRate}
        onAddToCart={handleAddToCart}
        onDirectOrder={handleDirectOrder}
      />

      {/* Trade-In Modal */}
      <TradeInModal
        isOpen={isTradeInOpen}
        onClose={() => setIsTradeInOpen(false)}
        currency={currency}
        usdRate={usdRate}
      />

      {/* Cart Drawer */}
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

      {/* COD Checkout Modal */}
      <CODCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={handleOrderSuccess}
        currency={currency}
        usdRate={usdRate}
        sessionId={sessionId}
        trafficSource={trafficSource}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
      />
    </div>
  );
}
