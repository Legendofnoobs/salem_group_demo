'use server';

import { prisma } from '@/lib/prisma';
import { AnalyticsSummary } from '@/types';

export interface TrackEventPayload {
  eventType: 'SEARCH' | 'PRODUCT_VIEW' | 'ADD_TO_CART' | 'CHECKOUT_INITIATED' | 'CHECKOUT_COMPLETED' | 'CHECKOUT_ABANDONED';
  productId?: string;
  productTitle?: string;
  searchQuery?: string;
  hasResults?: boolean;
  trafficSource?: string;
  sessionId: string;
  metadata?: Record<string, any>;
}

export async function trackEvent(payload: TrackEventPayload) {
  try {
    const event = await prisma.analyticsEvent.create({
      data: {
        eventType: payload.eventType,
        productId: payload.productId ?? null,
        productTitle: payload.productTitle ?? null,
        searchQuery: payload.searchQuery ? payload.searchQuery.trim() : null,
        hasResults: payload.hasResults ?? null,
        trafficSource: payload.trafficSource || 'Direct',
        sessionId: payload.sessionId,
        metadata: payload.metadata ?? undefined,
      },
    });
    return { success: true, id: event.id };
  } catch (error) {
    console.error('Error tracking analytics event:', error);
    return { success: false, error: 'Failed to record event' };
  }
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  try {
    // 1. Funnel events count
    const [viewsCount, cartCount, checkoutInitCount, checkoutCompleteCount, checkoutAbandonCount] = await Promise.all([
      prisma.analyticsEvent.count({ where: { eventType: 'PRODUCT_VIEW' } }),
      prisma.analyticsEvent.count({ where: { eventType: 'ADD_TO_CART' } }),
      prisma.analyticsEvent.count({ where: { eventType: 'CHECKOUT_INITIATED' } }),
      prisma.analyticsEvent.count({ where: { eventType: 'CHECKOUT_COMPLETED' } }),
      prisma.analyticsEvent.count({ where: { eventType: 'CHECKOUT_ABANDONED' } }),
    ]);

    const addToCartRate = viewsCount > 0 ? (cartCount / viewsCount) * 100 : 0;
    const abandonmentRate = checkoutInitCount > 0 ? (checkoutAbandonCount / checkoutInitCount) * 100 : 0;
    const conversionRate = viewsCount > 0 ? (checkoutCompleteCount / viewsCount) * 100 : 0;

    // 2. Zero-result searches
    const zeroSearches = await prisma.analyticsEvent.findMany({
      where: {
        eventType: 'SEARCH',
        hasResults: false,
        searchQuery: { not: null },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    // Group zero searches by query string
    const zeroSearchMap = new Map<string, { count: number; lastSearchedAt: Date; sources: Set<string> }>();
    for (const item of zeroSearches) {
      if (!item.searchQuery) continue;
      const q = item.searchQuery.trim().toLowerCase();
      const existing = zeroSearchMap.get(q) || { count: 0, lastSearchedAt: item.createdAt, sources: new Set<string>() };
      existing.count += 1;
      if (item.createdAt > existing.lastSearchedAt) {
        existing.lastSearchedAt = item.createdAt;
      }
      if (item.trafficSource) {
        existing.sources.add(item.trafficSource);
      }
      zeroSearchMap.set(q, existing);
    }

    const zeroResultSearches = Array.from(zeroSearchMap.entries())
      .map(([query, data]) => ({
        query: query.charAt(0).toUpperCase() + query.slice(1),
        count: data.count,
        lastSearchedAt: data.lastSearchedAt,
        trafficSources: Array.from(data.sources),
      }))
      .sort((a, b) => b.count - a.count);

    // 3. Product performance (views vs add-to-cart per product)
    const [allProductViews, allProductCarts] = await Promise.all([
      prisma.analyticsEvent.groupBy({
        by: ['productTitle'],
        where: { eventType: 'PRODUCT_VIEW', productTitle: { not: null } },
        _count: { productTitle: true },
      }),
      prisma.analyticsEvent.groupBy({
        by: ['productTitle'],
        where: { eventType: 'ADD_TO_CART', productTitle: { not: null } },
        _count: { productTitle: true },
      }),
    ]);

    const cartCountMap = new Map<string, number>();
    for (const c of allProductCarts) {
      if (c.productTitle) cartCountMap.set(c.productTitle, c._count.productTitle);
    }

    const productPerformance = allProductViews
      .map((pv: any) => {
        const title = pv.productTitle || 'Unknown';
        const views = pv._count.productTitle;
        const adds = cartCountMap.get(title) || 0;
        const rate = views > 0 ? (adds / views) * 100 : 0;
        return {
          title,
          views,
          addsToCart: adds,
          addToCartRate: Math.round(rate * 10) / 10,
        };
      })
      .sort((a: any, b: any) => b.views - a.views);

    // 4. Traffic source conversions
    const trafficSources = ['Direct', 'WhatsApp', 'Instagram', 'TikTok', 'Facebook', 'Google'];
    const trafficConversions = await Promise.all(
      trafficSources.map(async (source) => {
        const [sourceViews, sourceOrders] = await Promise.all([
          prisma.analyticsEvent.count({
            where: {
              trafficSource: source,
              eventType: { in: ['PRODUCT_VIEW', 'SEARCH', 'CHECKOUT_INITIATED'] },
            },
          }),
          prisma.order.findMany({
            where: { trafficSource: source },
            select: { totalAmount: true },
          }),
        ]);

        const totalRevenue = sourceOrders.reduce((sum: number, order: { totalAmount: number }) => sum + order.totalAmount, 0);
        const orderCount = sourceOrders.length;
        const sourceConvRate = sourceViews > 0 ? (orderCount / sourceViews) * 100 : 0;

        return {
          source,
          views: sourceViews,
          orders: orderCount,
          revenue: totalRevenue,
          conversionRate: Math.round(sourceConvRate * 10) / 10,
        };
      })
    );

    // 5. Recent abandoned checkouts
    const abandonedEvents = await prisma.analyticsEvent.findMany({
      where: { eventType: 'CHECKOUT_ABANDONED' },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const recentAbandonedCheckouts = abandonedEvents.map((ev: any) => {
      const meta = (ev.metadata as Record<string, any>) || {};
      return {
        id: ev.id,
        sessionId: ev.sessionId,
        trafficSource: ev.trafficSource || 'Direct',
        cartValue: meta.cartValue || 0,
        droppedAt: meta.droppedAt || 'Checkout Form',
        createdAt: ev.createdAt,
      };
    });

    return {
      funnel: {
        totalViews: viewsCount,
        totalAddToCart: cartCount,
        addToCartRate: Math.round(addToCartRate * 10) / 10,
        checkoutsInitiated: checkoutInitCount,
        checkoutsCompleted: checkoutCompleteCount,
        checkoutsAbandoned: checkoutAbandonCount,
        abandonmentRate: Math.round(abandonmentRate * 10) / 10,
        conversionRate: Math.round(conversionRate * 10) / 10,
      },
      zeroResultSearches,
      productPerformance,
      trafficSourceConversions: trafficConversions.sort((a, b) => b.orders - a.orders || b.views - a.views),
      recentAbandonedCheckouts,
    };
  } catch (error) {
    console.error('Error fetching analytics summary:', error);
    return {
      funnel: {
        totalViews: 0,
        totalAddToCart: 0,
        addToCartRate: 0,
        checkoutsInitiated: 0,
        checkoutsCompleted: 0,
        checkoutsAbandoned: 0,
        abandonmentRate: 0,
        conversionRate: 0,
      },
      zeroResultSearches: [],
      productPerformance: [],
      trafficSourceConversions: [],
      recentAbandonedCheckouts: [],
    };
  }
}
