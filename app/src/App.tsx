import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Toaster } from 'sonner';
import { CartProvider } from '@/store/CartContext';
import Navigation from '@/components/Navigation';
import CartDrawer from '@/components/CartDrawer';
import HeroSection from '@/sections/HeroSection';
import DiamondSection from '@/sections/DiamondSection';
import GoldSection from '@/sections/GoldSection';
import SilverSection from '@/sections/SilverSection';
import ShopSection from '@/sections/ShopSection';
import AboutSection from '@/sections/AboutSection';
import ContactSection from '@/sections/ContactSection';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timeout = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <CartProvider>
      <div className="relative">
        {/* Grain Overlay */}
        <div className="grain-overlay" />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Cart Drawer */}
        <CartDrawer />
        
        {/* Main Content */}
        <main className="relative">
          {/* Pinned Sections */}
          <HeroSection />
          <DiamondSection />
          <GoldSection />
          <SilverSection />
          
          {/* Flowing Sections */}
          <ShopSection />
          <AboutSection />
          <ContactSection />
        </main>
        
        {/* Toast Notifications */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#0B0B0C',
              color: '#F7F7F5',
              border: '1px solid rgba(201, 164, 77, 0.2)',
            },
          }}
        />
      </div>
    </CartProvider>
  );
}

export default App;
