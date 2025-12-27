
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
      className="relative w-full h-full overflow-hidden mx-auto bg-white flex flex-col items-center"
      style={{ color: template.textColor }}
    >
      {/* Decorative Dots - matching the image */}
      <div className="absolute inset-0 pointer-events-none z-0">
         <div className="absolute top-[20%] left-[60%] w-2 h-2 bg-[#f0f0f0] rounded-full"></div>
         <div className="absolute top-[35%] left-[30%] w-2 h-2 bg-[#f4f4f4] rounded-full"></div>
         {/* Template specific decor - made subtle */}
         <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
           <img src="https://png.pngtree.com/png-clipart/20230913/original/pngtree-green-leaves-and-branches-on-white-background-illustration-png-image_11060938.png" className="w-full h-full object-contain" alt="" />
         </div>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1 flex flex-col items-center justify-center py-16 px-6 z-10 w-full">
        
        {/* Header Label */}
        <p className="uppercase tracking-[0.3em] text-[9px] md:text-[10px] mb-12 font-bold text-stone-400 font-sans">
          WALIMATUL URUS
        </p>
        
        {/* Names Section */}
        <div className={`flex flex-col items-center gap-1 mb-12 text-[#2a2826] ${getFontClass()}`}>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight leading-none mb-1">
            {data.groomNick}
          </h2>
          <span className="text-lg md:text-2xl font-serif italic text-stone-300">&</span>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight leading-none">
            {data.brideNick}
          </h2>
        </div>

        {/* Date Section */}
        <div className="mt-8 border-t border-stone-50 pt-8 w-1/2 flex justify-center">
          <p className="text-[9px] md:text-[10px] tracking-[0.2em] font-bold uppercase text-stone-400 font-sans">
            SELASA • 27.01.26
          </p>
        </div>
      </div>

      {/* Bottom Navigation Bar - Updated to match screenshot pill style */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-[56px] bg-[#f0f2e0] rounded-2xl flex items-center justify-around px-4 z-30 shadow-sm border border-white/20">
        
        <div className="text-stone-600 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        </div>

        <div className="text-stone-600 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polygon points="10 8 16 12 10 16 10 8"/>
          </svg>
        </div>

        <div className="text-stone-600 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>

        <div className="text-stone-600 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 12V8H4v4"/>
            <rect x="2" y="12" width="20" height="8" rx="2"/>
            <path d="M12 12V8M12 4v4"/>
          </svg>
        </div>

        <div className="text-stone-600 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </div>

      </div>
    </div>
  );
};
