
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Loader2, TrendingUp, Users, UserCheck } from "lucide-react";

const InventoryDashboard = () => {
  // Fetch subscription KPIs data
  const { data: subscriptionKpis, isLoading } = useQuery({
    queryKey: ['subscription-kpis'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscription_kpis')
        .select('*')
        .order('month', { ascending: true });

      if (error) throw error;
      
      // Format data for charts
      return data.map(item => ({
        ...item,
        month: new Date(item.month).toLocaleDateString('default', { month: 'short', year: 'numeric' })
      }));
    }
  });

  // Calculate latest metrics
  const latestMetrics = subscriptionKpis && subscriptionKpis.length > 0 ? subscriptionKpis[subscriptionKpis.length - 1] : null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestMetrics?.active_subscribers?.toLocaleString() || '0'}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Subscribers</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestMetrics?.new_subscribers?.toLocaleString() || '0'}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{((latestMetrics?.churn_rate || 0) * 100).toFixed(1)}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Recurring Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${latestMetrics?.mrr?.toLocaleString() || '0'}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subscriber Growth */}
        <Card>
          <CardHeader>
            <CardTitle>Subscriber Growth</CardTitle>
            <CardDescription>Active subscribers over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={subscriptionKpis}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="active_subscribers" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="Active Subscribers"
                />
                <Line 
                  type="monotone" 
                  dataKey="new_subscribers" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  name="New Subscribers"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* MRR Growth */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Recurring Revenue</CardTitle>
            <CardDescription>MRR trend over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subscriptionKpis}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`$${value.toLocaleString()}`, 'MRR']} />
                <Bar dataKey="mrr" fill="#8884d8" name="MRR" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Subscription KPIs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription Metrics Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Month</th>
                  <th className="text-right p-2">Active Subscribers</th>
                  <th className="text-right p-2">New Subscribers</th>
                  <th className="text-right p-2">Churned</th>
                  <th className="text-right p-2">Churn Rate</th>
                  <th className="text-right p-2">MRR</th>
                </tr>
              </thead>
              <tbody>
                {subscriptionKpis?.map((row: any, index: number) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 font-medium">{row.month}</td>
                    <td className="p-2 text-right">{row.active_subscribers.toLocaleString()}</td>
                    <td className="p-2 text-right">{row.new_subscribers.toLocaleString()}</td>
                    <td className="p-2 text-right">{row.churned_subscribers.toLocaleString()}</td>
                    <td className="p-2 text-right">{(row.churn_rate * 100).toFixed(1)}%</td>
                    <td className="p-2 text-right">${row.mrr.toLocaleString()}</td>
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

export default InventoryDashboard;
