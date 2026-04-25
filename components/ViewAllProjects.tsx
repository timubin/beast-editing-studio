import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useSiteContent } from '../context/SiteContext';

const ViewAllProjects: React.FC = () => {
    const { portfolio } = useSiteContent();

    return (
        <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white pt-20">
            <div className="container mx-auto px-6 py-20">
                <h1 className="text-5xl md:text-7xl font-black mb-8 text-center">
                    Beast <span className="text-red-600">Projects</span>
                </h1>
                <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-16">
                    Explore our complete portfolio of digital masterpieces.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolio.map((project) => (
                        <a key={project.id} href="#contact" className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-red-600/50 transition-all block cursor-pointer">
                            <div className="aspect-video overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                                <span className="text-red-600 text-xs font-bold uppercase tracking-wider mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                    {project.category}
                                </span>
                                <h3 className="text-2xl font-bold mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100 text-white">
                                    {project.title}
                                </h3>
                                <p className="text-zinc-300 text-sm mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                                    {project.description}
                                </p>
                                <div className="inline-flex items-center gap-2 text-white font-medium hover:text-red-500 transition-colors translate-y-4 group-hover:translate-y-0 duration-300 delay-150">
                                    Discuss Project <ExternalLink className="w-4 h-4" />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewAllProjects;
