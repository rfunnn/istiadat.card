import React, { useState, useEffect } from 'react';
import { ViewMode, EcardData, TemplateId } from './types';
import { TEMPLATES, INITIAL_ECARD_DATA, TemplateConfig } from './constants';
import { Header } from './components/Header';
import TemplateRenderer from './components/TemplateRenderer';
import Editor from './components/Editor';
import { 
  Heart,
  Settings,
  ArrowRight,
  Sparkles,
  Save,
  ChevronRight,
  Eye as EyeIcon,
  Search,
  Check,
  Filter,
  Star,
  Layout,
  Smartphone,
  PenTool,
  Share2,
  X,
  ArrowLeft
} from 'lucide-react';

const INITIAL_STUDIO_DATA: EcardData = {
  id: 'ecard-' + Math.random().toString(36).substr(2, 9),
  template: 'classic-gold',
  config: {
    language: 'Bahasa Melayu',
    package: 'Gold (RM60)',
    addOns: { ownDesign: false, coverVideo: false },
    designCode: 'FLO085',
    opening: { style: 'Tingkap A', color: '#f2f2f2' },
    animation: { effect: 'Salji #1', color: '#8999ab' }
  },
  jenisMajlis: { text: 'Walimatul Urus', fontSize: 14 },
  namaPanggilan: { text: 'Arfan & Rafeka', font: 'Dancing Script', color: '#24104f', fontSize: 50 },
  tarikhMula: '2024-08-24T01:17',
  tarikhAkhir: '2024-08-24T01:17',
  hariTarikh: { text: 'Ahad\n12 Januari 2025', fontSize: 21 },
  namaTempat: 'Dataran Gangsa\nMelaka',
  pembukaUcapan: 'Walimatul Urus',
  bilanganPenganjur: 2,
  penganjur1: { name: 'Azman bin Ahmad & Norazrina binti Jaalam', relation: 'Bapa Pengantin Lelaki & Ibu Pengantin Lelaki' },
  penganjur2: { name: 'Allahyarham Dr Mohd Fauzi bin Abdullah & Rahmawati', relation: 'Bapa Pengantin Perempuan & Ibu Pengantin Perempuan' },
  ayatUcapan: 'Dengan penuh kesyukuran, kami mempersilakan Dato\' | Datin | Tuan | Puan | Encik | Cik seisi keluarga hadir ke majlis perkahwinan anakanda kami',
  namaPenuh: { text: 'Arfan bin Azman & Rafeka binti Mohd Fauzi', font: 'Cormorant', fontSize: 22 },
  tarikhHijrah: '12 Rejab 1446H',
  alamatMajlis: 'GLASS HOUSE GLENMARIE\nLOT 16859, 3 Stone Park, Jalan Penyair U1/44,\nHicom-Glenmarie Industrial Park,\n40150 Shah Alam, Selangor',
  googleMapsUrl: 'https://g.co/kgs/CLMxFh8',
  wazeUrl: 'https://waze.com/ul/hw22tp0l6s',
  gpsCoordinates: '1.870943, 103.119317',
  maklumatTambahan1: '',
  aturCaraMajlis: 'Kehadiran Tetamu: 11:00 pagi\nKetibaan Pengantin: 12:15 tengah hari\nMakan Beradab: 1:00 petang\nMajlis Berakhir: 4:00 petang',
  maklumatTambahan2: 'Ya Allah Ya Rahman Ya Rahim, berkatilah majlis perkahwinan ini...',
  ui: {
    commonFont: 'Spartan',
    commonSize: 13,
    commonColor: '#a25d66',
    headerFont: 'Spartan',
    headerSize: 39,
    headerColor: '#a25d66',
    bgColor: '#f1f1f1',
    marginSisi: 1.25
  },
  gift: {
    enabled: true,
    title: 'Salam Kaut / Hadiah',
    note: 'Sumbangan anda amatlah kami hargai untuk membina mahligai yang baru.',
    items: [
      { id: '1', url: '', image: '' }
    ]
  },
  rsvp: {
    mode: 'RSVP + Ucapan',
    note: '',
    closingDate: '',
    showInputs: ['Nama', 'Telefon', 'Ucapan'],
    separateKids: false,
    limitPerRsvp: 10,
    totalLimit: 10000,
    hasSlots: false
  },
  contacts: [
    { name: 'Azman', relation: 'Bapa', phone: '012967060', whatsapp: true },
    { name: 'Norazrina', relation: 'Ibu', phone: '0123295838', whatsapp: true }
  ],
  music: {
    url: 'https://youtu.be/U1kiwmNPOGk',
    startTime: '00:00',
    showButton: true,
    autoplay: true,
    scrollDelay: 3.5
  },
  visibility: {
    tempat: true,
    tarikh: true,
    masa: true,
    masaTamat: true,
    butangSaveDate: true,
    aturCara: true,
    countdown: true,
    kehadiran: true,
    ucapan: true,
    butangSahkan: true,
    butangTulisUcapan: true
  }
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.LANDING);
  const [ecardData, setEcardData] = useState<EcardData>(() => {
    const saved = localStorage.getItem('ecard_data_v4');
    return saved ? JSON.parse(saved) : INITIAL_STUDIO_DATA;
  });
  const [isEditorOpen, setIsEditorOpen] = useState(true);
  const [isPreview, setIsPreview] = useState(false);
  const [occasionIndex, setOccasionIndex] = useState(0);
  const [galleryFilter, setGalleryFilter] = useState('All');
  const [likedTemplates, setLikedTemplates] = useState<Set<string>>(new Set());

  const occasions = ['wedding', 'business', 'aqiqah', 'tahlil', 'birthday', 'open house'];

  useEffect(() => {
    localStorage.setItem('ecard_data_v4', JSON.stringify(ecardData));
  }, [ecardData]);

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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: ecardData.namaPanggilan.text,
        text: `You are cordially invited to ${ecardData.jenisMajlis.text}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert('Sharing link: ' + window.location.href);
    }
  };

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
        </div>
      </section>
    </div>
  );

  const renderGallery = () => {
    const categories = ['All', 'Wedding', 'Event', 'Celebration', 'Minimalist'];
    return (
      <div className="min-h-screen bg-[#fdfcfb] py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-stone-100 rounded-full">
               <Star className="w-3 h-3 text-amber-500 fill-current" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-500">Premium Templates</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-[#1a1c18] tracking-tight">The Art of Invitation</h2>
            <p className="text-stone-500 max-w-2xl mx-auto font-serif italic text-lg leading-relaxed">
              Explore our curated selection of digital masterpieces, meticulously designed to frame your life's most beautiful chapters.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-stone-100 pb-10">
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 md:pb-0 w-full md:w-auto">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setGalleryFilter(cat)} 
                  className={`px-8 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${galleryFilter === cat ? 'bg-stone-900 text-white border-stone-900 shadow-xl' : 'bg-white text-stone-400 border-stone-100 hover:border-stone-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-80 group">
              <input 
                type="text" 
                placeholder="Find your style..." 
                className="w-full bg-stone-50 border border-stone-100 rounded-full px-6 py-4 text-xs font-medium focus:outline-none focus:ring-4 ring-stone-900/5 focus:border-stone-200 transition-all" 
              />
              <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 group-focus-within:text-stone-900 transition-colors" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {TEMPLATES.map(tpl => (
              <div key={tpl.id} className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-700 hover:-translate-y-3">
                <div className="aspect-[3/4.5] overflow-hidden relative">
                  <img src={tpl.thumbnail} alt={tpl.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out" />
                  <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-4 p-10">
                    <button 
                      onClick={() => { setEcardData({...ecardData, template: tpl.id as TemplateId}); setView(ViewMode.EDITOR); }} 
                      className="w-full py-5 bg-white text-stone-900 rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] shadow-2xl hover:bg-stone-50 transition-all transform hover:scale-105 active:scale-95"
                    >
                      Personalize
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderPricing = () => (
    <div className="min-h-screen bg-[#fdfcfb] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="text-center space-y-6">
          <h2 className="text-4xl md:text-7xl font-serif text-[#1a1c18] tracking-tight">The Collection Tiers</h2>
          <p className="text-stone-500 max-w-2xl mx-auto font-serif italic text-xl leading-relaxed">
            Transparent investment for your most precious memories. Select the experience that best suits your vision.
          </p>
        </div>
      </div>
    </div>
  );

  const renderEditor = () => {
    if (isPreview) {
      return (
        <div className="fixed inset-0 bg-black overflow-hidden flex items-center justify-center z-[200]">
          <div className="w-full h-full max-w-md bg-white overflow-hidden relative">
            <button
              onClick={() => setIsPreview(false)}
              className="absolute top-4 left-4 z-50 bg-black/40 text-white p-2 rounded-full backdrop-blur-md"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <TemplateRenderer data={ecardData} onRSVPSubmit={() => {}} />
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#F0F2F5] flex flex-col md:flex-row overflow-hidden h-[calc(100vh-80px)]">
        <div className={`${isEditorOpen ? 'w-full md:w-[450px]' : 'hidden'} h-full z-40 transition-all duration-300 ease-in-out`}>
          <Editor data={ecardData} onChange={setEcardData} onPreview={() => setIsPreview(true)} />
        </div>
        
        <div className="flex-1 relative flex items-center justify-center bg-[#E5E7EB] p-4 md:p-8 overflow-hidden">
          <div className="relative mx-auto w-full max-w-[375px] h-full max-h-[812px] bg-white rounded-[3rem] shadow-2xl border-[12px] border-[#1A1A1A] overflow-hidden flex flex-col">
            <div className="h-6 w-full bg-transparent absolute top-2 px-8 flex justify-between items-center z-50 pointer-events-none text-black">
              <span className="text-[11px] font-bold">9:41</span>
              <div className="flex gap-1.5 items-center">
                <div className="w-4 h-2.5 border border-current rounded-sm"></div>
              </div>
            </div>
            
            <div className="flex-1 overflow-hidden relative">
              <TemplateRenderer data={ecardData} onRSVPSubmit={() => {}} previewMode={true} />
            </div>
            
            <div className="h-1.5 w-32 bg-gray-900/10 absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full z-50"></div>
          </div>

          <div className="absolute bottom-8 right-8 flex flex-col gap-4">
            <button 
              onClick={() => setIsEditorOpen(!isEditorOpen)}
              className="md:hidden p-5 bg-blue-600 text-white rounded-full shadow-2xl active:scale-95"
            >
              {isEditorOpen ? <X className="w-6 h-6" /> : <PenTool className="w-6 h-6" />}
            </button>
            <button 
              onClick={handleShare}
              className="p-5 bg-white text-gray-900 rounded-full shadow-2xl active:scale-95"
            >
              <Share2 className="w-6 h-6" />
            </button>
          </div>

          <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center pointer-events-none hidden lg:block">
             <h3 className="text-gray-400 font-bold flex items-center gap-2 uppercase tracking-widest text-xs">
               <Smartphone className="w-4 h-4" /> Device Preview
             </h3>
          </div>
        </div>
      </div>
    );
  };

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
        </div>
      </footer>
    </div>
  );
};

export default App;