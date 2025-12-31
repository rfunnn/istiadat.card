import React, { useState, useEffect } from 'react';
import { ViewMode, EcardData, TemplateId } from './types';
import { TEMPLATES, INITIAL_ECARD_DATA, TemplateConfig } from './constants';
import { Header } from './components/Header';
import TemplateRenderer from './components/TemplateRenderer';
import { EditorPanel } from './components/EditorPanel';
import { 
  Heart,
  Settings,
  ArrowRight,
  Sparkles,
  Save,
  ChevronRight,
  Eye as EyeIcon,
  Search,
  Check
} from 'lucide-react';

const STATIC_LANDING_DATA: EcardData = {
  ...INITIAL_ECARD_DATA,
  id: 'static-landing-preview',
  jenisMajlis: { text: 'WALIMATUL\nURUS', fontSize: 13 },
  namaPanggilan: { text: 'Adam & Hawa', font: 'Cormorant Garamond', color: '#1a1c18', fontSize: 48 },
  hariTarikh: { text: 'Selasa, 27 Januari\n2026', fontSize: 16 },
  tarikhHijrah: '8 Syaaban 1447H',
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.LANDING);
  const [ecardData, setEcardData] = useState<EcardData>(INITIAL_ECARD_DATA);
  const [editorTab, setEditorTab] = useState<'edit' | 'preview'>('edit');
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [galleryFilter, setGalleryFilter] = useState('All');
  const [likedTemplates, setLikedTemplates] = useState<Set<string>>(new Set());
  const [occasionIndex, setOccasionIndex] = useState(0);

  const occasions = ['wedding', 'business', 'aqiqah', 'tahlil', 'birthday', 'open house'];

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

  const PhoneMockup = React.memo(({ tilted = 0, className = "", scale = 1, borderColor = "#1a1c18", data = ecardData, forceOpen = true }: { tilted?: number, className?: string, scale?: number, borderColor?: string, data?: EcardData, forceOpen?: boolean }) => (
    <div 
      className={`relative w-[210px] md:w-[260px] h-[450px] md:h-[560px] bg-white rounded-[2.5rem] md:rounded-[3rem] p-1.5 md:p-2 shadow-2xl border-[8px] md:border-[10px] flex flex-col overflow-hidden transition-all duration-700 ${className}`}
      style={{ transform: `scale(${scale}) rotate(${tilted}deg)`, borderColor: borderColor }}
    >
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 md:w-24 h-5 md:h-6 bg-[#1a1c18] rounded-full z-40"></div>
      <div className="flex-1 bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden relative">
        <TemplateRenderer data={data} onRSVPSubmit={() => {}} forceOpen={forceOpen} />
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
              <div className="h-20 md:h-36 lg:h-44 flex items-center overflow-hidden justify-center lg:justify-start w-full mt-1">
                <span className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#1a1c18] capitalize tracking-tighter opacity-0 leading-none animate-[fade-in_0.5s_ease-in_forwards]" key={occasionIndex}>
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
            <div className="relative w-full h-[450px] md:h-[650px] lg:h-[750px] flex items-center justify-center">
               <div className="absolute left-[0%] md:left-[5%] top-[10%]">
                  <PhoneMockup scale={0.85} tilted={-12} borderColor="#f0f0f0" className="opacity-40 blur-[1.5px] shadow-none pointer-events-none" data={STATIC_LANDING_DATA} />
               </div>
               <div className="relative z-10 right-[-15%] md:right-[-20%] top-[0%]">
                  <PhoneMockup scale={1} tilted={2} borderColor="#1a1c18" className="shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] pointer-events-none" data={STATIC_LANDING_DATA} />
               </div>
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
            <div className="relative z-10 w-[240px] md:w-[280px] aspect-[9/19] bg-white rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border-[10px] border-[#1a1c18] shadow-[0_40px_80px_-20px_rgba(26,28,24,0.15)] mx-auto">
               <TemplateRenderer data={STATIC_LANDING_DATA} onRSVPSubmit={() => {}} forceOpen={true} />
            </div>
            {/* Left label */}
            <div className="absolute left-[-80px] md:left-[-160px] lg:left-[-180px] top-[25%] hidden sm:block transition-all duration-500 animate-in fade-in slide-in-from-left-8" key={`left-${activeFeatureIndex}`}>
              <div className="bg-white/95 backdrop-blur-xl px-6 md:px-8 py-3 md:py-5 rounded-2xl md:rounded-[2rem] shadow-2xl border border-stone-100 flex items-center gap-3 md:gap-4">
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#6b7c72] animate-pulse"></div>
                <p className="text-[#2a2826] font-bold text-xs md:text-lg whitespace-nowrap tracking-tight">{features[activeFeatureIndex].left}</p>
              </div>
            </div>
            {/* Right label */}
            <div className="absolute right-[-80px] md:right-[-160px] lg:right-[-180px] top-[65%] hidden sm:block transition-all duration-500 animate-in fade-in slide-in-from-right-8" key={`right-${activeFeatureIndex}`}>
              <div className="bg-white/95 backdrop-blur-xl px-6 md:px-8 py-3 md:py-5 rounded-2xl md:rounded-[2rem] shadow-2xl border border-stone-100 flex items-center gap-3 md:gap-4">
                <p className="text-[#2a2826] font-bold text-xs md:text-lg whitespace-nowrap tracking-tight">{features[activeFeatureIndex].right}</p>
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#d4af37] animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderGallery = () => {
    const categories = ['All', 'Wedding', 'Event', 'Celebration', 'Minimalist'];
    return (
      <div className="min-h-screen bg-stone-50 py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif text-stone-900 tracking-tight">Exquisite Collection</h2>
            <p className="text-stone-500 max-w-2xl mx-auto font-serif italic text-lg">Browse our meticulously crafted templates, each designed to evoke the unique essence of your special occasion.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-stone-200 pb-8">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
              {categories.map(cat => (
                <button key={cat} onClick={() => setGalleryFilter(cat)} className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${galleryFilter === cat ? 'bg-stone-900 text-white shadow-lg' : 'bg-white text-stone-400 hover:text-stone-600'}`}>{cat}</button>
              ))}
            </div>
            <div className="relative w-full md:w-auto">
              <input type="text" placeholder="Search templates..." className="w-full md:w-64 bg-white border border-stone-200 rounded-full px-5 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 ring-stone-900/5" />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {TEMPLATES.map(tpl => (
              <div key={tpl.id} className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img src={tpl.thumbnail} alt={tpl.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 p-8">
                    <button onClick={() => { setEcardData({...ecardData, template: tpl.id as TemplateId}); setView(ViewMode.EDITOR); }} className="w-full py-4 bg-white text-stone-900 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-xl hover:bg-stone-50 transition-all transform hover:scale-105">Customize Now</button>
                    <button className="w-full py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all">View Preview</button>
                  </div>
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm tracking-tight">{tpl.name}</h4>
                    <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold mt-1">Premium Edition</p>
                  </div>
                  <button onClick={() => {
                    const next = new Set(likedTemplates);
                    if (next.has(tpl.id)) next.delete(tpl.id); else next.add(tpl.id);
                    setLikedTemplates(next);
                  }} className={`p-2 rounded-full transition-colors ${likedTemplates.has(tpl.id) ? 'bg-rose-50 text-rose-500' : 'bg-stone-50 text-stone-300'}`}>
                    <Heart className={`w-4 h-4 ${likedTemplates.has(tpl.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderPricing = () => {
    const plans = [
      { name: 'Bronze', price: 'RM30', color: 'bg-stone-50', textColor: 'text-stone-500', features: ['Standard Template Access', 'Basic Map Integration', 'Custom Text Content', '7 Days Online Hosting', 'Mobile View Optimization'], btn: 'Select Bronze' },
      { name: 'Silver', price: 'RM40', color: 'bg-white', textColor: 'text-stone-900', features: ['Premium Template Access', 'Animated Sakura/Snow Effects', 'Music Integration (YouTube)', 'Countdown Timer', '30 Days Online Hosting', 'RSVP Management'], highlight: true, btn: 'Select Silver' },
      { name: 'Gold', price: 'RM60', color: 'bg-stone-900', textColor: 'text-white', features: ['Elite Templates', 'Background Video Cover', 'Music & Auto Scroll', 'Digital Gift / QR Money', 'Guest Wishbook', 'Lifetime Online Hosting', 'Priority Support'], btn: 'Select Gold' }
    ];
    return (
      <div className="min-h-screen bg-stone-50 py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif text-stone-900 tracking-tight">Simple & Elegant Pricing</h2>
            <p className="text-stone-500 max-w-2xl mx-auto font-serif italic text-lg">Choose the perfect plan to share your story with elegance and ease.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {plans.map((plan, i) => (
              <div key={i} className={`relative p-10 rounded-[3rem] ${plan.color} ${plan.highlight ? 'shadow-2xl ring-2 ring-stone-900 scale-105 z-10' : 'shadow-sm border border-stone-200'}`}>
                {plan.highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-stone-900 text-white px-6 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl">Most Popular</div>}
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h3 className={`text-xl font-bold uppercase tracking-widest ${plan.textColor}`}>{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-4xl md:text-5xl font-serif ${plan.textColor}`}>{plan.price}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest opacity-40 ${plan.textColor}`}>/ Lifetime</span>
                    </div>
                  </div>
                  <ul className="space-y-5">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-stone-900' : (plan.name === 'Gold' ? 'text-amber-400' : 'text-stone-400')}`} />
                        <span className={`text-[13px] leading-snug ${plan.textColor === 'text-white' ? 'opacity-70' : 'opacity-80'}`}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setView(ViewMode.GALLERY)} className={`w-full py-5 rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95 ${plan.name === 'Gold' ? 'bg-white text-stone-900' : 'bg-stone-900 text-white hover:bg-stone-800'}`}>{plan.btn}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderEditor = () => (
    <div className="bg-[#fdfcfb] min-h-[calc(100vh-80px)]">
      <div className="lg:hidden sticky top-20 z-40 p-4 bg-white/80 backdrop-blur-md border-b border-stone-100">
        <div className="flex bg-stone-100 rounded-full overflow-hidden shadow-inner p-1">
          <button onClick={() => setEditorTab('edit')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-all rounded-full ${editorTab === 'edit' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400'}`}>Studio</button>
          <button onClick={() => setEditorTab('preview')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-all rounded-full ${editorTab === 'preview' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400'}`}>Live Preview</button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-12 gap-0 lg:gap-8 h-full">
        <div className={`lg:col-span-4 ${editorTab === 'edit' ? 'block' : 'hidden lg:block'} lg:h-[calc(100vh-80px)] lg:sticky lg:top-20 bg-white border-r border-stone-100 overflow-y-auto no-scrollbar`}>
           <EditorPanel data={ecardData} setData={setEcardData} />
        </div>
        
        <div className={`lg:col-span-5 ${editorTab === 'preview' ? 'flex' : 'hidden lg:block'} flex-col items-center justify-center p-8 bg-stone-50/30`}>
          <div className="relative group">
            <div className="absolute inset-0 bg-stone-900/5 blur-[100px] rounded-full"></div>
            <div className="relative z-10 w-[280px] md:w-[320px] h-[600px] md:h-[680px] bg-[#1a1c18] rounded-[3rem] p-2.5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] border-[8px] border-[#1a1c18]">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#1a1c18] rounded-full z-50"></div>
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-white relative">
                <TemplateRenderer data={ecardData} onRSVPSubmit={() => {}} forceOpen={true} />
              </div>
            </div>
          </div>
        </div>

        <div className={`lg:col-span-3 space-y-8 p-8 ${editorTab === 'edit' ? 'block' : 'hidden lg:block'} border-l border-stone-100 h-full overflow-y-auto no-scrollbar`}>
           <div className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm space-y-8">
             <div className="flex items-center gap-3 mb-2">
               <Settings className="w-4 h-4 text-stone-400" />
               <h4 className="font-bold text-stone-900 uppercase tracking-[0.2em] text-[10px]">Quick Template Swap</h4>
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
             <h4 className="text-white font-bold text-lg">Manage Project</h4>
             <div className="flex flex-col gap-3">
               <button className="w-full py-4 bg-white/10 text-white rounded-2xl font-bold uppercase tracking-widest text-[11px] border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2"><Save className="w-4 h-4" /> Save Collection</button>
               <button className="w-full py-5 bg-white text-stone-900 rounded-2xl font-bold uppercase tracking-widest text-[11px] shadow-lg hover:bg-stone-50 transition-all active:scale-95 flex items-center justify-center gap-2">Publish Invitation <ArrowRight className="w-4 h-4" /></button>
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
