
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

  // Fetch customer segments
  const { data: segmentData } = useQuery({
    queryKey: ['customer-segments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sales_fact')
        .select(`
          total_amount,
          customers(customer_segment)
        `);

      if (error) throw error;

      // Group by segment
      const segmentStats = data.reduce((acc: any, sale: any) => {
        const segment = sale.customers?.customer_segment || 'Unknown';
        if (!acc[segment]) {
          acc[segment] = {
            segment,
            sales: 0,
            customers: new Set()
          };
        }
        acc[segment].sales += parseFloat(sale.total_amount || 0);
        return acc;
      }, {});

      return Object.values(segmentStats);
    }
  });

  // Fetch geographic distribution
  const { data: geoData } = useQuery({
    queryKey: ['customer-geography'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customers')
        .select('state');

      if (error) throw error;

      // Group by state
      const stateStats = data.reduce((acc: any, customer: any) => {
        const state = customer.state || 'Unknown';
        if (!acc[state]) {
          acc[state] = {
            state,
            count: 0
          };
        }
        acc[state].count += 1;
        return acc;
      }, {});

      return Object.values(stateStats);
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
            <CardTitle>Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{new Set(customers?.map(c => c.customer_segment)).size || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>States</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{new Set(customers?.map(c => c.state)).size || 0}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Segments */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
            <CardDescription>Revenue by customer segment</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={segmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ segment, percent }: any) => `${segment} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="sales"
                >
                  {segmentData?.map((entry: any, index: number) => (
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
            <CardDescription>Customers by state</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={geoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" />
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
                  <th className="text-left p-2">Customer Name</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Segment</th>
                  <th className="text-left p-2">Location</th>
                  <th className="text-left p-2">Registration Date</th>
                </tr>
              </thead>
              <tbody>
                {customers?.map((customer: any) => (
                  <tr key={customer.customer_id} className="border-b">
                    <td className="p-2 font-medium">{customer.customer_name}</td>
                    <td className="p-2">{customer.email}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        customer.customer_segment === 'VIP' ? 'bg-purple-100 text-purple-800' :
                        customer.customer_segment === 'Premium' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {customer.customer_segment}
                      </span>
                    </td>
                    <td className="p-2">{customer.city}, {customer.state}</td>
                    <td className="p-2">{new Date(customer.registration_date).toLocaleDateString()}</td>
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
