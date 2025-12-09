'use client';

import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminHeader } from '@/components/admin/AdminHeader';

function Analytics() {
  const stats = [
    {
      title: 'Total Revenue',
      value: 'Rwf 12.45M',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Total Orders',
      value: '1,284',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingBag,
    },
    {
      title: 'New Customers',
      value: '168',
      change: '+15.3%',
      trend: 'up',
      icon: Users,
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-2.1%',
      trend: 'down',
      icon: TrendingUp,
    },
  ];

  const topProducts = [
    { name: 'Elegant Silk Dress', sales: 145, revenue: 43355000 },
    { name: 'Classic Leather Jacket', sales: 98, revenue: 58800000 },
    { name: 'Designer Handbag', sales: 87, revenue: 69600000 },
    { name: 'Cashmere Sweater', sales: 76, revenue: 30400000 },
    { name: 'Premium Sneakers', sales: 63, revenue: 18900000 },
  ];

  const topCategories = [
    { name: 'Women', sales: 456, percentage: 38 },
    { name: 'Men', sales: 342, percentage: 28 },
    { name: 'Accessories', sales: 289, percentage: 24 },
    { name: 'Kids', sales: 124, percentage: 10 },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminHeader title="Analytics & Reports" description="Track your business performance">
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Last 30 Days
        </Button>
        <Button variant="outline">Export Report</Button>
      </AdminHeader>

      <div className="px-4 sm:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <div className="h-10 w-10 rounded-full bg-accent-rose/10 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-accent-rose" />
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p
                    className={`text-sm mt-1 ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.change} from last month
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-accent-rose/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-accent-rose">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                      </div>
                    </div>
                    <p className="font-semibold">
                      Rwf {(product.revenue / 1000000).toFixed(2)}M
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCategories.map((category) => (
                  <div key={category.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <p className="font-medium">{category.name}</p>
                        <p className="text-sm text-muted-foreground">{category.sales} orders</p>
                      </div>
                      <p className="font-semibold">{category.percentage}%</p>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent-rose"
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sales Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Chart visualization placeholder
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Integrate with charting library (Chart.js, Recharts, etc.)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <AdminLayout>
      <Analytics />
    </AdminLayout>
  );
}
