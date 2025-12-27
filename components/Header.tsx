
import React from 'react';
import { ViewMode } from '../types';

interface HeaderProps {
  setView: (view: ViewMode) => void;
  currentView: ViewMode;
}

export const Header: React.FC<HeaderProps> = ({ setView, currentView }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 py-4 px-6 md:px-12 flex justify-between items-center">
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setView(ViewMode.LANDING)}
      >
        <div className="w-10 h-10 bg-stone-900 rounded-full flex items-center justify-center text-white font-serif italic text-xl">I</div>
        <h1 className="text-xl font-bold tracking-tight text-stone-900">istiadat<span className="text-amber-600">.card</span></h1>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-stone-600">
        <button 
          onClick={() => setView(ViewMode.LANDING)}
          className={`hover:text-amber-600 transition-colors ${currentView === ViewMode.LANDING ? 'text-amber-600' : ''}`}
        >
          Home
        </button>
        <button 
          onClick={() => setView(ViewMode.GALLERY)}
          className={`hover:text-amber-600 transition-colors ${currentView === ViewMode.GALLERY ? 'text-amber-600' : ''}`}
        >
          Templates
        </button>
        <button 
          onClick={() => setView(ViewMode.PRICING)}
          className={`hover:text-amber-600 transition-colors ${currentView === ViewMode.PRICING ? 'text-amber-600' : ''}`}
        >
          Pricing
        </button>
      </div>

      <button 
        onClick={() => setView(ViewMode.GALLERY)}
        className="bg-stone-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-stone-800 transition-all transform active:scale-95 shadow-md"
      >
        Create Card
      </button>
    </nav>
  );
};
