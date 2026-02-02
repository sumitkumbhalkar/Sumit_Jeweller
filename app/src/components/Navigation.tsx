import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, Phone } from 'lucide-react';
import { useCart } from '@/store/CartContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Collections', href: '#collections' },
    { label: 'Shop', href: '#shop' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0B0B0C]/90 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-display text-2xl lg:text-3xl text-[#F7F7F5] tracking-wide hover:text-[#C9A44D] transition-colors"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Sumit Jeweller
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="font-label text-xs uppercase tracking-[0.18em] text-[#B9B2A6] hover:text-[#C9A44D] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* WhatsApp Button */}
            <a
              href="https://wa.me/9198XXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-[#C9A44D] hover:text-[#D4B76A] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-label text-xs uppercase tracking-[0.18em]">
                WhatsApp
              </span>
            </a>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-[#F7F7F5] hover:text-[#C9A44D] transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C9A44D] text-[#0B0B0C] text-xs font-label font-medium rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2 text-[#F7F7F5]">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-80 bg-[#0B0B0C] border-l border-[#C9A44D]/20"
              >
                <div className="flex flex-col h-full pt-12">
                  <div className="flex flex-col gap-6">
                    {navLinks.map((link) => (
                      <button
                        key={link.label}
                        onClick={() => scrollToSection(link.href)}
                        className="font-display text-2xl text-[#F7F7F5] hover:text-[#C9A44D] transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-auto pb-8">
                    <a
                      href="https://wa.me/9198XXXXXXXX"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-[#C9A44D]"
                    >
                      <Phone className="w-5 h-5" />
                      <span className="font-label text-sm uppercase tracking-[0.18em]">
                        Chat on WhatsApp
                      </span>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
