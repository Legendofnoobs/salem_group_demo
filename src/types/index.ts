export type ProductCategory = 'all' | 'mac' | 'iphone' | 'ipad' | 'watch' | 'airpods' | 'accessories';

export type ProductCondition = 'NEW_SEALED' | 'OPEN_BOX' | 'CERTIFIED_PRE_OWNED';

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export type TradeInStatus = 'NEW_LEAD' | 'CONTACTED' | 'INSPECTING' | 'ACCEPTED' | 'DECLINED';

export type TrafficSource = 'Direct' | 'WhatsApp' | 'Instagram' | 'TikTok' | 'Facebook' | 'Google';

export interface ProductVariantType {
  id: string;
  productId: string;
  colorName: string;
  colorHex: string;
  storageOption: string;
  ramOption?: string | null;
  priceDelta: number;
  serialNumber?: string | null;
  stock: number;
}

export interface ProductType {
  id: string;
  title: string;
  slug: string;
  category: string;
  basePrice: number;
  salePrice?: number | null;
  condition: ProductCondition;
  batteryHealth?: number | null;
  description: string;
  specs: Record<string, any>;
  warrantyInfo: string;
  images: string[];
  isFeatured: boolean;
  stock: number;
  variants: ProductVariantType[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItemType {
  productId: string;
  variantId?: string;
  slug?: string;
  title: string;
  category: string;
  selectedColor?: string;
  selectedStorage?: string;
  selectedRam?: string;
  price: number;
  quantity: number;
  image: string;
  condition: ProductCondition;
  batteryHealth?: number | null;
  serialNumber?: string | null;
}

export interface OrderItemType {
  title: string;
  variant?: string;
  price: number;
  quantity: number;
  image?: string;
  serialNumber?: string;
}

export interface OrderType {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  shippingAddress: string;
  city: string;
  paymentMethod: string;
  status: OrderStatus;
  items: OrderItemType[];
  subtotal: number;
  shippingCost: number;
  totalAmount: number;
  trafficSource?: string | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface TradeInType {
  id: string;
  customerName: string;
  customerPhone: string;
  deviceCategory: string;
  deviceModel: string;
  batteryHealth: number;
  physicalCondition: string;
  accessoriesIncluded: string[];
  estimatedTradeValue: number;
  desiredUpgrade?: string | null;
  status: TradeInStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoreSettingsType {
  storeName: string;
  tagline: string;
  address: string;
  phone: string;
  whatsapp: string;
  currency: string;
  usdRate: number;
  paymentPolicy: string;
  deliveryEstimate: string;
  warrantyTerms: string;
}

export interface AnalyticsSummary {
  funnel: {
    totalViews: number;
    totalAddToCart: number;
    addToCartRate: number;
    checkoutsInitiated: number;
    checkoutsCompleted: number;
    checkoutsAbandoned: number;
    abandonmentRate: number;
    conversionRate: number;
  };
  zeroResultSearches: Array<{
    query: string;
    count: number;
    lastSearchedAt: Date;
    trafficSources: string[];
  }>;
  productPerformance: Array<{
    title: string;
    views: number;
    addsToCart: number;
    addToCartRate: number;
  }>;
  trafficSourceConversions: Array<{
    source: string;
    views: number;
    orders: number;
    revenue: number;
    conversionRate: number;
  }>;
  recentAbandonedCheckouts: Array<{
    id: string;
    sessionId: string;
    trafficSource: string;
    cartValue: number;
    droppedAt: string;
    createdAt: Date;
  }>;
}
