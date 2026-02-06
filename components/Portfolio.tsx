import React, { useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';
import { useSiteContent } from '../context/SiteContext';

const Portfolio: React.FC = () => {
  const { portfolio } = useSiteContent();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(portfolio.map(p => p.category)))];

  const filteredProjects = activeCategory === "All"
    ? portfolio
    : portfolio.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4">OUR WORK</p>
          <h2 className="text-5xl font-black mb-6">Showreel</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
            A showcase of our best work across 3D, motion graphics, commercials, and web design
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-red-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div key={index} className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-900 cursor-pointer">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-black mb-2">{project.title}</h3>
                  <p className="text-zinc-400 text-sm font-medium mb-4">{project.description}</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                      <Play className="w-4 h-4 fill-white text-white ml-1" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Category tag always visible */}
              <div className="absolute top-4 left-4">
                <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-black uppercase px-3 py-1 rounded-full border border-white/10">
                  {project.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="inline-flex items-center gap-2 border-b-2 border-zinc-800 hover:border-red-600 pb-1 text-sm font-black uppercase tracking-widest transition-all">
            View All Projects <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
