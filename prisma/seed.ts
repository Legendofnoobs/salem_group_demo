import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function createSvgBase64(svg: string): string {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

// Authentic Transparent Apple Product Renders (No fake background gradients)
function macbookSvg(title: string, color: string, chipLabel: string): string {
  return createSvgBase64(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
      <defs>
        <linearGradient id="metalDeck" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}"/>
          <stop offset="100%" stop-color="#141416"/>
        </linearGradient>
        <linearGradient id="screenDisplay" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0a0a0c"/>
          <stop offset="100%" stop-color="#18181c"/>
        </linearGradient>
      </defs>

      <!-- Soft ground contact shadow -->
      <ellipse cx="400" cy="410" rx="280" ry="16" fill="rgba(0,0,0,0.22)"/>

      <!-- Screen Outer Lid -->
      <rect x="190" y="70" width="420" height="270" rx="12" fill="#0d0d0f" stroke="#333336" stroke-width="2"/>
      
      <!-- Display Bezel & Glass -->
      <rect x="202" y="82" width="396" height="246" rx="6" fill="url(#screenDisplay)"/>
      
      <!-- Camera Notch -->
      <path d="M 372 82 L 428 82 L 424 94 C 422 97 419 99 415 99 L 385 99 C 381 99 378 97 376 94 Z" fill="#0d0d0f"/>
      <circle cx="400" cy="89" r="2.5" fill="#1f2937"/>

      <!-- Screen Wallpaper & Chip Info -->
      <rect x="208" y="104" width="384" height="218" rx="4" fill="#111114"/>
      <!-- Apple Logo Watermark -->
      <path d="M 395 190 C 395 178 402 173 403 172 C 398 165 390 164 388 164 C 380 163 373 168 369 168 C 365 168 359 163 353 163 C 344 163 336 169 331 178 C 321 195 329 220 338 234 C 343 241 349 248 356 248 C 363 248 366 243 374 243 C 382 243 385 248 392 248 C 399 248 404 241 409 234 C 414 226 416 222 417 220 C 416 219 406 215 406 203 C 406 193 414 188 415 187 C 409 180 401 179 399 179 C 398 179 395 184 395 190 Z" fill="rgba(255,255,255,0.15)"/>
      <text x="400" y="240" font-family="-apple-system, 'SF Pro Display', sans-serif" font-size="24" font-weight="600" fill="#ffffff" text-anchor="middle">${chipLabel}</text>
      <text x="400" y="265" font-family="-apple-system, 'SF Pro Text', sans-serif" font-size="13" font-weight="400" fill="#a1a1aa" text-anchor="middle">Liquid Retina XDR • ProMotion 120Hz</text>

      <!-- Bottom Chassis Deck -->
      <path d="M 140 340 L 660 340 L 642 388 L 158 388 Z" fill="url(#metalDeck)" stroke="#3f3f46" stroke-width="1.5"/>
      <!-- Notch opening thumb indent -->
      <rect x="364" y="340" width="72" height="5" rx="2.5" fill="#08080a"/>
      <!-- Lower base chamfer -->
      <rect x="140" y="384" width="520" height="12" rx="6" fill="#18181b"/>
      <!-- Black rubber feet -->
      <rect x="170" y="396" width="36" height="4" rx="2" fill="#0a0a0c"/>
      <rect x="594" y="396" width="36" height="4" rx="2" fill="#0a0a0c"/>
    </svg>
  `);
}

function iphoneSvg(title: string, colorHex: string, sub: string): string {
  return createSvgBase64(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="600" height="500">
      <defs>
        <linearGradient id="tiFrame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${colorHex}"/>
          <stop offset="100%" stop-color="#242426"/>
        </linearGradient>
      </defs>

      <!-- Contact Shadow -->
      <ellipse cx="300" cy="425" rx="140" ry="14" fill="rgba(0,0,0,0.22)"/>

      <!-- Phone Outer Titanium Chassis -->
      <rect x="200" y="60" width="200" height="355" rx="38" fill="url(#tiFrame)" stroke="${colorHex}" stroke-width="2.5"/>
      
      <!-- Black Bezel -->
      <rect x="206" y="66" width="188" height="343" rx="32" fill="#000000"/>

      <!-- OLED Display Surface -->
      <rect x="210" y="70" width="180" height="335" rx="28" fill="#0c0d10"/>

      <!-- Dynamic Island -->
      <rect x="268" y="80" width="64" height="18" rx="9" fill="#000000"/>
      <circle cx="280" cy="89" r="3.5" fill="#111827"/>
      <circle cx="316" cy="89" r="3" fill="#1e293b"/>

      <!-- Display Content -->
      <text x="300" y="210" font-family="-apple-system, 'SF Pro Display', sans-serif" font-size="36" font-weight="600" fill="#ffffff" text-anchor="middle" letter-spacing="-0.5px">09:41</text>
      <text x="300" y="240" font-family="-apple-system, 'SF Pro Text', sans-serif" font-size="13" font-weight="400" fill="#a1a1aa" text-anchor="middle">Super Retina XDR</text>
      
      <!-- A18 Pro Badge -->
      <rect x="240" y="280" width="120" height="30" rx="15" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
      <text x="300" y="300" font-family="-apple-system, 'SF Pro Text', sans-serif" font-size="12" font-weight="600" fill="${colorHex}" text-anchor="middle">A18 Pro</text>

      <!-- Home Bar Indicator -->
      <rect x="265" y="392" width="70" height="4" rx="2" fill="#ffffff" opacity="0.8"/>
    </svg>
  `);
}

function ipadSvg(title: string, color: string): string {
  return createSvgBase64(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="600" height="500">
      <!-- Ground Shadow -->
      <ellipse cx="300" cy="425" rx="170" ry="14" fill="rgba(0,0,0,0.22)"/>

      <!-- iPad Body -->
      <rect x="160" y="75" width="280" height="340" rx="22" fill="#1c1d21" stroke="#38383c" stroke-width="2"/>
      
      <!-- Screen Display -->
      <rect x="170" y="85" width="260" height="320" rx="14" fill="#0a0a0c"/>

      <!-- Display Visual -->
      <text x="300" y="235" font-family="-apple-system, 'SF Pro Display', sans-serif" font-size="28" font-weight="600" fill="#ffffff" text-anchor="middle">Ultra Retina XDR</text>
      <text x="300" y="265" font-family="-apple-system, 'SF Pro Text', sans-serif" font-size="14" font-weight="400" fill="#38bdf8" text-anchor="middle">M4 Chip • Tandem OLED</text>
      <text x="300" y="295" font-family="-apple-system, 'SF Pro Text', sans-serif" font-size="12" font-weight="400" fill="#71717a" text-anchor="middle">Thinnest Apple Product • 5.1 mm</text>
    </svg>
  `);
}

function watchSvg(title: string, color: string): string {
  return createSvgBase64(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
      <!-- Contact Shadow -->
      <ellipse cx="250" cy="430" rx="100" ry="12" fill="rgba(0,0,0,0.22)"/>

      <!-- Band Top & Bottom -->
      <path d="M 200 40 L 300 40 L 290 140 L 210 140 Z" fill="#f97316"/>
      <path d="M 210 350 L 290 350 L 300 440 L 200 440 Z" fill="#f97316"/>

      <!-- Titanium Case -->
      <rect x="165" y="130" width="170" height="230" rx="42" fill="#2d2d30" stroke="#71717a" stroke-width="3"/>
      <!-- Screen -->
      <rect x="178" y="144" width="144" height="202" rx="32" fill="#000000"/>
      <!-- Digital Crown -->
      <rect x="335" y="165" width="12" height="42" rx="4" fill="#a1a1aa"/>
      <!-- Orange Action Button -->
      <rect x="153" y="185" width="12" height="38" rx="4" fill="#f97316"/>

      <!-- Dial UI -->
      <text x="250" y="235" font-family="-apple-system, 'SF Pro Display', sans-serif" font-size="44" font-weight="600" fill="#f97316" text-anchor="middle">09:41</text>
      <text x="250" y="270" font-family="-apple-system, 'SF Pro Text', sans-serif" font-size="13" font-weight="600" fill="#ffffff" text-anchor="middle">3,000 NITS</text>
      <text x="250" y="295" font-family="-apple-system, 'SF Pro Text', sans-serif" font-size="11" font-weight="400" fill="#a1a1aa" text-anchor="middle">49mm Titanium</text>
    </svg>
  `);
}

function airpodsSvg(title: string): string {
  return createSvgBase64(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
      <!-- Shadow -->
      <ellipse cx="250" cy="380" rx="100" ry="12" fill="rgba(0,0,0,0.18)"/>

      <!-- MagSafe Case Body -->
      <rect x="170" y="160" width="160" height="200" rx="55" fill="#ffffff" stroke="#e5e5ea" stroke-width="1.5"/>
      <!-- Lid Seam -->
      <line x1="170" y1="225" x2="330" y2="225" stroke="#d1d1d6" stroke-width="1"/>
      <!-- Status LED -->
      <circle cx="250" cy="260" r="3" fill="#34c759"/>
      
      <text x="250" y="315" font-family="-apple-system, 'SF Pro Text', sans-serif" font-size="12" font-weight="600" fill="#1d1d1f" text-anchor="middle">H2 Chip</text>
      <text x="250" y="335" font-family="-apple-system, 'SF Pro Text', sans-serif" font-size="10" font-weight="400" fill="#86868b" text-anchor="middle">Active Noise Cancellation</text>
    </svg>
  `);
}

async function main() {
  console.log('Seeding PostgreSQL 18 with Apple Design System compliant assets...');

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

  // 2. Seed Products
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
        macbookSvg('MacBook Pro 16" M3 Max', '#1f1f23', 'M3 Max'),
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
        macbookSvg('MacBook Air 13" M3', '#1e2433', 'M3 Air'),
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
        macbookSvg('MacBook Pro 14" M2 Pro', '#71717a', 'M2 Pro Pre-Owned'),
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
        iphoneSvg('iPhone 16 Pro', '#c7b198', 'Desert Titanium'),
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
        iphoneSvg('iPhone 16 Pro Max', '#9a948c', 'Natural Titanium'),
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
        iphoneSvg('iPhone 15 Pro', '#3f3f46', 'Black Titanium'),
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
        ipadSvg('iPad Pro 13" M4', '#18181b'),
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
        watchSvg('Apple Watch Ultra 2', '#27272a'),
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
        airpodsSvg('AirPods Pro 2'),
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

  console.log('Database seeded with DESIGN.md compliant Apple catalog!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
