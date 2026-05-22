
import React from 'react';
import { Check } from 'lucide-react';
import { useSiteContent } from '../context/SiteContext';
import IconRenderer from './IconRenderer';

const StartupPackage: React.FC = () => {
  const { startupPackage } = useSiteContent();

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-br from-red-950/40 to-black border border-red-900/30 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="text-center mb-16 relative z-10">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-red-600/40">
              <IconRenderer name={startupPackage.icon} className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6">{startupPackage.title}</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-medium">
              {startupPackage.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl mx-auto relative z-10">
            {startupPackage.items.map((item, idx) => (
              <div 
                key={item.id} 
                className="flex items-center gap-4 bg-zinc-900/40 backdrop-blur-md p-4 rounded-2xl border border-zinc-800 hover:border-red-600/30 transition-all duration-500 group/item hover:translate-x-2"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center border border-zinc-800 group-hover/item:border-red-600/50 transition-all duration-500">
                  <IconRenderer name={item.icon} className="w-6 h-6 text-zinc-500 group-hover/item:text-red-600 transition-colors" />
                </div>
                <div className="flex-grow flex items-center justify-between">
                  <span className="text-sm font-bold text-zinc-300 group-hover/item:text-white transition-colors">{item.text}</span>
                  <div className="w-6 h-6 rounded-full bg-red-600/10 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                    <Check className="w-3 h-3 text-red-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 relative z-10">
            <a href="#contact" className="group relative bg-red-600 hover:bg-red-700 text-white px-12 py-5 rounded-2xl text-lg font-black uppercase tracking-widest transition-all shadow-2xl shadow-red-600/40 active:scale-95 inline-flex items-center gap-4 mx-auto overflow-hidden">
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
              <IconRenderer name={startupPackage.icon} className="w-6 h-6 group-hover:rotate-12 transition-transform" /> 
              <span className="relative z-10">{startupPackage.ctaLabel}</span>
            </a>
            <p className="mt-8 text-zinc-500 text-sm font-medium italic flex items-center justify-center gap-2">
              <span className="w-8 h-[1px] bg-zinc-800"></span>
              {startupPackage.note}
              <span className="w-8 h-[1px] bg-zinc-800"></span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartupPackage;
