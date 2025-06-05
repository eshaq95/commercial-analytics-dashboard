
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader2, AlertTriangle } from "lucide-react";

const InventoryDashboard = () => {
  // Fetch inventory data
  const { data: inventory, isLoading } = useQuery({
    queryKey: ['inventory-data'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('fact_inventory_daily')
        .select(`
          *,
          dim_product(product_name, category, price_nok)
        `)
        .order('inventory_date', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  // Calculate inventory metrics
  const inventoryMetrics = inventory ? {
    totalQuantity: inventory.reduce((sum, item) => sum + (item.stock_level || 0), 0),
    totalValue: inventory.reduce((sum, item) => sum + ((item.stock_level || 0) * (item.dim_product?.price_nok || 0)), 0),
    lowStockItems: inventory.filter(item => item.stock_level <= 10).length
  } : { totalQuantity: 0, totalValue: 0, lowStockItems: 0 };

  // Group inventory by category
  const categoryInventory = inventory ? inventory.reduce((acc: any, item: any) => {
    const category = item.dim_product?.category || 'Unknown';
    if (!acc[category]) {
      acc[category] = {
        category,
        quantity: 0,
        value: 0,
        items: 0
      };
    }
    acc[category].quantity += item.stock_level || 0;
    acc[category].value += (item.stock_level || 0) * (item.dim_product?.price_nok || 0);
    acc[category].items += 1;
    return acc;
  }, {}) : {};

  const categoryData = Object.values(categoryInventory);

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
            <CardTitle>Total Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{inventoryMetrics.totalValue.toLocaleString()} NOK</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Stock Quantity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{inventoryMetrics.totalQuantity.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{inventoryMetrics.lowStockItems}</div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory by Category</CardTitle>
          <CardDescription>Stock levels across product categories</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#8884d8" name="Quantity" />
              <Bar dataKey="value" fill="#82ca9d" name="Value (NOK)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Product</th>
                  <th className="text-left p-2">Category</th>
                  <th className="text-right p-2">Stock Level</th>
                  <th className="text-right p-2">Unit Price (NOK)</th>
                  <th className="text-right p-2">Total Value (NOK)</th>
                  <th className="text-center p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {inventory?.map((item: any, index: number) => {
                  const isLowStock = item.stock_level <= 10;
                  const totalValue = (item.stock_level || 0) * (item.dim_product?.price_nok || 0);
                  return (
                    <tr key={index} className="border-b">
                      <td className="p-2 font-medium">{item.dim_product?.product_name || 'Unknown'}</td>
                      <td className="p-2">{item.dim_product?.category || 'Unknown'}</td>
                      <td className="p-2 text-right">{item.stock_level}</td>
                      <td className="p-2 text-right">{item.dim_product?.price_nok}</td>
                      <td className="p-2 text-right">{totalValue.toLocaleString()}</td>
                      <td className="p-2 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          isLowStock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {isLowStock ? 'Low Stock' : 'In Stock'}
                        </span>
                      </td>
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

export default InventoryDashboard;
