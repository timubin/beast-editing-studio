import React from 'react';
import { useSiteContent } from '../context/SiteContext';

const Stats: React.FC = () => {
  const { stats } = useSiteContent();

  return (
    <section className="py-16 bg-black border-y border-zinc-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={stat.id} className="text-center">
              <h3 className="text-5xl font-black text-red-600 mb-2">{stat.value}{stat.suffix}</h3>
              <p className="text-zinc-500 uppercase font-black text-[10px] tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
