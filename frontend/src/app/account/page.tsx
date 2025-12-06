'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Settings,
  LogOut,
  ShoppingBag,
  TrendingUp
} from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const stats = [
    { label: 'Total Orders', value: '12', icon: Package },
    { label: 'Wishlist Items', value: '5', icon: Heart },
    { label: 'Saved Addresses', value: '2', icon: MapPin },
    { label: 'Total Spent', value: 'Rwf 2.4M', icon: TrendingUp },
  ];

  const quickLinks = [
    {
      href: '/account/orders',
      icon: Package,
      title: 'Orders',
      description: 'Track and manage your orders',
    },
    {
      href: '/account/profile',
      icon: User,
      title: 'Profile',
      description: 'Update your personal information',
    },
    {
      href: '/account/wishlist',
      icon: Heart,
      title: 'Wishlist',
      description: 'View your saved items',
    },
    {
      href: '/account/addresses',
      icon: MapPin,
      title: 'Addresses',
      description: 'Manage shipping addresses',
    },
  ];

  const recentOrders = [
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      total: 'Rwf 299,000',
      status: 'Delivered',
      items: 2,
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-20',
      total: 'Rwf 189,000',
      status: 'In Transit',
      items: 1,
    },
  ];

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-serif mb-2">
              Welcome back, {user.firstName}!
            </h1>
            <p className="text-muted-foreground">
              Manage your account and track your orders
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-card border rounded-lg p-6"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="h-5 w-5 text-accent-rose" />
                    <span className="text-2xl font-bold">{stat.value}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-serif mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {quickLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="bg-card border rounded-lg p-6 hover:border-accent-rose transition-all group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded-full bg-accent-rose-subtle flex items-center justify-center group-hover:bg-accent-rose-muted transition-colors">
                            <Icon className="h-6 w-6 text-accent-rose" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">{link.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {link.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Recent Orders */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-serif">Recent Orders</h2>
                  <Link href="/account/orders">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-card border rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold">{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString()} • {order.items} items
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{order.total}</p>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              order.status === 'Delivered'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <Link href={`/account/orders/${order.id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Account Info Sidebar */}
            <div className="space-y-6">
              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-full bg-accent-rose-subtle flex items-center justify-center">
                    <User className="h-8 w-8 text-accent-rose" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href="/account/profile">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Account Settings
                    </Button>
                  </Link>
                  <Link href="/shop">
                    <Button className="w-full justify-start bg-accent-rose hover:bg-accent-rose-dark">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-destructive hover:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </div>

              {/* Support */}
              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our customer service team is here to assist you.
                </p>
                <Link href="/contact">
                  <Button variant="outline" size="sm" className="w-full">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
