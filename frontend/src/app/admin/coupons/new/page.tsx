'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Save, 
  X,
  Calendar,
  Percent,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminHeader } from '@/components/admin/AdminHeader';

function CreateCoupon() {
  const router = useRouter();
  const [discountType, setDiscountType] = useState('percentage');

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminHeader title="Create New Coupon" description="Set up a discount coupon for your customers">
        <Button variant="outline" onClick={() => router.push('/admin/coupons')}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button className="bg-accent-rose hover:bg-accent-rose-dark">
          <Save className="h-4 w-4 mr-2" />
          Create Coupon
        </Button>
      </AdminHeader>

      <div className="px-4 sm:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Coupon Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="couponCode">Coupon Code *</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="couponCode" 
                        placeholder="e.g., SUMMER2024"
                        className="uppercase"
                        required
                      />
                      <Button variant="outline" type="button">
                        Generate
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Customers will enter this code at checkout
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="description">Internal Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Internal notes about this coupon..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="publicDescription">Public Description</Label>
                    <Input 
                      id="publicDescription" 
                      placeholder="e.g., Save 20% on all summer items"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Shown to customers when they apply the coupon
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Discount Value */}
              <Card>
                <CardHeader>
                  <CardTitle>Discount Value</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="discountType">Discount Type *</Label>
                    <Select value={discountType} onValueChange={setDiscountType}>
                      <SelectTrigger id="discountType">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage Discount</SelectItem>
                        <SelectItem value="fixed">Fixed Amount Discount</SelectItem>
                        <SelectItem value="shipping">Free Shipping</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {discountType === 'percentage' && (
                    <>
                      <div>
                        <Label htmlFor="percentValue">Discount Percentage *</Label>
                        <div className="relative">
                          <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="percentValue" 
                            type="number"
                            placeholder="10"
                            className="pl-10"
                            min="0"
                            max="100"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="maxDiscount">Maximum Discount Amount (RWF)</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="maxDiscount" 
                            type="number"
                            placeholder="50000"
                            className="pl-10"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Optional: Cap the maximum discount amount
                        </p>
                      </div>
                    </>
                  )}

                  {discountType === 'fixed' && (
                    <div>
                      <Label htmlFor="fixedValue">Discount Amount (RWF) *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="fixedValue" 
                          type="number"
                          placeholder="5000"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {discountType === 'shipping' && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-900">
                        Free shipping will be applied to all qualifying orders
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Usage Restrictions */}
              <Card>
                <CardHeader>
                  <CardTitle>Usage Restrictions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="minPurchase">Minimum Purchase Amount (RWF)</Label>
                    <Input 
                      id="minPurchase" 
                      type="number"
                      placeholder="0"
                      defaultValue="0"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Minimum order value to use this coupon
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="maxPurchase">Maximum Purchase Amount (RWF)</Label>
                    <Input 
                      id="maxPurchase" 
                      type="number"
                      placeholder="No limit"
                    />
                  </div>

                  <div>
                    <Label htmlFor="allowedCategories">Allowed Categories</Label>
                    <Select>
                      <SelectTrigger id="allowedCategories">
                        <SelectValue placeholder="All categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="women">Women Only</SelectItem>
                        <SelectItem value="men">Men Only</SelectItem>
                        <SelectItem value="kids">Kids Only</SelectItem>
                        <SelectItem value="accessories">Accessories Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="excludedProducts">Excluded Products (SKUs)</Label>
                    <Input 
                      id="excludedProducts" 
                      placeholder="e.g., DRS-001, JKT-002"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Comma-separated list of product SKUs to exclude
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>First Order Only</Label>
                      <p className="text-sm text-muted-foreground">
                        Limit to new customers
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>One Use Per Customer</Label>
                      <p className="text-sm text-muted-foreground">
                        Each customer can use once
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              {/* Usage Limits */}
              <Card>
                <CardHeader>
                  <CardTitle>Usage Limits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="totalUsageLimit">Total Usage Limit</Label>
                    <Input 
                      id="totalUsageLimit" 
                      type="number"
                      placeholder="Unlimited"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Maximum number of times this coupon can be used overall
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="perUserLimit">Per User Usage Limit</Label>
                    <Input 
                      id="perUserLimit" 
                      type="number"
                      placeholder="1"
                      defaultValue="1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Maximum uses per customer
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Validity Period */}
              <Card>
                <CardHeader>
                  <CardTitle>Validity Period</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="startDate">Start Date & Time</Label>
                    <Input 
                      id="startDate" 
                      type="datetime-local"
                    />
                  </div>

                  <div>
                    <Label htmlFor="endDate">End Date & Time</Label>
                    <Input 
                      id="endDate" 
                      type="datetime-local"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Leave empty for no expiration
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="status">Coupon Status</Label>
                    <Select defaultValue="active">
                      <SelectTrigger id="status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-Activate</Label>
                      <p className="text-sm text-muted-foreground">
                        Activate on start date
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              {/* Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Coupon Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium capitalize">{discountType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium text-green-600">Active</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Uses:</span>
                    <span className="font-medium">0 / Unlimited</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Created:</span>
                    <span className="font-medium">Just now</span>
                  </div>
                </CardContent>
              </Card>

              {/* Marketing */}
              <Card>
                <CardHeader>
                  <CardTitle>Marketing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show on Website</Label>
                      <p className="text-sm text-muted-foreground">
                        Display in promotions
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Subscribers</Label>
                      <p className="text-sm text-muted-foreground">
                        Send announcement email
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreateCouponPage() {
  return (
    <AdminLayout>
      <CreateCoupon />
    </AdminLayout>
  );
}
