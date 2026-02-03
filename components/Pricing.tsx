
import React from 'react';
import { Zap, Check, Sparkles, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: "30 Seconds",
    duration: "DURATION",
    price: "599",
    features: ["AI Scripting", "Professional Voice Over", "Sound Design", "Full Animation", "Video Production", "SFX & VFX"],
    icon: Zap,
    isPopular: false
  },
  {
    name: "60 Seconds",
    duration: "DURATION",
    price: "1199",
    features: ["AI Scripting", "Professional Voice Over", "Sound Design", "Full Animation", "Video Production", "SFX & VFX"],
    icon: Sparkles,
    isPopular: true
  },
  {
    name: "120 Seconds",
    duration: "DURATION",
    price: "1999",
    features: ["AI Scripting", "Professional Voice Over", "Sound Design", "Full Animation", "Video Production", "SFX & VFX"],
    icon: Crown,
    isPopular: false
  }
];

const Pricing: React.FC = () => {
  return (
    <section className="py-24 bg-zinc-950/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4">PRICING</p>
          <h2 className="text-3xl md:text-5xl font-black mb-6">AI-Powered Commercial Production</h2>
          <p className="text-zinc-500 max-w-3xl mx-auto text-lg">
            Complete commercial creation: Scripting • Voice Over • Sound Design • Animation • Video • SFX • VFX
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-zinc-900 border ${plan.isPopular ? 'border-red-600 scale-105 shadow-2xl shadow-red-600/10' : 'border-zinc-800'} p-6 md:p-10 rounded-3xl flex flex-col`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full">
                  Most Popular
                </div>
              )}
              {plan.name === "120 Seconds" && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full">
                  Best Value
                </div>
              )}

              <div className="flex flex-col items-center mb-10">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 bg-zinc-800 ${plan.isPopular ? 'text-red-600' : 'text-red-600'}`}>
                  <plan.icon className="w-6 h-6" />
                </div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">{plan.duration}</p>
                <h3 className="text-2xl font-black mb-4">{plan.name}</h3>
                <div className="flex items-start gap-1">
                  <span className="text-sm font-bold mt-1 text-zinc-500">$</span>
                  <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                </div>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span className="text-sm text-zinc-400 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Link to="/ai-signup" className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all block text-center ${plan.isPopular ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-black border border-zinc-800 hover:border-red-600 text-white'}`}>
                Purchase Now
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center mt-12 text-zinc-500 text-sm">
          Need a custom package? <a href="#" className="text-red-600 font-bold hover:underline">Contact us</a> for a personalized quote.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
