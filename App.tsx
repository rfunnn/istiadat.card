
import React, { useState, useEffect } from 'react';
import { ViewMode, EcardData, TemplateId } from './types';
import { TEMPLATES, INITIAL_ECARD_DATA, TemplateConfig } from './constants';
import { Header } from './components/Header';
import TemplateRenderer from './components/TemplateRenderer';
import { 
  Type, 
  MapPin, 
  Calendar, 
  Clock, 
  Music, 
  Settings, 
  Eye, 
  Users, 
  Gift, 
  Phone,
  Layout,
  MessageSquare,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Eye as EyeIcon,
  Heart,
  Save,
  Trash2,
  ArrowRight,
  Library
} from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.LANDING);
  const [ecardData, setEcardData] = useState<EcardData>(INITIAL_ECARD_DATA);
  const [editorTab, setEditorTab] = useState<'edit' | 'preview'>('edit');
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('muka-depan');
  
  // Gallery Logic
  const [showFilters, setShowFilters] = useState(false);
  const [personalizationName, setPersonalizationName] = useState('Adam & Hawa');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const [likedTemplates, setLikedTemplates] = useState<Set<string>>(new Set());
  const [savedCollections, setSavedCollections] = useState<EcardData[]>([]);

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

  const handleSelectTemplate = (template: TemplateConfig) => {
    setEcardData({
      ...ecardData,
      template: template.id as TemplateId
    });
    setView(ViewMode.EDITOR);
  };

  const handleSetName = () => {
    setEcardData({
      ...ecardData,
      namaPanggilan: {
        ...ecardData.namaPanggilan,
        text: personalizationName
      }
    });
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newLiked = new Set(likedTemplates);
    if (newLiked.has(id)) newLiked.delete(id);
    else newLiked.add(id);
    setLikedTemplates(newLiked);
  };

  const handleSaveToCollection = () => {
    const newSave = { ...ecardData, id: `card-${Date.now()}` };
    setSavedCollections([newSave, ...savedCollections]);
    alert("Saved to your collection!");
  };

  const categories = [
    'All', 'Baby', 'Party', 'Ramadan', 'Raya', 'Floral', 'Islamic', 
    'Minimalist', 'Modern', 'Rustic', 'Traditional', 'Vintage', 'Watercolor'
  ];

  const PhoneMockup = React.memo(({ tilted = 0, className = "", scale = 1, borderColor = "#1a1c18", initialShowCover = false, data = ecardData }: { tilted?: number, className?: string, scale?: number, borderColor?: string, initialShowCover?: boolean, data?: EcardData }) => (
    <div 
      className={`relative w-[240px] md:w-[280px] h-[500px] md:h-[580px] bg-white rounded-[3rem] p-2 md:p-3 shadow-2xl border-[10px] flex flex-col overflow-hidden ${className}`}
      style={{ 
        transform: `scale(${scale}) rotate(${tilted}deg)`,
        borderColor: borderColor
      }}
    >
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 md:w-28 h-5 md:h-7 bg-[#1a1c18] rounded-3xl z-40"></div>
      <div className="flex-1 bg-white rounded-[2.5rem] overflow-hidden relative">
        <TemplateRenderer data={data} onRSVPSubmit={() => {}} initialShowCover={initialShowCover} />
      </div>
    </div>
  ));

  const renderLanding = () => (
    <div className="min-h-screen bg-[#fdfcfb] text-[#2a2826] overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-60">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-[#e8f3ed] rounded-full blur-[140px]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-[#f4f1ed] rounded-full blur-[120px]"></div>
      </div>

      <section className="relative flex items-start px-6 md:px-12 lg:px-24 pt-4 md:pt-10 pb-12 md:pb-32">
        <div className="relative z-20 w-full grid lg:grid-cols-12 gap-8 lg:gap-8 items-start max-w-7xl mx-auto">
          <div className="lg:col-span-6 relative z-30 flex flex-col items-center lg:items-start space-y-4 md:space-y-6 text-center lg:text-left pt-6 lg:pt-12">
            <div className="space-y-2 md:space-y-4 w-full flex flex-col items-center lg:items-start">
              <div className="inline-flex items-center gap-4 px-6 md:px-8 py-3 bg-white border border-stone-100 rounded-full shadow-sm mb-2 md:mb-4">
                <span className="text-stone-500 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">Exquisite Invitations</span>
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#2a2826] tracking-tight leading-[1.1]">
                Digital Invitation <br /> 
                <span className="italic font-light text-[#6b7c72] leading-tight text-2xl md:text-4xl lg:text-5xl">For Various Occasions</span>
              </h2>
              {/* Animated Occasion Text Container */}
              <div className="h-20 md:h-36 lg:h-44 flex items-center overflow-hidden justify-center lg:justify-start w-full mt-1">
                <span 
                  className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#1a1c18] capitalize tracking-tighter opacity-0 leading-none animate-[fade-in_0.5s_ease-in_forwards]" 
                  key={occasionIndex}
                >
                  {occasions[occasionIndex]}
                </span>
              </div>
            </div>
            
            <p className="hidden md:block text-stone-500 text-lg md:text-xl leading-relaxed md:max-w-xl font-serif italic lg:pr-12">
              Transform your most precious moments into a sophisticated digital experience. Elegant, interactive, and timeless.
            </p>

            <div className="hidden lg:flex w-full justify-start pt-4">
              <button onClick={() => setView(ViewMode.GALLERY)} className="lg:w-auto bg-[#1a1c18] text-white px-16 py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] shadow-2xl transition-all hover:scale-105 hover:bg-[#2a2826] active:scale-95 cursor-pointer">
                Try Now For Free
              </button>
            </div>
          </div>
          
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center z-10 pt-4 lg:pt-0">
            <div className="relative w-full h-[320px] md:h-[650px] lg:h-[750px] flex items-center justify-center lg:justify-end">
              <div className="lg:hidden relative w-full h-full flex items-center justify-center">
                <div className="absolute -translate-x-12 -translate-y-4">
                  <PhoneMockup scale={0.4} tilted={-12} borderColor="#e5e7eb" className="grayscale opacity-20" initialShowCover={false} />
                </div>
                <div className="relative z-10 translate-x-4">
                  <PhoneMockup scale={0.5} className="shadow-2xl" initialShowCover={false} />
                </div>
              </div>
              <div className="hidden lg:flex relative w-full h-full items-center justify-end">
                <div className="absolute -translate-x-48 -translate-y-16">
                  <PhoneMockup scale={0.7} tilted={-15} borderColor="#e5e7eb" className="grayscale opacity-20" initialShowCover={false} />
                </div>
                <div className="relative z-10 mr-4">
                  <PhoneMockup scale={0.9} className="shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)]" initialShowCover={false} />
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[90%] bg-[#6b7c72]/5 rounded-full blur-[120px] -z-20"></div>
            </div>
            <div className="lg:hidden w-full flex justify-center py-8 relative z-50">
              <button onClick={() => setView(ViewMode.GALLERY)} className="w-full max-w-[280px] bg-[#1a1c18] text-white px-10 py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] shadow-2xl transition-all hover:scale-105 hover:bg-[#2a2826] active:scale-95 cursor-pointer">
                Try Now For Free
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 bg-[#f4f9f7] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block mb-8 px-10 py-3 bg-white border border-stone-100 rounded-full shadow-sm">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] text-stone-500">Platform Highlights</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif text-[#2a2826] mb-16 tracking-tight">Core Features</h2>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-20 max-w-4xl mx-auto">
            {features.map((feature, i) => (
              <button key={i} onClick={() => setActiveFeatureIndex(i)} className={`px-6 md:px-8 py-3.5 md:py-4 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] border transition-all duration-300 shadow-sm ${activeFeatureIndex === i ? 'bg-[#1a1c18] text-white border-[#1a1c18] shadow-xl' : 'bg-white text-stone-400 border-stone-100 hover:border-stone-200'}`}>
                {feature.label}
              </button>
            ))}
          </div>
          <div className="relative inline-block">
            <div className="relative z-10 w-[240px] md:w-[320px] aspect-[9/19] bg-white rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border-[12px] border-[#1a1c18] shadow-[0_60px_120px_-30px_rgba(26,28,24,0.15)] mx-auto">
               <TemplateRenderer data={ecardData} onRSVPSubmit={() => {}} initialShowCover={false} />
            </div>
            <div className="absolute left-[-80px] md:left-[-160px] lg:left-[-180px] top-[25%] hidden sm:block transition-all duration-500 animate-in fade-in slide-in-from-left-8">
              <div className="bg-white/95 backdrop-blur-xl px-6 md:px-8 py-3 md:py-5 rounded-2xl md:rounded-[2rem] shadow-2xl border border-stone-100 flex items-center gap-3 md:gap-4">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#6b7c72] animate-pulse"></div>
                <p className="text-[#2a2826] font-bold text-xs md:text-lg whitespace-nowrap tracking-tight">{features[activeFeatureIndex].left}</p>
              </div>
            </div>
            <div className="absolute right-[-80px] md:right-[-160px] lg:right-[-180px] top-[65%] hidden sm:block transition-all duration-500 animate-in fade-in slide-in-from-right-8">
              <div className="bg-white/95 backdrop-blur-xl px-6 md:px-8 py-3 md:py-5 rounded-2xl md:rounded-[2rem] shadow-2xl border border-stone-100 flex items-center gap-3 md:gap-4">
                <p className="text-[#2a2826] font-bold text-xs md:text-lg whitespace-nowrap tracking-tight">{features[activeFeatureIndex].right}</p>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#d4af37] animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderGallery = () => (
    <div className="max-w-[1200px] mx-auto px-4 py-12 flex flex-col items-center bg-white min-h-screen">
      <div className="mb-12 text-center space-y-4">
        <h2 className="text-5xl font-serif text-[#2a2826]">Our Templates</h2>
        <p className="text-stone-400 max-w-lg mx-auto italic font-serif text-lg">Choose a base design and customize every detail in the Studio.</p>
      </div>
      <div className="mb-8 w-full flex justify-center">
        <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-8 py-3 bg-white border border-stone-300 rounded-xl text-stone-700 text-sm font-bold tracking-widest uppercase hover:bg-stone-50 transition-all shadow-sm">Filters</button>
      </div>
      {showFilters && (
        <div className="w-full max-w-2xl bg-stone-50 p-8 rounded-[2rem] mb-12 border border-stone-100 animate-in fade-in slide-in-from-top-4 duration-300">
           <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button key={cat} onClick={() => {
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
                  }} className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${selectedCategories.includes(cat) ? 'bg-[#1a1c18] text-white border-[#1a1c18]' : 'bg-white text-stone-500 border-stone-200'}`}>
                  {cat}
                </button>
              ))}
           </div>
        </div>
      )}
      <div className="w-full max-w-2xl bg-[#f4f7f8] p-10 rounded-[2.5rem] space-y-8 mb-20 text-center">
        <h3 className="font-bold text-2xl text-[#2a2826] leading-tight max-w-md mx-auto">Set your name(s) for a personalised preview</h3>
        <div className="space-y-4 max-w-sm mx-auto">
          <input type="text" value={personalizationName} onChange={(e) => setPersonalizationName(e.target.value)} placeholder="Adam & Hawa" className="w-full p-4 rounded-xl border border-stone-200 bg-white outline-none text-center text-stone-900 placeholder-stone-300 font-medium" />
          <button onClick={handleSetName} className="w-full bg-white text-[#1a1c18] border border-stone-300 py-4 rounded-xl font-bold text-sm uppercase tracking-[0.2em] hover:bg-stone-50 transition-all shadow-sm">Set Name</button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16 w-full">
        {TEMPLATES.map((tpl) => (
          <div key={tpl.id} className="flex flex-col items-center group relative">
            <div className="relative w-full aspect-square bg-[#f3f6f8] rounded-[2.5rem] flex items-center justify-center p-6 mb-6 transition-all group-hover:bg-[#ebf0f3] overflow-hidden">
              <img src={tpl.thumbnail} className="w-full h-full object-cover rounded-3xl shadow-xl transition-transform duration-500 group-hover:scale-105" />
              <button onClick={(e) => toggleLike(tpl.id, e)} className={`absolute top-4 right-4 p-3 rounded-full shadow-lg border border-white/20 transition-all active:scale-90 backdrop-blur-md ${likedTemplates.has(tpl.id) ? 'bg-rose-500 text-white' : 'bg-white/80 text-stone-400 hover:text-rose-500'}`}>
                <Heart className={`w-5 h-5 ${likedTemplates.has(tpl.id) ? 'fill-current' : ''}`} />
              </button>
            </div>
            <div className="text-center space-y-4 w-full">
              <h4 className="font-bold text-xl text-[#2a2826] tracking-wide">{tpl.name}</h4>
              <div className="flex gap-2 justify-center w-full max-w-[220px] mx-auto">
                <button onClick={() => {
                    setEcardData({...ecardData, template: tpl.id as TemplateId});
                    setEditorTab('preview');
                    setView(ViewMode.EDITOR);
                }} className="flex-1 py-3 border-2 border-stone-300 text-stone-500 rounded-xl text-[10px] font-bold uppercase tracking-[0.1em] hover:bg-stone-50 transition-all flex items-center justify-center gap-1">
                  <EyeIcon className="w-3 h-3" /> Preview
                </button>
                <button onClick={() => handleSelectTemplate(tpl)} className="flex-1 py-3 bg-stone-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.1em] hover:bg-stone-800 transition-all active:scale-95">
                  Try Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMyCollections = () => (
    <div className="max-w-[1200px] mx-auto px-4 py-16 min-h-screen">
      <div className="mb-16 text-center">
        <h2 className="text-5xl font-serif text-[#2a2826] mb-4">My Collections</h2>
        <p className="text-stone-400 font-serif italic text-lg">Manage your saved invitations</p>
      </div>
      {savedCollections.length === 0 ? (
        <div className="text-center py-24 bg-stone-50 rounded-[3rem] border-2 border-dashed border-stone-200">
           <Library className="w-16 h-16 text-stone-300 mx-auto mb-6" />
           <p className="text-stone-500 font-medium mb-8">You haven't saved any designs yet.</p>
           <button onClick={() => setView(ViewMode.GALLERY)} className="bg-stone-900 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs">Start Creating</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {savedCollections.map((card) => (
            <div key={card.id} className="bg-white p-8 rounded-[3rem] shadow-xl border border-stone-100 flex flex-col items-center">
               <div className="w-full aspect-[9/16] overflow-hidden rounded-3xl mb-8 relative border-4 border-stone-900">
                  <TemplateRenderer data={card} onRSVPSubmit={() => {}} initialShowCover={false} />
               </div>
               <div className="text-center w-full space-y-6">
                  <h4 className="text-xl font-bold text-stone-900">{card.namaPanggilan.text}</h4>
                  <div className="flex gap-3">
                    <button onClick={() => { setEcardData(card); setView(ViewMode.EDITOR); }} className="flex-1 bg-stone-900 text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                      <Settings className="w-3.5 h-3.5" /> Edit Studio
                    </button>
                    <button onClick={() => setSavedCollections(savedCollections.filter(c => c.id !== card.id))} className="p-4 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-100 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderMyLikes = () => {
    const templatesLiked = TEMPLATES.filter(t => likedTemplates.has(t.id));
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-16 min-h-screen">
        <div className="mb-16 text-center">
          <h2 className="text-5xl font-serif text-[#2a2826] mb-4">Saved Templates</h2>
          <p className="text-stone-400 font-serif italic text-lg">Your favorite design styles</p>
        </div>
        {templatesLiked.length === 0 ? (
          <div className="text-center py-24 bg-rose-50/30 rounded-[3rem] border-2 border-dashed border-rose-100">
             <Heart className="w-16 h-16 text-rose-200 mx-auto mb-6" />
             <p className="text-rose-400 font-medium mb-8">Browse templates and heart the ones you love!</p>
             <button onClick={() => setView(ViewMode.GALLERY)} className="bg-stone-900 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs">Browse Gallery</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {templatesLiked.map((tpl) => (
              <div key={tpl.id} className="flex flex-col items-center group relative">
                <div className="relative w-full aspect-square bg-[#f3f6f8] rounded-[2.5rem] flex items-center justify-center p-6 mb-6 transition-all group-hover:bg-[#ebf0f3] overflow-hidden">
                  <img src={tpl.thumbnail} className="w-full h-full object-cover rounded-3xl shadow-xl transition-transform duration-500 group-hover:scale-105" />
                  <button onClick={(e) => toggleLike(tpl.id, e)} className="absolute top-4 right-4 p-3 bg-rose-500 text-white rounded-full shadow-lg border border-white/20 transition-all active:scale-90">
                    <Heart className="w-5 h-5 fill-current" />
                  </button>
                </div>
                <div className="text-center space-y-4 w-full">
                  <h4 className="font-bold text-lg text-[#2a2826]">{tpl.name}</h4>
                  <button onClick={() => handleSelectTemplate(tpl)} className="w-full py-3 bg-stone-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-all">Start Project</button>
                </div>
              </div>
            ))}
          </div>
        )}
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

  const EditorSection = ({ id, icon: Icon, label, children }: { id: string, icon: any, label: string, children: React.ReactNode }) => (
    <div className="border-b border-stone-100 last:border-0 overflow-hidden">
      <button onClick={() => setActiveSection(activeSection === id ? '' : id)} className={`w-full flex items-center justify-between px-6 py-5 transition-colors ${activeSection === id ? 'bg-stone-50' : 'hover:bg-stone-50/50'}`}>
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-xl ${activeSection === id ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500'}`}>
            <Icon className="w-5 h-5" />
          </div>
          <span className={`text-sm font-bold uppercase tracking-widest ${activeSection === id ? 'text-stone-900' : 'text-stone-500'}`}>
            {label}
          </span>
        </div>
        {activeSection === id ? <ChevronDown className="w-4 h-4 text-stone-400" /> : <ChevronRight className="w-4 h-4 text-stone-300" />}
      </button>
      <div className={`transition-all duration-300 ease-in-out ${activeSection === id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-6 space-y-6 bg-white border-t border-stone-50">
          {children}
        </div>
      </div>
    </div>
  );

  const InputField = ({ label, value, onChange, placeholder, type = "text", textarea = false }: any) => (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 ml-1">{label}</label>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3} className="w-full p-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:border-stone-200 transition-colors text-sm resize-none" />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full p-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:border-stone-200 transition-colors text-sm" />
      )}
    </div>
  );

  const renderEditor = () => (
    <div className="bg-[#f4f7f5] min-h-[calc(100vh-80px)]">
      <div className="lg:hidden sticky top-20 z-40 p-4 bg-white/80 backdrop-blur-md border-b border-stone-100">
        <div className="flex bg-stone-100 rounded-full overflow-hidden shadow-inner p-1">
          <button onClick={() => setEditorTab('edit')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-all rounded-full ${editorTab === 'edit' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400'}`}>Studio</button>
          <button onClick={() => setEditorTab('preview')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-all rounded-full ${editorTab === 'preview' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400'}`}>Live Preview</button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-12 gap-0 lg:gap-8 h-full">
        <div className={`lg:col-span-4 ${editorTab === 'edit' ? 'block' : 'hidden lg:block'} lg:h-[calc(100vh-80px)] lg:sticky lg:top-20 bg-white border-r border-stone-100 overflow-y-auto no-scrollbar`}>
          <div className="p-8 border-b border-stone-100 flex items-center justify-between">
            <h3 className="font-black text-2xl text-stone-900 tracking-tighter">STUDIO STUDIO</h3>
            <div className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] border border-amber-100 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" /> Gold Plan
            </div>
          </div>
          <div className="pb-32">
            <EditorSection id="muka-depan" icon={Layout} label="Muka Depan">
              <InputField label="Jenis Majlis" value={ecardData.jenisMajlis.text} onChange={(v: any) => setEcardData({...ecardData, jenisMajlis: {...ecardData.jenisMajlis, text: v}})} placeholder="Walimatul Urus" />
              <InputField label="Nama Panggilan" value={ecardData.namaPanggilan.text} onChange={(v: any) => setEcardData({...ecardData, namaPanggilan: {...ecardData.namaPanggilan, text: v}})} placeholder="Adam & Hawa" />
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Tarikh Mula" type="datetime-local" value={ecardData.tarikhMula.split('.')[0]} onChange={(v: any) => setEcardData({...ecardData, tarikhMula: v})} />
                <InputField label="Nama Tempat" value={ecardData.namaTempat} onChange={(v: any) => setEcardData({...ecardData, namaTempat: v})} placeholder="Laman Wedding Hall" />
              </div>
            </EditorSection>
            <EditorSection id="ayat-undangan" icon={Type} label="Ayat Undangan">
              <InputField label="Pembuka Ucapan" value={ecardData.pembukaUcapan} onChange={(v: any) => setEcardData({...ecardData, pembukaUcapan: v})} />
              <InputField label="Ayat Ucapan" textarea value={ecardData.ayatUcapan} onChange={(v: any) => setEcardData({...ecardData, ayatUcapan: v})} />
              <InputField label="Nama Penuh Pengantin" value={ecardData.namaPenuh.text} onChange={(v: any) => setEcardData({...ecardData, namaPenuh: {...ecardData.namaPenuh, text: v}})} />
            </EditorSection>
            <EditorSection id="lokasi" icon={MapPin} label="Tempat & Navigasi">
              <InputField label="Alamat Penuh" textarea value={ecardData.alamatMajlis} onChange={(v: any) => setEcardData({...ecardData, alamatMajlis: v})} />
              <InputField label="Google Maps URL" value={ecardData.googleMapsUrl} onChange={(v: any) => setEcardData({...ecardData, googleMapsUrl: v})} />
            </EditorSection>
            <EditorSection id="music" icon={Music} label="Lagu & Audio">
              <InputField label="YouTube URL" value={ecardData.music.url} onChange={(v: any) => setEcardData({...ecardData, music: {...ecardData.music, url: v}})} />
            </EditorSection>
          </div>
        </div>
        
        <div className={`lg:col-span-5 ${editorTab === 'preview' ? 'flex' : 'hidden lg:block'} flex-col items-center justify-center p-8 bg-stone-50/50`}>
          <div className="relative group">
            <div className="absolute inset-0 bg-stone-900/10 blur-[120px] rounded-full group-hover:bg-stone-900/15 transition-all duration-700"></div>
            <div className="relative z-10 w-[300px] md:w-[340px] h-[640px] md:h-[720px] bg-[#1a1c18] rounded-[3.5rem] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[8px] border-[#1a1c18]">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#1a1c18] rounded-full z-50"></div>
              <div className="w-full h-full rounded-[2.8rem] overflow-hidden bg-white relative">
                <TemplateRenderer data={ecardData} onRSVPSubmit={() => {}} initialShowCover={true} />
              </div>
            </div>
          </div>
        </div>

        <div className={`lg:col-span-3 space-y-8 p-8 ${editorTab === 'edit' ? 'block' : 'hidden lg:block'} border-l border-stone-100 h-full overflow-y-auto no-scrollbar`}>
           <div className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm space-y-8">
             <div className="flex items-center gap-3 mb-2">
               <Settings className="w-4 h-4 text-stone-400" />
               <h4 className="font-bold text-stone-900 uppercase tracking-[0.2em] text-[10px]">Switch Base Design</h4>
             </div>
             <div className="grid grid-cols-2 gap-4">
               {TEMPLATES.map(tpl => (
                 <button key={tpl.id} onClick={() => setEcardData({...ecardData, template: tpl.id as TemplateId})} className={`aspect-[9/14] rounded-2xl overflow-hidden border-2 transition-all relative group ${ecardData.template === tpl.id ? 'border-stone-900 scale-105 shadow-xl' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                    <img src={tpl.thumbnail} className="w-full h-full object-cover" />
                 </button>
               ))}
             </div>
           </div>

           <div className="p-8 bg-stone-900 rounded-[2.5rem] shadow-2xl space-y-4 text-center">
             <div className="space-y-2">
               <h4 className="text-white font-bold text-lg">Manage Project</h4>
               <p className="text-stone-400 text-xs leading-relaxed px-4">Save progress or publish your invitation online.</p>
             </div>
             <div className="flex flex-col gap-3">
               <button onClick={handleSaveToCollection} className="w-full py-4 bg-white/10 text-white rounded-2xl font-bold uppercase tracking-widest text-[11px] border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                 <Save className="w-4 h-4" /> Save Collection
               </button>
               <button className="w-full py-5 bg-white text-stone-900 rounded-2xl font-bold uppercase tracking-widest text-[11px] shadow-lg hover:bg-stone-50 transition-all active:scale-95 flex items-center justify-center gap-2">
                 Publish Invitation <ArrowRight className="w-4 h-4" />
               </button>
             </div>
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
        {view === ViewMode.MY_COLLECTIONS && renderMyCollections()}
        {view === ViewMode.MY_LIKES && renderMyLikes()}
      </main>
      <footer className="bg-white text-[#2a2826] py-24 px-6 md:px-12 border-t border-[#e8f3ed]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#1a1c18] rounded-2xl flex items-center justify-center text-white font-serif text-2xl shadow-lg">I</div>
            <h1 className="text-2xl font-bold tracking-tight text-[#1a1c18]">istiadat<span className="text-[#6b7c72] font-light">.card</span></h1>
          </div>
          <div className="flex gap-12 text-[11px] font-bold uppercase tracking-[0.4em] text-[#6b7c72]">
            <button onClick={() => setView(ViewMode.GALLERY)} className="hover:text-stone-900 transition-colors">Templates</button>
            <button onClick={() => setView(ViewMode.PRICING)} className="hover:text-stone-900 transition-colors">Pricing</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
