
import React, { useState } from 'react';
import { ViewMode } from '../types';

interface HeaderProps {
  setView: (view: ViewMode) => void;
  currentView: ViewMode;
}

export const Header: React.FC<HeaderProps> = ({ setView, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', view: ViewMode.LANDING },
    { label: 'Templates', view: ViewMode.GALLERY },
    { label: 'Pricing', view: ViewMode.PRICING },
  ];

  const handleNav = (view: ViewMode) => {
    setView(view);
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-[100] bg-white/90 backdrop-blur-md border-b border-stone-100 py-3 px-4 md:px-12 flex justify-between items-center">
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => handleNav(ViewMode.LANDING)}
      >
        <div className="w-8 h-8 md:w-10 md:h-10 bg-stone-900 rounded-full flex items-center justify-center text-white font-serif italic text-base md:text-xl">I</div>
        <h1 className="text-lg md:text-xl font-bold tracking-tight text-stone-900">istiadat<span className="text-amber-600">.card</span></h1>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-stone-500">
        {navItems.map((item) => (
          <button 
            key={item.label}
            onClick={() => handleNav(item.view)}
            className={`hover:text-amber-600 transition-colors ${currentView === item.view ? 'text-amber-600' : ''}`}
          >
            {item.label}
          </button>
        ))}
        <button 
          onClick={() => handleNav(ViewMode.GALLERY)}
          className="bg-stone-900 text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-stone-800 transition-all transform active:scale-95 shadow-lg uppercase tracking-widest"
        >
          Create Card
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden p-2 text-stone-600"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {isMenuOpen ? <line x1="18" y1="6" x2="6" y2="18" /> : <line x1="3" y1="12" x2="21" y2="12" />}
          {!isMenuOpen && <line x1="3" y1="6" x2="21" y2="6" />}
          {!isMenuOpen && <line x1="3" y1="18" x2="21" y2="18" />}
        </svg>
      </button>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-stone-100 p-6 flex flex-col gap-6 shadow-2xl md:hidden animate-in slide-in-from-top duration-300">
          {navItems.map((item) => (
            <button 
              key={item.label}
              onClick={() => handleNav(item.view)}
              className={`text-left text-sm font-bold uppercase tracking-widest ${currentView === item.view ? 'text-amber-600' : 'text-stone-500'}`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => handleNav(ViewMode.GALLERY)}
            className="bg-stone-900 text-white w-full py-4 rounded-full text-sm font-bold uppercase tracking-widest"
          >
            Create My Invitation
          </button>
        </div>
      )}
    </nav>
  );
};
