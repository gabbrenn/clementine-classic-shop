'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { SlidersHorizontal, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export default function ShopPage() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);

  // Product data organized by categories
  const bagProducts = [
    { id: 'bag-1', title: 'Elegant Leather Handbag', category: 'Handbag', price: 'Rwf 159,000', originalPrice: 'Rwf 199,000', discount: '20%', image: '/new-images/bag/bag-1.jpg' },
    { id: 'bag-2', title: 'Designer Tote Bag', category: 'Handbag', price: 'Rwf 179,000', originalPrice: 'Rwf 229,000', discount: '22%', image: '/new-images/bag/bag-2.jpg' },
    { id: 'bag-3', title: 'Luxury Crossbody Bag', category: 'Handbag', price: 'Rwf 139,000', originalPrice: 'Rwf 179,000', discount: '22%', image: '/new-images/bag/bag-3.jpg' },
    { id: 'bag-4', title: 'Premium Shoulder Bag', category: 'Handbag', price: 'Rwf 169,000', originalPrice: 'Rwf 219,000', discount: '23%', image: '/new-images/bag/bag-4.jpg' },
    { id: 'bag-5', title: 'Stylish Clutch Bag', category: 'Handbag', price: 'Rwf 119,000', originalPrice: 'Rwf 149,000', discount: '20%', image: '/new-images/bag/bag-5.jpg' },
  ];

  const dressProducts = [
    { id: 'dress-1', title: 'Elegant Evening Gown', category: "Women's Dress", price: 'Rwf 249,000', originalPrice: 'Rwf 329,000', discount: '24%', image: '/new-images/dress/dress-1.jpg' },
    { id: 'dress-2', title: 'Classic A-Line Dress', category: "Women's Dress", price: 'Rwf 189,000', originalPrice: 'Rwf 249,000', discount: '24%', image: '/new-images/dress/dress-2.jpg' },
    { id: 'dress-3', title: 'Designer Cocktail Dress', category: "Women's Dress", price: 'Rwf 279,000', originalPrice: 'Rwf 359,000', discount: '22%', image: '/new-images/dress/dress-3.jpg' },
    { id: 'dress-4', title: 'Elegant Maxi Dress', category: "Women's Dress", price: 'Rwf 219,000', originalPrice: 'Rwf 289,000', discount: '24%', image: '/new-images/dress/dress-4.jpg' },
    { id: 'dress-5', title: 'Chic Midi Dress', category: "Women's Dress", price: 'Rwf 199,000', originalPrice: 'Rwf 259,000', discount: '23%', image: '/new-images/dress/dress-5.jpg' },
    { id: 'dress-6', title: 'Luxury Ball Gown', category: "Women's Dress", price: 'Rwf 349,000', originalPrice: 'Rwf 449,000', discount: '22%', image: '/new-images/dress/dress-6.jpg' },
    { id: 'dress-7', title: 'Stylish Casual Dress', category: "Women's Dress", price: 'Rwf 169,000', originalPrice: 'Rwf 219,000', discount: '23%', image: '/new-images/dress/dress-7.jpg' },
    { id: 'dress-8', title: 'Formal Business Dress', category: "Women's Dress", price: 'Rwf 229,000', originalPrice: 'Rwf 299,000', discount: '23%', image: '/new-images/dress/dress-8.jpg' },
    { id: 'dress-9', title: 'Elegant Wrap Dress', category: "Women's Dress", price: 'Rwf 209,000', originalPrice: 'Rwf 269,000', discount: '22%', image: '/new-images/dress/dress-9.jpg' },
    { id: 'dress-10', title: 'Designer Party Dress', category: "Women's Dress", price: 'Rwf 269,000', originalPrice: 'Rwf 349,000', discount: '23%', image: '/new-images/dress/dress-10.jpg' },
    { id: 'dress-11', title: 'Chic Bodycon Dress', category: "Women's Dress", price: 'Rwf 189,000', originalPrice: 'Rwf 249,000', discount: '24%', image: '/new-images/dress/dress-11.jpg' },
    { id: 'dress-12', title: 'Elegant Floral Dress', category: "Women's Dress", price: 'Rwf 219,000', originalPrice: 'Rwf 289,000', discount: '24%', image: '/new-images/dress/dress-12.jpg' },
  ];

  const shoeProducts = [
    { id: 'shoe-1', title: 'Premium Leather Heels', category: "Women's Shoes", price: 'Rwf 189,000', originalPrice: 'Rwf 249,000', discount: '24%', image: '/new-images/Shoes/shoe-1.jpg' },
    { id: 'shoe-2', title: 'Designer High Heels', category: "Women's Shoes", price: 'Rwf 219,000', originalPrice: 'Rwf 289,000', discount: '24%', image: '/new-images/Shoes/shoe-2.jpg' },
    { id: 'shoe-3', title: 'Elegant Stiletto Heels', category: "Women's Shoes", price: 'Rwf 199,000', originalPrice: 'Rwf 259,000', discount: '23%', image: '/new-images/Shoes/shoe-3.jpg' },
    { id: 'shoe-4', title: 'Luxury Platform Heels', category: "Women's Shoes", price: 'Rwf 229,000', originalPrice: 'Rwf 299,000', discount: '23%', image: '/new-images/Shoes/shoe-4.jpg' },
    { id: 'shoe-5', title: 'Chic Ankle Boots', category: "Women's Shoes", price: 'Rwf 249,000', originalPrice: 'Rwf 329,000', discount: '24%', image: '/new-images/Shoes/shoe-5.jpg' },
    { id: 'shoe-6', title: 'Designer Pumps', category: "Women's Shoes", price: 'Rwf 179,000', originalPrice: 'Rwf 239,000', discount: '25%', image: '/new-images/Shoes/shoe-6.jpg' },
    { id: 'shoe-7', title: 'Elegant Wedge Heels', category: "Women's Shoes", price: 'Rwf 209,000', originalPrice: 'Rwf 269,000', discount: '22%', image: '/new-images/Shoes/shoe-7.jpg' },
    { id: 'shoe-8', title: 'Stylish Sandals', category: "Women's Shoes", price: 'Rwf 159,000', originalPrice: 'Rwf 199,000', discount: '20%', image: '/new-images/Shoes/shoe-8.jpg' },
    { id: 'shoe-9', title: 'Luxury Court Shoes', category: "Women's Shoes", price: 'Rwf 189,000', originalPrice: 'Rwf 249,000', discount: '24%', image: '/new-images/Shoes/shoe-9.jpg' },
    { id: 'shoe-10', title: 'Premium Block Heels', category: "Women's Shoes", price: 'Rwf 199,000', originalPrice: 'Rwf 259,000', discount: '23%', image: '/new-images/Shoes/shoe-10.jpg' },
    { id: 'shoe-11', title: 'Designer Mules', category: "Women's Shoes", price: 'Rwf 169,000', originalPrice: 'Rwf 219,000', discount: '23%', image: '/new-images/Shoes/shoe-11.jpg' },
    { id: 'shoe-12', title: 'Elegant Slingback Heels', category: "Women's Shoes", price: 'Rwf 219,000', originalPrice: 'Rwf 289,000', discount: '24%', image: '/new-images/Shoes/shoe-12.jpg' },
  ];

  const wigProducts = [
    { id: 'wig-1', title: 'Premium Human Hair Wig', category: 'Wigs', price: 'Rwf 349,000', originalPrice: 'Rwf 449,000', discount: '22%', image: '/new-images/wigs/wig-1.jpg' },
    { id: 'wig-2', title: 'Luxury Synthetic Wig', category: 'Wigs', price: 'Rwf 229,000', originalPrice: 'Rwf 299,000', discount: '23%', image: '/new-images/wigs/wig-2.jpg' },
  ];

  // Combine all products
  const products = [...bagProducts, ...dressProducts, ...shoeProducts, ...wigProducts];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Red', hex: '#DC2626' },
    { name: 'Blue', hex: '#2563EB' },
    { name: 'Green', hex: '#16A34A' },
    { name: 'Pink', hex: '#EC4899' },
  ];
  const brands = ['Zara', 'Gucci', 'Prada', 'Chanel', 'Dior', 'Versace'];

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedBrands([]);
  };

  const activeFiltersCount = 
    selectedSizes.length + selectedColors.length + selectedBrands.length + 
    (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0);

  const filterSectionContent = (
    <div className="space-y-8">
      {/* Price Range */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={1000}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Rwf {priceRange[0] * 1000}</span>
            <span>Rwf {priceRange[1] * 1000}</span>
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <Button
              key={size}
              variant={selectedSizes.includes(size) ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleSize(size)}
              className={selectedSizes.includes(size) ? 'bg-accent-rose hover:bg-accent-rose-dark' : ''}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Color</h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              className={`w-10 h-10 rounded-full border-2 transition-all ${
                selectedColors.includes(color.name)
                  ? 'border-accent-rose scale-110'
                  : 'border-gray-300 hover:border-accent-rose'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Brand</h3>
        <div className="space-y-3">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <label
                htmlFor={brand}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full"
        >
          Clear All Filters ({activeFiltersCount})
        </Button>
      )}
    </div>
  );

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-accent-rose-subtle via-background to-accent-rose-muted/30 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-serif text-center mb-4">
              Shop Collection
            </h1>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto">
              Discover our curated selection of timeless pieces
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-serif">Filters</h2>
                  {activeFiltersCount > 0 && (
                    <span className="text-sm text-accent-rose font-medium">
                      {activeFiltersCount} active
                    </span>
                  )}
                </div>
                {filterSectionContent}
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden">
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        Filters
                        {activeFiltersCount > 0 && (
                          <span className="ml-2 bg-accent-rose text-white text-xs px-2 py-0.5 rounded-full">
                            {activeFiltersCount}
                          </span>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6 overflow-y-auto">
                        {filterSectionContent}
                      </div>
                    </SheetContent>
                  </Sheet>

                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{products.length}</span> products found
                  </p>
                </div>

                {/* Sort By */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Featured" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Active Filters Tags */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {priceRange[0] > 0 || priceRange[1] < 1000 ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent-rose-subtle text-accent-rose rounded-full text-sm">
                      Rwf {priceRange[0] * 1000} - Rwf {priceRange[1] * 1000}
                      <button onClick={() => setPriceRange([0, 1000])}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ) : null}
                  {selectedSizes.map((size) => (
                    <span key={size} className="inline-flex items-center gap-1 px-3 py-1 bg-accent-rose-subtle text-accent-rose rounded-full text-sm">
                      Size: {size}
                      <button onClick={() => toggleSize(size)}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {selectedColors.map((color) => (
                    <span key={color} className="inline-flex items-center gap-1 px-3 py-1 bg-accent-rose-subtle text-accent-rose rounded-full text-sm">
                      {color}
                      <button onClick={() => toggleColor(color)}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {selectedBrands.map((brand) => (
                    <span key={brand} className="inline-flex items-center gap-1 px-3 py-1 bg-accent-rose-subtle text-accent-rose rounded-full text-sm">
                      {brand}
                      <button onClick={() => toggleBrand(brand)}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    href={`/shop/${product.id}`}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                  >
                    Previous
                  </Button>
                  {[1, 2, 3, 4].map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page ? 'bg-accent-rose hover:bg-accent-rose-dark' : ''}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 4}
                    onClick={() => setCurrentPage(p => p + 1)}
                  >
                    Next
                  </Button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
