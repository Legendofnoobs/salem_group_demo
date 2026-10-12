import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { StoreHeader } from '@/components/shared/StoreHeader';
import { StoreFooter } from '@/components/shared/StoreFooter';
import { GlobalCartDrawer } from '@/components/shared/GlobalCartDrawer';

export const metadata: Metadata = {
  title: 'Salem Group | Premium Electronics & Certified Pre-Owned',
  description: 'Egypt’s premier destination for authentic sealed Apple hardware and certified pre-owned devices. Cash on Delivery with device inspection before paying.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#ffffff] text-[#1d1d1f] min-h-screen flex flex-col antialiased selection:bg-[#0066cc] selection:text-white font-sans">
        <CartProvider>
          <StoreHeader />
          <div className="flex-1 flex flex-col w-full">
            {children}
          </div>
          <GlobalCartDrawer />
          <StoreFooter />
        </CartProvider>
      </body>
    </html>
  );
}
