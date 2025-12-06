'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { ArrowLeft, Heart } from 'lucide-react';

export default function WishlistPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const wishlistItems = [
    {
      id: '1',
      title: 'Cashmere Sweater',
      category: "Women's Collection",
      price: 'Rwf 299,000',
      originalPrice: 'Rwf 399,000',
      discount: '25%',
      image: '/images/products/product-img-1.jpg',
    },
    {
      id: '2',
      title: 'Silk Dress',
      category: "Women's Collection",
      price: 'Rwf 189,000',
      originalPrice: 'Rwf 249,000',
      discount: '24%',
      image: '/images/products/product-img-2.jpg',
    },
  ];

  if (!isAuthenticated) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/account" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Account
          </Link>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-serif mb-2">My Wishlist</h1>
              <p className="text-muted-foreground">{wishlistItems.length} items saved</p>
            </div>
            <Heart className="h-12 w-12 text-accent-rose" />
          </div>

          {wishlistItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistItems.map((product) => (
                <ProductCard key={product.id} {...product} href={`/shop/${product.id}`} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Heart className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-serif mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6">Start adding items you love!</p>
              <Link href="/shop">
                <Button className="bg-accent-rose hover:bg-accent-rose-dark">
                  Browse Products
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
