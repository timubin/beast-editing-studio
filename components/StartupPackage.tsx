
import React from 'react';
import { Rocket, Check, Globe, Layout, Mail, Camera, Palette, Box } from 'lucide-react';

const StartupPackage: React.FC = () => {
  const items = [
    { icon: Globe, text: "3-Page Professional Website" },
    { icon: Layout, text: "Domain Registration" },
    { icon: Mail, text: "Web Hosting (1 year)" },
    { icon: Palette, text: "Business Email Setup" },
    { icon: Box, text: "Custom Logo Design" },
    { icon: Camera, text: "Brand Slogan Development" },
    { icon: FileText, text: "5 Poster Designs (web & social media)" },
    { icon: Video, text: "2x 30-Second Video Ads" }
  ];

  function FileText(props: any) { return <Layout {...props} /> }
  function Video(props: any) { return <Camera {...props} /> }

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-br from-red-950/40 to-black border border-red-900/30 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="text-center mb-16 relative z-10">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-red-600/40">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6">Complete Startup Package</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-medium">
              Everything you need to launch your brand and make a powerful first impression
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl mx-auto relative z-10">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-4 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                <div className="w-10 h-10 bg-zinc-950 rounded-lg flex items-center justify-center border border-red-900/30">
                  <item.icon className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-grow flex items-center justify-between">
                  <span className="text-sm font-bold text-zinc-100">{item.text}</span>
                  <Check className="w-4 h-4 text-red-600" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 relative z-10">
            <button className="bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-xl text-lg font-black uppercase tracking-widest transition-all shadow-xl shadow-red-600/30 active:scale-95 flex items-center gap-3 mx-auto">
              <Rocket className="w-6 h-6" /> Get Started
            </button>
            <p className="mt-6 text-zinc-500 text-sm font-medium italic">Free consultation included</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartupPackage;
