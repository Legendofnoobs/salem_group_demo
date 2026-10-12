'use server';

import { randomUUID } from 'crypto';
import { prisma, neonSql } from '@/lib/prisma';
import { OrderType, OrderStatus } from '@/types';
import { trackEvent } from './analytics';

export interface CreateOrderPayload {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  shippingAddress: string;
  city: string;
  items: Array<{
    title: string;
    variant?: string;
    price: number;
    quantity: number;
    serialNumber?: string;
  }>;
  subtotal: number;
  shippingCost?: number;
  totalAmount: number;
  trafficSource?: string;
  sessionId: string;
  notes?: string;
}

export async function createCODOrder(payload: CreateOrderPayload) {
  try {
    const id = randomUUID();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `SLM-${randomSuffix}`;
    const now = new Date().toISOString();

    const rows = await neonSql`
      INSERT INTO "Order" (
        "id",
        "orderNumber",
        "customerName",
        "customerPhone",
        "customerEmail",
        "shippingAddress",
        "city",
        "paymentMethod",
        "status",
        "items",
        "subtotal",
        "shippingCost",
        "totalAmount",
        "trafficSource",
        "notes",
        "createdAt",
        "updatedAt"
      ) VALUES (
        ${id},
        ${orderNumber},
        ${payload.customerName.trim()},
        ${payload.customerPhone.trim()},
        ${payload.customerEmail?.trim() || null},
        ${payload.shippingAddress.trim()},
        ${payload.city.trim()},
        ${'CASH_ON_DELIVERY'},
        ${'PENDING'},
        ${JSON.stringify(payload.items)}::jsonb,
        ${payload.subtotal},
        ${payload.shippingCost || 0},
        ${payload.totalAmount},
        ${payload.trafficSource || 'Direct'},
        ${payload.notes || 'Cash On Delivery - Customer requested inspection before payment'},
        ${now}::timestamp,
        ${now}::timestamp
      )
      RETURNING *
    `;

    const order = rows[0];

    // Record checkout completion analytics event
    await trackEvent({
      eventType: 'CHECKOUT_COMPLETED',
      sessionId: payload.sessionId,
      trafficSource: payload.trafficSource || 'Direct',
      metadata: {
        orderNumber,
        amount: payload.totalAmount,
        method: 'CASH_ON_DELIVERY',
        itemsCount: payload.items.length,
      },
    }).catch(() => {});

    // Generate WhatsApp direct text
    const merchantWhatsapp = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '201002345678';
    const itemsList = payload.items
      .map(
        (i) =>
          `• ${i.title} (${i.variant || 'Standard'}) x${i.quantity} = ${i.price.toLocaleString()} EGP`
      )
      .join('\n');

    const waText = encodeURIComponent(
      `*طلب جديد من متجر Salem Group*\n` +
        `رقم الطلب: #${orderNumber}\n` +
        `العميل: ${payload.customerName}\n` +
        `الهاتف: ${payload.customerPhone}\n` +
        `العنوان: ${payload.shippingAddress}, ${payload.city}\n\n` +
        `*المنتجات:*\n${itemsList}\n\n` +
        `*طريقة الدفع:* الدفع عند الاستلام (COD) بعد المعاينة\n` +
        `*الإجمالي:* ${payload.totalAmount.toLocaleString()} EGP`
    );

    const whatsappUrl = `https://wa.me/${merchantWhatsapp}?text=${waText}`;

    return {
      success: true,
      order: order as unknown as OrderType,
      orderNumber,
      whatsappUrl,
    };
  } catch (error: any) {
    console.error('Error creating COD order:', error);
    return { success: false, error: error.message || 'Failed to place order' };
  }
}

export async function getOrders(statusFilter?: OrderStatus | 'ALL'): Promise<OrderType[]> {
  try {
    let orders = await neonSql`SELECT * FROM "Order" ORDER BY "createdAt" DESC`;
    if (statusFilter && statusFilter !== 'ALL') {
      orders = orders.filter((o: any) => o.status === statusFilter);
    }

    return orders as unknown as OrderType[];
  } catch (error) {
    console.error('Error retrieving orders:', error);
    return [];
  }
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    // Generate notification template for WhatsApp to customer
    let statusMessage = '';
    if (status === 'CONFIRMED') {
      statusMessage = `أهلاً ${order.customerName}، تم تأكيد طلبك رقم #${order.orderNumber} من متجر Salem Group. جاري تجهيز الجهاز وفحصه. الدفع عند الاستلام ${order.totalAmount.toLocaleString()} EGP.`;
    } else if (status === 'SHIPPED') {
      statusMessage = `أهلاً ${order.customerName}، تم شحن طلبك رقم #${order.orderNumber} مع مندوب التوصيل. سيصلك خلال 24 ساعة. يحق لك معاينة وتجربة الجهاز بالكامل قبل دفع ${order.totalAmount.toLocaleString()} EGP نقدياً.`;
    } else if (status === 'DELIVERED') {
      statusMessage = `أهلاً ${order.customerName}، نبارك لك استلام جهازك من Salem Group! نتمنى لك تجربة ممتعة، وتغطية الضمان سارية رسمياً لدينا.`;
    }

    const cleanPhone = order.customerPhone.replace(/[^0-9]/g, '');
    const customerWhatsAppUrl = statusMessage
      ? `https://wa.me/${cleanPhone.startsWith('0') ? '2' + cleanPhone : cleanPhone}?text=${encodeURIComponent(statusMessage)}`
      : null;

    return { success: true, order: order as unknown as OrderType, customerWhatsAppUrl };
  } catch (error: any) {
    console.error('Error updating order status:', error);
    return { success: false, error: error.message };
  }
}

export async function getOrderByNumber(orderNumber: string): Promise<OrderType | null> {
  try {
    const cleanNumber = orderNumber.trim().toUpperCase();
    const rows = await neonSql`
      SELECT * FROM "Order" WHERE "orderNumber" = ${cleanNumber} LIMIT 1
    `;
    return (rows[0] as unknown as OrderType) || null;
  } catch (error) {
    console.error(`Error retrieving order by number ${orderNumber}:`, error);
    return null;
  }
}

export async function getCustomerOrders(phone?: string): Promise<OrderType[]> {
  try {
    let orders = await neonSql`SELECT * FROM "Order" ORDER BY "createdAt" DESC LIMIT 20`;
    if (phone && phone.trim()) {
      const q = phone.trim();
      orders = orders.filter((o: any) => o.customerPhone?.includes(q));
    }
    return orders as unknown as OrderType[];
  } catch (error) {
    console.error('Error retrieving customer orders:', error);
    return [];
  }
}

