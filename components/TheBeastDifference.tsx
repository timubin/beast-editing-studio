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
            <div key={diff.id} className="p-8 border-l-2 border-zinc-900 hover:border-red-600 bg-zinc-950/30 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl text-zinc-700 group-hover:text-red-600 group-hover:opacity-20 transition-all select-none">
                0{index + 1}
              </div>
              <div className="mb-6 text-red-600 relative z-10">
                <IconRenderer name={diff.icon} className="w-10 h-10 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold mb-4 relative z-10">{diff.title}</h3>
              <p className="text-zinc-500 leading-relaxed text-sm relative z-10">
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
