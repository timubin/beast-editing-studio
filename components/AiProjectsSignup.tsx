import React, { useState } from 'react';
import { useSiteContent } from '../context/SiteContext';

const AiProjectsSignup: React.FC = () => {
    const { pricing, startupPackage, contact } = useSiteContent();
    const packageOptions = [
        ...pricing.map(plan => `${plan.name} AI Commercial`),
        startupPackage.title,
        'Custom AI Solution'
    ];
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        packageName: packageOptions[0] || ''
    });

    const updateField = (field: keyof typeof formData, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const message = `*AI Project Signup*

*Name:* ${formData.firstName} ${formData.lastName}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Package:* ${formData.packageName}

_Sent from Beast Editing Website_`;

        window.open(`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

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
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2">First Name</label>
                                <input value={formData.firstName} onChange={(e) => updateField('firstName', e.target.value)} type="text" placeholder="John" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 focus:border-red-600 outline-none text-sm transition-all" required />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2">Last Name</label>
                                <input value={formData.lastName} onChange={(e) => updateField('lastName', e.target.value)} type="text" placeholder="Doe" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 focus:border-red-600 outline-none text-sm transition-all" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2">Email Address</label>
                            <input value={formData.email} onChange={(e) => updateField('email', e.target.value)} type="email" placeholder="john@example.com" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 focus:border-red-600 outline-none text-sm transition-all" required />
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2">Phone Number</label>
                            <input value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 focus:border-red-600 outline-none text-sm transition-all" />
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2">Select AI Package</label>
                            <select value={formData.packageName} onChange={(e) => updateField('packageName', e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 focus:border-red-600 outline-none text-sm appearance-none transition-all">
                                {packageOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-xl font-black uppercase tracking-widest text-xs transition-all">
                            Sign Up Now
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AiProjectsSignup;
