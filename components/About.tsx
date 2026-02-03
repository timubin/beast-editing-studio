
import React from 'react';
import { Target, Lightbulb, Users } from 'lucide-react';
import { useSiteContent } from '../context/SiteContext';

const About: React.FC = () => {
    const { about } = useSiteContent();

    return (
        <section id="about" className="py-24 bg-zinc-950">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4">WHO WE ARE</p>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                            {about.titleLine1} <span className="text-red-600">{about.titleLine2}</span>
                        </h2>
                        <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                            {about.description1}
                        </p>
                        <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                            {about.description2}
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center border border-red-600/20">
                                    <Target className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                                    <p className="text-zinc-500 text-sm">{about.mission}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center border border-red-600/20">
                                    <Lightbulb className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Our Vision</h3>
                                    <p className="text-zinc-500 text-sm">{about.vision}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative flex items-center justify-center min-h-[400px]">
                        <div className="relative w-80 h-80">
                            {/* Abstract Animated Visualization */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent rounded-full blur-3xl animate-pulse"></div>

                            {/* Rotating Rings */}
                            <div className="absolute inset-0 border border-zinc-800 rounded-full animate-[spin_30s_linear_infinite]">
                                <div className="absolute -top-1 left-1/2 w-2 h-2 bg-red-600 rounded-full shadow-[0_0_10px_#dc2626]"></div>
                            </div>
                            <div className="absolute inset-12 border border-zinc-800 rounded-full animate-[spin_20s_linear_infinite_reverse]">
                                <div className="absolute -bottom-1 left-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                            </div>
                            <div className="absolute inset-24 border border-red-900/30 rounded-full animate-[spin_10s_linear_infinite]"></div>

                            {/* Central Element */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-32 h-32 bg-zinc-950 border border-zinc-800 rounded-full flex items-center justify-center relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-red-600/5 group-hover:bg-red-600/10 transition-colors"></div>
                                    <Users className="w-10 h-10 text-zinc-600 group-hover:text-red-500 transition-colors" />
                                </div>
                            </div>
                        </div>

                        {/* Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-red-600/10 blur-[100px] z-0 pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
