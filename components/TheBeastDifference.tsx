import React from 'react';
import { Award, Clock, Users, Zap, ShieldCheck, Heart } from 'lucide-react';
import { useSiteContent } from '../context/SiteContext';
import IconRenderer from './IconRenderer';

const TheBeastDifference: React.FC = () => {
  const { features } = useSiteContent();
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4">WHY CHOOSE US</p>
          <h2 className="text-5xl font-black mb-6">The Beast Difference</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
            What sets us apart from the rest and why clients keep coming back
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((diff, index) => (
            <div key={diff.id} className="p-8 border border-zinc-900 hover:border-red-600/50 bg-zinc-950/30 backdrop-blur-sm transition-all group relative overflow-hidden rounded-2xl">
              {/* Glowing Border Animation */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-600/20 transition-all duration-700 rounded-2xl"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>
              </div>

              <div className="absolute top-0 right-0 p-4 opacity-5 font-black text-6xl text-white group-hover:text-red-600 group-hover:opacity-10 transition-all select-none">
                0{index + 1}
              </div>
              <div className="mb-6 text-red-600 relative z-10">
                <div className="w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center border border-red-600/20 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                  <IconRenderer name={diff.icon} className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 relative z-10 group-hover:text-red-500 transition-colors">{diff.title}</h3>
              <p className="text-zinc-500 leading-relaxed text-sm relative z-10 group-hover:text-zinc-400 transition-colors">
                {diff.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TheBeastDifference;
