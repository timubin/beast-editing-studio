import React from 'react';

const WhatsAppButton: React.FC = () => {
    return (
        <a
            href="https://wa.me/8801944790363"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-[100] group"
            aria-label="Contact on WhatsApp"
        >
            <div className="relative">
                {/* Pulse Effect */}
                <div className="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-25 group-hover:opacity-50 transition-opacity"></div>

                {/* Button */}
                <div className="relative bg-red-600 w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.5)] group-hover:bg-red-700 group-hover:scale-110 transition-all duration-300">
                    {/* WhatsApp Icon (SVG) */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8 text-white"
                    >
                        <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 2.19.71 4.23 1.92 5.9L2.5 22l4.33-1.35A9.957 9.957 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.79 14.79c-.31.86-1.78 1.58-2.45 1.63-.64.05-1.46.12-4.52-1.1-3.69-1.47-6.09-5.28-6.23-5.48-.15-.2-1.49-1.98-1.49-3.79 0-1.8.94-2.69 1.28-3.05.33-.37.73-.55 1.15-.55.23 0 .43.01.62.05.3.06.66.1.95.84.32.74 1.1 2.7 1.2 2.91.1.21.17.46.04.73-.13.27-.2.43-.4.66-.21.25-.45.41-.64.63-.22.24-.48.51-.21.98.67 1.18 1.34 2.15 2.89 3.52.4.37.89.28 1.22-.11.33-.4.77-1.1.98-1.37.23-.33.6-.36 1.05-.18.47.18 2.95 1.39 3.12 1.48.16.09.28.14.32.22.04.09.04.52-.27 1.38z" clipRule="evenodd" />
                    </svg>
                </div>

                {/* Tooltip */}
                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 bg-zinc-900 text-white px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all pointer-events-none border border-zinc-800">
                    Chat with us
                </div>
            </div>
        </a>
    );
};

export default WhatsAppButton;
