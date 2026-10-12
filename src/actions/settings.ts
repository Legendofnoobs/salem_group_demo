'use server';

import { prisma } from '@/lib/prisma';
import { StoreSettingsType } from '@/types';

export async function getStoreSettings(): Promise<StoreSettingsType> {
  try {
    const setting = await prisma.storeSetting.findUnique({
      where: { key: 'general' },
    });

    if (setting && setting.value) {
      return setting.value as unknown as StoreSettingsType;
    }

    return {
      storeName: 'Salem Group - Apple Reseller',
      tagline: 'Authorized Premium Apple Reseller & Certified Pre-Owned Specialists',
      address: 'Building 14, Abbas El Akkad, Nasr City, Cairo, Egypt',
      phone: '+20 100 234 5678',
      whatsapp: '+20 100 234 5678',
      currency: 'EGP',
      usdRate: 49.5,
      paymentPolicy: 'Cash On Delivery (COD) with full device inspection before payment',
      deliveryEstimate: '24 to 48 Hours Express Delivery Across Egypt',
      warrantyTerms: '1-Year Salem Comprehensive Warranty on Sealed Products',
    };
  } catch (error) {
    console.error('Error reading store settings:', error);
    return {
      storeName: 'Salem Group - Apple Reseller',
      tagline: 'Authorized Premium Apple Reseller',
      address: 'Nasr City, Cairo, Egypt',
      phone: '+20 100 234 5678',
      whatsapp: '+20 100 234 5678',
      currency: 'EGP',
      usdRate: 49.5,
      paymentPolicy: 'Cash On Delivery (COD)',
      deliveryEstimate: '24-48 Hours',
      warrantyTerms: '1-Year Salem Warranty',
    };
  }
}

export async function updateStoreSettings(newSettings: Partial<StoreSettingsType>) {
  try {
    const current = await getStoreSettings();
    const updated = { ...current, ...newSettings };

    await prisma.storeSetting.upsert({
      where: { key: 'general' },
      update: { value: updated },
      create: { key: 'general', value: updated },
    });

    return { success: true, settings: updated };
  } catch (error: any) {
    console.error('Error updating store settings:', error);
    return { success: false, error: error.message };
  }
}

export async function getAdminKPIs() {
  try {
    const [orders, totalProducts, pendingTradeIns, lowStockCount] = await Promise.all([
      prisma.order.findMany({ select: { totalAmount: true, status: true } }),
      prisma.product.count(),
      prisma.tradeIn.count({ where: { status: 'NEW_LEAD' } }),
      prisma.product.count({ where: { stock: { lte: 2 } } }),
    ]);

    const totalRevenue = orders.reduce((sum: number, o: { totalAmount: number }) => sum + o.totalAmount, 0);
    const activeOrders = orders.filter((o: { status: string }) => o.status !== 'DELIVERED' && o.status !== 'CANCELLED').length;
    const deliveredOrders = orders.filter((o: { status: string }) => o.status === 'DELIVERED').length;

    return {
      totalRevenue,
      totalOrders: orders.length,
      activeOrders,
      deliveredOrders,
      totalProducts,
      pendingTradeIns,
      lowStockCount,
    };
  } catch (error) {
    console.error('Error fetching admin KPIs:', error);
    return {
      totalRevenue: 0,
      totalOrders: 0,
      activeOrders: 0,
      deliveredOrders: 0,
      totalProducts: 0,
      pendingTradeIns: 0,
      lowStockCount: 0,
    };
  }
}
