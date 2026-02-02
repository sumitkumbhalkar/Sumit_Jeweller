import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DiamondSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
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
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        centerCardRef.current,
        { y: '100vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        rightCardRef.current,
        { x: '40vw', opacity: 0 },
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
        { x: '-28vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        centerCardRef.current,
        { y: 0, opacity: 1 },
        { y: '-26vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        rightCardRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
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
      id="collections"
      className="section-pinned z-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/diamond_bg.jpg"
          alt="Diamond Jewellery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0B0B0C]/70" />
      </div>

      {/* Left Tall Card */}
      <div
        ref={leftCardRef}
        className="absolute left-[6vw] top-[14vh] w-[28vw] h-[72vh] card-luxury z-10 hidden lg:block"
      >
        <img
          src="/diamond_card_left.jpg"
          alt="Diamond Earrings"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Center Large Card */}
      <div
        ref={centerCardRef}
        className="absolute left-[36vw] top-[14vh] w-[40vw] h-[72vh] card-luxury z-10 hidden lg:block"
      >
        <img
          src="/diamond_card_center.jpg"
          alt="Diamond Necklace"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Small Card */}
      <div
        ref={rightCardRef}
        className="absolute left-[78vw] top-[14vh] w-[16vw] h-[26vh] card-luxury z-10 hidden lg:block"
      >
        <img
          src="/diamond_card_right.jpg"
          alt="Diamond Ring"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Panel */}
      <div
        ref={textPanelRef}
        className="absolute left-[8vw] lg:left-[40vw] top-[50vh] lg:top-[54vh] w-[84vw] lg:w-[32vw] z-20"
      >
        <h2 className="font-display text-[clamp(32px,4vw,64px)] leading-[1] text-[#F7F7F5]">
          The <span className="text-[#C9A44D]">Diamond</span> Edit
        </h2>
        <p className="mt-4 text-[#B9B2A6] text-base lg:text-lg leading-relaxed max-w-md">
          Brilliant cuts set in gold. From modern minimal to heirloom grandeur.
        </p>
        <button
          onClick={scrollToShop}
          className="mt-6 btn-secondary flex items-center gap-2"
        >
          View Diamond Collection
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Vertical Label */}
      <div
        ref={verticalLabelRef}
        className="absolute right-[3.5vw] top-1/2 -translate-y-1/2 z-20 hidden lg:block"
      >
        <span className="vertical-label font-label text-xs uppercase tracking-[0.18em] text-[#C9A44D]/60">
          DIAMOND EDIT
        </span>
      </div>
    </section>
  );
};

export default DiamondSection;
