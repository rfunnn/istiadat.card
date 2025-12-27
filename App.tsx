
import React, { useState, useEffect } from 'react';
import { ViewMode, WeddingData, Template } from './types';
import { TEMPLATES, INITIAL_WEDDING_DATA } from './constants';
import { Header } from './components/Header';
import { PreviewCanvas } from './components/PreviewCanvas';
import { EditorPanel } from './components/EditorPanel';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.LANDING);
  const [weddingData, setWeddingData] = useState<WeddingData>(INITIAL_WEDDING_DATA);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(TEMPLATES[0]);
  const [editorTab, setEditorTab] = useState<'edit' | 'preview'>('edit');
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  
  // Gallery Filters
  const [showFilters, setShowFilters] = useState(false);
  const [personalizationName, setPersonalizationName] = useState('Adam & Hawa');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const [sortBy, setSortBy] = useState('By Latest');

  const [occasionIndex, setOccasionIndex] = useState(0);
  const occasions = ['wedding', 'business', 'aqiqah', 'tahlil', 'birthday', 'open house'];

  // Scroll to top on every view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  useEffect(() => {
    if (view === ViewMode.LANDING) {
      const interval = setInterval(() => {
        setOccasionIndex((prev) => (prev + 1) % occasions.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [view]);

  const features = [
    { label: 'Contacts', left: 'WhatsApp', right: 'Phone Call' },
    { label: 'Calendar', left: 'Google Cal', right: 'iCloud' },
    { label: 'Navigation', left: 'Google Maps', right: 'Waze' },
    { label: 'Countdown', left: 'Live Timer', right: 'Save Date' },
    { label: 'RSVP/Wishes', left: 'Guestbook', right: 'Send RSVP' },
    { label: 'Animated Effect', left: 'Sakura', right: 'Snowfall' },
    { label: 'Song', left: 'Pause/Play', right: 'Volume' },
    { label: 'Gallery', left: 'Fullscreen', right: 'Download' },
    { label: 'Wishlist', left: 'Registry', right: 'Contribute' },
    { label: 'Money Gift', left: 'QR Pay', right: 'Bank Info' }
  ];

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setView(ViewMode.EDITOR);
  };

  const handleSetName = () => {
    const parts = personalizationName.split('&');
    if (parts.length >= 2) {
      setWeddingData({
        ...weddingData,
        groomNick: parts[0].trim(),
        brideNick: parts[1].trim()
      });
    } else {
      setWeddingData({
        ...weddingData,
        groomNick: personalizationName.trim(),
        brideNick: ""
      });
    }
  };

  const categories = [
    'All', 'Baby', 'Party', 'Ramadan', 'Raya', 'Floral', 'Islamic', 
    'Minimalist', 'Modern', 'Rustic', 'Traditional', 'Vintage', 'Watercolor'
  ];

  const PhoneMockup = ({ tilted = 0, className = "", template, scale = 1, borderColor = "#1a1c18" }: { tilted?: number, className?: string, template: Template, scale?: number, borderColor?: string }) => (
    <div 
      className={`relative w-[240px] md:w-[280px] h-[500px] md:h-[580px] bg-white rounded-[3rem] p-2 md:p-3 shadow-2xl border-[10px] flex flex-col overflow-hidden transition-all duration-500 ${className}`}
      style={{ 
        transform: `scale(${scale}) rotate(${tilted}deg)`,
        borderColor: borderColor
      }}
    >
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 md:w-28 h-5 md:h-7 bg-[#1a1c18] rounded-3xl z-40"></div>
      <div className="flex-1 bg-white rounded-[2.5rem] overflow-hidden relative">
        <PreviewCanvas data={weddingData} template={template} />
      </div>
    </div>
  );

  const renderLanding = () => (
    <div className="min-h-screen bg-[#fdfcfb] text-[#2a2826] overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-60">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-[#e8f3ed] rounded-full blur-[140px]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-[#f4f1ed] rounded-full blur-[120px]"></div>
      </div>

      <section className="relative flex items-center px-6 md:px-12 lg:px-24 pt-4 md:pt-8 pb-12 md:pb-24">
        <div className="relative z-20 w-full grid lg:grid-cols-12 gap-12 lg:gap-8 items-center max-w-7xl mx-auto">
          
          {/* Column 1 - Text Content */}
          <div className="lg:col-span-6 relative z-30 flex flex-col items-center lg:items-start space-y-8 md:space-y-10 text-center lg:text-left">
            <div className="space-y-4 md:space-y-6 w-full flex flex-col items-center lg:items-start">
              <div className="inline-flex items-center gap-4 px-6 md:px-8 py-3 bg-white border border-stone-100 rounded-full shadow-sm">
                <span className="text-stone-500 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">Exquisite Invitations</span>
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#2a2826] tracking-tight leading-[1.05]">
                Digital Invitation <br /> 
                <span className="italic font-light text-[#6b7c72]">For Various Occasions</span>
              </h2>
              <div className="h-20 md:h-32 flex items-center overflow-hidden justify-center lg:justify-start">
                <span 
                  className="text-6xl md:text-8xl lg:text-9xl font-serif text-[#1a1c18] capitalize tracking-tighter whitespace-nowrap opacity-0 animate-[fade-in_0.5s_ease-in_forwards]" 
                  key={occasionIndex}
                >
                  {occasions[occasionIndex]}
                </span>
              </div>
            </div>
            
            <p className="hidden md:block text-stone-500 text-base md:text-xl leading-relaxed md:max-w-xl font-serif italic lg:pr-12 mt-10">
              Transform your most precious moments into a sophisticated digital experience. Elegant, interactive, and timeless.
            </p>

            {/* Desktop Button - Hidden on mobile */}
            <div className="hidden lg:flex w-full justify-start">
              <button 
                onClick={() => setView(ViewMode.GALLERY)} 
                className="lg:w-auto bg-[#1a1c18] text-white px-16 py-5 rounded-full font-bold text-xs uppercase tracking-[0.25em] shadow-2xl transition-all hover:scale-105 hover:bg-[#2a2826] active:scale-95 cursor-pointer"
              >
                Try Now For Free
              </button>
            </div>
          </div>

          {/* Column 2 - Phone Showcase + Mobile Button integrated */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center z-10">
            <div className="relative w-full h-[280px] md:h-[600px] lg:h-[700px] flex items-center justify-center lg:justify-end">
              
              <div className="lg:hidden relative w-full h-full flex items-center justify-center">
                <div className="absolute -translate-x-12 -translate-y-4">
                  <PhoneMockup 
                    template={TEMPLATES[1]} 
                    scale={0.35} 
                    tilted={-12}
                    borderColor="#e5e7eb"
                    className="grayscale opacity-20"
                  />
                </div>
                <div className="relative z-10 translate-x-4">
                  <PhoneMockup 
                    template={TEMPLATES[0]} 
                    scale={0.45}
                    className="shadow-xl" 
                  />
                </div>
              </div>

              <div className="hidden lg:flex relative w-full h-full items-center justify-end">
                <div className="absolute -translate-x-48 -translate-y-16">
                  <PhoneMockup 
                    template={TEMPLATES[1]} 
                    scale={0.7} 
                    tilted={-15}
                    borderColor="#e5e7eb"
                    className="grayscale opacity-20"
                  />
                </div>
                <div className="relative z-10 mr-4">
                  <PhoneMockup 
                    template={TEMPLATES[0]} 
                    scale={0.9}
                    className="shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)]" 
                  />
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[80%] bg-[#6b7c72]/5 rounded-full blur-[100px] -z-20"></div>
            </div>

            {/* Mobile Button - Integrated inside this column to be closer to the image */}
            <div className="lg:hidden w-full flex justify-center py-4 relative z-50">
              <button 
                onClick={() => setView(ViewMode.GALLERY)} 
                className="w-full max-w-[280px] bg-[#1a1c18] text-white px-10 py-5 rounded-full font-bold text-xs uppercase tracking-[0.25em] shadow-2xl transition-all hover:scale-105 hover:bg-[#2a2826] active:scale-95 cursor-pointer"
              >
                Try Now For Free
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Core Features Section */}
      <section className="relative py-24 md:py-32 bg-[#f4f9f7] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block mb-8 px-10 py-3 bg-white border border-stone-100 rounded-full shadow-sm">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] text-stone-500">Platform Highlights</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif text-[#2a2826] mb-16 tracking-tight">Core Features</h2>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-20 max-w-4xl mx-auto">
            {features.map((feature, i) => (
              <button 
                key={i} 
                onClick={() => setActiveFeatureIndex(i)}
                className={`px-6 md:px-8 py-3.5 md:py-4 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] border transition-all duration-300 shadow-sm ${activeFeatureIndex === i ? 'bg-[#1a1c18] text-white border-[#1a1c18] shadow-xl' : 'bg-white text-stone-400 border-stone-100 hover:border-stone-200'}`}
              >
                {feature.label}
              </button>
            ))}
          </div>

          <div className="relative inline-block">
            <div className="relative z-10 w-[240px] md:w-[320px] aspect-[9/19] bg-white rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border-[12px] border-[#1a1c18] shadow-[0_60px_120px_-30px_rgba(26,28,24,0.15)] mx-auto transition-transform duration-700">
               <PreviewCanvas data={weddingData} template={TEMPLATES[5]} />
            </div>

            <div className="absolute left-[-100px] md:left-[-180px] top-[25%] transition-all duration-500 hidden lg:block" key={`left-${activeFeatureIndex}`}>
              <div className="bg-white/95 backdrop-blur-xl px-8 py-5 rounded-[2rem] shadow-2xl border border-stone-100 flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-[#6b7c72] animate-pulse"></div>
                <p className="text-[#2a2826] font-bold text-sm md:text-lg whitespace-nowrap tracking-tight">{features[activeFeatureIndex].left}</p>
              </div>
            </div>

            <div className="absolute right-[-100px] md:right-[-180px] top-[65%] transition-all duration-500 hidden lg:block" key={`right-${activeFeatureIndex}`}>
              <div className="bg-white/95 backdrop-blur-xl px-8 py-5 rounded-[2rem] shadow-2xl border border-stone-100 flex items-center gap-4">
                <p className="text-[#2a2826] font-bold text-sm md:text-lg whitespace-nowrap tracking-tight">{features[activeFeatureIndex].right}</p>
                <div className="w-3 h-3 rounded-full bg-[#d4af37] animate-pulse"></div>
              </div>
            </div>
            
            <div className="absolute left-[-60px] top-[30%] transition-all duration-500 hidden sm:block lg:hidden" key={`left-tablet-${activeFeatureIndex}`}>
              <div className="bg-white/95 backdrop-blur-xl px-4 py-3 rounded-xl shadow-lg border border-stone-100 flex items-center gap-2">
                <p className="text-[#2a2826] font-bold text-xs whitespace-nowrap">{features[activeFeatureIndex].left}</p>
              </div>
            </div>
            <div className="absolute right-[-60px] top-[60%] transition-all duration-500 hidden sm:block lg:hidden" key={`right-tablet-${activeFeatureIndex}`}>
              <div className="bg-white/95 backdrop-blur-xl px-4 py-3 rounded-xl shadow-lg border border-stone-100 flex items-center gap-2">
                <p className="text-[#2a2826] font-bold text-xs whitespace-nowrap">{features[activeFeatureIndex].right}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderGallery = () => {
    const filteredTemplates = TEMPLATES.filter(tpl => {
      const categoryMatch = selectedCategories.includes('All') || selectedCategories.includes(tpl.category);
      return categoryMatch;
    });

    return (
      <div className="max-w-[1200px] mx-auto px-4 py-12 flex flex-col items-center bg-white min-h-screen">
        
        {/* FILTERS Button */}
        <div className="mb-8 w-full flex justify-center">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-8 py-3 bg-white border border-stone-300 rounded-xl text-stone-700 text-sm font-bold tracking-widest uppercase hover:bg-stone-50 transition-all shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            Filters
          </button>
        </div>

        {/* Filter Drawer / Dropdown */}
        {showFilters && (
          <div className="w-full max-w-2xl bg-stone-50 p-8 rounded-[2rem] mb-12 border border-stone-100 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-widest text-stone-500">Sort By</h4>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-4 border border-stone-200 rounded-xl bg-white text-sm outline-none focus:border-[#6b7c72] transition-colors"
                >
                  <option>By Latest</option>
                  <option>Most Popular</option>
                  <option>Name A-Z</option>
                </select>
              </div>
              <div className="space-y-6">
                <h4 className="font-bold text-sm uppercase tracking-widest text-stone-500">Themes</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button 
                      key={cat} 
                      onClick={() => {
                        if (cat === 'All') setSelectedCategories(['All']);
                        else {
                          const newCats = selectedCategories.filter(c => c !== 'All');
                          if (newCats.includes(cat)) {
                            const filtered = newCats.filter(c => c !== cat);
                            setSelectedCategories(filtered.length === 0 ? ['All'] : filtered);
                          } else {
                            setSelectedCategories([...newCats, cat]);
                          }
                        }
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${selectedCategories.includes(cat) ? 'bg-[#1a1c18] text-white border-[#1a1c18]' : 'bg-white text-stone-500 border-stone-200'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Personalization Card */}
        <div className="w-full max-w-2xl bg-[#f4f7f8] p-10 rounded-[2.5rem] space-y-8 mb-20 text-center">
          <h3 className="font-bold text-2xl text-[#2a2826] leading-tight max-w-md mx-auto">
            Set your name(s) for a personalised preview
          </h3>
          <div className="space-y-4 max-w-sm mx-auto">
            <input 
              type="text" 
              value={personalizationName}
              onChange={(e) => setPersonalizationName(e.target.value)}
              placeholder="Adam & Hawa"
              className="w-full p-4 rounded-xl border border-stone-200 bg-white outline-none text-center text-stone-400 placeholder-stone-300 font-medium"
            />
            <button 
              onClick={handleSetName}
              className="w-full bg-white text-[#1a1c18] border border-stone-300 py-4 rounded-xl font-bold text-sm uppercase tracking-[0.2em] hover:bg-stone-50 transition-all shadow-sm"
            >
              Set Name
            </button>
          </div>
        </div>

        {/* Grid Layer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16 w-full">
          {filteredTemplates.map((tpl) => (
            <div key={tpl.id} className="flex flex-col items-center group">
              <div className="relative w-full aspect-square bg-[#f3f6f8] rounded-[2.5rem] flex items-center justify-center p-6 mb-6 transition-all group-hover:bg-[#ebf0f3] overflow-hidden">
                <div className="w-full h-full scale-[0.6] transform translate-y-4">
                  <div className="relative w-full h-full bg-white rounded-3xl border-[6px] border-[#1a1c18] shadow-2xl overflow-hidden flex flex-col items-center">
                    <div className="w-12 h-2 bg-[#1a1c18] rounded-full mt-2 mb-4"></div>
                    <PreviewCanvas data={weddingData} template={tpl} />
                  </div>
                </div>
              </div>
              
              <div className="text-center space-y-4 w-full">
                <h4 className="font-bold text-xl text-[#2a2826] tracking-wide">{tpl.id}</h4>
                <button 
                  onClick={() => handleSelectTemplate(tpl)} 
                  className="w-full max-w-[120px] mx-auto py-3 border-2 border-stone-800 text-stone-800 rounded-xl text-[10px] font-bold uppercase tracking-[0.1em] hover:bg-stone-800 hover:text-white transition-all"
                >
                  Try Now
                </button>
                <div className="flex justify-center gap-4 text-stone-400 mt-2">
                  <button className="hover:text-stone-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                  <button className="hover:text-red-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPricing = () => (
    <div className="min-h-screen bg-[#fdfcfb] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-6">
          <span className="text-[#6b7c72] text-[10px] font-bold tracking-[0.5em] uppercase">Invest in Memories</span>
          <h2 className="text-5xl md:text-6xl font-serif text-[#2a2826]">Pricing Plans</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { name: 'Bronze', price: 'RM30', features: ['Calendar', 'Contacts', 'Countdown', 'Navigation', 'Song'], rank: '🥉', theme: '#f4f1ed' },
            { name: 'Silver', price: 'RM40', features: ['All Bronze Features', 'Effects', 'Attendance', 'RSVP/Wish'], rank: '🥈', theme: '#e8f3ed' },
            { name: 'Gold', price: 'RM60', features: ['All Silver Features', 'Photo Gallery', 'Money Gift', 'Wishlist', 'Custom Link'], rank: '🥇', theme: '#fdf2f8' }
          ].map((pkg, i) => (
            <div key={i} className="bg-white p-12 rounded-[2.5rem] shadow-lg flex flex-col items-center border border-[#e8f3ed] hover:-translate-y-4 transition-transform duration-500">
              <div className="w-20 h-20 rounded-full mb-8 flex items-center justify-center text-3xl shadow-inner" style={{ backgroundColor: pkg.theme }}>
                {pkg.rank}
              </div>
              <h3 className="text-3xl font-serif mb-8 text-[#2a2826]">{pkg.name}</h3>
              <div className="flex-1 space-y-5 text-center text-[#6b7c72] text-sm mb-12">
                {pkg.features.map((f, j) => <p key={j} className="font-medium">{f}</p>)}
              </div>
              <div className="text-4xl font-serif text-[#1a1c18] mb-10">{pkg.price}</div>
              <button className="w-full py-5 bg-[#1a1c18] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-[#2a2826] transition-all">Select Plan</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEditor = () => (
    <div className="bg-[#f4f7f5] min-h-[calc(100vh-80px)] px-4 md:px-12 py-12">
      <div className="lg:hidden sticky top-20 z-40 flex bg-white/90 backdrop-blur-md border border-[#e8f3ed] rounded-full mb-8 overflow-hidden shadow-xl mx-auto max-w-sm">
        <button onClick={() => setEditorTab('edit')} className={`flex-1 py-5 text-[11px] font-bold uppercase tracking-widest transition-all ${editorTab === 'edit' ? 'bg-[#1a1c18] text-white' : 'text-[#6b7c72]'}`}>Edit</button>
        <button onClick={() => setEditorTab('preview')} className={`flex-1 py-5 text-[11px] font-bold uppercase tracking-widest transition-all ${editorTab === 'preview' ? 'bg-[#1a1c18] text-white' : 'text-[#6b7c72]'}`}>Preview</button>
      </div>

      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-12 gap-16">
        <div className={`lg:col-span-4 ${editorTab === 'edit' ? 'block' : 'hidden lg:block'} lg:sticky lg:top-28`}>
          <EditorPanel data={weddingData} setData={setWeddingData} />
        </div>
        <div className={`lg:col-span-4 ${editorTab === 'preview' ? 'flex' : 'hidden lg:flex'} flex-col items-center justify-center`}>
          <PhoneMockup template={selectedTemplate} />
        </div>
        <div className={`lg:col-span-4 space-y-10 ${editorTab === 'edit' ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white p-10 rounded-3xl shadow-sm space-y-8 border border-[#e8f3ed]">
            <h4 className="text-[10px] font-bold text-[#6b7c72] uppercase tracking-[0.5em]">Templates</h4>
            <div className="grid grid-cols-4 gap-4">
               {TEMPLATES.map(tpl => (
                 <button key={tpl.id} onClick={() => setSelectedTemplate(tpl)} className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${selectedTemplate.id === tpl.id ? 'border-[#1a1c18] scale-110 shadow-xl' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                   <img src={tpl.thumbnail} className="w-full h-full object-cover" />
                 </button>
               ))}
            </div>
          </div>
          <div className="bg-[#1a1c18] p-12 rounded-[2.5rem] shadow-2xl space-y-8 text-center">
            <button className="w-full py-6 bg-white text-[#1a1c18] font-bold uppercase tracking-[0.25em] rounded-2xl hover:bg-[#fdfcfb] transition-all shadow-xl text-xs">Publish Invitation</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fdfcfb]">
      <Header setView={setView} currentView={view} />
      <main>
        {view === ViewMode.LANDING && renderLanding()}
        {view === ViewMode.GALLERY && renderGallery()}
        {view === ViewMode.EDITOR && renderEditor()}
        {view === ViewMode.PRICING && renderPricing()}
      </main>
      <footer className="bg-white text-[#2a2826] py-24 px-6 md:px-12 border-t border-[#e8f3ed]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#1a1c18] rounded-2xl flex items-center justify-center text-white font-serif text-2xl shadow-lg">I</div>
            <h1 className="text-2xl font-bold tracking-tight text-[#1a1c18]">istiadat<span className="text-[#6b7c72] font-light">.card</span></h1>
          </div>
          <div className="flex gap-12 text-[11px] font-bold uppercase tracking-[0.4em] text-[#6b7c72]">
            <button onClick={() => setView(ViewMode.GALLERY)}>Templates</button>
            <button onClick={() => setView(ViewMode.PRICING)}>Pricing</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
