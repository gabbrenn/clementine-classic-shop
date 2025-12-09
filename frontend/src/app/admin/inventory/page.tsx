'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search,
  Filter,
  Download,
  Upload,
  AlertTriangle,
  Package,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  Edit,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminHeader } from '@/components/admin/AdminHeader';

function Inventory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [stockFilter, setStockFilter] = useState('all');

  const stats = [
    {
      title: 'Total Products',
      value: '156',
      change: '+12',
      trend: 'up',
      icon: Package,
    },
    {
      title: 'Low Stock Items',
      value: '23',
      change: '+5',
      trend: 'up',
      icon: AlertTriangle,
      alert: true,
    },
    {
      title: 'Out of Stock',
      value: '8',
      change: '-2',
      trend: 'down',
      icon: TrendingDown,
      alert: true,
    },
    {
      title: 'Total Stock Value',
      value: 'Rwf 45.2M',
      change: '+8.5%',
      trend: 'up',
      icon: TrendingUp,
    },
  ];

  const inventoryItems = [
    {
      id: 1,
      sku: 'DRS-001',
      name: 'Elegant Silk Dress',
      category: 'Women',
      currentStock: 3,
      reservedStock: 1,
      availableStock: 2,
      reorderPoint: 5,
      reorderQuantity: 20,
      location: 'Warehouse A',
      lastRestocked: '2024-11-15',
      unitCost: 150000,
      status: 'low',
    },
    {
      id: 2,
      sku: 'JKT-002',
      name: 'Classic Leather Jacket',
      category: 'Men',
      currentStock: 2,
      reservedStock: 0,
      availableStock: 2,
      reorderPoint: 3,
      reorderQuantity: 15,
      location: 'Warehouse A',
      lastRestocked: '2024-11-10',
      unitCost: 450000,
      status: 'critical',
    },
    {
      id: 3,
      sku: 'BAG-003',
      name: 'Designer Handbag',
      category: 'Accessories',
      currentStock: 0,
      reservedStock: 0,
      availableStock: 0,
      reorderPoint: 5,
      reorderQuantity: 10,
      location: 'Warehouse B',
      lastRestocked: '2024-10-20',
      unitCost: 600000,
      status: 'out',
    },
    {
      id: 4,
      sku: 'SWT-004',
      name: 'Cashmere Sweater',
      category: 'Women',
      currentStock: 4,
      reservedStock: 1,
      availableStock: 3,
      reorderPoint: 5,
      reorderQuantity: 25,
      location: 'Warehouse A',
      lastRestocked: '2024-11-20',
      unitCost: 280000,
      status: 'low',
    },
    {
      id: 5,
      sku: 'SNK-005',
      name: 'Premium Sneakers',
      category: 'Accessories',
      currentStock: 25,
      reservedStock: 3,
      availableStock: 22,
      reorderPoint: 10,
      reorderQuantity: 30,
      location: 'Warehouse B',
      lastRestocked: '2024-11-25',
      unitCost: 180000,
      status: 'good',
    },
    {
      id: 6,
      sku: 'DRS-006',
      name: 'Summer Floral Dress',
      category: 'Women',
      currentStock: 45,
      reservedStock: 5,
      availableStock: 40,
      reorderPoint: 15,
      reorderQuantity: 50,
      location: 'Warehouse A',
      lastRestocked: '2024-11-28',
      unitCost: 120000,
      status: 'good',
    },
  ];

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; className: string }> = {
      good: { label: 'In Stock', className: 'bg-green-100 text-green-700' },
      low: { label: 'Low Stock', className: 'bg-orange-100 text-orange-700' },
      critical: { label: 'Critical', className: 'bg-red-100 text-red-700' },
      out: { label: 'Out of Stock', className: 'bg-gray-100 text-gray-700' },
    };
    return configs[status] || configs.good;
  };

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter =
      stockFilter === 'all' ||
      (stockFilter === 'low' && (item.status === 'low' || item.status === 'critical')) ||
      (stockFilter === 'out' && item.status === 'out') ||
      (stockFilter === 'good' && item.status === 'good');
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminHeader title="Inventory Management" description="Monitor and manage stock levels">
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button className="bg-accent-rose hover:bg-accent-rose-dark">
          <Upload className="h-4 w-4 mr-2" />
          Import Stock
        </Button>
      </AdminHeader>

      <div className="px-4 sm:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${stat.alert ? 'bg-orange-50' : 'bg-accent-rose/10'}`}>
                      <Icon className={`h-6 w-6 ${stat.alert ? 'text-orange-600' : 'text-accent-rose'}`} />
                    </div>
                    <div className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by product name or SKU..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Stock Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  <SelectItem value="good">In Stock</SelectItem>
                  <SelectItem value="low">Low Stock</SelectItem>
                  <SelectItem value="out">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="warehouse-a">Warehouse A</SelectItem>
                  <SelectItem value="warehouse-b">Warehouse B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Items ({filteredItems.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Product</th>
                    <th className="text-left py-3 px-4 font-semibold">Current Stock</th>
                    <th className="text-left py-3 px-4 font-semibold">Reserved</th>
                    <th className="text-left py-3 px-4 font-semibold">Available</th>
                    <th className="text-left py-3 px-4 font-semibold">Reorder Point</th>
                    <th className="text-left py-3 px-4 font-semibold">Location</th>
                    <th className="text-left py-3 px-4 font-semibold">Last Restocked</th>
                    <th className="text-left py-3 px-4 font-semibold">Value</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-right py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => {
                    const statusConfig = getStatusConfig(item.status);
                    const totalValue = item.currentStock * item.unitCost;
                    
                    return (
                      <tr key={item.id} className="border-b hover:bg-muted/50">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.sku} • {item.category}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-semibold">{item.currentStock}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm">{item.reservedStock}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-medium">{item.availableStock}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm">{item.reorderPoint}</p>
                          {item.currentStock <= item.reorderPoint && (
                            <p className="text-xs text-orange-600">
                              Order {item.reorderQuantity}
                            </p>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm">{item.location}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm">
                            {new Date(item.lastRestocked).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-medium">
                            Rwf {(totalValue / 1000).toFixed(0)}K
                          </p>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={statusConfig.className}>
                            {statusConfig.label}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Adjust Stock
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View History
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Package className="h-4 w-4 mr-2" />
                                Create Reorder
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No inventory items found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function InventoryPage() {
  return (
    <AdminLayout>
      <Inventory />
    </AdminLayout>
  );
}
