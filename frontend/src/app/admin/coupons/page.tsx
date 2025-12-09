'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Copy,
  Tag,
  Percent,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminHeader } from '@/components/admin/AdminHeader';

function CouponsManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { title: 'Active Coupons', value: '8', icon: Tag },
    { title: 'Total Uses', value: '156', icon: Percent },
    { title: 'Total Savings', value: 'Rwf 2.8M', icon: Calendar },
  ];

  const coupons = [
    {
      id: 1,
      code: 'SUMMER2024',
      description: 'Summer sale discount',
      type: 'percentage',
      value: 20,
      minPurchase: 100000,
      maxDiscount: 50000,
      uses: 45,
      maxUses: 100,
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      status: 'active',
    },
    {
      id: 2,
      code: 'WELCOME10',
      description: 'New customer welcome',
      type: 'percentage',
      value: 10,
      minPurchase: 50000,
      maxDiscount: 20000,
      uses: 89,
      maxUses: null,
      startDate: '2024-01-01',
      endDate: null,
      status: 'active',
    },
    {
      id: 3,
      code: 'FREESHIP',
      description: 'Free shipping code',
      type: 'shipping',
      value: 0,
      minPurchase: 150000,
      maxDiscount: null,
      uses: 22,
      maxUses: 50,
      startDate: '2024-11-01',
      endDate: '2024-12-31',
      status: 'active',
    },
    {
      id: 4,
      code: 'FLASH50',
      description: 'Flash sale 50% off',
      type: 'percentage',
      value: 50,
      minPurchase: 200000,
      maxDiscount: 100000,
      uses: 100,
      maxUses: 100,
      startDate: '2024-11-11',
      endDate: '2024-11-11',
      status: 'expired',
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      active: { label: 'Active', className: 'bg-green-100 text-green-700' },
      expired: { label: 'Expired', className: 'bg-gray-100 text-gray-700' },
      scheduled: { label: 'Scheduled', className: 'bg-blue-100 text-blue-700' },
    };
    const config = variants[status] || variants.active;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      percentage: 'Percentage',
      fixed: 'Fixed Amount',
      shipping: 'Free Shipping',
    };
    return types[type] || type;
  };

  const filteredCoupons = coupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coupon.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminHeader title="Coupon Management" description="Create and manage discount coupons">
        <Link href="coupons/new">
        <Button className="bg-accent-rose hover:bg-accent-rose-dark">
          <Plus className="h-4 w-4 mr-2" />
          Create Coupon
        </Button>
        </Link>
      </AdminHeader>

      <div className="px-4 sm:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-accent-rose/10 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-accent-rose" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search coupons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Coupons Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Coupons ({filteredCoupons.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Code</th>
                    <th className="text-left py-3 px-4 font-semibold">Type</th>
                    <th className="text-left py-3 px-4 font-semibold">Discount</th>
                    <th className="text-left py-3 px-4 font-semibold">Min Purchase</th>
                    <th className="text-left py-3 px-4 font-semibold">Usage</th>
                    <th className="text-left py-3 px-4 font-semibold">Valid Until</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-right py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCoupons.map((coupon) => (
                    <tr key={coupon.id} className="border-b hover:bg-muted/50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-mono font-bold text-accent-rose">{coupon.code}</p>
                          <p className="text-sm text-muted-foreground">{coupon.description}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm">{getTypeLabel(coupon.type)}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-medium">
                          {coupon.type === 'percentage'
                            ? `${coupon.value}%`
                            : coupon.type === 'shipping'
                            ? 'Free'
                            : `Rwf ${coupon.value.toLocaleString()}`}
                        </p>
                        {coupon.maxDiscount && (
                          <p className="text-sm text-muted-foreground">
                            Max: Rwf {(coupon.maxDiscount / 1000).toFixed(0)}K
                          </p>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm">
                          Rwf {(coupon.minPurchase / 1000).toFixed(0)}K
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm">
                          {coupon.uses} {coupon.maxUses ? `/ ${coupon.maxUses}` : ''}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm">
                          {coupon.endDate
                            ? new Date(coupon.endDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : 'No expiry'}
                        </p>
                      </td>
                      <td className="py-4 px-4">{getStatusBadge(coupon.status)}</td>
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
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredCoupons.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No coupons found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function CouponsManagementPage() {
  return (
    <AdminLayout>
      <CouponsManagement />
    </AdminLayout>
  );
}
