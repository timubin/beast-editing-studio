
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = "8801944790363"; // Your WhatsApp number

    // Construct the message with proper formatting
    const message = `*New Project Inquiry* 🚀

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Service:* ${formData.service || 'Not specified'}

*Message:*
${formData.message}

--------------------------------
_Sent from Beast Editing Website_`;

    // Create the WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Open in new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4">GET IN TOUCH</p>
          <h2 className="text-5xl md:text-7xl font-black mb-6">Let's Create Something <span className="text-red-600">Amazing</span></h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-lg font-medium">
            Ready to bring your vision to life? Get in touch and let's discuss your project
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-6xl mx-auto items-start">
          {/* Contact Details */}
          <div className="space-y-12">
            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800 group-hover:border-red-600 transition-colors">
                <Mail className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-1">Email Us</p>
                <a href="mailto:beastediting24@gmail.com" className="text-xl font-bold hover:text-red-600 transition-colors">beastediting24@gmail.com</a>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800 group-hover:border-red-600 transition-colors">
                <MapPin className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-1">Location</p>
                <p className="text-xl font-bold">Los Angeles, CA</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800 group-hover:border-red-600 transition-colors">
                <Clock className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-1">Response Time</p>
                <p className="text-xl font-bold">Within 24 hours</p>
              </div>
            </div>

            <div className="p-6 bg-red-600/5 border border-red-600/20 rounded-2xl flex items-start gap-4">
              <div className="w-2 h-2 bg-red-600 rounded-full mt-2 animate-pulse" />
              <p className="text-sm font-medium text-zinc-300">
                <span className="text-red-600 font-bold block mb-1">Quick Response Guaranteed</span>
                We typically respond within a few hours during business days.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-zinc-900/50 p-8 md:p-12 rounded-[2.5rem] border border-zinc-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 focus:border-red-600 outline-none text-sm transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 focus:border-red-600 outline-none text-sm transition-all"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 focus:border-red-600 outline-none text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2">Service Interest</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 focus:border-red-600 outline-none text-sm appearance-none transition-all"
                >
                  <option value="">Select a service...</option>
                  <option value="3D Product Visualization">3D Product Visualization</option>
                  <option value="Motion Graphics">Motion Graphics</option>
                  <option value="Commercial Production">Commercial Production</option>
                  <option value="Web Design">Web Design</option>
                  <option value="Ai - Commercial Package (30s)">Ai - Commercial Package (30s)</option>
                  <option value="Ai - Commercial Package (60s)">Ai - Commercial Package (60s)</option>
                  <option value="Ai - Commercial Package (120s)">Ai - Commercial Package (120s)</option>
                  <option value="Startup Package">Startup Package</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 focus:border-red-600 outline-none text-sm transition-all resize-none"
                  required
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 group">
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
