import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GoldSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightTopCardRef = useRef<HTMLDivElement>(null);
  const rightBottomCardRef = useRef<HTMLDivElement>(null);
  const textPanelRef = useRef<HTMLDivElement>(null);
  const verticalLabelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        leftCardRef.current,
        { x: '-70vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        rightTopCardRef.current,
        { y: '-60vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        rightBottomCardRef.current,
        { x: '50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        textPanelRef.current,
        { y: '18vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        verticalLabelRef.current,
        { x: '8vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // SETTLE (30% - 70%): Static

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        leftCardRef.current,
        { x: 0, opacity: 1 },
        { x: '-26vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        rightTopCardRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        rightBottomCardRef.current,
        { x: 0, opacity: 1 },
        { x: '22vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        textPanelRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        verticalLabelRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToShop = () => {
    const element = document.querySelector('#shop');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-30"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/gold_bg.jpg"
          alt="Gold Jewellery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0B0B0C]/70" />
      </div>

      {/* Left Large Card */}
      <div
        ref={leftCardRef}
        className="absolute left-[6vw] top-[14vh] w-[44vw] h-[72vh] card-luxury z-10 hidden lg:block"
      >
        <img
          src="/gold_card_left.jpg"
          alt="Gold Necklace Set"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Top Card */}
      <div
        ref={rightTopCardRef}
        className="absolute left-[52vw] top-[14vh] w-[20vw] h-[26vh] card-luxury z-10 hidden lg:block"
      >
        <img
          src="/gold_card_right_top.jpg"
          alt="Gold Pendant"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Bottom Tall Card */}
      <div
        ref={rightBottomCardRef}
        className="absolute left-[52vw] top-[44vh] w-[20vw] h-[42vh] card-luxury z-10 hidden lg:block"
      >
        <img
          src="/gold_card_right_bottom.jpg"
          alt="Gold Earrings"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Panel */}
      <div
        ref={textPanelRef}
        className="absolute left-[8vw] lg:left-[10vw] top-[50vh] lg:top-[54vh] w-[84vw] lg:w-[34vw] z-20"
      >
        <h2 className="font-display text-[clamp(32px,4vw,64px)] leading-[1] text-[#F7F7F5]">
          The <span className="text-[#C9A44D]">Gold</span> Standard
        </h2>
        <p className="mt-4 text-[#B9B2A6] text-base lg:text-lg leading-relaxed max-w-md">
          22K purity, timeless motifs, and a finish that lasts generations.
        </p>
        <button
          onClick={scrollToShop}
          className="mt-6 btn-secondary flex items-center gap-2"
        >
          Explore Gold Jewellery
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Vertical Label */}
      <div
        ref={verticalLabelRef}
        className="absolute right-[3.5vw] top-1/2 -translate-y-1/2 z-20 hidden lg:block"
      >
        <span className="vertical-label font-label text-xs uppercase tracking-[0.18em] text-[#C9A44D]/60">
          GOLD STANDARD
        </span>
      </div>
    </section>
  );
};

export default GoldSection;
