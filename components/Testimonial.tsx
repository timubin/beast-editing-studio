import React from 'react';
import { Star } from 'lucide-react';
import { useSiteContent } from '../context/SiteContext';

const Testimonial: React.FC = () => {
  const { testimonials } = useSiteContent();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [fade, setFade] = React.useState(true);

  React.useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setFade(true);
      }, 500); // Wait for fade out
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, [testimonials.length]);

  React.useEffect(() => {
    if (currentIndex >= testimonials.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center h-80 flex flex-col justify-center">
          <div className={`transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center justify-center gap-1 mb-10">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-red-600 text-red-600" />
              ))}
            </div>

            <blockquote className="text-3xl md:text-4xl font-black italic mb-10 leading-tight">
              "{testimonials[currentIndex].quote}"
            </blockquote>

            <div className="text-zinc-400">
              <p className="font-black text-white uppercase tracking-widest text-sm">- {testimonials[currentIndex].name}, {testimonials[currentIndex].role}</p>
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setFade(false); setTimeout(() => { setCurrentIndex(idx); setFade(true); }, 300); }}
                className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-red-600 w-6' : 'bg-zinc-800 hover:bg-zinc-600'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
