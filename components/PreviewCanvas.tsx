
import React from 'react';
import { WeddingData, Template } from '../types';

interface PreviewCanvasProps {
  data: WeddingData;
  template: Template;
}

export const PreviewCanvas: React.FC<PreviewCanvasProps> = ({ data, template }) => {
  const getFontClass = () => {
    switch(template.fontFamily) {
      case 'serif': return 'font-serif';
      case 'script': return 'font-script';
      default: return 'font-sans';
    }
  };

  return (
    <div 
      className="relative w-full h-full shadow-2xl overflow-hidden mx-auto transition-all duration-500 bg-white"
      style={{ 
        color: template.textColor, 
      }}
    >
      {/* Background Decorative Elements - Green Leafy Branches */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-90 pointer-events-none z-0">
        <img 
          src="https://png.pngtree.com/png-clipart/20230913/original/pngtree-green-leaves-and-branches-on-white-background-illustration-png-image_11060938.png" 
          className="w-full h-full object-contain translate-x-12 -translate-y-8"
          alt="botanical top right"
        />
      </div>
      
      <div className="absolute bottom-20 left-0 w-64 h-64 opacity-90 pointer-events-none z-0">
        <img 
          src="https://png.pngtree.com/png-clipart/20230913/original/pngtree-green-leaves-and-branches-on-white-background-illustration-png-image_11060938.png" 
          className="w-full h-full object-contain -translate-x-12 translate-y-8 rotate-180"
          alt="botanical bottom left"
        />
      </div>

      {/* Subtle background floating elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
         <div className="absolute top-[30%] left-[20%] w-2 h-2 bg-stone-100 rounded-full"></div>
         <div className="absolute top-[15%] right-[40%] w-3 h-3 bg-stone-50 rounded-full"></div>
         <div className="absolute bottom-[40%] right-[25%] w-2 h-2 bg-stone-100 rounded-full"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative h-full flex flex-col items-center justify-center py-16 px-10 z-10">
        
        {/* Header Text */}
        <p className="uppercase tracking-[0.4em] text-[10px] mb-12 font-medium text-stone-600 font-sans">
          WALIMATUL URUS
        </p>
        
        {/* Names Section */}
        <div className={`flex flex-col items-center gap-2 mb-10 ${getFontClass()}`}>
          <h2 className="text-5xl font-light tracking-wide text-stone-800 font-serif">
            {data.groomNick.charAt(0).toUpperCase() + data.groomNick.slice(1).toLowerCase()}
          </h2>
          <span className="text-xl opacity-60 font-serif italic font-light">&</span>
          <h2 className="text-5xl font-light tracking-wide text-stone-800 font-serif">
            {data.brideNick.charAt(0).toUpperCase() + data.brideNick.slice(1).toLowerCase()}
          </h2>
        </div>

        {/* Date Section */}
        <div className="mt-4">
          <p className="text-[11px] tracking-[0.25em] font-medium opacity-80 uppercase text-stone-700 font-sans">
            SELASA • 27.01.26
          </p>
        </div>
      </div>

      {/* Bottom Navigation Bar - Reduced height from 85px to 70px */}
      <div className="absolute bottom-0 inset-x-0 h-[70px] bg-[#e1e3d0] flex items-center justify-around px-6 z-30 border-t border-black/5">
        
        {/* Phone Icon */}
        <div className="flex flex-col items-center justify-center cursor-pointer text-stone-800 hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        </div>

        {/* Play Circle Icon */}
        <div className="flex flex-col items-center justify-center cursor-pointer text-stone-800 hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polygon points="10 8 16 12 10 16 10 8" fill="none"/>
          </svg>
        </div>

        {/* Location Pin Icon */}
        <div className="flex flex-col items-center justify-center cursor-pointer text-stone-800 hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="2.5"/>
          </svg>
        </div>

        {/* Gift Box Icon */}
        <div className="flex flex-col items-center justify-center cursor-pointer text-stone-800 hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="8" width="18" height="13" rx="1"/>
            <path d="M12 8v13"/>
            <path d="M3 12h18"/>
            <path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/>
          </svg>
        </div>

        {/* RSVP Envelope Icon */}
        <div className="flex flex-col items-center justify-center cursor-pointer text-stone-800 hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 8v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V8"/>
            <path d="M20 8l-8 5-8-5"/>
            <rect x="7" y="3" width="10" height="7" rx="0.5" fill="white" stroke="currentColor" strokeWidth="0.8"/>
            <text x="12" y="7.5" fontSize="3" textAnchor="middle" fill="currentColor" fontWeight="bold" style={{fontFamily: 'sans-serif', letterSpacing: '0.2px'}}>RSVP</text>
          </svg>
        </div>

      </div>
    </div>
  );
};
