'use server';

import { prisma } from '@/lib/prisma';
import { TradeInType, TradeInStatus } from '@/types';

export interface TradeInCalculationInput {
  deviceCategory: 'iPhone' | 'Mac' | 'iPad' | 'Watch';
  deviceModel: string;
  storage: string;
  batteryHealth: number;
  physicalCondition: 'Flawless' | 'Light Scratches' | 'Dents / Scratches';
  hasBox: boolean;
  hasOriginalCharger: boolean;
  hasInvoice: boolean;
}

const BASE_TRADE_VALUES: Record<string, number> = {
  // iPhones
  'iPhone 15 Pro Max': 42000,
  'iPhone 15 Pro': 35000,
  'iPhone 15': 27000,
  'iPhone 14 Pro Max': 32000,
  'iPhone 14 Pro': 27000,
  'iPhone 14': 21000,
  'iPhone 13 Pro Max': 25000,
  'iPhone 13 Pro': 21000,
  'iPhone 13': 17000,
  'iPhone 12 Pro Max': 18000,
  'iPhone 12': 13000,
  'iPhone 11': 9500,

  // Macs
  'MacBook Pro 16" M2 Pro': 52000,
  'MacBook Pro 14" M2 Pro': 45000,
  'MacBook Pro 14" M1 Pro': 38000,
  'MacBook Pro 13" M1': 26000,
  'MacBook Air 15" M2': 36000,
  'MacBook Air 13" M2': 31000,
  'MacBook Air 13" M1': 23000,

  // iPads
  'iPad Pro 12.9" M2': 28000,
  'iPad Pro 11" M2': 23000,
  'iPad Air 5 M1': 18000,
  'iPad 10th Gen': 12000,

  // Watches
  'Apple Watch Ultra 1': 22000,
  'Apple Watch Series 9': 15000,
  'Apple Watch Series 8': 11000,
};

export async function calculateTradeInValue(input: TradeInCalculationInput): Promise<number> {
  let base = BASE_TRADE_VALUES[input.deviceModel] || 15000;

  // Storage multiplier
  if (input.storage === '256GB' || input.storage === '16GB/512GB') base *= 1.1;
  else if (input.storage === '512GB' || input.storage === '16GB/1TB') base *= 1.22;
  else if (input.storage === '1TB') base *= 1.35;

  // Battery health multiplier
  if (input.batteryHealth >= 95) {
    base *= 1.0;
  } else if (input.batteryHealth >= 88) {
    base *= 0.94;
  } else if (input.batteryHealth >= 82) {
    base *= 0.88;
  } else {
    base *= 0.8;
  }

  // Condition multiplier
  if (input.physicalCondition === 'Flawless') {
    base *= 1.0;
  } else if (input.physicalCondition === 'Light Scratches') {
    base *= 0.92;
  } else {
    base *= 0.82;
  }

  // Accessories bonus
  if (input.hasBox) base += 500;
  if (input.hasOriginalCharger) base += 800;
  if (input.hasInvoice) base += 400;

  return Math.round(base / 100) * 100;
}

export async function submitTradeInLead(payload: {
  customerName: string;
  customerPhone: string;
  deviceCategory: string;
  deviceModel: string;
  batteryHealth: number;
  physicalCondition: string;
  accessoriesIncluded: string[];
  estimatedTradeValue: number;
  desiredUpgrade?: string;
}) {
  try {
    const lead = await prisma.tradeIn.create({
      data: {
        customerName: payload.customerName.trim(),
        customerPhone: payload.customerPhone.trim(),
        deviceCategory: payload.deviceCategory,
        deviceModel: payload.deviceModel,
        batteryHealth: payload.batteryHealth,
        physicalCondition: payload.physicalCondition,
        accessoriesIncluded: payload.accessoriesIncluded,
        estimatedTradeValue: payload.estimatedTradeValue,
        desiredUpgrade: payload.desiredUpgrade || null,
        status: 'NEW_LEAD',
      },
    });

    return { success: true, lead: lead as unknown as TradeInType };
  } catch (error: any) {
    console.error('Error saving trade-in lead:', error);
    return { success: false, error: error.message };
  }
}

export async function getTradeInLeads(statusFilter?: TradeInStatus | 'ALL'): Promise<TradeInType[]> {
  try {
    const where: any = {};
    if (statusFilter && statusFilter !== 'ALL') {
      where.status = statusFilter;
    }
    const leads = await prisma.tradeIn.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return leads as unknown as TradeInType[];
  } catch (error) {
    console.error('Error fetching trade-in leads:', error);
    return [];
  }
}

export async function updateTradeInStatus(id: string, status: TradeInStatus) {
  try {
    const updated = await prisma.tradeIn.update({
      where: { id },
      data: { status },
    });
    return { success: true, lead: updated as unknown as TradeInType };
  } catch (error: any) {
    console.error('Error updating trade-in status:', error);
    return { success: false, error: error.message };
  }
}
