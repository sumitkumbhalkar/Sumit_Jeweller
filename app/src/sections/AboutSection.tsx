import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, MapPin, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Image animation
      gsap.fromTo(
        imageRef.current,
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content animation
      const contentElements = contentRef.current?.children;
      if (contentElements) {
        gsap.fromTo(
          contentElements,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    'Purity certified',
    'Custom sizing',
    'Repair & polish',
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-50 bg-[#0B0B0C] py-20 lg:py-0 lg:min-h-screen"
    >
      <div className="max-w-7xl mx-auto lg:min-h-screen flex flex-col lg:flex-row items-center">
        {/* Image Column */}
        <div
          ref={imageRef}
          className="w-full lg:w-[52%] h-[50vh] lg:h-screen relative"
        >
          <img
            src="/craft_workshop.jpg"
            alt="Jewellery Craftsmanship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0B0B0C]/50 lg:block hidden" />
        </div>

        {/* Content Column */}
        <div
          ref={contentRef}
          className="w-full lg:w-[48%] px-6 lg:px-16 py-12 lg:py-0"
        >
          <div className="ornament-line w-16 mb-8" />
          <h2 className="font-display text-[clamp(28px,3.5vw,48px)] text-[#F7F7F5] leading-tight">
            Crafted here.
            <br />
            <span className="text-[#C9A44D]">Finished with care.</span>
          </h2>
          <p className="mt-6 text-[#B9B2A6] leading-relaxed max-w-md">
            Every piece is shaped in our workshop, polished by hand, and checked
            for purity before it reaches you. Our master craftsmen bring decades
            of experience to create jewellery that lasts generations.
          </p>

          {/* Features */}
          <div className="mt-8 space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#C9A44D]/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-[#C9A44D]" />
                </div>
                <span className="text-[#F7F7F5]">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={scrollToContact}
            className="mt-10 btn-primary flex items-center gap-2"
          >
            Visit the Showroom
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Location */}
          <div className="mt-8 flex items-center gap-2 text-[#B9B2A6]">
            <MapPin className="w-4 h-4 text-[#C9A44D]" />
            <span className="text-sm">
              Mumbai • Open Tue–Sun, 11am–8pm
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
