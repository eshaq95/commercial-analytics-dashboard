
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Loader2 } from "lucide-react";

const SalesOverview = () => {
  // Fetch sales data by month
  const { data: salesData, isLoading } = useQuery({
    queryKey: ['sales-overview'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('fact_transactions')
        .select('*')
        .order('date');

      if (error) throw error;

      // Group by month
      const monthlyData = data.reduce((acc: any, transaction: any) => {
        const date = new Date(transaction.date);
        const month = date.toLocaleString('default', { month: 'long' });
        if (!acc[month]) {
          acc[month] = {
            month,
            sales: 0,
            quantity: 0,
            orders: 0
          };
        }
        acc[month].sales += parseFloat(transaction.revenue_nok || 0);
        acc[month].quantity += parseInt(transaction.quantity || 0);
        acc[month].orders += 1;
        return acc;
      }, {});

      return Object.values(monthlyData);
    }
  });

  // Fetch top products
  const { data: topProducts } = useQuery({
    queryKey: ['top-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('fact_transactions')
        .select(`
          revenue_nok,
          quantity,
          dim_product(product_name)
        `)
        .order('revenue_nok', { ascending: false });

      if (error) throw error;

      // Group by product
      const productData = data.reduce((acc: any, transaction: any) => {
        const productName = transaction.dim_product?.product_name || 'Unknown';
        if (!acc[productName]) {
          acc[productName] = {
            product: productName,
            sales: 0,
            quantity: 0
          };
        }
        acc[productName].sales += parseFloat(transaction.revenue_nok || 0);
        acc[productName].quantity += parseInt(transaction.quantity || 0);
        return acc;
      }, {});

      return Object.values(productData).slice(0, 5);
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales Trend</CardTitle>
            <CardDescription>Sales performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`$${value.toLocaleString()}`, 'Sales']} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={{ fill: '#8884d8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Products by Sales */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products by Sales</CardTitle>
            <CardDescription>Best performing products</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProducts} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="product" type="category" width={100} />
                <Tooltip formatter={(value: any) => [`$${value.toLocaleString()}`, 'Sales']} />
                <Bar dataKey="sales" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Month</th>
                  <th className="text-right p-2">Sales</th>
                  <th className="text-right p-2">Orders</th>
                  <th className="text-right p-2">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {salesData?.map((row: any, index: number) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 font-medium">{row.month}</td>
                    <td className="p-2 text-right">${row.sales.toLocaleString()}</td>
                    <td className="p-2 text-right">{row.orders}</td>
                    <td className="p-2 text-right">{row.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesOverview;
