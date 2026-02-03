import React from 'react';
import { Contact } from './';

const AiProjectsSignup: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white pt-20">
            return (
            <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white pt-20">
                <div className="container mx-auto px-6 py-20">
                    <h1 className="text-5xl md:text-7xl font-black mb-8 text-center text-white">
                        AI Projects <span className="text-red-600">Sign Up</span>
                    </h1>
                    <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-16">
                        Join the future of content creation with our AI-powered commercial packages.
                    </p>

                    <div className="bg-zinc-900/50 p-8 md:p-12 rounded-[2.5rem] border border-zinc-800 max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6 text-center">Register Your Interest</h2>
                        {/* Reusing Contact Logic or Custom Form */}
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2">First Name</label>
                                    <input type="text" placeholder="John" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 focus:border-red-600 outline-none text-sm transition-all" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2">Last Name</label>
                                    <input type="text" placeholder="Doe" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 focus:border-red-600 outline-none text-sm transition-all" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2">Email Address</label>
                                <input type="email" placeholder="john@example.com" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 focus:border-red-600 outline-none text-sm transition-all" />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2">Phone Number</label>
                                <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 focus:border-red-600 outline-none text-sm transition-all" />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2">Select AI Package</label>
                                <select className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 focus:border-red-600 outline-none text-sm appearance-none transition-all">
                                    <option>30 Seconds AI Commercial</option>
                                    <option>60 Seconds AI Commercial</option>
                                    <option>120 Seconds AI Commercial</option>
                                    <option>Startup Package</option>
                                    <option>Custom AI Solution</option>
                                </select>
                            </div>

                            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-xl font-black uppercase tracking-widest text-xs transition-all">
                                Sign Up Now
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiProjectsSignup;
