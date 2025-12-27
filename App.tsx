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
  
  // Animation state for rotating words
  const [occasionIndex, setOccasionIndex] = useState(0);
  const occasions = ['wedding', 'business', 'aqiqah', 'tahlil', 'birthday', 'open house'];

  useEffect(() => {
    if (view === ViewMode.LANDING) {
      const interval = setInterval(() => {
        setOccasionIndex((prev) => (prev + 1) % occasions.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [view]);

  // Handle template selection and switch to editor
  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setView(ViewMode.EDITOR);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const PhoneMockup = ({ tilted = false, className = "" }: { tilted?: boolean, className?: string }) => (
    <div className={`relative w-[300px] h-[620px] bg-white rounded-[3.5rem] p-3 shadow-2xl border-[12px] border-stone-900 flex flex-col overflow-hidden transition-all duration-1000 ${tilted ? 'rotate-[15deg] translate-x-16 translate-y-12 opacity-30 scale-90' : 'z-10'} ${className}`}>
      {/* Dynamic Island style Notch */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-stone-900 rounded-3xl z-20"></div>
      {/* Inner Screen */}
      <div className="flex-1 bg-white rounded-[2.8rem] overflow-hidden relative">
        <PreviewCanvas data={weddingData} template={selectedTemplate} />
      </div>
      {/* Reflections */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 to-transparent opacity-20 z-30"></div>
    </div>
  );

  const renderLanding = () => (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 selection:bg-stone-200">
      {/* Editorial Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-[#f2ede4] rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] bg-[#e9e4d9] rounded-full blur-[100px]"></div>
        {/* Floating Botanical hints for landing */}
        <img 
          src="https://png.pngtree.com/png-clipart/20230913/original/pngtree-green-leaves-and-branches-on-white-background-illustration-png-image_11060938.png" 
          className="absolute top-10 right-10 w-96 opacity-10 rotate-12"
          alt=""
        />
        <img 
          src="https://png.pngtree.com/png-clipart/20230913/original/pngtree-green-leaves-and-branches-on-white-background-illustration-png-image_11060938.png" 
          className="absolute bottom-[-10%] left-[-5%] w-[500px] opacity-10 -rotate-12"
          alt=""
        />
      </div>

      {/* Hero Section - Refined for Elegance */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24 overflow-hidden py-24">
        <div className="relative z-10 w-full grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-12 text-left max-w-3xl">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-4 px-4 py-2 bg-white/50 backdrop-blur-sm border border-stone-200 rounded-full">
                <span className="text-stone-500 text-[10px] font-bold tracking-[0.4em] uppercase">The Art of Invitation</span>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-4xl md:text-6xl font-serif text-stone-800 tracking-tight leading-[1.1]">
                  Digital Invitation Card <br /> 
                  <span className="italic font-light">For Various Occasions</span>
                </h2>
                <div className="h-20 md:h-28 flex items-center overflow-hidden">
                  <span className="text-5xl md:text-8xl font-serif text-stone-900 transition-all duration-1000 transform translate-y-0 inline-block capitalize tracking-tighter" key={occasionIndex}>
                    {occasions[occasionIndex]}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-stone-500 text-xl font-light leading-relaxed max-w-xl font-serif italic">
              Experience the next generation of digital invitations. Sophisticated, timeless, and effortlessly shared with those you cherish most.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
              <button 
                onClick={() => setView(ViewMode.GALLERY)}
                className="w-full sm:w-auto bg-stone-900 text-stone-50 px-12 py-5 rounded-full font-medium text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-stone-800 transition-all transform hover:-translate-y-1 active:scale-95"
              >
                Start Designing
              </button>
              <button 
                onClick={() => setView(ViewMode.PRICING)}
                className="w-full sm:w-auto text-stone-600 px-8 py-5 rounded-full font-medium text-sm uppercase tracking-[0.2em] border border-stone-200 hover:bg-white/50 transition-all"
              >
                View Packages
              </button>
            </div>

            {/* Subtle stats/proof points */}
            <div className="grid grid-cols-3 gap-12 pt-12 border-t border-stone-200 w-full opacity-60">
              <div>
                <p className="text-2xl font-serif text-stone-900">50+</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Unique Templates</p>
              </div>
              <div>
                <p className="text-2xl font-serif text-stone-900">10k</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Cards Sent</p>
              </div>
              <div>
                <p className="text-2xl font-serif text-stone-900">4.9/5</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Customer Rating</p>
              </div>
            </div>
          </div>

          {/* Right Mockup Visualization */}
          <div className="lg:col-span-5 relative hidden lg:flex h-[750px] items-center justify-center">
            <div className="relative group animate-bounce-slow">
              <PhoneMockup className="shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)]" />
              <div className="absolute -left-32 bottom-20">
                <PhoneMockup tilted={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection Section */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="space-y-4">
              <span className="text-stone-400 text-[11px] font-bold uppercase tracking-[0.4em]">Curated Designs</span>
              <h4 className="text-4xl md:text-5xl font-serif text-stone-900 max-w-md">Elegance in every single pixel</h4>
            </div>
            <button 
              onClick={() => setView(ViewMode.GALLERY)}
              className="text-stone-900 font-bold text-xs uppercase tracking-widest flex items-center gap-2 group border-b border-stone-900 pb-1"
            >
              Explore Full Collection 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {TEMPLATES.map((tpl) => (
              <div 
                key={tpl.id}
                className="group cursor-pointer"
                onClick={() => handleSelectTemplate(tpl)}
              >
                <div className="relative aspect-[3/4] rounded-sm overflow-hidden mb-8 grayscale-[50%] group-hover:grayscale-0 transition-all duration-700 shadow-sm group-hover:shadow-2xl">
                  <img src={tpl.thumbnail} alt={tpl.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="space-y-2">
                  <h5 className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em]">{tpl.fontFamily} style</h5>
                  <p className="text-xl font-serif text-stone-800">{tpl.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderGallery = () => (
    <div className="max-w-7xl mx-auto px-6 py-32 min-h-screen bg-white">
      <div className="text-center mb-24 space-y-6">
        <span className="text-stone-400 text-[11px] font-bold uppercase tracking-[0.5em]">The Library</span>
        <h2 className="text-5xl font-serif text-stone-900">Select Your Masterpiece</h2>
        <p className="text-stone-500 max-w-xl mx-auto font-serif italic text-lg">Every invitation is a canvas for your unique story.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        {TEMPLATES.map((tpl) => (
          <div 
            key={tpl.id}
            className="group cursor-pointer"
            onClick={() => handleSelectTemplate(tpl)}
          >
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden mb-8 shadow-xl border border-stone-50 bg-stone-50 group-hover:shadow-2xl transition-all duration-700">
              <img src={tpl.thumbnail} alt={tpl.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center p-8 text-center">
                 <span className="text-stone-50 border border-stone-50 px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] backdrop-blur-sm">Customize Design</span>
              </div>
            </div>
            <div className="text-center space-y-2">
               <p className="text-lg font-serif text-stone-800">{tpl.name}</p>
               <div className="flex justify-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-200"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-200"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-200"></div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPricing = () => (
    <div className="min-h-screen bg-[#faf9f6] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-4">
           <span className="text-stone-400 text-[11px] font-bold uppercase tracking-[0.5em]">Investment</span>
           <h2 className="text-5xl font-serif text-stone-900">Pricing Packages</h2>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          {[
            { name: 'Bronze', color: '#b08d57', price: 'RM30', features: ['Calendar', 'Contacts', 'Countdown', 'Navigation', 'Song'], rank: '🥉' },
            { name: 'Silver', color: '#c0c0c0', price: 'RM40', features: ['All Bronze Features', 'Effects', 'Attendance', 'RSVP/Wish'], rank: '🥈' },
            { name: 'Gold', color: '#d4af37', price: 'RM60', features: ['All Silver Features', 'Photo Gallery', 'Money Gift', 'Wishlist', 'Custom Link'], rank: '🥇' }
          ].map((pkg, i) => (
            <div key={i} className="bg-white rounded-sm overflow-hidden shadow-2xl flex flex-col items-center border border-stone-100 transition-transform hover:-translate-y-2 duration-500">
              <div className="w-full py-8 text-center font-serif text-2xl tracking-widest flex flex-col items-center gap-2 border-b border-stone-50">
                <span className="text-sm opacity-50">{pkg.rank}</span>
                {pkg.name}
              </div>
              <div className="flex-1 py-12 px-10 space-y-5 text-center text-stone-500 text-sm font-light">
                {pkg.features.map((f, j) => (
                  <p key={j} className={f.includes('All') ? 'font-bold text-stone-800' : ''}>{f}</p>
                ))}
              </div>
              <div className="p-10 w-full text-center bg-stone-50">
                <div className="text-4xl font-serif text-stone-900 mb-8">{pkg.price}</div>
                <button className="w-full py-4 bg-stone-900 text-stone-50 font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-stone-800 transition-all">
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEditor = () => (
    <div className="bg-stone-50 min-h-[calc(100vh-80px)] px-4 md:px-12 py-12">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Editor Panels */}
        <div className="lg:col-span-4 h-[calc(100vh-180px)] lg:sticky lg:top-28">
          <EditorPanel data={weddingData} setData={setWeddingData} />
        </div>

        {/* Center: Live Preview */}
        <div className="lg:col-span-4 flex flex-col items-center">
          <div className="w-full max-w-[320px] aspect-[9/19] bg-white rounded-[3rem] overflow-hidden border-[10px] border-stone-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
             <PreviewCanvas data={weddingData} template={selectedTemplate} />
          </div>
          <p className="mt-8 text-[10px] font-bold text-stone-400 uppercase tracking-[0.4em]">Live Digital View</p>
        </div>

        {/* Right Side: Quick Settings & Actions */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-sm shadow-sm space-y-8">
             <h4 className="text-[11px] font-bold text-stone-400 uppercase tracking-[0.4em]">Style Options</h4>
             <div className="grid grid-cols-4 gap-4">
               {TEMPLATES.map(tpl => (
                 <button 
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl)}
                  className={`relative aspect-square rounded-sm overflow-hidden border-2 transition-all ${selectedTemplate.id === tpl.id ? 'border-stone-900 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                 >
                   <img src={tpl.thumbnail} className="w-full h-full object-cover" />
                 </button>
               ))}
             </div>
          </div>

          <div className="bg-stone-900 p-10 rounded-sm shadow-2xl space-y-6">
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.5em]">Ready to Launch</p>
              <button className="w-full py-5 bg-stone-50 text-stone-900 font-bold uppercase tracking-[0.2em] transition-all hover:bg-white active:scale-95 shadow-lg">
                Finalize & Share
              </button>
              <p className="text-white/20 text-center text-[9px] uppercase tracking-widest italic">Includes lifetime digital hosting</p>
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Header setView={setView} currentView={view} />
      
      <main>
        {view === ViewMode.LANDING && renderLanding()}
        {view === ViewMode.GALLERY && renderGallery()}
        {view === ViewMode.EDITOR && renderEditor()}
        {view === ViewMode.PRICING && renderPricing()}
      </main>

      {/* Reduced Footer Height from py-16 to py-10 */}
      <footer className="bg-white text-stone-900 py-10 px-6 border-t border-stone-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-stone-900 rounded-full flex items-center justify-center text-white font-serif text-sm">I</div>
            <h1 className="text-lg font-bold tracking-tight">istiadat<span className="text-stone-400">.card</span></h1>
          </div>
          
          <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">
            <button onClick={() => setView(ViewMode.GALLERY)} className="hover:text-stone-900 transition-colors">Templates</button>
            <button onClick={() => setView(ViewMode.PRICING)} className="hover:text-stone-900 transition-colors">Pricing</button>
            <a href="#" className="hover:text-stone-900 transition-colors">Contact</a>
          </div>

          <div className="flex gap-6">
             {[
               <path key="fb" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>,
               <React.Fragment key="ig">
                 <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                 <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                 <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
               </React.Fragment>
             ].map((icon, idx) => (
               <div key={idx} className="text-stone-300 hover:text-stone-900 cursor-pointer transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
               </div>
             ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-stone-50 text-center text-[9px] font-medium text-stone-300 uppercase tracking-[0.3em]">
          &copy; 2025 istiadat.card — All rights reserved
        </div>
      </footer>
    </div>
  );
};

export default App;