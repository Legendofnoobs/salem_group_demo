import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const realImagesPath = path.join(__dirname, 'real_images.json');
const realImages = JSON.parse(fs.readFileSync(realImagesPath, 'utf8'));

async function main() {
  console.log('Seeding PostgreSQL 18 with authentic Apple product photos...');

  // Clean existing tables in order
  await prisma.analyticsEvent.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.tradeIn.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.storeSetting.deleteMany({});

  // 1. Seed Store Settings
  await prisma.storeSetting.create({
    data: {
      key: 'general',
      value: {
        storeName: 'Salem Group',
        tagline: 'Authorized Apple Reseller & Certified Pre-Owned Specialists',
        address: 'Building 14, Abbas El Akkad, Nasr City, Cairo, Egypt',
        phone: '+20 100 234 5678',
        whatsapp: '+20 100 234 5678',
        currency: 'EGP',
        usdRate: 49.5,
        paymentPolicy: 'Cash On Delivery (COD) with full device inspection before payment',
        deliveryEstimate: '24 to 48 Hours Express Delivery Across Egypt',
        warrantyTerms: '1-Year Salem Comprehensive Warranty on Sealed Products, 6-Month on Certified Pre-Owned',
      },
    },
  });

  // 2. Seed Products with Authentic Real Apple Photos
  const productsData = [
    {
      title: 'MacBook Pro 16" M3 Max',
      slug: 'macbook-pro-16-m3-max',
      category: 'mac',
      basePrice: 168000,
      salePrice: 159900,
      condition: 'NEW_SEALED',
      batteryHealth: 100,
      description: 'Mind-blowing. Head-turning. Powered by M3 Max with a 14-core CPU, 30-core GPU, and 36GB unified memory.',
      specs: {
        chip: 'Apple M3 Max (14-Core CPU, 30-Core GPU)',
        memory: '36GB Unified Memory',
        storage: '1TB Superfast SSD',
        display: '16.2-inch Liquid Retina XDR (1600 nits peak, ProMotion 120Hz)',
        ports: '3x Thunderbolt 4, HDMI 2.1, SDXC slot, MagSafe 3',
        battery: 'Up to 22 hours battery life',
      },
      warrantyInfo: 'Official Apple 1-Year International Warranty + Salem On-Site Service',
      images: [
        realImages.mbp16_spaceblack,
        realImages.mbp16_silver,
      ],
      isFeatured: true,
      stock: 4,
      variants: [
        { colorName: 'Space Black', colorHex: '#1d1d1f', storageOption: '1TB', ramOption: '36GB', priceDelta: 0, stock: 3 },
        { colorName: 'Silver', colorHex: '#e3e4e5', storageOption: '1TB', ramOption: '36GB', priceDelta: 0, stock: 1 },
      ],
    },
    {
      title: 'MacBook Air 13" M3',
      slug: 'macbook-air-13-m3',
      category: 'mac',
      basePrice: 72000,
      salePrice: 68500,
      condition: 'NEW_SEALED',
      batteryHealth: 100,
      description: 'Lean. Mean. M3 machine. Incredibly thin, fanless quiet design with up to 18 hours of battery life.',
      specs: {
        chip: 'Apple M3 (8-Core CPU, 10-Core GPU)',
        memory: '16GB Unified Memory',
        storage: '512GB SSD',
        display: '13.6-inch Liquid Retina display (500 nits, True Tone)',
        ports: '2x Thunderbolt / USB 4, MagSafe 3, 3.5mm Headphone Jack',
        weight: '1.24 kg',
      },
      warrantyInfo: '1-Year Official Apple Warranty with Salem Tech Support',
      images: [
        realImages.mba13_midnight,
        realImages.mba13_starlight,
      ],
      isFeatured: true,
      stock: 8,
      variants: [
        { colorName: 'Midnight', colorHex: '#1e2433', storageOption: '512GB', ramOption: '16GB', priceDelta: 0, stock: 5 },
        { colorName: 'Starlight', colorHex: '#e2dad2', storageOption: '512GB', ramOption: '16GB', priceDelta: 0, stock: 3 },
      ],
    },
    {
      title: 'MacBook Pro 14" M2 Pro',
      slug: 'macbook-pro-14-m2-pro-preowned',
      category: 'mac',
      basePrice: 62000,
      salePrice: 58000,
      condition: 'CERTIFIED_PRE_OWNED',
      batteryHealth: 94,
      description: 'Salem Certified Pre-Owned. Tested through a 36-point inspection. Grade A+ chassis, 94% original battery health.',
      specs: {
        chip: 'Apple M2 Pro (10-Core CPU, 16-Core GPU)',
        memory: '16GB Unified Memory',
        storage: '512GB SSD',
        display: '14.2-inch Liquid Retina XDR Display',
        batteryHealth: '94% Original Battery (Cycle Count: 48)',
        serialNumber: 'C02H890MD6P',
      },
      warrantyInfo: '6-Month Salem Full Hardware Replacement Warranty',
      images: [
        realImages.mbp14_preowned_spacegray,
      ],
      isFeatured: false,
      stock: 2,
      variants: [
        { colorName: 'Space Gray', colorHex: '#4b5563', storageOption: '512GB', ramOption: '16GB', priceDelta: 0, serialNumber: 'C02H890MD6P', stock: 1 },
        { colorName: 'Silver', colorHex: '#e5e7eb', storageOption: '512GB', ramOption: '16GB', priceDelta: 0, serialNumber: 'C02H890MD7Q', stock: 1 },
      ],
    },
    {
      title: 'iPhone 16 Pro',
      slug: 'iphone-16-pro-desert-titanium',
      category: 'iphone',
      basePrice: 64000,
      salePrice: 61900,
      condition: 'NEW_SEALED',
      batteryHealth: 100,
      description: 'Hello, Apple Intelligence. Forged in titanium with the breakthrough A18 Pro chip and Camera Control.',
      specs: {
        chip: 'A18 Pro chip with 6-core GPU',
        camera: '48MP Fusion, 48MP Ultra Wide, 12MP 5x Telephoto',
        display: '6.3-inch Super Retina XDR with ProMotion 120Hz',
        material: 'Grade 5 Titanium frame with textured matte glass',
      },
      warrantyInfo: 'Brand New Sealed • 1-Year Apple International Warranty',
      images: [
        realImages.iphone16pro_desert,
        realImages.iphone16pro_natural,
      ],
      isFeatured: true,
      stock: 6,
      variants: [
        { colorName: 'Desert Titanium', colorHex: '#c7b198', storageOption: '128GB', priceDelta: 0, stock: 2 },
        { colorName: 'Desert Titanium', colorHex: '#c7b198', storageOption: '256GB', priceDelta: 5000, stock: 3 },
        { colorName: 'Natural Titanium', colorHex: '#9a948c', storageOption: '256GB', priceDelta: 5000, stock: 1 },
      ],
    },
    {
      title: 'iPhone 16 Pro Max',
      slug: 'iphone-16-pro-max-natural-titanium',
      category: 'iphone',
      basePrice: 76000,
      salePrice: 73500,
      condition: 'NEW_SEALED',
      batteryHealth: 100,
      description: 'The ultimate iPhone. 6.9-inch Super Retina XDR display, up to 33 hours video playback, and 5x optical zoom.',
      specs: {
        chip: 'A18 Pro Chip',
        camera: 'Triple Lens 48MP Pro System with 5x Telephoto',
        display: '6.9-inch Super Retina XDR (Thinnest borders ever)',
      },
      warrantyInfo: 'Sealed Box • 1-Year Official Warranty with Salem Support',
      images: [
        realImages.iphone16pro_natural,
        realImages.iphone16_black,
      ],
      isFeatured: true,
      stock: 5,
      variants: [
        { colorName: 'Natural Titanium', colorHex: '#9a948c', storageOption: '256GB', priceDelta: 0, stock: 3 },
        { colorName: 'Black Titanium', colorHex: '#2d2d2f', storageOption: '512GB', priceDelta: 8500, stock: 2 },
      ],
    },
    {
      title: 'iPhone 15 Pro',
      slug: 'iphone-15-pro-open-box',
      category: 'iphone',
      basePrice: 48000,
      salePrice: 44900,
      condition: 'OPEN_BOX',
      batteryHealth: 100,
      description: 'Open box customs inspection unit. 100% original battery capacity, 0 charge cycles. Includes original cable and box.',
      specs: {
        chip: 'A17 Pro Chip',
        camera: '48MP Main with 3x Telephoto',
        display: '6.1-inch ProMotion 120Hz',
        serialNumber: 'F2LK9992MX',
      },
      warrantyInfo: '10-Month Remaining Apple Warranty + Salem 6-Month Guarantee',
      images: [
        realImages.iphone15pro_blacktitanium,
      ],
      isFeatured: false,
      stock: 3,
      variants: [
        { colorName: 'Black Titanium', colorHex: '#27272a', storageOption: '128GB', priceDelta: 0, serialNumber: 'F2LK9992MX', stock: 2 },
        { colorName: 'White Titanium', colorHex: '#e4e4e7', storageOption: '256GB', priceDelta: 4200, serialNumber: 'F2LK9993MY', stock: 1 },
      ],
    },
    {
      title: 'iPad Pro 13" M4',
      slug: 'ipad-pro-13-m4',
      category: 'ipad',
      basePrice: 65000,
      salePrice: 62000,
      condition: 'NEW_SEALED',
      batteryHealth: 100,
      description: 'Unbelievably thin. Incredibly powerful. Tandem OLED Ultra Retina XDR display with M4 chip.',
      specs: {
        chip: 'Apple M4 Chip with 10-Core GPU',
        display: '13-inch Ultra Retina XDR (Tandem OLED)',
        thickness: '5.1mm - Thinnest Apple device ever made',
      },
      warrantyInfo: '1-Year Official Apple Warranty',
      images: [
        realImages.ipadpro13_spaceblack,
      ],
      isFeatured: true,
      stock: 3,
      variants: [
        { colorName: 'Space Black', colorHex: '#18181b', storageOption: '256GB', priceDelta: 0, stock: 2 },
        { colorName: 'Silver', colorHex: '#e5e7eb', storageOption: '512GB', priceDelta: 7000, stock: 1 },
      ],
    },
    {
      title: 'Apple Watch Ultra 2',
      slug: 'apple-watch-ultra-2',
      category: 'watch',
      basePrice: 42000,
      salePrice: 39500,
      condition: 'NEW_SEALED',
      batteryHealth: 100,
      description: 'The ultimate sports and adventure watch. 49mm titanium case, dual-frequency GPS, and 3000 nits display.',
      specs: {
        caseSize: '49mm Aerospace Titanium Case',
        display: 'Always-On Retina display with up to 3,000 nits',
        battery: 'Up to 36 hours normal use',
      },
      warrantyInfo: '1-Year International Warranty',
      images: [
        realImages.watchultra2,
      ],
      isFeatured: true,
      stock: 4,
      variants: [
        { colorName: 'Titanium / Orange Ocean Band', colorHex: '#ea580c', storageOption: '49mm', priceDelta: 0, stock: 2 },
        { colorName: 'Titanium / Midnight Ocean Band', colorHex: '#1e2433', storageOption: '49mm', priceDelta: 0, stock: 2 },
      ],
    },
    {
      title: 'AirPods Pro 2 (USB-C)',
      slug: 'airpods-pro-2-usbc',
      category: 'airpods',
      basePrice: 13500,
      salePrice: 11999,
      condition: 'NEW_SEALED',
      batteryHealth: 100,
      description: 'Up to 2x more Active Noise Cancellation. Adaptive Audio and USB-C MagSafe charging case.',
      specs: {
        chip: 'Apple H2 Headphone Chip',
        audio: 'Personalized Spatial Audio with dynamic head tracking',
        charging: 'USB-C MagSafe Case',
      },
      warrantyInfo: '1-Year Apple Warranty',
      images: [
        realImages.airpodspro2,
      ],
      isFeatured: true,
      stock: 12,
      variants: [
        { colorName: 'White', colorHex: '#ffffff', storageOption: 'Standard', priceDelta: 0, stock: 12 },
      ],
    },
  ];

  for (const item of productsData) {
    const { variants, ...productFields } = item;
    const createdProduct = await prisma.product.create({
      data: productFields,
    });

    for (const variant of variants) {
      await prisma.productVariant.create({
        data: {
          productId: createdProduct.id,
          ...variant,
        },
      });
    }
  }

  // 3. Seed Sample Orders
  await prisma.order.create({
    data: {
      orderNumber: 'SLM-1042',
      customerName: 'Mohamed Tarek',
      customerPhone: '+20 111 456 7890',
      shippingAddress: 'Villa 12, District 5, New Cairo',
      city: 'Cairo',
      paymentMethod: 'CASH_ON_DELIVERY',
      status: 'PROCESSING',
      items: [
        {
          title: 'MacBook Pro 16" M3 Max',
          variant: 'Space Black / 1TB',
          price: 159900,
          quantity: 1,
        },
      ],
      subtotal: 159900,
      shippingCost: 0,
      totalAmount: 159900,
      trafficSource: 'Instagram',
      notes: 'Customer will inspect serial number upon delivery. Payment in cash.',
    },
  });

  await prisma.order.create({
    data: {
      orderNumber: 'SLM-1043',
      customerName: 'Omar Hassan',
      customerPhone: '+20 122 789 1234',
      shippingAddress: 'Apt 4B, Loran, Alexandria',
      city: 'Alexandria',
      paymentMethod: 'CASH_ON_DELIVERY',
      status: 'SHIPPED',
      items: [
        {
          title: 'iPhone 16 Pro',
          variant: 'Desert Titanium / 256GB',
          price: 66900,
          quantity: 1,
        },
      ],
      subtotal: 66900,
      shippingCost: 0,
      totalAmount: 66900,
      trafficSource: 'WhatsApp',
      notes: 'Dispatched with express courier. Collect 66,900 EGP in cash.',
    },
  });

  // 4. Seed Trade-ins
  await prisma.tradeIn.create({
    data: {
      customerName: 'Karim Sherif',
      customerPhone: '+20 102 334 5566',
      deviceCategory: 'iPhone',
      deviceModel: 'iPhone 13 Pro Max 256GB',
      batteryHealth: 86,
      physicalCondition: 'Flawless (No Scratches)',
      accessoriesIncluded: ['Original Box', 'Braided Cable', 'Invoice'],
      estimatedTradeValue: 28500,
      desiredUpgrade: 'iPhone 16 Pro Max 256GB',
      status: 'NEW_LEAD',
    },
  });

  // 5. Seed Analytics Events
  const now = new Date();
  const sampleAnalyticsEvents = [
    { eventType: 'SEARCH', searchQuery: 'Vision Pro 512GB', hasResults: false, sessionId: 's-101', trafficSource: 'Instagram', createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 2) },
    { eventType: 'SEARCH', searchQuery: 'Mac Studio M2 Max', hasResults: false, sessionId: 's-102', trafficSource: 'Direct', createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 4) },
    { eventType: 'SEARCH', searchQuery: 'HomePod mini Space Gray', hasResults: false, sessionId: 's-103', trafficSource: 'WhatsApp', createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 5) },
    { eventType: 'SEARCH', searchQuery: 'Magic Keyboard with Touch ID', hasResults: false, sessionId: 's-104', trafficSource: 'Google', createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 7) },
    { eventType: 'SEARCH', searchQuery: 'Vision Pro', hasResults: false, sessionId: 's-105', trafficSource: 'TikTok', createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 9) },

    { eventType: 'SEARCH', searchQuery: 'MacBook Pro M3', hasResults: true, sessionId: 's-201', trafficSource: 'Direct', createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 3) },
    { eventType: 'SEARCH', searchQuery: 'iPhone 16 Pro', hasResults: true, sessionId: 's-202', trafficSource: 'WhatsApp', createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 6) },

    { eventType: 'PRODUCT_VIEW', productTitle: 'MacBook Pro 16" M3 Max', trafficSource: 'Instagram', sessionId: 's-301' },
    { eventType: 'PRODUCT_VIEW', productTitle: 'iPhone 16 Pro', trafficSource: 'Direct', sessionId: 's-303' },
    { eventType: 'PRODUCT_VIEW', productTitle: 'AirPods Pro 2 (USB-C)', trafficSource: 'Google', sessionId: 's-307' },

    { eventType: 'ADD_TO_CART', productTitle: 'MacBook Pro 16" M3 Max', trafficSource: 'Instagram', sessionId: 's-301', metadata: { price: 159900 } },
    { eventType: 'ADD_TO_CART', productTitle: 'iPhone 16 Pro', trafficSource: 'WhatsApp', sessionId: 's-302', metadata: { price: 61900 } },

    { eventType: 'CHECKOUT_INITIATED', trafficSource: 'Instagram', sessionId: 's-301', metadata: { cartValue: 159900 } },
    { eventType: 'CHECKOUT_INITIATED', trafficSource: 'WhatsApp', sessionId: 's-302', metadata: { cartValue: 61900 } },

    { eventType: 'CHECKOUT_ABANDONED', trafficSource: 'Google', sessionId: 's-307', metadata: { cartValue: 11999, droppedAt: 'address_step', itemsCount: 1 } },

    { eventType: 'CHECKOUT_COMPLETED', trafficSource: 'Instagram', sessionId: 's-301', metadata: { orderNumber: 'SLM-1042', amount: 159900, method: 'COD' } },
    { eventType: 'CHECKOUT_COMPLETED', trafficSource: 'WhatsApp', sessionId: 's-302', metadata: { orderNumber: 'SLM-1043', amount: 66900, method: 'COD' } },
  ];

  for (const event of sampleAnalyticsEvents) {
    await prisma.analyticsEvent.create({
      data: {
        ...event,
        metadata: event.metadata ?? undefined,
      },
    });
  }

  console.log('Database successfully seeded with authentic Apple real product photos!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
