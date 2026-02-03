
import React from 'react';
import { ExternalLink } from 'lucide-react';

const projects = [
    // Placeholder projects - normally passed via props or API
    { id: 1, title: 'Project One', category: 'Web Design', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop', link: '#' },
    { id: 2, title: 'Project Two', category: '3D Visualization', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', link: '#' },
    { id: 3, title: 'Project Three', category: 'Commercial', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2622&auto=format&fit=crop', link: '#' },
    { id: 4, title: 'Project Four', category: 'Motion Graphics', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop', link: '#' },
    { id: 5, title: 'Project Five', category: 'Web Design', image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2564&auto=format&fit=crop', link: '#' },
    { id: 6, title: 'Project Six', category: 'Branding', image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2564&auto=format&fit=crop', link: '#' },
];

const ViewAllProjects: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white pt-20">
            return (
            <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white pt-20">
                <div className="container mx-auto px-6 py-20">
                    <h1 className="text-5xl md:text-7xl font-black mb-8 text-center">
                        Heist <span className="text-red-600">Projects</span>
                    </h1>
                    <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-16">
                        Explore our complete portfolio of digital masterpieces.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Expanded Project List */}
                        {[
                            { id: 1, title: 'Project One', category: 'Web Design', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop', link: '#' },
                            { id: 2, title: 'Project Two', category: '3D Visualization', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', link: '#' },
                            { id: 3, title: 'Project Three', category: 'Commercial', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2622&auto=format&fit=crop', link: '#' },
                            { id: 4, title: 'Project Four', category: 'Motion Graphics', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop', link: '#' },
                            { id: 5, title: 'Project Five', category: 'Web Design', image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2564&auto=format&fit=crop', link: '#' },
                            { id: 6, title: 'Project Six', category: 'Branding', image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2564&auto=format&fit=crop', link: '#' },
                            { id: 7, title: 'Project Seven', category: 'VFX', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2564&auto=format&fit=crop', link: '#' },
                            { id: 8, title: 'Project Eight', category: 'Social Media', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop', link: '#' },
                            { id: 9, title: 'Project Nine', category: 'Product Design', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2670&auto=format&fit=crop', link: '#' },
                        ].map((project) => (
                            <a key={project.id} href={project.link} className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-red-600/50 transition-all block cursor-pointer">
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
                                    <h3 className="text-2xl font-bold mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100 text-white">
                                        {project.title}
                                    </h3>
                                    <div
                                        className="inline-flex items-center gap-2 text-white font-medium hover:text-red-500 transition-colors translate-y-4 group-hover:translate-y-0 duration-300 delay-150"
                                    >
                                        View Project <ExternalLink className="w-4 h-4" />
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAllProjects;
