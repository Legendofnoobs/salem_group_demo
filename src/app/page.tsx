import { getProducts } from '@/actions/products';
import { getOrders } from '@/actions/orders';
import { getTradeInLeads } from '@/actions/tradeIns';
import { getStoreSettings, getAdminKPIs } from '@/actions/settings';
import { getAnalyticsSummary } from '@/actions/analytics';
import { MainController } from '@/components/MainController';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [products, orders, leads, settings, analytics, kpis] = await Promise.all([
    getProducts({ category: 'all' }),
    getOrders('ALL'),
    getTradeInLeads('ALL'),
    getStoreSettings(),
    getAnalyticsSummary(),
    getAdminKPIs(),
  ]);

  return (
    <MainController
      initialProducts={products}
      initialOrders={orders}
      initialLeads={leads}
      initialSettings={settings}
      initialAnalytics={analytics}
      initialKPIs={kpis}
    />
  );
}
