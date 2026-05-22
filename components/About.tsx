
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

                    <div className="lg:w-1/2 relative flex items-center justify-center min-h-[500px]">
                        <div className="relative w-80 h-80">
                            {/* Abstract Animated Visualization */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
                            
                            {/* Rotating Rings with different speeds and directions */}
                            <div className="absolute inset-0 border border-zinc-800 rounded-full animate-[spin_30s_linear_infinite]">
                                <div className="absolute -top-1 left-1/2 w-2 h-2 bg-red-600 rounded-full shadow-[0_0_15px_#dc2626]"></div>
                            </div>
                            <div className="absolute inset-8 border border-zinc-900 rounded-full animate-[spin_25s_linear_infinite_reverse] opacity-50"></div>
                            <div className="absolute inset-16 border border-zinc-800 rounded-full animate-[spin_20s_linear_infinite]">
                                <div className="absolute -bottom-1 left-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_15px_white]"></div>
                            </div>
                            <div className="absolute inset-24 border border-red-900/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                            <div className="absolute inset-32 border border-zinc-800 rounded-full animate-[spin_10s_linear_infinite]"></div>
                            
                            {/* Floating Tech Particles */}
                            {[...Array(6)].map((_, i) => (
                                <div 
                                    key={i}
                                    className="absolute w-1 h-1 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_#dc2626]"
                                    style={{
                                        top: `${Math.random() * 100}%`,
                                        left: `${Math.random() * 100}%`,
                                        animationDelay: `${i * 0.5}s`
                                    }}
                                ></div>
                            ))}
                            
                            {/* Central Element with more impact */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-36 h-36 bg-zinc-950 border border-zinc-800 rounded-full flex items-center justify-center relative overflow-hidden group shadow-[0_0_50px_rgba(220,38,38,0.1)]">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 to-transparent group-hover:opacity-100 opacity-50 transition-opacity"></div>
                                    <Users className="w-12 h-12 text-zinc-500 group-hover:text-red-600 transition-all duration-500 group-hover:scale-110" />
                                    
                                    {/* Scanning effect */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-600/10 to-transparent h-1/2 w-full -translate-y-full group-hover:animate-[scan_2s_linear_infinite]"></div>
                                </div>
                            </div>
                        </div>

                        {/* Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-red-600/5 blur-[120px] z-0 pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
