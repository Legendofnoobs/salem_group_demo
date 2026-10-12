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
    <html lang="en" className="dark">
      <body className="bg-black text-white min-h-screen antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
