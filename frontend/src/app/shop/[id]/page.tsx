'use client';

import { useState, use } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw, 
  Star,
  StarHalf,
  Minus,
  Plus,
  Check
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { toast } from 'sonner';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const { addItem } = useCartStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock product data
  const product = {
    id,
    name: 'Premium Cashmere Sweater',
    price: 299000,
    originalPrice: 399000,
    discount: 25,
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    brand: 'Luxury Brand',
    category: "Women's Collection",
    description: 'Indulge in unparalleled comfort with our Premium Cashmere Sweater. Crafted from the finest Mongolian cashmere, this piece combines timeless elegance with modern sophistication. The luxurious fabric provides exceptional warmth while maintaining breathability.',
    features: [
      '100% Premium Mongolian Cashmere',
      'Hand-finished seams for durability',
      'Ribbed crew neckline and cuffs',
      'Relaxed fit for versatile styling',
      'Dry clean only',
    ],
    images: [
      '/images/products/product-img-1.jpg',
      '/images/products/product-img-2.jpg',
      '/images/products/product-img-3.jpg',
      '/images/products/product-img-4.jpg',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Cream', hex: '#FFFDD0' },
      { name: 'Burgundy', hex: '#800020' },
      { name: 'Navy', hex: '#000080' },
    ],
  };

  const relatedProducts = Array.from({ length: 4 }, (_, i) => ({
    id: `${i + 100}`,
    title: `Related Product ${i + 1}`,
    category: "Women's Collection",
    price: `Rwf ${(89 + i * 10) * 1000}`,
    originalPrice: `Rwf ${(119 + i * 10) * 1000}`,
    discount: '25%',
    image: '/images/products/product-img-1.jpg',
  }));

  const reviews = [
    {
      id: 1,
      name: 'Sarah M.',
      rating: 5,
      date: '2024-01-15',
      comment: 'Absolutely love this sweater! The quality is exceptional and it fits perfectly.',
      verified: true,
    },
    {
      id: 2,
      name: 'Emma L.',
      rating: 4,
      date: '2024-01-10',
      comment: 'Great product, runs slightly large but very comfortable.',
      verified: true,
    },
    {
      id: 3,
      name: 'Jessica K.',
      rating: 5,
      date: '2024-01-05',
      comment: 'The cashmere is incredibly soft. Worth every penny!',
      verified: true,
    },
  ];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      size: selectedSize,
      color: selectedColor,
    });

    toast.success('Added to cart');
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    const remaining = 5 - Math.ceil(rating);
    for (let i = 0; i < remaining; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    return stars;
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover cursor-zoom-in"
                  priority
                />
                {product.discount > 0 && (
                  <Badge className="absolute top-4 right-4 bg-accent-rose">
                    -{product.discount}%
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === index
                        ? 'border-accent-rose'
                        : 'border-transparent hover:border-muted-foreground/30'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif mb-2">
                  {product.name}
                </h1>
                <p className="text-sm text-muted-foreground mb-4">{product.brand}</p>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-3xl font-bold">Rwf {product.price.toLocaleString()}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-muted-foreground line-through">
                      Rwf {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                {product.inStock ? (
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    <Check className="w-3 h-3 mr-1" />
                    In Stock
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-red-500 text-red-500">
                    Out of Stock
                  </Badge>
                )}
              </div>

              <Separator />

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              <div>
                <label className="text-sm font-semibold mb-3 block">
                  Color: {selectedColor && <span className="text-accent-rose">{selectedColor}</span>}
                </label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-12 h-12 rounded-full border-2 transition-all ${
                        selectedColor === color.name
                          ? 'border-accent-rose scale-110'
                          : 'border-gray-300 hover:border-accent-rose'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <label className="text-sm font-semibold mb-3 block">
                  Size: {selectedSize && <span className="text-accent-rose">{selectedSize}</span>}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[60px] ${selectedSize === size ? 'bg-accent-rose hover:bg-accent-rose-dark' : ''}`}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="text-sm font-semibold mb-3 block">Quantity</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 bg-accent-rose hover:bg-accent-rose-dark"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-accent-rose text-accent-rose' : ''}`} />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-accent-rose" />
                  <div className="text-sm">
                    <p className="font-semibold">Free Shipping</p>
                    <p className="text-muted-foreground">On orders over Rwf 100,000</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-accent-rose" />
                  <div className="text-sm">
                    <p className="font-semibold">Secure Payment</p>
                    <p className="text-muted-foreground">100% secure</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-accent-rose" />
                  <div className="text-sm">
                    <p className="font-semibold">Easy Returns</p>
                    <p className="text-muted-foreground">30-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="description" className="mb-16">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="prose max-w-none">
                <h3 className="text-xl font-serif mb-4">Product Details</h3>
                <p className="text-muted-foreground mb-6">{product.description}</p>
                <h4 className="text-lg font-semibold mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent-rose flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl font-bold">{product.rating}</span>
                      <div>
                        <div className="flex">{renderStars(product.rating)}</div>
                        <p className="text-sm text-muted-foreground">{product.reviewCount} reviews</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">Write a Review</Button>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{review.name}</span>
                            {review.verified && (
                              <Badge variant="outline" className="text-xs">
                                <Check className="w-3 h-3 mr-1" />
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <div className="flex gap-1">{renderStars(review.rating)}</div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <div className="prose max-w-none">
                <h3 className="text-xl font-serif mb-4">Shipping & Returns</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Shipping Information</h4>
                    <p className="text-muted-foreground">
                      We offer free standard shipping on all orders over Rwf 100,000. Orders are typically processed
                      within 1-2 business days and delivered within 5-7 business days.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Return Policy</h4>
                    <p className="text-muted-foreground">
                      We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in their
                      original condition with all tags attached. Please contact our customer service team to initiate a return.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Related Products */}
          <div>
            <h2 className="text-3xl font-serif mb-8 text-center">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} {...product} href={`/shop/${product.id}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
