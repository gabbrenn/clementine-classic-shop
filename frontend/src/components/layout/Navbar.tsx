'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Search, User, Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-luxury ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 relative h-10 w-40 md:h-12 md:w-48 hover:opacity-80 transition-opacity">
            <Image
              src="/images/logo/logo.png"
              alt="Clementine Classic Shop"
              fill
              className="object-contain object-left"
              priority
              sizes="(max-width: 768px) 160px, 192px"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/shop"
              className="text-sm font-medium hover:text-accent-rose transition-luxury"
            >
              Shop
            </Link>
            <Link
              href="/collections"
              className="text-sm font-medium hover:text-accent-rose transition-luxury"
            >
              Collections
            </Link>
            <Link
              href="/new"
              className="text-sm font-medium hover:text-accent-rose transition-luxury"
            >
              New Arrivals
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-accent-rose transition-luxury"
            >
              About
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent-rose text-white text-xs flex items-center justify-center">
                3
              </span>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[380px]">
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-border/50">
                  <Link href="/" className="flex-shrink-0 relative h-10 w-40 hover:opacity-80 transition-opacity">
                    <Image
                      src="/images/logo/logo.png"
                      alt="Clementine Classic Shop"
                      fill
                      className="object-contain object-left"
                      sizes="160px"
                    />
                  </Link>
                </div>

                {/* Search Bar */}
                <div className="py-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search products..." 
                      className="pl-10 bg-accent-rose-subtle/20 border-accent-rose-muted/30 focus:border-accent-rose"
                    />
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col space-y-1">
                  <Link
                    href="/shop"
                    className="group flex items-center justify-between px-4 py-3 rounded-lg hover:bg-accent-rose-subtle/30 transition-all"
                  >
                    <span className="text-base font-medium">Shop</span>
                    <span className="text-accent-rose opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                  <Link
                    href="/collections"
                    className="group flex items-center justify-between px-4 py-3 rounded-lg hover:bg-accent-rose-subtle/30 transition-all"
                  >
                    <span className="text-base font-medium">Collections</span>
                    <span className="text-accent-rose opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                  <Link
                    href="/new"
                    className="group flex items-center justify-between px-4 py-3 rounded-lg hover:bg-accent-rose-subtle/30 transition-all"
                  >
                    <span className="text-base font-medium">New Arrivals</span>
                    <span className="text-accent-rose opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                  <Link
                    href="/about"
                    className="group flex items-center justify-between px-4 py-3 rounded-lg hover:bg-accent-rose-subtle/30 transition-all"
                  >
                    <span className="text-base font-medium">About</span>
                    <span className="text-accent-rose opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                </nav>

                {/* Divider */}
                <div className="my-6 border-t border-border/50"></div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <Link
                    href="/account"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent-rose-subtle/20 transition-all"
                  >
                    <div className="h-10 w-10 rounded-full bg-accent-rose-subtle/40 flex items-center justify-center">
                      <User className="h-5 w-5 text-accent-rose" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">My Account</p>
                      <p className="text-xs text-muted-foreground">Profile & Orders</p>
                    </div>
                  </Link>
                  <Link
                    href="/wishlist"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent-rose-subtle/20 transition-all"
                  >
                    <div className="h-10 w-10 rounded-full bg-accent-rose-subtle/40 flex items-center justify-center">
                      <Heart className="h-5 w-5 text-accent-rose" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Wishlist</p>
                      <p className="text-xs text-muted-foreground">5 items saved</p>
                    </div>
                  </Link>
                </div>

                {/* Bottom CTA */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent">
                  <Button className="w-full bg-accent-rose hover:bg-accent-rose-dark text-white shadow-lg">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    View Cart (3)
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
