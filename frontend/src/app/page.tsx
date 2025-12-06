'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroBanner } from '@/components/sections/HeroBanner';
import { ProductCard } from '@/components/products/ProductCard';
import { CategoryCard } from '@/components/products/CategoryCard';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import { CountdownTimer } from '@/components/sections/CountdownTimer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';

export default function Home() {
  // Calculate target date for countdown (15 days from now) - client-side only
  const [flashSaleEndDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 15);
    date.setHours(23, 36, 55, 0);
    return date;
  });

  // Sample product data
  const featuredProducts = [
    {
      id: '1',
      title: 'Orange Airsuit',
      category: 'Fashion Bag',
      price: 'Rwf 98,000',
      originalPrice: 'Rwf 129,000',
      discount: '24%',
      image: '/images/products/product-img-1.jpg',
    },
    {
      id: '2',
      title: 'Classic Elegant Dress',
      category: "Women's Collection",
      price: 'Rwf 99,000',
      originalPrice: 'Rwf 149,000',
      discount: '25%',
      image: '/images/products/product-img-2.jpg',
    },
    {
      id: '3',
      title: 'Premium Leather Handbag',
      category: 'Accessories',
      price: 'Rwf 199,000',
      originalPrice: 'Rwf 249,000',
      discount: '20%',
      image: '/images/products/product-img-3.jpg',
    },
    {
      id: '4',
      title: 'Designer Sunglasses',
      category: 'Accessories',
      price: 'Rwf 149,000',
      originalPrice: 'Rwf 199,000',
      discount: '25%',
      image: '/images/products/product-img-4.jpg',
    },
    {
      id: '5',
      title: 'Luxury Watch',
      category: 'Watches',
      price: 'Rwf 599,000',
      originalPrice: 'Rwf 799,000',
      discount: '25%',
      image: '/images/products/product-img-5.jpg',
    },
    {
      id: '6',
      title: 'Silk Scarf',
      category: 'Accessories',
      price: 'Rwf 79,000',
      originalPrice: 'Rwf 99,000',
      discount: '20%',
      image: '/images/products/product-img-1.jpg',
    },
  ];

  const categories = [
    { id: '1', title: 'Men', href: '/shop?category=men', image: '/images/categories/category-1.jpg' },
    { id: '2', title: 'Kids', href: '/shop?category=kids', image: '/images/categories/category-2.jpg' },
    { id: '3', title: 'Pants', href: '/shop?category=pants', image: '/images/categories/category-3.jpg' },
    { id: '4', title: 'Women', href: '/shop?category=women', image: '/images/categories/category-4.jpg' },
    { id: '5', title: 'Jeans', href: '/shop?category=jeans', image: '/images/categories/category-5.jpg' },
    { id: '6', title: 'Sweater', href: '/shop?category=sweater', image: '/images/categories/category-6.jpg' },
    { id: '7', title: 'Shoes', href: '/shop?category=shoes', image: '/images/categories/category-7.jpg' },
  ];

  const mostSellingProducts = [
    {
      id: '7',
      title: 'Elegant Evening Gown',
      category: "Women's Collection",
      price: 'Rwf 299,000',
      image: '/images/products/product-img-sm-1.jpg',
      rating: 5,
    },
    {
      id: '8',
      title: 'Classic Suit',
      category: "Men's Collection",
      price: 'Rwf 399,000',
      image: '/images/products/product-img-sm-2.jpg',
      rating: 5,
    },
    {
      id: '9',
      title: 'Designer Heels',
      category: 'Footwear',
      price: 'Rwf 179,000',
      image: '/images/products/product-img-sm-3.jpg',
      rating: 4,
    },
    {
      id: '10',
      title: 'Luxury Jewelry Set',
      category: 'Jewellery',
      price: 'Rwf 499,000',
      image: '/images/products/product-img-sm-4.jpg',
      rating: 5,
    },
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Banner Slider */}
      <HeroBanner 
        slides={[
          {
            subtitle: 'New Arrival',
            title: 'Timeless Elegance for Every Occasion',
            description: 'Starting From',
            ctaText: 'SHOP NOW',
            ctaLink: '/shop',
            image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop',
            gradient: 'from-accent-rose-subtle via-accent-rose-muted to-accent-rose-subtle',
          },
          {
            subtitle: 'Perfect for Summer Evenings',
            title: 'Casual and Stylish for All Seasons',
            description: 'Starting From',
            ctaText: 'EXPLORE COLLECTION',
            ctaLink: '/shop',
            image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop',
            gradient: 'from-purple-100 via-pink-100 to-rose-100',
          },
          {
            subtitle: 'Limited Edition',
            title: 'Luxury Meets Contemporary Design',
            description: 'Starting From',
            ctaText: 'DISCOVER MORE',
            ctaLink: '/shop',
            image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop',
            gradient: 'from-blue-100 via-indigo-100 to-purple-100',
          },
        ]}
        autoPlayInterval={5000}
      />

      {/* Categories Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                title={category.title}
                href={category.href}
                image={category.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-background via-accent-rose-subtle/20 to-background relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent-rose rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-rose-muted rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div className="mb-6 md:mb-0">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-accent-rose uppercase tracking-wider mb-3 px-4 py-1.5 bg-accent-rose-subtle/50 rounded-full">
                <Star className="h-3.5 w-3.5 fill-accent-rose" />
                Summer collection
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-2">
                Shopping Every Day
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Discover our curated selection of premium fashion pieces
              </p>
            </div>
            <div className="flex items-center">
              <Link href="/shop">
                <Button size="lg" className="bg-accent-rose hover:bg-accent-rose-dark text-white">
                  More Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Products Slider */}
          <div className="relative">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={16}
              slidesPerView={2}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={featuredProducts.length >= 4}
              className="!pb-12"
            >
              {featuredProducts.map((product) => (
                <SwiperSlide key={`featured-${product.id}`}>
                  <ProductCard
                    {...product}
                    href={`/shop/${product.id}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom pagination dots */}
            <div className="flex justify-center gap-2 mt-8">
              {featuredProducts.slice(0, Math.ceil(featuredProducts.length / 4)).map((_, index) => (
                <button
                  key={`pagination-${index}`}
                  className="w-2 h-2 rounded-full bg-accent-rose-subtle hover:bg-accent-rose transition-all"
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Ad Section */}
      <section className=" ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="relative overflow-hidden border-0 shadow-luxury bg-gradient-to-br from-accent-rose-subtle via-background to-accent-rose-subtle/30">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-end p-6 md:p-8">
              {/* Left Content */}
              <div className="space-y-4 text-center md:text-left">
                <span className="inline-block text-sm font-medium text-accent-rose uppercase tracking-wider">
                  Trending Products
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif">
                  Get 30% Discount On All Hudis!
                </h2>
                
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  {['Zara', 'Gucci', 'Publo', "Men's", "Women's"].map((brand) => (
                    <span
                      key={brand}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-card rounded-full text-xs md:text-sm border"
                    >
                      <span className="text-accent-rose">✓</span>
                      {brand}
                    </span>
                  ))}
                </div>

                <Link href="/shop?discount=true">
                  <Button size="lg" className="bg-accent-rose hover:bg-accent-rose-dark text-white mt-4">
                    Check Discount
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Right Image - Touching Bottom */}
              <div className="relative h-[200px] md:h-[250px] rounded-lg overflow-hidden self-end">
                <Image
                  src="/images/other/ad-img.png"
                  alt="Discount Offer"
                  fill
                  className="object-contain object-bottom"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Most Selling Products Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-card rounded-xl border shadow-sm p-6 md:p-8">
            {/* Title and Subtitle - Top Left */}
            <div className="mb-8 text-left">
              <span className="inline-block text-sm font-medium text-accent-rose uppercase tracking-wider mb-2">
                most selling items
              </span>
              <h2 className="text-2xl md:text-3xl font-serif">
                Top selling Categories This Week
              </h2>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {mostSellingProducts.map((product) => (
                <div
                  key={product.id}
                  className="group flex items-center gap-4 p-4 rounded-lg hover:bg-accent-rose-subtle/30 transition-colors cursor-pointer"
                >
                  {/* Small Image on Left */}
                  <Link href={`/shop/${product.id}`} className="shrink-0">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-muted">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="96px"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-accent-rose-subtle to-accent-rose-muted"></div>
                      )}
                    </div>
                  </Link>

                  {/* Content on Right */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm md:text-base font-semibold text-foreground">
                        {product.price}
                      </span>

                    </div>
                    <Link href={`/shop/${product.id}`}>
                      <h4 className="text-sm md:text-base font-medium hover:text-accent-rose transition-colors line-clamp-2">
                        {product.title}
                      </h4>
                    </Link>
                    <Link href={`/shop?category=${product.category.toLowerCase()}`}>
                      <h5 className="text-xs text-muted-foreground hover:text-accent-rose transition-colors">
                        {product.category}
                      </h5>
                    </Link>
                    <div className="flex gap-0.5 shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={`star-${product.id}-${i}`}
                            className={`h-3 w-3 md:h-3.5 md:w-3.5 ${
                              i < (product.rating || 0)
                                ? 'fill-accent-rose text-accent-rose'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Flash Sale Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-accent-rose-dark via-accent-rose to-accent-rose-light text-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)`,
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                <span className="text-sm font-medium text-white uppercase tracking-wider">
                  Flash Sale
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-3">
                Trending Flash Sell
              </h2>
              <p className="text-white/80 max-w-xl">
                Limited time offer! Don&apos;t miss out on these amazing deals
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="flex flex-col items-center lg:items-end gap-4">
              <div className="text-center lg:text-right">
                <p className="text-sm text-white/70 mb-2 uppercase tracking-wider">Ends In</p>
              </div>
              <CountdownTimer 
                targetDate={flashSaleEndDate} 
                className="mt-0"
              />
            </div>

            <Link href="/shop?flash-sale=true" className="lg:ml-4">
              <Button size="lg" variant="secondary" className="bg-white text-accent-rose hover:bg-white/90 w-full lg:w-auto shadow-lg">
                View All Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Flash Sale Products Slider */}
          <div className="relative">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={16}
              slidesPerView={2}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={featuredProducts.length >= 4}
              className="!pb-4"
            >
              {featuredProducts.map((product) => (
                <SwiperSlide key={`flash-sale-${product.id}`}>
                  <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 hover:border-white/30 transition-all overflow-visible group shadow-lg">
                    <Link href={`/shop/${product.id}`}>
                      <div className="relative h-[200px] md:h-[220px] overflow-visible p-3">
                        <div className="relative w-full h-full overflow-hidden rounded-lg">
                          {product.image ? (
                            <Image
                              src={product.image}
                              alt={product.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            />
                          ) : (
                            <div className="w-full h-full bg-white/10"></div>
                          )}
                          {/* Discount Badge */}
                          <div className="absolute top-2 right-2 bg-accent-rose-dark text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-lg z-10 animate-pulse">
                            {product.discount} Off
                          </div>
                          {/* Flash Sale Badge */}
                          <div className="absolute top-2 left-2 bg-white/20 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full text-xs font-semibold z-10">
                            ⚡ Flash
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="px-4 pb-4 pt-2 space-y-1.5 bg-gradient-to-b from-white/5 to-transparent">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-white">{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-white/60 line-through">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>
                      <Link href={`/shop/${product.id}`}>
                        <h4 className="text-sm font-semibold text-white hover:text-white/80 transition-colors line-clamp-2 min-h-10">
                          {product.title}
                        </h4>
                      </Link>
                      <Link href={`/shop?category=${product.category.toLowerCase()}`}>
                        <h5 className="text-xs text-white/70 hover:text-white transition-colors uppercase tracking-wide">
                          {product.category}
                        </h5>
                      </Link>
                    </div>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      <Footer />
    </>
  );
}
