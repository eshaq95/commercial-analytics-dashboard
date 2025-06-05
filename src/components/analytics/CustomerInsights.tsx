
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Loader2 } from "lucide-react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CustomerInsights = () => {
  // Fetch customers data
  const { data: customers, isLoading } = useQuery({
    queryKey: ['customers-data'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customers')
        .select('*');

      if (error) throw error;
      return data;
    }
  });

  // Fetch customer transaction data
  const { data: customerRevenue } = useQuery({
    queryKey: ['customer-revenue'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          revenue,
          customers(country)
        `);

      if (error) throw error;

      // Group by country
      const countryStats = data.reduce((acc: any, transaction: any) => {
        const country = transaction.customers?.country || 'Unknown';
        if (!acc[country]) {
          acc[country] = {
            country,
            sales: 0
          };
        }
        acc[country].sales += parseFloat(transaction.revenue || 0);
        return acc;
      }, {});

      return Object.values(countryStats);
    }
  });

  // Fetch geographic distribution
  const { data: geoData } = useQuery({
    queryKey: ['customer-geography'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customers')
        .select('country');

      if (error) throw error;

      // Group by country
      const countryStats = data.reduce((acc: any, customer: any) => {
        const country = customer.country || 'Unknown';
        if (!acc[country]) {
          acc[country] = {
            country,
            count: 0
          };
        }
        acc[country].count += 1;
        return acc;
      }, {});

      return Object.values(countryStats);
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
            <CardTitle>Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{customers?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{customers?.filter(c => c.is_active).length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Countries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{new Set(customers?.map(c => c.country)).size || 0}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Revenue by Country */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Country</CardTitle>
            <CardDescription>Revenue distribution by customer country</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={customerRevenue}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ country, percent }: any) => `${country} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="sales"
                >
                  {customerRevenue?.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [`$${value.toLocaleString()}`, 'Sales']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>Customers by country</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={geoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Customer List */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Customer ID</th>
                  <th className="text-left p-2">Country</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Signup Date</th>
                  <th className="text-left p-2">Subscription Start</th>
                </tr>
              </thead>
              <tbody>
                {customers?.map((customer: any) => (
                  <tr key={customer.customer_id} className="border-b">
                    <td className="p-2 font-medium">{customer.customer_id}</td>
                    <td className="p-2">{customer.country}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        customer.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {customer.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-2">{new Date(customer.signup_date).toLocaleDateString()}</td>
                    <td className="p-2">
                      {customer.subscription_start ? new Date(customer.subscription_start).toLocaleDateString() : 'N/A'}
                    </td>
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

export default CustomerInsights;
