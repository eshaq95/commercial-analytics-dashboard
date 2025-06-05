
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

  // Fetch sales by category
  const { data: categoryData } = useQuery({
    queryKey: ['sales-by-category'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sales_fact')
        .select(`
          total_amount,
          quantity,
          products(category)
        `);

      if (error) throw error;

      // Group by category
      const categoryStats = data.reduce((acc: any, sale: any) => {
        const category = sale.products?.category || 'Unknown';
        if (!acc[category]) {
          acc[category] = {
            category,
            sales: 0,
            quantity: 0
          };
        }
        acc[category].sales += parseFloat(sale.total_amount || 0);
        acc[category].quantity += parseInt(sale.quantity || 0);
        return acc;
      }, {});

      return Object.values(categoryStats);
    }
  });

  // Fetch product performance
  const { data: productPerformance } = useQuery({
    queryKey: ['product-performance'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sales_fact')
        .select(`
          total_amount,
          quantity,
          profit,
          products(product_name, price, cost)
        `);

      if (error) throw error;

      // Group by product
      const productStats = data.reduce((acc: any, sale: any) => {
        const productName = sale.products?.product_name || 'Unknown';
        if (!acc[productName]) {
          acc[productName] = {
            product: productName,
            sales: 0,
            quantity: 0,
            profit: 0,
            price: sale.products?.price || 0,
            cost: sale.products?.cost || 0
          };
        }
        acc[productName].sales += parseFloat(sale.total_amount || 0);
        acc[productName].quantity += parseInt(sale.quantity || 0);
        acc[productName].profit += parseFloat(sale.profit || 0);
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{new Set(products?.map(p => p.category)).size || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Brands</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{new Set(products?.map(p => p.brand)).size || 0}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Category Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Revenue distribution across product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percent }: any) => `${category} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="sales"
                >
                  {categoryData?.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [`$${value.toLocaleString()}`, 'Sales']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Product Performance Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Product Performance</CardTitle>
            <CardDescription>Sales vs Profit by product</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip formatter={(value: any) => [`$${value.toLocaleString()}`]} />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" name="Sales" />
                <Bar dataKey="profit" fill="#82ca9d" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

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
                  <th className="text-left p-2">Product Name</th>
                  <th className="text-left p-2">Category</th>
                  <th className="text-left p-2">Brand</th>
                  <th className="text-right p-2">Price</th>
                  <th className="text-right p-2">Cost</th>
                  <th className="text-right p-2">Margin</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product: any) => {
                  const margin = product.price && product.cost ? 
                    ((product.price - product.cost) / product.price * 100).toFixed(1) : 0;
                  return (
                    <tr key={product.product_id} className="border-b">
                      <td className="p-2 font-medium">{product.product_name}</td>
                      <td className="p-2">{product.category}</td>
                      <td className="p-2">{product.brand}</td>
                      <td className="p-2 text-right">${product.price}</td>
                      <td className="p-2 text-right">${product.cost}</td>
                      <td className="p-2 text-right">{margin}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductAnalytics;
