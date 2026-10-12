import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Salem Group | Apple Reseller & Certified Pre-Owned',
  description: 'Authorized Apple Experience in Egypt. MacBook Pro M3, iPhone 16 Pro, Certified Pre-Owned, Cash on Delivery with device inspection before paying.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#ffffff] text-[#1d1d1f] min-h-screen antialiased selection:bg-[#0066cc] selection:text-white">
        {children}
      </body>
    </html>
  );
}
