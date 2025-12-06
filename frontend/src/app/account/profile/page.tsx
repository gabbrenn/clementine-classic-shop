'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';
import { ArrowLeft, Save } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, updateProfile } = useAuthStore();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    toast.success('Profile updated successfully');
  };

  if (!isAuthenticated || !user) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/account" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Account
          </Link>

          <h1 className="text-4xl font-serif mb-8">Profile Settings</h1>

          <form onSubmit={handleSubmit} className="bg-card border rounded-lg p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <Button type="submit" className="bg-accent-rose hover:bg-accent-rose-dark">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
