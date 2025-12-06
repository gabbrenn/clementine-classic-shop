'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = ['Women', 'Men', 'Accessories', 'Shoes'];
  const brands = ['Luxury Brand', 'Premium Co', 'Designer House', 'Classic Style'];

  const fetchSearchResults = React.useCallback(async (searchQuery: string) => {
    setIsLoading(true);
    // Mock data - replace with actual API call
    const mockProducts: Product[] = [
      { id: '1', name: 'Elegant Silk Dress', price: 299000, image: '/images/products/dress-1.jpg', category: 'Women', brand: 'Luxury Brand', rating: 4.8 },
      { id: '2', name: 'Classic Leather Jacket', price: 450000, image: '/images/products/jacket-1.jpg', category: 'Men', brand: 'Designer House', rating: 4.9 },
      { id: '3', name: 'Designer Handbag', price: 350000, salePrice: 280000, image: '/images/products/bag-1.jpg', category: 'Accessories', brand: 'Premium Co', rating: 4.7 },
      { id: '4', name: 'Cashmere Sweater', price: 180000, image: '/images/products/sweater-1.jpg', category: 'Women', brand: 'Classic Style', rating: 4.6 },
      { id: '5', name: 'Silk Scarf', price: 75000, image: '/images/products/scarf-1.jpg', category: 'Accessories', brand: 'Luxury Brand', rating: 4.5 },
      { id: '6', name: 'Tailored Blazer', price: 380000, image: '/images/products/blazer-1.jpg', category: 'Men', brand: 'Designer House', rating: 4.8 },
      { id: '7', name: 'Evening Gown', price: 520000, image: '/images/products/gown-1.jpg', category: 'Women', brand: 'Premium Co', rating: 4.9 },
      { id: '8', name: 'Leather Loafers', price: 220000, image: '/images/products/shoes-1.jpg', category: 'Shoes', brand: 'Classic Style', rating: 4.7 },
    ];

    const filtered = mockProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setTimeout(() => {
      setProducts(filtered);
      setIsLoading(false);
    }, 500);
  }, []);

  // Fetch search results
  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    }
  }, [query, fetchSearchResults]);

  // Apply filters and sorting using useMemo
  const filteredProducts = React.useMemo(() => {
    let filtered = [...products];

    // Price filter
    filtered = filtered.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Keep original order for newest
        break;
      default:
        // Relevance - keep original order
        break;
    }

    return filtered;
  }, [products, priceRange, selectedCategories, selectedBrands, sortBy]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 1000000]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSortBy('relevance');
  };

  const FilterSection = (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={1000000}
          step={10000}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Rwf {priceRange[0].toLocaleString()}</span>
          <span>Rwf {priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-4">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label htmlFor={category} className="text-sm cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold mb-4">Brand</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <Label htmlFor={brand} className="text-sm cursor-pointer">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-muted/30 py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-5 w-5 text-muted-foreground" />
            <h1 className="text-3xl font-serif">
              Search Results for &quot;{query}&quot;
            </h1>
          </div>
          <p className="text-muted-foreground">
            {isLoading ? 'Searching...' : `${filteredProducts.length} products found`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              {FilterSection}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                {/* Mobile Filter */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      {FilterSection}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-muted aspect-3/4 rounded-lg mb-4" />
                    <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/shop/${product.id}`}
                    className="group"
                  >
                    <div className="relative aspect-3/4 mb-4 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.salePrice && (
                        <div className="absolute top-2 right-2 bg-accent-rose text-white px-2 py-1 rounded text-xs font-semibold">
                          SALE
                        </div>
                      )}
                    </div>
                    <h3 className="font-medium mb-1 group-hover:text-accent-rose transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                    <div className="flex items-center gap-2">
                      {product.salePrice ? (
                        <>
                          <span className="font-semibold text-accent-rose">
                            Rwf {product.salePrice.toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            Rwf {product.price.toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span className="font-semibold">
                          Rwf {product.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
