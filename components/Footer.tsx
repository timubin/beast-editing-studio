
import React from 'react';
import { Instagram, Twitter, Youtube, Linkedin, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    {
      title: "Services",
      links: ["3D Visualization", "Motion Graphics", "Commercial Video", "Web Design"]
    },
    {
      title: "Company",
      links: ["About Us", "Portfolio", "Pricing", "Blog", "Contact"]
    },
    {
      title: "Packages",
      links: ["AI Commercials", "Startup Package", "Custom Projects"]
    }
  ];

  return (
    <footer className="bg-black pt-24 pb-12 border-t border-zinc-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-2">
              <img src="/logo/beast-logo.png" alt="Beast Studios" className="h-10 w-auto object-contain" />
              <span className="text-2xl font-black tracking-tighter text-white">
                BEAST<span className="text-red-600">.</span>
              </span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mb-8">
              Premium visual content creation studio specializing in 3D, motion graphics, and commercial video production.
            </p>
            <div className="space-y-2 mb-8">
              <p className="text-zinc-400 text-sm hover:text-white transition-colors"><strong className="text-white">Email:</strong> beastediting24@gmail.com</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/beastediting.studio/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400 hover:text-red-600 hover:bg-zinc-800 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@BeastEditingstudio" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400 hover:text-red-600 hover:bg-zinc-800 transition-all">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/103732769/admin/dashboard/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400 hover:text-red-600 hover:bg-zinc-800 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {footerLinks.map((group, index) => (
            <div key={index}>
              <h4 className="text-xs font-black uppercase tracking-widest text-zinc-100 mb-6">{group.title}</h4>
              <ul className="space-y-4">
                {group.links.map((link, i) => (
                  <li key={i}>
                    {link === "Privacy Policy" ? (
                      <Link to="/privacy" className="text-zinc-500 text-sm hover:text-red-600 transition-colors">{link}</Link>
                    ) : link === "Terms of Service" ? (
                      <Link to="/terms" className="text-zinc-500 text-sm hover:text-red-600 transition-colors">{link}</Link>
                    ) : link === "Blog" ? (
                      <Link to="/blog" className="text-zinc-500 text-sm hover:text-red-600 transition-colors">{link}</Link>
                    ) : (
                      <a href="#" className="text-zinc-500 text-sm hover:text-red-600 transition-colors">{link}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-zinc-900">
          <p className="text-zinc-600 text-xs mb-4 md:mb-0 flex items-center gap-2">
            <span>© 2024 Beast Editing Studio. All rights reserved.</span>
            <span className="w-1 h-1 bg-zinc-800 rounded-full"></span>
            <span className="opacity-50">Based in Bangladesh</span>
          </p>
          <div className="flex items-center gap-8 mb-4 md:mb-0">
            <Link to="/privacy" className="text-zinc-600 text-xs hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-zinc-600 text-xs hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400 hover:text-red-600 border border-zinc-800 transition-all"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
