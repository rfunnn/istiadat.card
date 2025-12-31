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
  ArrowLeft,
  Mail,
  ChevronDown,
  Phone,
  VolumeX,
  MapPin,
  Gift,
  Calendar,
  MoreVertical,
  Edit3,
  Image as ImageIcon,
  Eye,
  MessageSquare,
  Copy,
  Plus,
  HelpCircle,
  ClipboardList,
  Trash2
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
    commonFont: 'Montserrat',
    commonSize: 13,
    commonColor: '#a25d66',
    headerFont: 'Montserrat',
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

const STATIC_LANDING_DATA: EcardData = {
  ...INITIAL_STUDIO_DATA,
  id: 'static-landing-preview',
  jenisMajlis: { text: 'WALIMATUL\nURUS', fontSize: 13 },
  namaPanggilan: { text: 'Adam & Hawa', font: 'Cormorant Garamond', color: '#1a1c18', fontSize: 48 },
  hariTarikh: { text: 'Selasa, 27 Januari\n2026', fontSize: 16 },
  tarikhHijrah: '8 Syaaban 1447H',
};

// Component that exactly mimics the requested image for the landing page
const LandingPhoneMockup = ({ tilted = 0, className = "", scale = 1, borderColor = "#1A1A1A", opacity = 1, data = STATIC_LANDING_DATA }: { tilted?: number, className?: string, scale?: number, borderColor?: string, opacity?: number, data?: EcardData }) => (
  <div 
    className={`relative w-[105px] h-[230px] sm:w-[300px] sm:h-[650px] bg-white rounded-[1rem] sm:rounded-[3.5rem] p-1 sm:p-2.5 shadow-2xl border-[3px] sm:border-[12px] flex flex-col overflow-hidden transition-all duration-700 ${className}`}
    style={{ transform: `scale(${scale}) rotate(${tilted}deg)`, borderColor: borderColor, opacity: opacity }}
  >
    {/* Dynamic Island Notch */}
    <div className="absolute top-1 sm:top-4 left-1/2 -translate-x-1/2 w-8 h-2 sm:w-24 sm:h-7 bg-[#1A1A1A] rounded-full z-50"></div>
    
    <div className="flex-1 bg-white rounded-[0.6rem] sm:rounded-[2.5rem] overflow-hidden relative pt-6 sm:pt-20 flex flex-col items-center">
      {/* Background Subtle Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[25%] left-[65%] w-0.5 sm:w-1.5 h-0.5 sm:h-1.5 bg-stone-100 rounded-full"></div>
        <div className="absolute top-[35%] left-[25%] w-0.5 sm:w-1.5 h-0.5 sm:h-1.5 bg-stone-50 rounded-full"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-1 sm:px-8 w-full">
        {/* Type of Event */}
        <p className="text-[4px] sm:text-[10px] font-bold text-stone-400 tracking-[0.4em] uppercase mb-4 sm:mb-16 leading-relaxed">
          {data?.jenisMajlis?.text || 'WALIMATUL\nURUS'}
        </p>

        {/* Names */}
        <div className="flex flex-col items-center gap-0.5 sm:gap-1 mb-6 sm:mb-20">
          <h2 className="text-[14px] sm:text-[52px] font-serif tracking-tight leading-none text-[#1a1c18]">
            {data?.namaPanggilan?.text.split('&')[0].trim() || 'Adam'}
          </h2>
          <span className="text-[8px] sm:text-2xl font-serif italic text-stone-200 py-0.5 sm:py-1">&</span>
          <h2 className="text-[14px] sm:text-[52px] font-serif tracking-tight leading-none text-[#1a1c18]">
            {data?.namaPanggilan?.text.split('&')[1]?.trim() || 'Hawa'}
          </h2>
        </div>

        {/* Date Section */}
        <div className="space-y-0.5 sm:space-y-2 flex flex-col items-center mt-0.5 sm:mt-4">
          <div className="flex items-center gap-1 sm:gap-3 text-stone-400">
            <Calendar className="w-1.5 sm:w-3.5 h-1.5 sm:h-3.5" />
            <div className="flex flex-col items-start leading-none">
               <span className="text-[5px] sm:text-sm font-medium tracking-wide">{data?.hariTarikh?.text.split('\n')[0] || 'Selasa, 27 Januari'}</span>
               <span className="text-[5px] sm:text-sm font-medium tracking-wide">{data?.hariTarikh?.text.split('\n')[1] || '2026'}</span>
            </div>
          </div>
          <p className="text-[4px] sm:text-[10px] italic text-stone-300 font-medium pt-0.5 tracking-wider">{data?.tarikhHijrah || '8 Syaaban 1447H'}</p>
        </div>

        {/* Floating Indicator */}
        <div className="mt-2 sm:mt-12 opacity-20">
          <ChevronDown className="w-2 h-2 sm:w-5 sm:h-5" strokeWidth={1.5} />
        </div>
      </div>

      {/* Landing Style Navigation Pill */}
      <div className="absolute bottom-1.5 sm:bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-5 sm:h-14 bg-stone-50/80 backdrop-blur-md rounded-md sm:rounded-2xl flex items-center justify-around px-1 sm:px-4 border border-white/40 shadow-sm">
        <Phone className="w-2 sm:w-4 h-2 sm:h-4 text-stone-400" strokeWidth={1.5} />
        <VolumeX className="w-2 sm:w-4 h-2 sm:h-4 text-stone-400" strokeWidth={1.5} />
        <MapPin className="w-2 sm:w-4 h-2 sm:h-4 text-stone-400" strokeWidth={1.5} />
        <Gift className="w-2 sm:w-4 h-2 sm:h-4 text-stone-400" strokeWidth={1.5} />
        <div className="relative">
          <Mail className="w-2 sm:w-4 h-2 sm:h-4 text-stone-400" strokeWidth={1.5} />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[2px] sm:text-[6px] font-black text-stone-300">RSVP</span>
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.LANDING);
  const [ecardData, setEcardData] = useState<EcardData>(() => {
    const saved = localStorage.getItem('ecard_data_v4');
    return saved ? JSON.parse(saved) : INITIAL_STUDIO_DATA;
  });
  
  const BASE_DOMAIN = "istiadat-card.vercel.app";

  const [orders, setOrders] = useState<EcardData[]>(() => {
    const saved = localStorage.getItem('ecard_collections_v1');
    return saved ? JSON.parse(saved) : [
      {
        ...INITIAL_STUDIO_DATA,
        id: '40264',
        jenisMajlis: { text: 'Majlis Hari Jadi', fontSize: 13 },
        namaPanggilan: { text: 'asdas & ', font: 'Dancing Script', color: '#a25d66', fontSize: 50 },
        tarikhMula: '2025-12-29T10:00',
        config: { ...INITIAL_STUDIO_DATA.config, designCode: 'BAB006' }
      },
      {
        ...INITIAL_STUDIO_DATA,
        id: '10907',
        namaPanggilan: { text: 'Arfan & Rafeka', font: 'Dancing Script', color: '#24104f', fontSize: 50 },
        tarikhMula: '2024-08-24T01:17',
        config: { ...INITIAL_STUDIO_DATA.config, designCode: 'FLO085' }
      }
    ];
  });

  const [isEditorOpen, setIsEditorOpen] = useState(true);
  const [isPreview, setIsPreview] = useState(false);
  const [isPublicLink, setIsPublicLink] = useState(false);
  const [occasionIndex, setOccasionIndex] = useState(0);
  const [galleryFilter, setGalleryFilter] = useState('All');
  const [likedTemplates, setLikedTemplates] = useState<Set<string>>(new Set());
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  const occasions = ['wedding', 'business', 'aqiqah', 'tahlil', 'birthday', 'open house'];

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

  // Logic to handle path-based routing for invitation links (e.g., /40264/slug)
  useEffect(() => {
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    if (pathParts.length >= 1) {
      const orderId = pathParts[0];
      const foundOrder = orders.find(c => c.id === orderId);
      if (foundOrder) {
        setEcardData(foundOrder);
        setIsPreview(true);
        setIsPublicLink(true);
      }
    }
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ecard_data_v4', JSON.stringify(ecardData));
  }, [ecardData]);

  useEffect(() => {
    localStorage.setItem('ecard_collections_v1', JSON.stringify(orders));
  }, [orders]);

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
    const shareUrl = window.location.origin + window.location.pathname;
    if (navigator.share) {
      navigator.share({
        title: ecardData.namaPanggilan.text,
        text: `You are cordially invited to ${ecardData.jenisMajlis.text}`,
        url: shareUrl,
      }).catch(console.error);
    } else {
      alert('Sharing link: ' + shareUrl);
    }
  };

  const handleDeleteOrder = (id: string) => {
    if (confirm('Adakah anda pasti untuk memadam pesanan ini?')) {
      setOrders(prev => prev.filter(c => c.id !== id));
    }
  };

  const renderLanding = () => (
    <div className="min-h-screen bg-[#fdfcfb] text-[#2a2826] overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-60">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-[#e8f3ed] rounded-full blur-[140px]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-[#f4f1ed] rounded-full blur-[120px]"></div>
      </div>
      
      <section className="relative flex flex-col items-start px-6 md:px-12 lg:px-24 pt-4 md:pt-10 pb-12 md:pb-32">
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
            <div className="relative w-full h-[240px] sm:h-[650px] lg:h-[750px] flex items-center justify-center">
               <div className="absolute left-[5%] md:left-[5%] top-[10%]">
                  <LandingPhoneMockup scale={0.8} tilted={-8} borderColor="#F0F0F0" opacity={0.3} className="blur-[0.5px]" />
               </div>
               <div className="relative z-10 right-[-10%] sm:right-[-20%] top-[0%]">
                  <LandingPhoneMockup scale={1} tilted={2} borderColor="#1A1A1A" />
               </div>
            </div>
            {/* Mobile View Primary Action Button after image */}
            <div className="flex lg:hidden w-full max-w-[280px] justify-center mt-12">
              <button onClick={() => setView(ViewMode.GALLERY)} className="w-full bg-[#1a1c18] text-white px-12 py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer">
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
            <div className="relative z-10 mx-auto">
               <LandingPhoneMockup scale={1} borderColor="#1A1A1A" />
            </div>
            {/* Left Badge: Moved further out on mobile to avoid overlapping the phone mockup */}
            <div className="absolute left-[-50px] sm:left-[-40px] md:left-[-160px] lg:left-[-180px] top-[25%] block transition-all duration-500 animate-in fade-in slide-in-from-left-8" key={`left-${activeFeatureIndex}`}>
              <div className="bg-white/95 backdrop-blur-xl px-3 sm:px-8 py-2.5 sm:py-5 rounded-xl sm:rounded-[2rem] shadow-2xl border border-stone-100 flex items-center gap-2 sm:gap-4">
                <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-[#6b7c72] animate-pulse"></div>
                <p className="text-[#2a2826] font-bold text-[10px] sm:text-lg whitespace-nowrap tracking-tight">{features[activeFeatureIndex].left}</p>
              </div>
            </div>
            {/* Right Badge: Moved further out on mobile to avoid overlapping the phone mockup */}
            <div className="absolute right-[-50px] sm:right-[-40px] md:right-[-160px] lg:right-[-180px] top-[65%] block transition-all duration-500 animate-in fade-in slide-in-from-right-8" key={`right-${activeFeatureIndex}`}>
              <div className="bg-white/95 backdrop-blur-xl px-3 sm:px-8 py-2.5 sm:py-5 rounded-xl sm:rounded-[2rem] shadow-2xl border border-stone-100 flex items-center gap-2 sm:gap-4">
                <p className="text-[#2a2826] font-bold text-[10px] sm:text-lg whitespace-nowrap tracking-tight">{features[activeFeatureIndex].right}</p>
                <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-[#d4af37] animate-pulse"></div>
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
                      onClick={() => { 
                        setEcardData({
                          ...INITIAL_STUDIO_DATA, 
                          template: tpl.id as TemplateId,
                          id: 'ecard-' + Math.random().toString(36).substr(2, 9)
                        }); 
                        setView(ViewMode.EDITOR); 
                      }} 
                      className="w-full py-5 bg-white text-stone-900 rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] shadow-2xl hover:bg-stone-50 transition-all transform hover:scale-105 active:scale-95"
                    >
                      Personalize
                    </button>
                    <button className="w-full py-5 bg-white/10 backdrop-blur-xl text-white border border-white/20 rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-white/20 transition-all active:scale-95">
                      Live Preview
                    </button>
                  </div>
                </div>
                <div className="p-8 flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bold text-[#1a1c18] text-base tracking-tight">{tpl.name}</h4>
                    <p className="text-[9px] text-stone-400 uppercase tracking-[0.3em] font-black">Signature Collection</p>
                  </div>
                  <button onClick={() => {
                    const next = new Set(likedTemplates);
                    if (next.has(tpl.id)) next.delete(tpl.id); else next.add(tpl.id);
                    setLikedTemplates(next);
                  }} className={`p-3 rounded-full transition-all duration-300 ${likedTemplates.has(tpl.id) ? 'bg-rose-50 text-rose-500 scale-110 shadow-sm' : 'bg-stone-50 text-stone-300 hover:text-stone-400'}`}>
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
      { 
        name: 'Bronze', 
        price: 'RM30', 
        color: 'bg-white', 
        textColor: 'text-stone-500', 
        features: ['Standard Template Access', 'Basic Map Integration', 'Custom Text Content', '7 Days Online Hosting', 'Mobile Optimization'], 
        icon: Layout
      },
      { 
        name: 'Silver', 
        price: 'RM40', 
        color: 'bg-white', 
        textColor: 'text-stone-900', 
        features: ['Premium Template Access', 'Animated Sakura/Snow Effects', 'Music Integration (YouTube)', 'Countdown Timer', '30 Days Online Hosting', 'Guest Management'], 
        highlight: true, 
        icon: Sparkles
      },
      { 
        name: 'Gold', 
        price: 'RM60', 
        color: 'bg-stone-900', 
        textColor: 'text-white', 
        features: ['Elite Collection Access', 'Background Video Covers', 'Music & Auto Scroll', 'Digital Gift / QR Payments', 'Guest Wishbook & RSVP', 'Lifetime Hosting', 'VIP Support'], 
        icon: Star
      }
    ];
    return (
      <div className="min-h-screen bg-[#fdfcfb] py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-7xl font-serif text-[#1a1c18] tracking-tight">The Collection Tiers</h2>
            <p className="text-stone-500 max-w-2xl mx-auto font-serif italic text-xl leading-relaxed">
              Transparent investment for your most precious memories. Select the experience that best suits your vision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">
            {plans.map((plan, i) => (
              <div key={i} className={`relative p-12 rounded-[3.5rem] flex flex-col justify-between transition-all duration-700 ${plan.color} ${plan.highlight ? 'shadow-[0_60px_100px_-30px_rgba(0,0,0,0.1)] ring-1 ring-stone-100 scale-105 z-10' : 'shadow-sm border border-stone-100 hover:shadow-xl'}`}>
                {plan.highlight && <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-stone-900 text-white px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl">Recommended</div>}
                
                <div className="space-y-10">
                  <div className="space-y-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${plan.name === 'Gold' ? 'bg-white/10 text-amber-400' : 'bg-stone-50 text-stone-400'}`}>
                       <plan.icon className="w-6 h-6" />
                    </div>
                    <h3 className={`text-2xl font-bold uppercase tracking-widest ${plan.textColor}`}>{plan.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-5xl md:text-6xl font-serif ${plan.textColor}`}>{plan.price}</span>
                      <span className={`text-[10px] font-black uppercase tracking-widest opacity-40 ${plan.textColor}`}>Flat Fee</span>
                    </div>
                  </div>

                  <div className="w-full h-px bg-stone-100/50"></div>

                  <ul className="space-y-6">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div className={`mt-1.5 w-4 h-4 rounded-full flex items-center justify-center ${plan.highlight ? 'bg-stone-900 text-white' : (plan.name === 'Gold' ? 'bg-amber-400 text-stone-900' : 'bg-stone-100 text-stone-400')}`}>
                          <Check className="w-2.5 h-2.5" strokeWidth={3} />
                        </div>
                        <span className={`text-sm leading-snug font-medium ${plan.textColor === 'text-white' ? 'opacity-70' : 'text-stone-600'}`}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-16 text-center">
            <div className="inline-flex items-center gap-4 p-1 pr-6 bg-stone-50 rounded-full border border-stone-100">
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                 <Check className="w-4 h-4 text-green-500" />
               </div>
               <p className="text-[10px] font-black text-stone-500 uppercase tracking-[0.3em]">Secure Payment via Stripe & FPX • Instant Activation</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMyOrders = () => (
    <div className="min-h-screen bg-white py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-12 border-b border-stone-100 pb-8">
          <h2 className="text-[24px] font-black uppercase tracking-tight text-gray-900">Orders</h2>
          <button 
            onClick={() => {
              setEcardData(INITIAL_STUDIO_DATA);
              setView(ViewMode.GALLERY);
            }}
            className="px-6 py-2.5 bg-white border border-stone-900 rounded-lg text-[11px] font-bold uppercase tracking-widest hover:bg-stone-50 transition-colors shadow-sm"
          >
            Create New Card
          </button>
        </div>

        <div className="space-y-16">
          {orders.length === 0 ? (
            <div className="text-center py-20 bg-stone-50 rounded-[3rem] border border-dashed border-stone-200">
               <p className="text-stone-400 font-medium italic">No orders found. Create your first card!</p>
            </div>
          ) : (
            orders.map((item, idx) => {
              const slug = item.namaPanggilan.text.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-');
              const cardLink = `${BASE_DOMAIN}/${item.id}/${slug}`;
              return (
               <div key={item.id} className="relative group">
                 <div className="grid md:grid-cols-[160px_1fr] gap-8 md:gap-16 items-start">
                   <div className="flex flex-col items-center gap-4">
                     <div className="relative w-[140px] h-[240px] bg-white rounded-[2.2rem] border-[8px] border-[#1A1A1A] overflow-hidden shadow-2xl">
                       <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-[#1A1A1A] rounded-full z-10"></div>
                       <div className="w-full h-full scale-[0.45] origin-top">
                          <LandingPhoneMockup scale={1} data={item} className="shadow-none border-none" />
                       </div>
                     </div>
                     <div className="px-5 py-1.5 bg-gray-100 rounded-lg shadow-inner">
                        <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
                          {item.config.designCode || 'FLO085'}
                        </span>
                     </div>
                   </div>
 
                   <div className="flex-1 space-y-6 pt-2">
                     <div className="flex justify-between items-start">
                       <h3 className="text-[20px] font-bold text-[#2a2826] tracking-tight">
                         {item.jenisMajlis.text} {item.namaPanggilan.text}
                       </h3>
                       <div className="relative group/more">
                        <button className="text-gray-300 hover:text-gray-900 transition-colors p-1">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                       </div>
                     </div>
 
                     <div className="space-y-2">
                       <p className="text-[14px] text-gray-400 font-medium">
                         Created at: <span className="text-gray-900 ml-1">{new Date(item.tarikhMula).toLocaleDateString('en-GB')}</span>
                       </p>
                       <p className="text-[14px] text-gray-400 font-medium flex items-center gap-1.5">
                         Expiry date: 6 months after payment 
                         <HelpCircle className="w-4 h-4 text-amber-500 fill-amber-100 rounded-full" />
                       </p>
                     </div>
 
                     <div className="space-y-2 pt-2">
                       <p className="text-[13px] text-gray-400 font-bold uppercase tracking-widest">Your Invitation Link:</p>
                       <div className="relative group/link w-full max-w-xl">
                         <input 
                           readOnly
                           value={cardLink}
                           className="w-full p-3 pr-12 border border-gray-300 rounded-xl text-[14px] text-gray-500 bg-white font-medium focus:outline-none focus:border-stone-400 transition-colors"
                         />
                         <button 
                           onClick={() => {
                             navigator.clipboard.writeText(`https://${cardLink}`);
                             alert('Pautan disalin ke papan keratan!');
                           }}
                           className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
                         >
                           <Copy className="w-4 h-4" />
                         </button>
                       </div>
                     </div>
 
                     <div className="flex flex-wrap items-center gap-8 pt-4 text-gray-700 text-[12px] font-bold uppercase tracking-[0.2em]">
                       <button 
                         onClick={() => { setEcardData(item); setView(ViewMode.EDITOR); }}
                         className="flex items-center gap-2.5 hover:text-stone-900 transition-colors"
                       >
                         <Edit3 className="w-4 h-4" /> Edit
                       </button>
                       <button 
                         onClick={() => { setEcardData(item); setIsPreview(true); }}
                         className="flex items-center gap-2.5 hover:text-stone-900 transition-colors"
                       >
                         <Eye className="w-4 h-4" /> Preview
                       </button>
                       <button 
                         onClick={() => handleDeleteOrder(item.id)}
                         className="flex items-center gap-2.5 text-rose-500 hover:text-rose-700 transition-colors"
                       >
                         <Trash2 className="w-4 h-4" /> Delete
                       </button>
                     </div>
 
                     <div className="pt-6">
                       <button className="px-12 py-3.5 border border-stone-900 rounded-xl text-[13px] font-bold uppercase tracking-[0.25em] hover:bg-stone-900 hover:text-white active:scale-95 transition-all shadow-sm">
                         Pay Now
                       </button>
                     </div>
                   </div>
                 </div>
 
                 {idx < orders.length - 1 && (
                   <div className="mt-16 w-full h-px bg-gray-100"></div>
                 )}
               </div>
             );
           })
          )}
        </div>
      </div>
    </div>
  );

  const renderEditor = () => {
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

  // Full-screen Template Overlay used for both direct URL and internal Previews
  const renderTemplateOverlay = () => (
    <div className="fixed inset-0 bg-black overflow-hidden flex items-center justify-center z-[200]">
      <div className="w-full h-full max-w-md bg-white overflow-hidden relative">
        {/* Only show back button if NOT a direct public link */}
        {!isPublicLink && (
          <button
            onClick={() => {
               setIsPreview(false);
               window.scrollTo(0, 0);
            }}
            className="absolute top-4 left-4 z-50 bg-black/40 text-white p-2 rounded-full backdrop-blur-md hover:bg-black/60 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <TemplateRenderer data={ecardData} onRSVPSubmit={() => {}} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fdfcfb]">
      {/* Show header only if not in direct invitation view */}
      {!isPublicLink && !isPreview && <Header setView={setView} currentView={view} />}
      
      <main>
        {isPreview && renderTemplateOverlay()}
        
        {/* Regular views are shown only if preview overlay is inactive */}
        {!isPreview && (
          <>
            {view === ViewMode.LANDING && renderLanding()}
            {view === ViewMode.GALLERY && renderGallery()}
            {view === ViewMode.EDITOR && renderEditor()}
            {view === ViewMode.PRICING && renderPricing()}
            {view === ViewMode.MY_ORDERS && renderMyOrders()}
          </>
        )}
      </main>

      {!isPublicLink && !isPreview && (
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
      )}
    </div>
  );
};

export default App;