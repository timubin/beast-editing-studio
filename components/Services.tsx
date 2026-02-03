
import React from 'react';
import { Box, Film, Video, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Box,
    title: "3D Product Visualization",
    description: "Photorealistic product renders and animations that bring your products to life with stunning detail and precision.",
    items: ["Photorealistic Renders", "Product Animations", "360 Product Views", "AR Ready Assets"]
  },
  {
    icon: Film,
    title: "Motion Graphics & Animation",
    description: "Eye-catching animations for brands. From logo animations to full explainer videos that captivate audiences.",
    items: ["Logo Animations", "Explainer Videos", "Social Media Content", "Title Sequences"]
  },
  {
    icon: Video,
    title: "Commercial Video Production",
    description: "Engaging commercials that sell. We create compelling video content that converts viewers into customers.",
    items: ["TV Commercials", "Social Ads", "Product Videos", "Brand Films"]
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-6">WHAT WE DO</p>
          <h2 className="text-5xl font-black mb-10">Services<span className="text-red-600">™</span></h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
            Premium creative services that transform your vision into stunning visual content
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-zinc-900/40 border border-zinc-800 p-10 rounded-2xl hover:border-red-600/50 transition-all group hover:-translate-y-2 duration-500">
              <div className="w-14 h-14 bg-black border border-red-600/30 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                <service.icon className="w-8 h-8 text-red-600 group-hover:animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-zinc-500 mb-8 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-3 mb-10">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-zinc-300">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="flex items-center gap-2 text-red-600 font-bold hover:gap-4 transition-all uppercase text-sm inline-flex">
                Learn More <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
