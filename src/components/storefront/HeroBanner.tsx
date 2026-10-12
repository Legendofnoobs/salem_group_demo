'use client';

import React from 'react';

interface HeroBannerProps {
  onScrollToCatalog: () => void;
  onOpenTradeIn: () => void;
}

export function HeroBanner({ onScrollToCatalog, onOpenTradeIn }: HeroBannerProps) {
  return (
    <div className="w-full">
      {/* Tile 1: product-tile-dark (#272729 Near-Black Canvas) */}
      <section className="bg-[#272729] text-[#ffffff] pt-16 pb-12 sm:pt-20 sm:pb-16 px-4 text-center overflow-hidden border-b border-[#333336]">
        <div className="max-w-[1024px] mx-auto">
          {/* Tile Headline (hero-display: 56px / 600 / line-height 1.07 / letter-spacing -0.28px) */}
          <h1 className="text-[40px] sm:text-[56px] font-semibold tracking-[-0.28px] leading-[1.07] text-[#ffffff] mb-2 font-display">
            MacBook Pro
          </h1>

          {/* Subhead (lead: 28px / 400 / line-height 1.14) */}
          <p className="text-[20px] sm:text-[28px] font-normal text-[#cccccc] tracking-[0.196px] leading-[1.14] mb-6">
            Mind-blowing. Head-turning.
          </p>

          {/* Dual Action Buttons (Action Blue Pill + Ghost Pill per DESIGN.md) */}
          <div className="flex items-center justify-center gap-3.5 mb-10">
            <button
              onClick={onScrollToCatalog}
              className="px-[22px] py-[11px] rounded-[9999px] bg-[#0066cc] text-[#ffffff] text-[17px] font-normal hover:bg-[#0071e3] apple-btn-active transition-all"
            >
              Order with COD
            </button>
            <button
              onClick={onOpenTradeIn}
              className="px-[22px] py-[11px] rounded-[9999px] bg-transparent text-[#2997ff] border border-[#2997ff] text-[17px] font-normal hover:bg-[#2997ff]/10 apple-btn-active transition-all"
            >
              Trade In Credit
            </button>
          </div>

          {/* Product render with signature Apple drop-shadow */}
          <div className="max-w-[720px] mx-auto flex items-center justify-center">
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgNTAwIiB3aWR0aD0iODAwIiBoZWlnaHQ9IjUwMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJtZXRhbERlY2siIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMWYxZjIzIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMTQxNDE2Ii8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9InNjcmVlbkRpc3BsYXkiIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMGEwYTBjIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMTgxODFjIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PGVsbGlwc2UgY3g9IjQwMCIgY3k9IjQxMCIgcng9IjI4MCIgcnk9IjE2IiBmaWxsPSJyZ2JhKDAsMCwwLDAuMjIpIi8+PHJlY3QgeD0iMTkwIiB5PSI3MCIgd2lkdGg9IjQyMCIgaGVpZ2h0PSIyNzAiIHJ4PSIxMiIgZmlsbD0iIzBkMGQwZiIgc3Ryb2tlPSIjMzMzMzM2IiBzdHJva2Utd2lkdGg9IjIiLz48cmVjdCB4PSIyMDIiIHk9IjgyIiB3aWR0aD0iMzk2IiBoZWlnaHQ9IjI0NiIgcng9IjYiIGZpbGw9InVybCgjc2NyZWVuRGlzcGxheSkiLz48cGF0aCBkPSJNIDM3MiA4MiBMIDQyOCA4MiBMIDQyNCA5NCBDIDQyMiA5NyA0MTkgOTkgNDE1IDk5IEwgMzg1IDk5IEMgMzgxIDk5IDM3OCA5NyAzNzYgOTQgWiIgZmlsbD0iIzBkMGQwZiIvPjxjaXJjbGUgY3g9IjQwMCIgY3k9Ijg5IiByPSIyLjUiIGZpbGw9IiMxZjI5MzciLz48cmVjdCB4PSIyMDgiIHk9IjEwNCIgd2lkdGg9IjM4NCIgaGVpZ2h0PSIyMTgiIHJ4PSI0IiBmaWxsPSIjMTExMTE0Ii8+PHRleHQgeD0iNDAwIiB5PSIyNDAiIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLCAnU0YgUHJvIERpc3BsYXknLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5NMyBNYXg8L3RleHQ+PHRleHQgeD0iNDAwIiB5PSIyNjUiIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLCAnU0YgUHJvIFRleHQnLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNDAwIiBmaWxsPSIjYTFhMWFhIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5MaXF1aWQgUmV0aW5hIFhEUjwvdGV4dD48cGF0aCBkPSJNIDE0MCAzNDAgTCA2NjAgMzQwIEwgNjQyIDM4OCBMIDE1OCAzODggWiIgZmlsbD0idXJsKCNtZXRhbERlY2spIiBzdHJva2U9IiMzZjNmNDYiIHN0cm9rZS13aWR0aD0iMS41Ii8+PHJlY3QgeD0iMzY0IiB5PSIzNDAiIHdpZHRoPSI3MiIgaGVpZ2h0PSI1IiByeD0iMi41IiBmaWxsPSIjMDgwODBhIi8+PHJlY3QgeD0iMTQwIiB5PSIzODQiIHdpZHRoPSI1MjAiIGhlaWdodD0iMTIiIHJ4PSI2IiBmaWxsPSIjMTgxODFiIi8+PC9zdmc+"
              alt="MacBook Pro"
              className="w-full h-auto object-contain apple-product-shadow"
            />
          </div>
        </div>
      </section>

      {/* Tile 2: product-tile-parchment (#f5f5f7 Parchment Light Canvas) */}
      <section className="bg-[#f5f5f7] text-[#1d1d1f] pt-16 pb-12 sm:pt-20 sm:pb-16 px-4 text-center overflow-hidden border-b border-[#e0e0e0]">
        <div className="max-w-[1024px] mx-auto">
          {/* Tile Headline */}
          <h2 className="text-[40px] sm:text-[56px] font-semibold tracking-[-0.28px] leading-[1.07] text-[#1d1d1f] mb-2 font-display">
            iPhone 16 Pro
          </h2>

          {/* Subhead */}
          <p className="text-[20px] sm:text-[28px] font-normal text-[#1d1d1f] tracking-[0.196px] leading-[1.14] mb-6">
            Hello, Apple Intelligence.
          </p>

          {/* Dual Action Buttons */}
          <div className="flex items-center justify-center gap-3.5 mb-10">
            <button
              onClick={onScrollToCatalog}
              className="px-[22px] py-[11px] rounded-[9999px] bg-[#0066cc] text-[#ffffff] text-[17px] font-normal hover:bg-[#0071e3] apple-btn-active transition-all"
            >
              Order with COD
            </button>
            <button
              onClick={onOpenTradeIn}
              className="px-[22px] py-[11px] rounded-[9999px] bg-transparent text-[#0066cc] border border-[#0066cc] text-[17px] font-normal hover:bg-[#0066cc]/10 apple-btn-active transition-all"
            >
              Trade In Your iPhone
            </button>
          </div>

          {/* iPhone Product render with signature Apple drop-shadow */}
          <div className="max-w-[340px] mx-auto flex items-center justify-center">
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNTAwIiB3aWR0aD0iNjAwIiBoZWlnaHQ9IjUwMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJ0aUZyYW1lIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2M3YjE5OCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzI0MjQyNiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxlbGxpcHNlIGN4PSIzMDAiIGN5PSI0MjUiIHJ4PSIxNDAiIHJ5PSIxNCIgZmlsbD0icmdiYSgwLDAsMCwwLjIyKSIvPjxyZWN0IHg9IjIwMCIgeT0iNjAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMzU1IiByeD0iMzgiIGZpbGw9InVybCgjdGlGcmFtZSkiIHN0cm9rZT0iI2M3YjE5OCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz48cmVjdCB4PSIyMDYiIHk9IjY2IiB3aWR0aD0iMTg4IiBoZWlnaHQ9IjM0MyIgcng9IjMyIiBmaWxsPSIjMDAwMDAwIi8+PHJlY3QgeD0iMjEwIiB5PSI3MCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIzMzUiIHJ4PSIyOCIgZmlsbD0iIzBjMGQxMCIvPjxyZWN0IHg9IjI2OCIgeT0iODAiIHdpZHRoPSI2NCIgaGVpZ2h0PSIxOCIgcng9IjkiIGZpbGw9IiMwMDAwMDAiLz48dGV4dCB4PSIzMDAiIHk9IjIxMCIgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sICdTRiBQcm8gRGlzcGxheScsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPjA5OjQxPC90ZXh0Pjx0ZXh0IHg9IjMwMCIgeT0iMjQwIiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSwgJ1NGIFBybyBUZXh0Jywgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjQwMCIgZmlsbD0iI2ExYTFhYSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+U3VwZXIgUmV0aW5hIFhEUjwvdGV4dD48cmVjdCB4PSIyNDAiIHk9IjI4MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIzMCIgcng9IjE1IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDYpIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PHRleHQgeD0iMzAwIiB5PSIzMDAiIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLCAnU0YgUHJvIFRleHQnLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjYzdiMTk4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5BMTggUHJvPC90ZXh0PjwvY3ZnPg=="
              alt="iPhone 16 Pro"
              className="w-full h-auto object-contain apple-product-shadow"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
