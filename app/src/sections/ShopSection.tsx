import React, { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ShoppingBag, Sparkles } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/store/CartContext';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Product } from '@/types';

gsap.registerPlugin(ScrollTrigger);

type CategoryFilter = 'all' | 'gold' | 'diamond' | 'silver' | 'bridal' | 'daily-wear';
type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest';

const ShopSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Product cards animation
      const cards = gridRef.current?.querySelectorAll('.product-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.06,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const filteredProducts = products
    .filter((product) => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'daily-wear') return product.category === 'daily-wear';
      return product.category === activeFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.finalPrice - b.finalPrice;
        case 'price-high':
          return b.finalPrice - a.finalPrice;
        case 'newest':
          return parseInt(b.id) - parseInt(a.id);
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });

  const handleAddToCart = (product: Product) => {
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const filters: { label: string; value: CategoryFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Gold', value: 'gold' },
    { label: 'Diamond', value: 'diamond' },
    { label: 'Silver', value: 'silver' },
    { label: 'Bridal', value: 'bridal' },
    { label: 'Daily Wear', value: 'daily-wear' },
  ];

  return (
    <section
      ref={sectionRef}
      id="shop"
      className="relative z-50 bg-[#F3EFE6] py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="font-display text-[clamp(32px,4vw,56px)] text-[#0B0B0C]">
            The <span className="text-[#C9A44D]">Curated</span> Shelf
          </h2>
          <p className="mt-4 text-[#5A5448] max-w-lg mx-auto">
            Handpicked pieces, ready to try, buy, or customize.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="sticky top-20 z-40 bg-[#F3EFE6]/95 backdrop-blur-sm py-4 mb-8 -mx-6 px-6 lg:mx-0 lg:px-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`px-4 py-2 rounded-full font-label text-xs uppercase tracking-[0.12em] transition-all ${
                    activeFilter === filter.value
                      ? 'bg-[#C9A44D] text-[#0B0B0C]'
                      : 'bg-[#0B0B0C]/5 text-[#0B0B0C] hover:bg-[#0B0B0C]/10'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-[#0B0B0C]/5 text-[#0B0B0C] font-label text-xs uppercase tracking-[0.12em] px-4 py-2 pr-10 rounded-full cursor-pointer hover:bg-[#0B0B0C]/10 transition-colors"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0B0B0C] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card group bg-white rounded-[18px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_18px_50px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Image */}
              <div
                className="relative aspect-[3/4] overflow-hidden cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.bestseller && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-[#C9A44D] text-[#0B0B0C] font-label text-[10px] uppercase tracking-[0.12em] rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Bestseller
                  </div>
                )}
                {product.featured && !product.bestseller && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-[#0B0B0C] text-[#F7F7F5] font-label text-[10px] uppercase tracking-[0.12em] rounded-full">
                    Featured
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs text-[#5A5448] uppercase tracking-wider">
                  {product.metal} {product.purity}
                </p>
                <h3
                  className="font-display text-lg text-[#0B0B0C] mt-1 cursor-pointer hover:text-[#C9A44D] transition-colors"
                  onClick={() => setSelectedProduct(product)}
                >
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-label text-lg text-[#C9A44D]">
                    {formatPrice(product.finalPrice)}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-10 h-10 rounded-full bg-[#0B0B0C] text-[#F7F7F5] flex items-center justify-center hover:bg-[#C9A44D] hover:text-[#0B0B0C] transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Order CTA */}
        <div className="mt-16 text-center">
          <p className="text-[#5A5448] mb-4">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <a
            href="https://wa.me/9198XXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#C9A44D] font-label text-sm uppercase tracking-[0.18em] hover:text-[#0B0B0C] transition-colors"
          >
            Request a Custom Design
            <Sparkles className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Product Detail Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-3xl bg-[#0B0B0C] border border-[#C9A44D]/20 p-0 overflow-hidden">
          {selectedProduct && (
            <div className="grid md:grid-cols-2">
              <div className="aspect-square">
                <img
                  src={selectedProduct.images[0]}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 lg:p-8 flex flex-col">
                <DialogHeader>
                  <p className="text-xs text-[#C9A44D] uppercase tracking-wider">
                    {selectedProduct.metal} {selectedProduct.purity}
                  </p>
                  <DialogTitle className="font-display text-2xl lg:text-3xl text-[#F7F7F5] mt-2">
                    {selectedProduct.name}
                  </DialogTitle>
                </DialogHeader>
                <p className="text-[#B9B2A6] mt-4 flex-1">
                  {selectedProduct.description}
                </p>
                <div className="mt-6 space-y-3">
                  {selectedProduct.weight && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#B9B2A6]">Weight</span>
                      <span className="text-[#F7F7F5]">{selectedProduct.weight}g</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-[#B9B2A6]">Making Charges</span>
                    <span className="text-[#F7F7F5]">
                      {formatPrice(selectedProduct.makingCharges || 0)}
                    </span>
                  </div>
                  <div className="ornament-line my-4" />
                  <div className="flex items-center justify-between">
                    <span className="font-label text-2xl text-[#C9A44D]">
                      {formatPrice(selectedProduct.finalPrice)}
                    </span>
                    <button
                      onClick={() => {
                        handleAddToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="btn-primary flex items-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ShopSection;
