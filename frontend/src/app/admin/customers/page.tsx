'use client';

import React, { useState } from 'react';
import { 
  Search, 
  MoreVertical, 
  Eye, 
  Mail, 
  Ban,
  UserCheck,
  Users as UsersIcon,
  TrendingUp,
  ShoppingBag
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminHeader } from '@/components/admin/AdminHeader';

function CustomersManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const stats = [
    { title: 'Total Customers', value: '892', icon: UsersIcon, change: '+15.3%', trend: 'up' },
    { title: 'Active', value: '784', icon: UserCheck, change: '+8.1%', trend: 'up' },
    { title: 'Avg Orders', value: '2.4', icon: ShoppingBag, change: '+12.2%', trend: 'up' },
    { title: 'Avg Value', value: 'Rwf 245K', icon: TrendingUp, change: '+5.7%', trend: 'up' },
  ];

  const customers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+250 788 123 456',
      orders: 12,
      totalSpent: 3680000,
      status: 'active',
      joinDate: '2024-08-15',
      lastOrder: '2 days ago',
    },
    {
      id: 2,
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      phone: '+250 788 234 567',
      orders: 8,
      totalSpent: 2340000,
      status: 'active',
      joinDate: '2024-09-22',
      lastOrder: '5 days ago',
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      phone: '+250 788 345 678',
      orders: 15,
      totalSpent: 4520000,
      status: 'vip',
      joinDate: '2024-07-10',
      lastOrder: '1 day ago',
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.w@example.com',
      phone: '+250 788 456 789',
      orders: 3,
      totalSpent: 890000,
      status: 'active',
      joinDate: '2024-11-05',
      lastOrder: '2 weeks ago',
    },
    {
      id: 5,
      name: 'Jessica Martinez',
      email: 'jessica.m@example.com',
      phone: '+250 788 567 890',
      orders: 0,
      totalSpent: 0,
      status: 'inactive',
      joinDate: '2024-10-20',
      lastOrder: 'Never',
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      active: { label: 'Active', className: 'bg-green-100 text-green-700' },
      vip: { label: 'VIP', className: 'bg-purple-100 text-purple-700' },
      inactive: { label: 'Inactive', className: 'bg-gray-100 text-gray-700' },
    };
    const config = variants[status] || variants.active;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminHeader title="Customer Management" description="View and manage your customers">
        <Button className="bg-accent-rose hover:bg-accent-rose-dark">
          <Mail className="h-4 w-4 mr-2" />
          Send Newsletter
        </Button>
      </AdminHeader>

      <div className="px-4 sm:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-accent-rose/10 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-accent-rose" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Customers</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Customers ({filteredCustomers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Customer</th>
                    <th className="text-left py-3 px-4 font-semibold">Contact</th>
                    <th className="text-left py-3 px-4 font-semibold">Orders</th>
                    <th className="text-left py-3 px-4 font-semibold">Total Spent</th>
                    <th className="text-left py-3 px-4 font-semibold">Last Order</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-right py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b hover:bg-muted/50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Joined {new Date(customer.joinDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-sm">{customer.email}</p>
                          <p className="text-sm text-muted-foreground">{customer.phone}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-medium">{customer.orders}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-medium">
                          Rwf {(customer.totalSpent / 1000).toFixed(0)}K
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm">{customer.lastOrder}</p>
                      </td>
                      <td className="py-4 px-4">{getStatusBadge(customer.status)}</td>
                      <td className="py-4 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Ban className="h-4 w-4 mr-2" />
                              Suspend Account
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredCustomers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No customers found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function CustomersManagementPage() {
  return (
    <AdminLayout>
      <CustomersManagement />
    </AdminLayout>
  );
}
