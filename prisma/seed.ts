import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function createSvgBase64(svg: string): string {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

// Apple Product SVG Generators
function macbookSvg(title: string, color: string, chip: string): string {
  return createSvgBase64(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#141417"/>
          <stop offset="100%" stop-color="#0a0a0c"/>
        </linearGradient>
        <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#050508"/>
          <stop offset="50%" stop-color="#1c1630"/>
          <stop offset="100%" stop-color="#3b1d54"/>
        </linearGradient>
        <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}"/>
          <stop offset="100%" stop-color="#1f2024"/>
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="15" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>
      <rect width="800" height="600" fill="url(#bg)"/>
      <ellipse cx="400" cy="460" rx="260" ry="25" fill="#000000" opacity="0.6"/>
      
      <!-- Screen Lid -->
      <rect x="180" y="110" width="440" height="280" rx="14" fill="#0c0d10" stroke="${color}" stroke-width="2"/>
      <!-- Bezel & Display -->
      <rect x="192" y="122" width="416" height="256" rx="8" fill="url(#screenGrad)"/>
      <!-- Notch -->
      <path d="M 370 122 L 430 122 L 426 136 C 424 140 420 142 416 142 L 384 142 C 380 142 376 140 374 136 Z" fill="#0c0d10"/>
      <!-- Display Visual / Graphic -->
      <circle cx="400" cy="240" r="60" fill="#a855f7" opacity="0.25" filter="url(#glow)"/>
      <text x="400" y="240" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display'" font-size="28" font-weight="700" fill="#ffffff" text-anchor="middle">${chip}</text>
      <text x="400" y="270" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text'" font-size="14" fill="#a1a1aa" text-anchor="middle">Liquid Retina XDR Display</text>

      <!-- Bottom Chassis / Deck -->
      <path d="M 140 390 L 660 390 L 640 435 L 160 435 Z" fill="url(#metal)" stroke="#3f3f46" stroke-width="1.5"/>
      <!-- Notch Opening Indent -->
      <rect x="360" y="390" width="80" height="6" rx="3" fill="#09090b"/>
      <!-- Base Lip -->
      <rect x="140" y="432" width="520" height="10" rx="5" fill="#18181b"/>
      
      <!-- Label -->
      <text x="400" y="520" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display'" font-size="20" font-weight="600" fill="#e4e4e7" text-anchor="middle">${title}</text>
      <text x="400" y="546" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text'" font-size="13" font-weight="500" fill="#22c55e" text-anchor="middle">✓ Salem Verified • Pro Performance</text>
    </svg>
  `);
}

function iphoneSvg(title: string, titaniumHex: string, subtext: string): string {
  return createSvgBase64(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#121316"/>
          <stop offset="100%" stop-color="#0a0a0c"/>
        </linearGradient>
        <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#08080a"/>
          <stop offset="100%" stop-color="#171324"/>
        </linearGradient>
        <linearGradient id="frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${titaniumHex}"/>
          <stop offset="100%" stop-color="#27272a"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bg)"/>
      <ellipse cx="400" cy="480" rx="160" ry="20" fill="#000000" opacity="0.6"/>

      <!-- Phone Outer Frame -->
      <rect x="290" y="90" width="220" height="380" rx="42" fill="url(#frame)" stroke="${titaniumHex}" stroke-width="3"/>
      <!-- Inner Bezel -->
      <rect x="296" y="96" width="208" height="368" rx="36" fill="#000000"/>
      <!-- Screen Glass -->
      <rect x="300" y="100" width="200" height="360" rx="32" fill="url(#screen)"/>
      
      <!-- Dynamic Island -->
      <rect x="365" y="112" width="70" height="20" rx="10" fill="#000000" stroke="#1f2937" stroke-width="1"/>
      
      <!-- Display Content -->
      <circle cx="400" cy="270" r="45" fill="${titaniumHex}" opacity="0.2"/>
      <text x="400" y="275" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display'" font-size="22" font-weight="700" fill="#ffffff" text-anchor="middle">Titanium</text>
      <text x="400" y="305" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text'" font-size="12" fill="#d4d4d8" text-anchor="middle">Super Retina XDR OLED</text>
      
      <!-- 48MP Triple Camera Simulation Preview on Edge -->
      <rect x="315" y="410" width="170" height="30" rx="15" fill="rgba(255,255,255,0.08)"/>
      <text x="400" y="430" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text'" font-size="11" font-weight="600" fill="#22c55e" text-anchor="middle">48MP Pro Fusion System</text>

      <!-- Title / Subtext -->
      <text x="400" y="525" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display'" font-size="20" font-weight="600" fill="#f4f4f5" text-anchor="middle">${title}</text>
      <text x="400" y="550" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text'" font-size="13" fill="#a1a1aa" text-anchor="middle">${subtext}</text>
    </svg>
  `);
}

function ipadSvg(title: string, color: string): string {
  return createSvgBase64(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#141416"/>
          <stop offset="100%" stop-color="#0a0a0c"/>
        </linearGradient>
        <linearGradient id="oled" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#090a0f"/>
          <stop offset="50%" stop-color="#0c2340"/>
          <stop offset="100%" stop-color="#0284c7"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bg)"/>
      <ellipse cx="400" cy="470" rx="220" ry="22" fill="#000000" opacity="0.6"/>

      <!-- iPad Body -->
      <rect x="230" y="90" width="340" height="360" rx="24" fill="#18181b" stroke="${color}" stroke-width="2.5"/>
      <!-- Thin Bezel Screen -->
      <rect x="242" y="102" width="316" height="336" rx="16" fill="url(#oled)"/>
      <!-- Center Branding -->
      <text x="400" y="260" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display'" font-size="26" font-weight="700" fill="#ffffff" text-anchor="middle">Ultra Retina XDR</text>
      <text x="400" y="290" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text'" font-size="14" fill="#38bdf8" text-anchor="middle">M4 Chip • Tandem OLED</text>
      
      <text x="400" y="515" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display'" font-size="20" font-weight="600" fill="#f4f4f5" text-anchor="middle">${title}</text>
      <text x="400" y="540" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text'" font-size="13" fill="#22c55e" text-anchor="middle">✓ Apple Pencil Pro Ready • Razor Thin 5.1mm</text>
    </svg>
  `);
}

function watchSvg(title: string, color: string): string {
  return createSvgBase64(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#141416"/>
          <stop offset="100%" stop-color="#0a0a0c"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bg)"/>
      
      <!-- Watch Band Top/Bottom -->
      <rect x="350" y="60" width="100" height="120" rx="10" fill="#ea580c"/>
      <rect x="350" y="380" width="100" height="120" rx="10" fill="#ea580c"/>

      <!-- Titanium Case -->
      <rect x="300" y="140" width="200" height="260" rx="48" fill="#27272a" stroke="${color}" stroke-width="4"/>
      <!-- Screen -->
      <rect x="316" y="156" width="168" height="228" rx="36" fill="#000000"/>
      <!-- Digital Crown -->
      <rect x="498" y="180" width="12" height="48" rx="4" fill="#71717a"/>
      <!-- Action Button Orange -->
      <rect x="290" y="210" width="12" height="40" rx="4" fill="#ea580c"/>

      <!-- Dial UI -->
      <text x="400" y="250" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display'" font-size="44" font-weight="700" fill="#ea580c" text-anchor="middle">09:41</text>
      <text x="400" y="285" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text'" font-size="13" font-weight="600" fill="#ffffff" text-anchor="middle">3,000 NITS</text>
      <text x="400" y="310" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text'" font-size="11" fill="#a1a1aa" text-anchor="middle">Sapphire Crystal • 100m Water</text>

      <text x="400" y="535" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display'" font-size="20" font-weight="600" fill="#f4f4f5" text-anchor="middle">${title}</text>
      <text x="400" y="560" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text'" font-size="13" fill="#22c55e" text-anchor="middle">✓ Rugged Titanium • Precision Dual GPS</text>
    </svg>
  `);
}

function airpodsSvg(title: string): string {
  return createSvgBase64(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#141416"/>
          <stop offset="100%" stop-color="#0a0a0c"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bg)"/>
      
      <!-- MagSafe Case -->
      <rect x="310" y="160" width="180" height="230" rx="60" fill="#f4f4f5" stroke="#e4e4e7" stroke-width="2"/>
      <!-- Lid seam -->
      <line x1="310" y1="230" x2="490" y2="230" stroke="#d4d4d8" stroke-width="1.5"/>
      <!-- LED Indicator -->
      <circle cx="400" cy="270" r="3.5" fill="#22c55e"/>
      
      <!-- Status Text -->
      <text x="400" y="340" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display'" font-size="15" font-weight="600" fill="#18181b" text-anchor="middle">H2 Audio Processor</text>
      <text x="400" y="362" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text'" font-size="11" fill="#71717a" text-anchor="middle">2x Active Noise Cancellation • USB-C</text>

      <text x="400" y="505" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display'" font-size="20" font-weight="600" fill="#f4f4f5" text-anchor="middle">${title}</text>
      <text x="400" y="530" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text'" font-size="13" fill="#22c55e" text-anchor="middle">✓ Personalized Spatial Audio • MagSafe Case</text>
    </svg>
  `);
}

async function main() {
  console.log('Seeding PostgreSQL 18 for Salem Group Apple Storefront & Admin...');

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
        storeName: 'Salem Group - Apple Reseller',
        tagline: 'Authorized Premium Apple Reseller & Certified Pre-Owned Specialists',
        address: 'Building 14, Abbas El Akkad, Nasr City, Cairo, Egypt',
        phone: '+20 100 234 5678',
        whatsapp: '+20 100 234 5678',
        currency: 'EGP',
        usdRate: 49.5,
        paymentPolicy: 'Cash On Delivery (COD) with full device inspection before payment',
        deliveryEstimate: '24 to 48 Hours Express Delivery Across Egypt',
        warrantyTerms: '1-Year Salem Comprehensive Warranty on Sealed Products, 6-Month Warranty on Certified Pre-Owned',
      },
    },
  });

  // 2. Seed Products
  const productsData = [
    {
      title: 'MacBook Pro 16" M3 Max (36GB / 1TB)',
      slug: 'macbook-pro-16-m3-max',
      category: 'mac',
      basePrice: 168000,
      salePrice: 159900,
      condition: 'NEW_SEALED',
      batteryHealth: 100,
      description: 'The ultimate pro laptop. Powered by M3 Max with a 14-core CPU, 30-core GPU, and 36GB unified memory for heavy rendering, 8K video, and local LLM workflows.',
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
        macbookSvg('MacBook Pro 16" M3 Max', '#3b3b40', 'M3 Max'),
      ],
      isFeatured: true,
      stock: 4,
      variants: [
        { colorName: 'Space Black', colorHex: '#1d1d1f', storageOption: '1TB', ramOption: '36GB', priceDelta: 0, stock: 3 },
        { colorName: 'Silver', colorHex: '#e3e4e5', storageOption: '1TB', ramOption: '36GB', priceDelta: 0, stock: 1 },
      ],
    },
    {
      title: 'MacBook Air 13" M3 (16GB / 512GB)',
      slug: 'macbook-air-13-m3',
      category: 'mac',
      basePrice: 72000,
      salePrice: 68500,
      condition: 'NEW_SEALED',
      batteryHealth: 100,
      description: 'Lean. Mean. M3 machine. Incredibly thin, fanless quiet design with up to 18 hours of battery life and support for dual external displays.',
      specs: {
        chip: 'Apple M3 (8-Core CPU, 10-Core GPU)',
        memory: '16GB Unified Memory',
        storage: '512GB SSD',
        display: '13.6-inch Liquid Retina display (500 nits, True Tone)',
        ports: '2x Thunderbolt / USB 4, MagSafe 3, 3.5mm Headphone Jack',
        weight: '1.24 kg (2.7 pounds)',
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
      title: 'MacBook Pro 14" M2 Pro (Salem Certified Pre-Owned)',
      slug: 'macbook-pro-14-m2-pro-preowned',
      category: 'mac',
      basePrice: 62000,
      salePrice: 58000,
      condition: 'CERTIFIED_PRE_OWNED',
      batteryHealth: 94,
      description: 'Tested and verified by Salem technicians through a 36-point hardware inspection. Flawless Grade A+ chassis, 94% original battery health, with authentic Apple charger.',
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
        macbookSvg('MacBook Pro 14" M2 Pro (Grade A+)', '#94a3b8', 'M2 Pro Pre-Owned'),
      ],
      isFeatured: false,
      stock: 2,
      variants: [
        { colorName: 'Space Gray', colorHex: '#4b5563', storageOption: '512GB', ramOption: '16GB', priceDelta: 0, serialNumber: 'C02H890MD6P', stock: 1 },
        { colorName: 'Silver', colorHex: '#e5e7eb', storageOption: '512GB', ramOption: '16GB', priceDelta: 0, serialNumber: 'C02H890MD7Q', stock: 1 },
      ],
    },
    {
      title: 'iPhone 16 Pro (Desert Titanium)',
      slug: 'iphone-16-pro-desert-titanium',
      category: 'iphone',
      basePrice: 64000,
      salePrice: 61900,
      condition: 'NEW_SEALED',
      batteryHealth: 100,
      description: 'Forged in titanium with the breakthrough A18 Pro chip, dedicated Camera Control button, and 4K 120 fps Dolby Vision recording.',
      specs: {
        chip: 'A18 Pro chip with 6-core GPU',
        camera: '48MP Fusion, 48MP Ultra Wide, 12MP 5x Telephoto',
        display: '6.3-inch Super Retina XDR with ProMotion 120Hz',
        material: 'Grade 5 Titanium frame with textured matte glass',
        features: 'Camera Control button, Action button, USB-C 3.0',
      },
      warrantyInfo: 'Brand New Sealed • 1-Year Apple International Warranty',
      images: [
        iphoneSvg('iPhone 16 Pro', '#c7b198', 'Desert Titanium • A18 Pro'),
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
      title: 'iPhone 16 Pro Max (Natural Titanium)',
      slug: 'iphone-16-pro-max-natural-titanium',
      category: 'iphone',
      basePrice: 76000,
      salePrice: 73500,
      condition: 'NEW_SEALED',
      batteryHealth: 100,
      description: 'The biggest, most capable iPhone yet. Incredible 6.9-inch borderless Super Retina XDR display, up to 33 hours video playback, and 5x optical zoom on all models.',
      specs: {
        chip: 'A18 Pro Chip (Industry-leading single-core speed)',
        camera: 'Triple Lens 48MP Pro System with 5x Telephoto',
        display: '6.9-inch Super Retina XDR (Thinnest borders ever)',
        battery: 'Largest battery ever in an iPhone',
      },
      warrantyInfo: 'Sealed Box • 1-Year Official Warranty with Salem Support',
      images: [
        iphoneSvg('iPhone 16 Pro Max', '#9a948c', 'Natural Titanium • 6.9" Display'),
      ],
      isFeatured: true,
      stock: 5,
      variants: [
        { colorName: 'Natural Titanium', colorHex: '#9a948c', storageOption: '256GB', priceDelta: 0, stock: 3 },
        { colorName: 'Black Titanium', colorHex: '#2d2d2f', storageOption: '512GB', priceDelta: 8500, stock: 2 },
      ],
    },
    {
      title: 'iPhone 15 Pro (Open Box - 100% Battery)',
      slug: 'iphone-15-pro-open-box',
      category: 'iphone',
      basePrice: 48000,
      salePrice: 44900,
      condition: 'OPEN_BOX',
      batteryHealth: 100,
      description: 'Customer unboxed unit with zero signs of use. 100% original battery capacity, 0 charge cycles. Includes original braided USB-C cable and box.',
      specs: {
        chip: 'A17 Pro Chip',
        camera: '48MP Main with 3x Telephoto',
        display: '6.1-inch ProMotion 120Hz',
        conditionNotes: 'Box opened for customs inspection. Never activated.',
        serialNumber: 'F2LK9992MX',
      },
      warrantyInfo: 'Full 10-Month Remaining Apple Warranty + Salem 6-Month Guarantee',
      images: [
        iphoneSvg('iPhone 15 Pro (Open Box)', '#3f3f46', '100% Battery Health • Zero Cycles'),
      ],
      isFeatured: false,
      stock: 3,
      variants: [
        { colorName: 'Black Titanium', colorHex: '#27272a', storageOption: '128GB', priceDelta: 0, serialNumber: 'F2LK9992MX', stock: 2 },
        { colorName: 'White Titanium', colorHex: '#e4e4e7', storageOption: '256GB', priceDelta: 4200, serialNumber: 'F2LK9993MY', stock: 1 },
      ],
    },
    {
      title: 'iPad Pro 13" M4 (Tandem OLED)',
      slug: 'ipad-pro-13-m4',
      category: 'ipad',
      basePrice: 65000,
      salePrice: 62000,
      condition: 'NEW_SEALED',
      batteryHealth: 100,
      description: 'Thinnovation at its finest. Revolutionary Tandem OLED Ultra Retina XDR display driven by the groundbreaking M4 chip in an unbelievable 5.1mm thin profile.',
      specs: {
        chip: 'Apple M4 Chip with 10-Core GPU & Hardware Ray Tracing',
        display: '13-inch Ultra Retina XDR (Tandem OLED, 1000 nits full screen)',
        thickness: '5.1mm - Thinnest Apple device ever made',
        accessories: 'Compatible with Apple Pencil Pro & Magic Keyboard',
      },
      warrantyInfo: '1-Year Official Apple Warranty',
      images: [
        ipadSvg('iPad Pro 13" M4', '#0284c7'),
      ],
      isFeatured: true,
      stock: 3,
      variants: [
        { colorName: 'Space Black', colorHex: '#18181b', storageOption: '256GB', priceDelta: 0, stock: 2 },
        { colorName: 'Silver', colorHex: '#e5e7eb', storageOption: '512GB', priceDelta: 7000, stock: 1 },
      ],
    },
    {
      title: 'Apple Watch Ultra 2 (Titanium 49mm)',
      slug: 'apple-watch-ultra-2',
      category: 'watch',
      basePrice: 42000,
      salePrice: 39500,
      condition: 'NEW_SEALED',
      batteryHealth: 100,
      description: 'The most capable and rugged Apple Watch. 49mm aerospace-grade titanium case, dual-frequency GPS, customizable Action button, and 3000 nits display.',
      specs: {
        caseSize: '49mm Aerospace Titanium Case',
        display: 'Always-On Retina display with up to 3,000 nits peak brightness',
        battery: 'Up to 36 hours normal use (72 hours Low Power Mode)',
        waterResistance: '100m water resistant, certified EN13319 for diving',
      },
      warrantyInfo: '1-Year International Warranty',
      images: [
        watchSvg('Apple Watch Ultra 2', '#ea580c'),
      ],
      isFeatured: true,
      stock: 4,
      variants: [
        { colorName: 'Titanium / Orange Ocean Band', colorHex: '#ea580c', storageOption: '49mm', priceDelta: 0, stock: 2 },
        { colorName: 'Titanium / Midnight Ocean Band', colorHex: '#1e2433', storageOption: '49mm', priceDelta: 0, stock: 2 },
      ],
    },
    {
      title: 'AirPods Pro 2 (USB-C MagSafe Case)',
      slug: 'airpods-pro-2-usbc',
      category: 'airpods',
      basePrice: 13500,
      salePrice: 11999,
      condition: 'NEW_SEALED',
      batteryHealth: 100,
      description: 'Up to 2x more Active Noise Cancellation, Adaptive Audio that seamlessly tunes noise control, Conversation Awareness, and USB-C MagSafe charging case.',
      specs: {
        chip: 'Apple H2 Headphone Chip, U1 Chip in Charging Case',
        audio: 'Personalized Spatial Audio with dynamic head tracking',
        charging: 'USB-C, MagSafe, and Apple Watch charger compatible',
        resistance: 'IP54 dust, sweat, and water resistant',
      },
      warrantyInfo: '1-Year Apple Warranty',
      images: [
        airpodsSvg('AirPods Pro 2 (USB-C)'),
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

  // 3. Seed Sample COD Orders
  await prisma.order.create({
    data: {
      orderNumber: 'SLM-1042',
      customerName: 'Mohamed Tarek',
      customerPhone: '+20 111 456 7890',
      customerEmail: 'mohamed.tarek@example.com',
      shippingAddress: 'Villa 12, District 5, New Cairo',
      city: 'Cairo',
      paymentMethod: 'CASH_ON_DELIVERY',
      status: 'PROCESSING',
      items: [
        {
          title: 'MacBook Pro 16" M3 Max (36GB / 1TB)',
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
      customerEmail: 'omar.h@example.com',
      shippingAddress: 'Apt 4B, Loran, Alexandria',
      city: 'Alexandria',
      paymentMethod: 'CASH_ON_DELIVERY',
      status: 'SHIPPED',
      items: [
        {
          title: 'iPhone 16 Pro (Desert Titanium)',
          variant: 'Desert Titanium / 256GB',
          price: 66900,
          quantity: 1,
        },
        {
          title: 'AirPods Pro 2 (USB-C MagSafe Case)',
          variant: 'White / Standard',
          price: 11999,
          quantity: 1,
        },
      ],
      subtotal: 78899,
      shippingCost: 0,
      totalAmount: 78899,
      trafficSource: 'WhatsApp',
      notes: 'Dispatched with express courier. Collect 78,899 EGP in cash.',
    },
  });

  // 4. Seed Sample Trade-in Leads
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

  await prisma.tradeIn.create({
    data: {
      customerName: 'Nour El-Din',
      customerPhone: '+20 115 889 0011',
      deviceCategory: 'Mac',
      deviceModel: 'MacBook Pro 13" M1 16GB/512GB',
      batteryHealth: 91,
      physicalCondition: 'Light Scratches on bottom lid',
      accessoriesIncluded: ['Original 67W Charger', 'Box'],
      estimatedTradeValue: 34000,
      desiredUpgrade: 'MacBook Pro 16" M3 Max',
      status: 'CONTACTED',
    },
  });

  // 5. Seed Pre-existing Analytics Events (Zero-result searches, Views, Cart, Abandonment, Traffic)
  const now = new Date();
  const sampleAnalyticsEvents = [
    // Zero-Result Searches (Crucial for Merchant intelligence!)
    { eventType: 'SEARCH', searchQuery: 'Vision Pro 512GB', hasResults: false, sessionId: 's-101', trafficSource: 'Instagram', createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 2) },
    { eventType: 'SEARCH', searchQuery: 'Mac Studio M2 Max', hasResults: false, sessionId: 's-102', trafficSource: 'Direct', createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 4) },
    { eventType: 'SEARCH', searchQuery: 'HomePod mini Space Gray', hasResults: false, sessionId: 's-103', trafficSource: 'WhatsApp', createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 5) },
    { eventType: 'SEARCH', searchQuery: 'Magic Keyboard with Touch ID', hasResults: false, sessionId: 's-104', trafficSource: 'Google', createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 7) },
    { eventType: 'SEARCH', searchQuery: 'Vision Pro', hasResults: false, sessionId: 's-105', trafficSource: 'TikTok', createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 9) },
    { eventType: 'SEARCH', searchQuery: 'Apple Display Studio', hasResults: false, sessionId: 's-106', trafficSource: 'Instagram', createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 12) },

    // Successful Searches
    { eventType: 'SEARCH', searchQuery: 'MacBook Pro M3', hasResults: true, sessionId: 's-201', trafficSource: 'Direct', createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 3) },
    { eventType: 'SEARCH', searchQuery: 'iPhone 16 Pro', hasResults: true, sessionId: 's-202', trafficSource: 'WhatsApp', createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 6) },
    { eventType: 'SEARCH', searchQuery: 'Pre-owned MacBook', hasResults: true, sessionId: 's-203', trafficSource: 'Instagram', createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 8) },

    // Funnel events (Views, Add to Cart, Initiated Checkout, Abandonment)
    { eventType: 'PRODUCT_VIEW', productTitle: 'MacBook Pro 16" M3 Max (36GB / 1TB)', trafficSource: 'Instagram', sessionId: 's-301' },
    { eventType: 'PRODUCT_VIEW', productTitle: 'MacBook Pro 16" M3 Max (36GB / 1TB)', trafficSource: 'WhatsApp', sessionId: 's-302' },
    { eventType: 'PRODUCT_VIEW', productTitle: 'iPhone 16 Pro (Desert Titanium)', trafficSource: 'Direct', sessionId: 's-303' },
    { eventType: 'PRODUCT_VIEW', productTitle: 'iPhone 16 Pro (Desert Titanium)', trafficSource: 'Instagram', sessionId: 's-304' },
    { eventType: 'PRODUCT_VIEW', productTitle: 'iPhone 16 Pro Max (Natural Titanium)', trafficSource: 'TikTok', sessionId: 's-305' },
    { eventType: 'PRODUCT_VIEW', productTitle: 'Apple Watch Ultra 2 (Titanium 49mm)', trafficSource: 'Facebook', sessionId: 's-306' },
    { eventType: 'PRODUCT_VIEW', productTitle: 'AirPods Pro 2 (USB-C MagSafe Case)', trafficSource: 'Google', sessionId: 's-307' },

    { eventType: 'ADD_TO_CART', productTitle: 'MacBook Pro 16" M3 Max (36GB / 1TB)', trafficSource: 'Instagram', sessionId: 's-301', metadata: { price: 159900 } },
    { eventType: 'ADD_TO_CART', productTitle: 'iPhone 16 Pro (Desert Titanium)', trafficSource: 'WhatsApp', sessionId: 's-302', metadata: { price: 61900 } },
    { eventType: 'ADD_TO_CART', productTitle: 'AirPods Pro 2 (USB-C MagSafe Case)', trafficSource: 'Google', sessionId: 's-307', metadata: { price: 11999 } },

    { eventType: 'CHECKOUT_INITIATED', trafficSource: 'Instagram', sessionId: 's-301', metadata: { cartValue: 159900 } },
    { eventType: 'CHECKOUT_INITIATED', trafficSource: 'WhatsApp', sessionId: 's-302', metadata: { cartValue: 61900 } },
    { eventType: 'CHECKOUT_INITIATED', trafficSource: 'Google', sessionId: 's-307', metadata: { cartValue: 11999 } },

    // Abandoned Checkout (e.g. customer dropped off before entering phone)
    { eventType: 'CHECKOUT_ABANDONED', trafficSource: 'Google', sessionId: 's-307', metadata: { cartValue: 11999, droppedAt: 'shipping_address_step', itemsCount: 1 } },

    // Completed COD Orders
    { eventType: 'CHECKOUT_COMPLETED', trafficSource: 'Instagram', sessionId: 's-301', metadata: { orderNumber: 'SLM-1042', amount: 159900, method: 'COD' } },
    { eventType: 'CHECKOUT_COMPLETED', trafficSource: 'WhatsApp', sessionId: 's-302', metadata: { orderNumber: 'SLM-1043', amount: 78899, method: 'COD' } },
  ];

  for (const event of sampleAnalyticsEvents) {
    await prisma.analyticsEvent.create({
      data: {
        ...event,
        metadata: event.metadata ?? undefined,
      },
    });
  }

  console.log('Seed completed successfully with authentic Apple catalog and analytics!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
