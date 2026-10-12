import React from 'react';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/actions/products';
import { ProductDetailView } from './ProductDetailView';

export const dynamic = 'force-dynamic';

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductBySlug(handle);

  if (!product) {
    notFound();
  }

  // Fetch related products in the same category
  const allInCategory = await getProducts({ category: product.category as any });
  const relatedProducts = allInCategory
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-10 w-full flex-1">
      <ProductDetailView product={product} relatedProducts={relatedProducts} />
    </div>
  );
}
