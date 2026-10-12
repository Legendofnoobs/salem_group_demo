import React from 'react';
import { getCustomerOrders } from '@/actions/orders';
import { AccountClientView } from './AccountClientView';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'My Account & Order Tracking | Salem Group',
  description: 'View order history, live delivery status, and warranty coverage for your Apple devices.',
};

export default async function AccountPage() {
  const orders = await getCustomerOrders();

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-10 w-full flex-1">
      <AccountClientView initialOrders={orders} />
    </div>
  );
}
