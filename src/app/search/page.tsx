import React from 'react';
import { getProducts } from '@/actions/products';
import { SearchClientView } from './SearchClientView';

export const dynamic = 'force-dynamic';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const initialQuery = q || '';

  const initialProducts = await getProducts({
    query: initialQuery || undefined,
  });

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-10 w-full flex-1">
      <SearchClientView initialQuery={initialQuery} initialProducts={initialProducts} />
    </div>
  );
}
