
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Loader2 } from "lucide-react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ProductAnalytics = () => {
  // Fetch products data
  const { data: products, isLoading } = useQuery({
    queryKey: ['products-analytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (error) throw error;
      return data;
    }
  });

  // Fetch product performance
  const { data: productPerformance } = useQuery({
    queryKey: ['product-performance'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          revenue,
          quantity,
          products(product_name, base_price)
        `);

      if (error) throw error;

      // Group by product
      const productStats = data.reduce((acc: any, transaction: any) => {
        const productName = transaction.products?.product_name || 'Unknown';
        if (!acc[productName]) {
          acc[productName] = {
            product: productName,
            sales: 0,
            quantity: 0,
            price: transaction.products?.base_price || 0
          };
        }
        acc[productName].sales += parseFloat(transaction.revenue || 0);
        acc[productName].quantity += parseInt(transaction.quantity || 0);
        return acc;
      }, {});

      return Object.values(productStats);
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{products?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Product Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${products?.reduce((sum, p) => sum + (p.base_price || 0), 0) / (products?.length || 1) || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Performance Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Product Performance</CardTitle>
          <CardDescription>Sales by product</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productPerformance?.slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip formatter={(value: any) => [`$${value.toLocaleString()}`]} />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" name="Sales" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product Catalog</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Product ID</th>
                  <th className="text-left p-2">Product Name</th>
                  <th className="text-right p-2">Base Price</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product: any) => (
                  <tr key={product.product_id} className="border-b">
                    <td className="p-2 font-medium">{product.product_id}</td>
                    <td className="p-2">{product.product_name}</td>
                    <td className="p-2 text-right">${product.base_price}</td>
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

export default ProductAnalytics;
