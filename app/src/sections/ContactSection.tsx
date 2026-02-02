import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MessageCircle, Mail, Phone, MapPin, ArrowRight, Instagram, Facebook } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    message: '',
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const contentElements = contentRef.current?.children;
      if (contentElements) {
        gsap.fromTo(
          contentElements,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Appointment request submitted! We will contact you shortly.');
    setIsBookingOpen(false);
    setFormData({ name: '', phone: '', date: '', time: '', message: '' });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-50 bg-[#0B0B0C] pt-20 pb-8"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div ref={contentRef} className="text-center">
          {/* Title */}
          <h2 className="font-display text-[clamp(32px,4vw,56px)] text-[#F7F7F5]">
            Book an <span className="text-[#C9A44D]">appointment</span>
          </h2>
          <p className="mt-4 text-[#B9B2A6] max-w-lg mx-auto">
            See the collections in person. Bring references. We&apos;ll help you
            choose (or create) the perfect piece.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Schedule a Visit
            </button>
            <a
              href="https://wa.me/9198XXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Contact Details */}
          <div className="mt-16 grid sm:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#C9A44D]/10 flex items-center justify-center mb-4">
                <Mail className="w-5 h-5 text-[#C9A44D]" />
              </div>
              <p className="text-[#B9B2A6] text-sm">Email</p>
              <a
                href="mailto:hello@sumitjeweller.in"
                className="text-[#F7F7F5] hover:text-[#C9A44D] transition-colors"
              >
                hello@sumitjeweller.in
              </a>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#C9A44D]/10 flex items-center justify-center mb-4">
                <Phone className="w-5 h-5 text-[#C9A44D]" />
              </div>
              <p className="text-[#B9B2A6] text-sm">Phone</p>
              <a
                href="tel:+9198XXXXXXXX"
                className="text-[#F7F7F5] hover:text-[#C9A44D] transition-colors"
              >
                +91 98XXX XXXXX
              </a>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#C9A44D]/10 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 text-[#C9A44D]" />
              </div>
              <p className="text-[#B9B2A6] text-sm">Address</p>
              <p className="text-[#F7F7F5]">123 Jewellery Lane, Mumbai</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 border-t border-[#C9A44D]/20 pt-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="font-display text-xl text-[#F7F7F5]">
              Sumit Jeweller
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a href="#" className="text-sm text-[#B9B2A6] hover:text-[#C9A44D] transition-colors">
                Shipping & Returns
              </a>
              <a href="#" className="text-sm text-[#B9B2A6] hover:text-[#C9A44D] transition-colors">
                Care Guide
              </a>
              <a href="#" className="text-sm text-[#B9B2A6] hover:text-[#C9A44D] transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-[#B9B2A6] hover:text-[#C9A44D] transition-colors">
                Terms
              </a>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#F7F7F5]/5 flex items-center justify-center text-[#B9B2A6] hover:bg-[#C9A44D] hover:text-[#0B0B0C] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#F7F7F5]/5 flex items-center justify-center text-[#B9B2A6] hover:bg-[#C9A44D] hover:text-[#0B0B0C] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-[#B9B2A6]/60">
            © {new Date().getFullYear()} Sumit Jeweller. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-md bg-[#0B0B0C] border border-[#C9A44D]/20">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-[#F7F7F5]">
              Schedule a Visit
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm text-[#B9B2A6] mb-1">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-[#F7F7F5]/5 border border-[#C9A44D]/20 rounded-lg text-[#F7F7F5] focus:outline-none focus:border-[#C9A44D]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#B9B2A6] mb-1">Phone</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 bg-[#F7F7F5]/5 border border-[#C9A44D]/20 rounded-lg text-[#F7F7F5] focus:outline-none focus:border-[#C9A44D]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#B9B2A6] mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 bg-[#F7F7F5]/5 border border-[#C9A44D]/20 rounded-lg text-[#F7F7F5] focus:outline-none focus:border-[#C9A44D]"
                />
              </div>
              <div>
                <label className="block text-sm text-[#B9B2A6] mb-1">Time</label>
                <select
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-2 bg-[#F7F7F5]/5 border border-[#C9A44D]/20 rounded-lg text-[#F7F7F5] focus:outline-none focus:border-[#C9A44D]"
                >
                  <option value="">Select</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="18:00">6:00 PM</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#B9B2A6] mb-1">Message (Optional)</label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 bg-[#F7F7F5]/5 border border-[#C9A44D]/20 rounded-lg text-[#F7F7F5] focus:outline-none focus:border-[#C9A44D] resize-none"
              />
            </div>
            <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
              Confirm Booking
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ContactSection;
