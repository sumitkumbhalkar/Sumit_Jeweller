import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightTopCardRef = useRef<HTMLDivElement>(null);
  const rightBottomCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const verticalLabelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Background fade and scale
      introTl.fromTo(
        bgRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.2 },
        0
      );

      // Left card entrance
      introTl.fromTo(
        leftCardRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9 },
        0.2
      );

      // Right cards entrance with stagger
      introTl.fromTo(
        rightTopCardRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        0.3
      );

      introTl.fromTo(
        rightBottomCardRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        0.42
      );

      // Headline words stagger
      const headlineWords = headlineRef.current?.querySelectorAll('.word');
      if (headlineWords) {
        introTl.fromTo(
          headlineWords,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.04 },
          0.5
        );
      }

      // CTA buttons
      introTl.fromTo(
        ctaRef.current?.children || [],
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
        0.7
      );

      // Vertical label
      introTl.fromTo(
        verticalLabelRef.current,
        { x: '8vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6 },
        0.8
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set([leftCardRef.current, rightTopCardRef.current, rightBottomCardRef.current], {
              opacity: 1,
              x: 0,
            });
            gsap.set(headlineRef.current, { opacity: 1, y: 0 });
            gsap.set(ctaRef.current, { opacity: 1, y: 0 });
            gsap.set(verticalLabelRef.current, { opacity: 1 });
          },
        },
      });

      // ENTRANCE (0% - 30%): Hold settle state (already animated by intro)
      // No additional entrance transforms needed

      // SETTLE (30% - 70%): Static

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        leftCardRef.current,
        { x: 0, opacity: 1 },
        { x: '-35vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [rightTopCardRef.current, rightBottomCardRef.current],
        { x: 0, opacity: 1 },
        { x: '25vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        verticalLabelRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.8
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToCollections = () => {
    const element = document.querySelector('#collections');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-10"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero_bg.jpg"
          alt="Luxury Jewellery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C]/80 via-[#0B0B0C]/50 to-transparent" />
      </div>

      {/* Left Collage Card */}
      <div
        ref={leftCardRef}
        className="absolute left-[6vw] top-[18vh] w-[42vw] h-[64vh] card-luxury z-10 hidden lg:block"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero_card_left.jpg"
          alt="Gold Necklace"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Top Card */}
      <div
        ref={rightTopCardRef}
        className="absolute left-[58vw] top-[18vh] w-[18vw] h-[22vh] card-luxury z-10 hidden lg:block"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero_card_right_top.jpg"
          alt="Gold Bracelet"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Bottom Card */}
      <div
        ref={rightBottomCardRef}
        className="absolute left-[58vw] top-[46vh] w-[18vw] h-[36vh] card-luxury z-10 hidden lg:block"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero_card_right_bottom.jpg"
          alt="Gold Ring"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Headline Block */}
      <div
        ref={headlineRef}
        className="absolute left-[8vw] lg:left-[10vw] top-[28vh] lg:top-[30vh] w-[84vw] lg:w-[34vw] z-20"
      >
        <h1 className="font-display text-[clamp(36px,5vw,72px)] leading-[0.95] text-[#F7F7F5]">
          <span className="word inline-block">Pure</span>{' '}
          <span className="word inline-block text-[#C9A44D]">Gold.</span>
          <br />
          <span className="word inline-block">Perfect</span>{' '}
          <span className="word inline-block text-[#C9A44D]">Designs.</span>
        </h1>
        <div className="ornament-line w-[60%] lg:w-[18vw] mt-6" />
        <p className="mt-6 text-[#B9B2A6] text-base lg:text-lg leading-relaxed max-w-md">
          Bridal sets, daily wear & custom craftsmanship—crafted with trust for generations.
        </p>
      </div>

      {/* CTA Row */}
      <div
        ref={ctaRef}
        className="absolute left-[8vw] lg:left-[10vw] top-[62vh] lg:top-[70vh] flex flex-col sm:flex-row gap-4 z-20"
      >
        <button onClick={scrollToCollections} className="btn-primary flex items-center gap-2">
          Explore Collections
          <ArrowRight className="w-4 h-4" />
        </button>
        <button onClick={scrollToContact} className="btn-secondary flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Book Appointment
        </button>
      </div>

      {/* Vertical Label */}
      <div
        ref={verticalLabelRef}
        className="absolute right-[3.5vw] top-1/2 -translate-y-1/2 z-20 hidden lg:block"
        style={{ opacity: 0 }}
      >
        <span className="vertical-label font-label text-xs uppercase tracking-[0.18em] text-[#C9A44D]/60">
          COLLECTIONS
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
