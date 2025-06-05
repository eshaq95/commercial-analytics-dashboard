
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Package } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            E-commerce Analytics Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Comprehensive analytics dashboard for your e-commerce business. 
            Track sales, monitor inventory, understand customers, and make data-driven decisions.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="text-lg px-8 py-4">
              View Analytics Dashboard
              <BarChart3 className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Sales Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Track revenue trends, top products, and sales performance over time
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Package className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Product Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Analyze product performance, category distribution, and profitability
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Customer Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Understand customer segments, behavior patterns, and geographic distribution
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle>Inventory Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Monitor stock levels, track inventory value, and manage reorder alerts
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Powerful Analytics Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">📊 Comprehensive Dashboards</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Real-time sales performance tracking</li>
                <li>• Interactive charts and visualizations</li>
                <li>• Key performance indicators (KPIs)</li>
                <li>• Monthly and yearly trend analysis</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">🎯 Business Intelligence</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Customer segmentation analysis</li>
                <li>• Product profitability insights</li>
                <li>• Geographic performance metrics</li>
                <li>• Inventory optimization recommendations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
