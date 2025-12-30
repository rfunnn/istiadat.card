
import React, { useState, useRef, useEffect } from 'react';
import { ViewMode } from '../types';
import { User, LogOut, Library, ChevronDown, UserCircle, Heart } from 'lucide-react';

interface HeaderProps {
  setView: (view: ViewMode) => void;
  currentView: ViewMode;
}

export const Header: React.FC<HeaderProps> = ({ setView, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: 'Home', view: ViewMode.LANDING },
    { label: 'Templates', view: ViewMode.GALLERY },
    { label: 'Pricing', view: ViewMode.PRICING },
  ];

  const handleNav = (view: ViewMode) => {
    setView(view);
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        
        <div className="flex items-center gap-4 pl-4 border-l border-stone-100">
          <button 
            onClick={() => handleNav(ViewMode.GALLERY)}
            className="bg-stone-900 text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-stone-800 transition-all transform active:scale-95 shadow-lg uppercase tracking-widest"
          >
            Create Card
          </button>

          {/* User Profile Section */}
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1 pr-3 bg-stone-50 rounded-full border border-stone-100 hover:bg-stone-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-stone-600">
                <User className="w-4 h-4" />
              </div>
              <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden animate-in fade-in slide-in-from-top-2">
                <div className="p-4 border-b border-stone-50 bg-stone-50/50">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Signed in as</p>
                  <p className="text-sm font-bold text-stone-900 truncate">user@istiadat.card</p>
                </div>
                <div className="p-2">
                  <button 
                    onClick={() => handleNav(ViewMode.MY_COLLECTIONS)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-50 rounded-xl transition-colors text-left"
                  >
                    <Library className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">My Collections</span>
                  </button>
                  <button 
                    onClick={() => handleNav(ViewMode.MY_LIKES)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-50 rounded-xl transition-colors text-left"
                  >
                    <Heart className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">My Likes</span>
                  </button>
                  <button 
                    onClick={() => window.location.reload()}
                    className="w-full flex items-center gap-3 px-4 py-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors text-left border-t border-stone-50 mt-1 pt-3"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
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
          <div className="flex items-center gap-4 pb-6 border-b border-stone-50">
             <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
               <UserCircle className="w-8 h-8" />
             </div>
             <div>
               <p className="font-bold text-stone-900">User Profile</p>
               <p className="text-xs text-stone-400">user@istiadat.card</p>
             </div>
          </div>
          
          <div className="flex flex-col gap-4">
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
              onClick={() => handleNav(ViewMode.MY_COLLECTIONS)}
              className={`flex items-center gap-3 text-left text-sm font-bold uppercase tracking-widest ${currentView === ViewMode.MY_COLLECTIONS ? 'text-amber-600' : 'text-stone-500'}`}
            >
              <Library className="w-4 h-4" /> My Collections
            </button>
            <button 
              onClick={() => handleNav(ViewMode.MY_LIKES)}
              className={`flex items-center gap-3 text-left text-sm font-bold uppercase tracking-widest ${currentView === ViewMode.MY_LIKES ? 'text-amber-600' : 'text-stone-500'}`}
            >
              <Heart className="w-4 h-4" /> My Likes
            </button>
          </div>

          <div className="pt-4 flex flex-col gap-4">
            <button 
              onClick={() => handleNav(ViewMode.GALLERY)}
              className="bg-stone-900 text-white w-full py-4 rounded-full text-sm font-bold uppercase tracking-widest"
            >
              Create My Invitation
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-4 rounded-full text-sm font-bold uppercase tracking-widest text-rose-500 border border-rose-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
