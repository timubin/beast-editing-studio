
import React from 'react';
import { FileText, ShoppingCart, Layers, Briefcase, ArrowRight } from 'lucide-react';

const webServices = [
  {
    title: "One-Page Website / Portfolio",
    description: "Perfect for creatives and professionals looking to showcase their work beautifully.",
    tags: ["Responsive Design", "Modern UI/UX", "Fast Loading", "SEO Optimized"],
    icon: FileText
  },
  {
    title: "E-Commerce Website",
    description: "Up to 50 products with full shopping functionality and payment integration.",
    tags: ["Product Management", "Secure Checkout", "Inventory Tracking", "Analytics Dashboard"],
    icon: ShoppingCart
  },
  {
    title: "Multi-Page Website",
    description: "Up to 10 pages with custom design tailored to your brand identity.",
    tags: ["Custom Pages", "Blog Integration", "Contact Forms", "CMS Integration"],
    icon: Layers
  },
  {
    title: "Professional Service Website",
    description: "For doctors, lawyers, plumbers, and other service professionals.",
    tags: ["Appointment Booking", "Service Showcases", "Testimonials", "Local SEO"],
    icon: Briefcase
  }
];

const WebDesignServices: React.FC = () => {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4">WEB DEVELOPMENT</p>
          <h2 className="text-5xl font-black mb-6">Web Design Services<span className="text-red-600">§</span></h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
            Professional web design solutions tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {webServices.map((service, index) => (
            <div key={index} className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-2xl group hover:border-red-600/50 transition-all flex flex-col h-full">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-14 h-14 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center group-hover:border-red-600 transition-colors">
                  <service.icon className="w-7 h-7 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                {service.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-bold uppercase text-zinc-500 bg-zinc-950 px-3 py-1 rounded-full border border-zinc-800">
                    {tag}
                  </span>
                ))}
              </div>

              <button className="flex items-center gap-2 text-red-600 font-black uppercase text-xs hover:gap-3 transition-all">
                Get Quote <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebDesignServices;
