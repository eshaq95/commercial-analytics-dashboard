
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalesOverview from "@/components/analytics/SalesOverview";
import ProductAnalytics from "@/components/analytics/ProductAnalytics";
import CustomerInsights from "@/components/analytics/CustomerInsights";
import InventoryDashboard from "@/components/analytics/InventoryDashboard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  // Fetch key metrics for the overview cards
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      const [salesResult, customersResult, productsResult] = await Promise.all([
        supabase.from('transactions').select('revenue'),
        supabase.from('customers').select('customer_id', { count: 'exact' }),
        supabase.from('products').select('product_id', { count: 'exact' })
      ]);

      const totalSales = salesResult.data?.reduce((sum, transaction) => 
        sum + (parseFloat(transaction.revenue?.toString() || '0')), 0) || 0;

      return {
        totalSales,
        totalCustomers: customersResult.count || 0,
        totalProducts: productsResult.count || 0
      };
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">E-commerce Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor your business performance and insights</p>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${metrics?.totalSales?.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics?.totalCustomers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics?.totalProducts}</div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="sales" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
            <TabsTrigger value="products">Product Analytics</TabsTrigger>
            <TabsTrigger value="customers">Customer Insights</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
          </TabsList>

          <TabsContent value="sales">
            <SalesOverview />
          </TabsContent>

          <TabsContent value="products">
            <ProductAnalytics />
          </TabsContent>

          <TabsContent value="customers">
            <CustomerInsights />
          </TabsContent>

          <TabsContent value="inventory">
            <InventoryDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
