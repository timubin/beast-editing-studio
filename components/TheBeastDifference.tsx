
import React from 'react';
import { Award, Clock, Users, Zap, ShieldCheck, Heart } from 'lucide-react';

const differences = [
  {
    title: "Premium Quality",
    description: "We deliver nothing but the highest quality work that exceeds expectations.",
    icon: Award
  },
  {
    title: "Fast Turnaround",
    description: "Quick delivery without compromising on quality. We respect your deadlines.",
    icon: Clock
  },
  {
    title: "Dedicated Support",
    description: "Personal attention for every project with direct communication throughout.",
    icon: Users
  },
  {
    title: "Cutting-Edge Tech",
    description: "Using the latest tools and technologies to create stunning visual content.",
    icon: Zap
  },
  {
    title: "Proven Results",
    description: "Track record of success with 500+ projects and countless satisfied clients.",
    icon: ShieldCheck
  },
  {
    title: "100% Satisfaction",
    description: "We're not happy until you are. Full revisions until you're completely satisfied.",
    icon: Heart
  }
];

const TheBeastDifference: React.FC = () => {
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
          {differences.map((diff, index) => (
            <div key={index} className="p-8 border-l-2 border-zinc-900 hover:border-red-600 bg-zinc-950/30 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl text-zinc-700 group-hover:text-red-600 group-hover:opacity-20 transition-all select-none">
                0{index + 1}
              </div>
              <div className="mb-6 text-red-600 relative z-10">
                <diff.icon className="w-10 h-10 group-hover:scale-110 transition-transform" />
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
