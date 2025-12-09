'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Package, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

function AdminDashboard() {
  const stats = [
    {
      title: 'Total Revenue',
      value: 'Rwf 12,450,000',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Orders',
      value: '1,284',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Customers',
      value: '892',
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-2.1%',
      trend: 'down',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', amount: 'Rwf 125,000', status: 'completed', date: '2 hours ago' },
    { id: 'ORD-002', customer: 'Jane Smith', amount: 'Rwf 89,500', status: 'processing', date: '3 hours ago' },
    { id: 'ORD-003', customer: 'Mike Johnson', amount: 'Rwf 234,000', status: 'pending', date: '5 hours ago' },
    { id: 'ORD-004', customer: 'Sarah Wilson', amount: 'Rwf 156,000', status: 'completed', date: '6 hours ago' },
    { id: 'ORD-005', customer: 'David Brown', amount: 'Rwf 98,000', status: 'processing', date: '8 hours ago' },
  ];

  const lowStockProducts = [
    { id: 1, name: 'Elegant Silk Dress', stock: 3, sku: 'DRS-001' },
    { id: 2, name: 'Classic Leather Jacket', stock: 2, sku: 'JKT-002' },
    { id: 3, name: 'Designer Handbag', stock: 5, sku: 'BAG-003' },
    { id: 4, name: 'Cashmere Sweater', stock: 4, sku: 'SWT-004' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <AdminHeader title="Dashboard" description="Welcome back! Here's what's happening today.">
        <Button className="bg-accent-rose hover:bg-accent-rose-dark">
          <Package className="h-4 w-4 mr-2" />
          New Product
        </Button>
      </AdminHeader>

      <div className="px-4 sm:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight;
            
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <TrendIcon className="h-4 w-4" />
                      {stat.change}
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest customer orders</CardDescription>
                </div>
                <Link href="/admin/orders">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-accent-rose/10 flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5 text-accent-rose" />
                      </div>
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{order.amount}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {order.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Low Stock Alert */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <CardTitle>Low Stock Alert</CardTitle>
              </div>
              <CardDescription>Products running low</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockProducts.map((product) => (
                  <div key={product.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{product.name}</p>
                      <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded">
                        {product.stock} left
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                  </div>
                ))}
                <Link href="/admin/products">
                  <Button variant="outline" className="w-full" size="sm">
                    Manage Inventory
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/admin/products">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-blue-50">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Manage Products</p>
                      <p className="text-sm text-muted-foreground">Add, edit, or remove products</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/orders">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-green-50">
                      <ShoppingBag className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold">View Orders</p>
                      <p className="text-sm text-muted-foreground">Process and track orders</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-purple-50">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Customer Analytics</p>
                    <p className="text-sm text-muted-foreground">View customer insights</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute requireAdmin>
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    </ProtectedRoute>
  );
}