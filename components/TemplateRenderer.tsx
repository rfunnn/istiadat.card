
import React, { useEffect, useRef, useState } from 'react';
import { EcardData } from '../types';
import { 
  MapPin, 
  Calendar, 
  Navigation,
  ChevronDown,
  Phone,
  Gift as GiftIcon,
  Mail,
  Volume2,
  VolumeX,
  X,
  ExternalLink,
  MessageCircle,
  CheckCircle,
  Heart,
  QrCode,
  Users
} from 'lucide-react';

interface Props {
  data: EcardData;
  onRSVPSubmit: (rsvp: any) => void;
  previewMode?: boolean;
  initialShowCover?: boolean;
}

type ModalType = 'contacts' | 'maps' | 'gift' | 'rsvp' | null;

const ModalOverlay = ({ title, children, onClose }: { title: string; children?: React.ReactNode; onClose: () => void }) => (
  <div className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end justify-center animate-fade-in">
    <div className="w-full max-w-md bg-white rounded-t-[2.5rem] p-8 pb-12 shadow-2xl animate-slide-up relative">
      <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 opacity-50" />
      <button 
        onClick={onClose}
        className="absolute top-6 right-8 p-2 bg-gray-100 rounded-full text-gray-400 hover:text-black transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      <h3 className="text-lg font-bold mb-6 uppercase tracking-[0.2em] text-center text-gray-800">{title}</h3>
      <div className="max-h-[65vh] overflow-y-auto no-scrollbar px-1">
        {children}
      </div>
    </div>
  </div>
);

const TemplateRenderer: React.FC<Props> = ({ data, onRSVPSubmit, previewMode = false, initialShowCover = true }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [showCover, setShowCover] = useState(initialShowCover);

  const [guestCount, setGuestCount] = useState(1);

  const [isOpening, setIsOpening] = useState(false);
  const shouldAnimate = initialShowCover || isOpening;

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    
    if (!videoId) return '';

    let startSeconds = 0;
    if (data.music.startTime && data.music.startTime.includes(':')) {
      const [m, s] = data.music.startTime.split(':').map(Number);
      startSeconds = (m * 60) + (s || 0);
    }

    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&loop=1&playlist=${videoId}&start=${startSeconds}&controls=0&showinfo=0&rel=0&enablejsapi=1&origin=${window.location.origin}&widget_referrer=${window.location.origin}`;
  };

  useEffect(() => {
    let interval: number | null = null;
    if (data.music.scrollDelay > 0 && scrollRef.current && !activeModal && !showCover) {
      interval = window.setInterval(() => {
        if (scrollRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
          if (scrollTop + clientHeight >= scrollHeight - 5) {
            scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            scrollRef.current.scrollBy({ top: 1, behavior: 'auto' });
          }
        }
      }, 50 * (data.music.scrollDelay / 3.5));
    }
    return () => { if (interval) clearInterval(interval); };
  }, [data.music.scrollDelay, activeModal, showCover]);

  const handleOpenInvitation = () => {
    setIsOpening(true);
    setShowCover(false);
    if (data.music.autoplay && data.music.url) {
      setIsMusicPlaying(true);
    }
  };

  const sectionStyle = {
    paddingLeft: `${data.ui.marginSisi}rem`,
    paddingRight: `${data.ui.marginSisi}rem`,
  };

  const uiHeaderStyle = {
    fontFamily: data.ui.headerFont,
    fontSize: `${data.ui.headerSize}px`,
    color: data.ui.headerColor,
  };

  const uiCommonStyle = {
    fontFamily: data.ui.commonFont,
    fontSize: `${data.ui.commonSize}px`,
    color: data.ui.commonColor,
  };

  const subHeaderStyle = {
    ...uiHeaderStyle,
    fontSize: `${data.ui.headerSize * 0.5}px`,
  };

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSubmitted(true);
    onRSVPSubmit({ guestCount });
    setTimeout(() => setActiveModal(null), 2000);
  };

  const musicUrl = getYouTubeEmbedUrl(data.music.url);

  // Split name for stacked layout in hero
  const names = data.namaPanggilan.text.split(' & ');

  return (
    <div className="relative w-full h-full flex flex-col bg-white overflow-hidden shadow-2xl">
      {/* Opening Cover (Envelope) */}
      {showCover && (
        <div 
          className="absolute inset-0 z-[200] flex flex-col items-center justify-center p-8 text-center"
          style={{ backgroundColor: data.ui.bgColor }}
        >
          <div className="space-y-6 max-w-xs animate-fade-in-up">
             <p className="uppercase tracking-[0.3em] text-[10px] font-bold opacity-60" style={{ color: data.ui.commonColor }}>UNDANGAN MAJLIS</p>
             <h1 
               style={{ 
                 fontFamily: data.namaPanggilan.font, 
                 fontSize: `${data.namaPanggilan.fontSize}px`,
                 color: data.namaPanggilan.color 
               }}
               className="leading-tight font-serif"
             >
               {data.namaPanggilan.text}
             </h1>
             
             <div className="pt-8">
               <button 
                 onClick={handleOpenInvitation}
                 className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-white border border-black/5 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all"
               >
                 <Mail className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                 <span className="text-sm font-bold tracking-widest uppercase">Buka Undangan</span>
               </button>
             </div>

             <div className="pt-12 flex flex-col items-center gap-2 opacity-40">
               <Heart className="w-4 h-4 animate-pulse" style={{ color: data.ui.commonColor }} />
               <p className="text-[9px] uppercase tracking-widest" style={{ color: data.ui.commonColor }}>Kepada Tuan/Puan/Encik/Cik</p>
             </div>
          </div>
        </div>
      )}

      {/* Music Player Iframe */}
      {isMusicPlaying && musicUrl && (
        <div className="fixed -top-10 -left-10 opacity-0 pointer-events-none">
          <iframe
            width="1"
            height="1"
            src={musicUrl}
            title="Theme Song"
            frameBorder="0"
            allow="autoplay; encrypted-media; fullscreen"
          ></iframe>
        </div>
      )}

      {/* Scrollable Main Content */}
      <div 
        ref={scrollRef}
        className={`flex-1 overflow-y-auto no-scrollbar scroll-smooth transition-all duration-500 pb-24 ${showCover ? 'hidden' : 'block'}`}
        style={{ 
          backgroundColor: data.ui.bgColor, 
          ...uiCommonStyle 
        }}
      >
        {/* Page 2: Hero Section (Muka Depan) */}
        {(data.visibility.tarikh || data.visibility.masa) && (
          <section className="h-full min-h-[500px] flex flex-col items-center justify-center p-8 text-center relative">
            <div className={`z-10 flex flex-col items-center space-y-12 ${shouldAnimate ? 'animate-fade-in-up' : ''}`}>
              <p 
                style={{ 
                  fontFamily: data.ui.headerFont, 
                  fontSize: `${data.jenisMajlis.fontSize}px`, 
                  color: data.ui.headerColor 
                }} 
                className="uppercase tracking-[0.4em] font-medium opacity-80"
              >
                {data.jenisMajlis.text}
              </p>

              <div className="flex flex-col items-center">
                {names.map((name, i) => (
                  <React.Fragment key={i}>
                    <h1 
                      style={{ 
                        fontFamily: data.namaPanggilan.font, 
                        fontSize: `${data.namaPanggilan.fontSize}px`, 
                        color: data.namaPanggilan.color 
                      }} 
                      className="leading-tight font-serif"
                    >
                      {name}
                    </h1>
                    {i < names.length - 1 && (
                      <span className="text-3xl font-serif italic my-1 opacity-30" style={{ color: data.namaPanggilan.color }}>&</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="space-y-4 opacity-60" style={uiCommonStyle}>
                {data.visibility.tarikh && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span style={{ fontSize: `${data.hariTarikh.fontSize}px` }} className="font-medium tracking-wide">
                        {data.hariTarikh.text}
                      </span>
                    </div>
                    {data.tarikhHijrah && <p className="text-[11px] italic tracking-widest">{data.tarikhHijrah}</p>}
                  </div>
                )}
              </div>
            </div>
            {!showCover && (
              <div className={`absolute bottom-10 opacity-10 ${shouldAnimate ? 'animate-bounce' : ''}`}>
                <ChevronDown className="w-5 h-5" />
              </div>
            )}
          </section>
        )}

        {/* Page 3: Invitation Content (Ayat Undangan) */}
        <section className="py-20 text-center" style={sectionStyle}>
          <div className="py-12 px-6 bg-white/40 backdrop-blur-md rounded-[2.5rem] shadow-sm border border-black/5">
            <h3 
              style={{ 
                fontFamily: data.ui.headerFont, 
                color: data.ui.headerColor,
                fontSize: `${data.ui.headerSize * 0.6}px` 
              }} 
              className="mb-8 font-bold uppercase tracking-widest"
            >
              {data.pembukaUcapan}
            </h3>

            <p 
              style={{ ...uiCommonStyle, lineHeight: '1.8' }} 
              className="whitespace-pre-wrap mb-8 opacity-80 px-4"
            >
              {data.ayatUcapan}
            </p>

            <h2 
              style={{ 
                fontFamily: data.namaPenuh.font, 
                fontSize: `${data.namaPenuh.fontSize}px`, 
                color: data.ui.headerColor 
              }} 
              className="font-serif mt-6"
            >
              {data.namaPenuh.text}
            </h2>
          </div>
        </section>

        {/* Page 4: Address Display (Tempat & Navigasi) */}
        {data.visibility.tempat && (
          <section className="py-20 text-center" style={sectionStyle}>
            <div className="mb-10">
               <h3 
                style={subHeaderStyle} 
                className="uppercase tracking-[0.2em] font-bold mb-6"
              >
                Lokasi Majlis
              </h3>
              <MapPin className="w-8 h-8 mx-auto mb-6 opacity-30" style={{ color: data.ui.headerColor }} />
              <div 
                style={{ ...uiCommonStyle, fontSize: '14px', lineHeight: '1.8' }}
                className="whitespace-pre-wrap font-serif opacity-80 uppercase tracking-wide px-8"
              >
                {data.alamatMajlis}
              </div>
            </div>
          </section>
        )}

        {/* Page 5: Jadual Majlis & Prayer (Atur Cara) */}
        {data.visibility.aturCara && (
          <section className="py-10 px-6 flex flex-col items-center" style={sectionStyle}>
            <div className="w-full max-w-sm bg-gray-50/50 backdrop-blur-sm rounded-[3rem] p-10 flex flex-col items-center text-center space-y-8 shadow-sm">
               <h3 
                style={subHeaderStyle} 
                className="uppercase tracking-[0.2em] font-bold"
              >
                Jadual Majlis
              </h3>
               <div style={{ ...uiCommonStyle, lineHeight: '2' }} className="italic whitespace-pre-wrap opacity-80">
                 {data.aturCaraMajlis}
               </div>
            </div>
            
            <div className="w-full max-w-sm mt-12 flex flex-col items-center text-center">
               <div className="w-full h-px bg-gray-200/50 mb-12"></div>
               <h3 
                style={subHeaderStyle} 
                className="uppercase tracking-[0.1em] font-bold mb-6"
              >
                Sumbangan & Doa
              </h3>
               <GiftIcon className="w-8 h-8 opacity-30 mb-6" style={{ color: data.ui.headerColor }} />
               <div style={{ ...uiCommonStyle, lineHeight: '1.8' }} className="italic px-4 opacity-80 text-sm">
                 {data.maklumatTambahan2}
               </div>
            </div>
          </section>
        )}

        <footer className="py-20 text-center opacity-30 text-[10px] tracking-widest uppercase pb-32">
          <p>Powered by istiadat.card</p>
        </footer>
      </div>

      {/* FIXED FOOTER MENU */}
      <div className={`absolute bottom-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-lg border-t border-black/5 flex items-center justify-around px-4 z-[90] transition-transform duration-500 ${showCover ? 'translate-y-full' : 'translate-y-0'}`}>
        <button onClick={() => setActiveModal('contacts')} className="p-3 text-gray-400 hover:text-black transition-all active:scale-90">
          <Phone className="w-5 h-5 stroke-[2px]" />
        </button>
        
        <button 
          onClick={() => setIsMusicPlaying(!isMusicPlaying)} 
          disabled={!data.music.url}
          className={`p-3 transition-all active:scale-90 ${isMusicPlaying ? 'text-black' : 'text-gray-400'} ${!data.music.url ? 'opacity-20 cursor-not-allowed' : ''}`}
        >
          {isMusicPlaying ? <Volume2 className="w-5 h-5 stroke-[2px] animate-pulse" /> : <VolumeX className="w-5 h-5 stroke-[2px]" />}
        </button>

        <button onClick={() => setActiveModal('maps')} className="p-3 text-gray-400 hover:text-black transition-all active:scale-90">
          <MapPin className="w-5 h-5 stroke-[2px]" />
        </button>
        
        <button onClick={() => setActiveModal('gift')} className={`p-3 transition-all active:scale-90 ${data.gift.enabled ? 'text-gray-400 hover:text-black' : 'text-gray-100'}`} disabled={!data.gift.enabled}>
          <GiftIcon className="w-5 h-5 stroke-[2px]" />
        </button>
        
        <button onClick={() => setActiveModal('rsvp')} className="p-3 text-gray-400 hover:text-black transition-all active:scale-90 relative">
          <Mail className="w-5 h-5 stroke-[2px]" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[7px] font-bold mt-[2px] opacity-70">RSVP</span>
        </button>
      </div>

      {/* MODALS */}
      {activeModal === 'contacts' && (
        <ModalOverlay title="Hubungi Kami" onClose={() => setActiveModal(null)}>
          <div className="space-y-6">
            {data.contacts.map((c, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div>
                  <p className="font-bold text-gray-800">{c.name}</p>
                  <p className="text-xs text-gray-400 uppercase tracking-tighter">{c.relation}</p>
                </div>
                <div className="flex gap-2">
                  <a href={`tel:${c.phone}`} className="p-3 bg-blue-50 text-blue-600 rounded-full"><Phone className="w-5 h-5" /></a>
                  {c.whatsapp && (
                    <a href={`https://api.whatsapp.com/send?phone=${c.phone.replace(/\D/g, '')}`} target="_blank" className="p-3 bg-green-50 text-green-600 rounded-full"><MessageCircle className="w-5 h-5" /></a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ModalOverlay>
      )}

      {activeModal === 'maps' && (
        <ModalOverlay title="Navigasi" onClose={() => setActiveModal(null)}>
          <div className="space-y-4">
            <a href={data.googleMapsUrl} target="_blank" className="flex items-center gap-4 p-5 bg-white border-2 border-gray-100 rounded-3xl hover:border-blue-500 transition-all group">
              <MapPin className="w-6 h-6 text-blue-600" />
              <div className="text-left">
                <p className="font-bold text-gray-800">Google Maps</p>
                <p className="text-xs text-gray-400">Buka lokasi di Google Maps</p>
              </div>
            </a>
            <a href={data.wazeUrl} target="_blank" className="flex items-center gap-4 p-5 bg-white border-2 border-gray-100 rounded-3xl hover:border-indigo-500 transition-all group">
              <Navigation className="w-6 h-6 text-indigo-600" />
              <div className="text-left">
                <p className="font-bold text-gray-800">Waze Navigation</p>
                <p className="text-xs text-gray-400">Navigasi menggunakan Waze</p>
              </div>
            </a>
          </div>
        </ModalOverlay>
      )}

      {activeModal === 'gift' && (
        <ModalOverlay title={data.gift.title} onClose={() => setActiveModal(null)}>
          <div className="flex flex-col space-y-6 pb-4">
            {data.gift.note && (
              <p className="text-[13px] text-gray-500 italic leading-relaxed text-center px-4 mb-2">
                "{data.gift.note}"
              </p>
            )}
            
            <div className="grid grid-cols-1 gap-4">
              {data.gift.items.map((item, index) => (
                <div key={item.id} className="bg-gray-50 rounded-[2rem] p-6 border border-gray-100 flex flex-col items-center space-y-5" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">
                    <GiftIcon className="w-3 h-3" />
                    <span>Sumbangan #{index + 1}</span>
                  </div>

                  {item.image && (
                    <div className="relative w-full max-w-[180px] group">
                      <div className="absolute inset-0 bg-black/5 rounded-2xl -rotate-2 group-hover:rotate-0 transition-transform"></div>
                      <div className="relative bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                        <img src={item.image} alt={`Gift QR ${index + 1}`} className="w-full h-auto rounded-lg" />
                        <div className="mt-3 flex items-center gap-2 text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                          <QrCode className="w-3 h-3" />
                          <span>Imbas QR</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {item.url && (
                    <div className="w-full space-y-2">
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-3 py-3.5 bg-gray-900 text-white rounded-2xl font-bold text-[11px] shadow-lg active:scale-95 transition-all uppercase tracking-widest"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Pautan Digital</span>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ModalOverlay>
      )}

      {activeModal === 'rsvp' && (
        <ModalOverlay title="Sahkan Kehadiran" onClose={() => setActiveModal(null)}>
          {rsvpSubmitted ? (
            <div className="text-center py-12 animate-fade-in">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-lg font-bold text-gray-800">Terima Kasih!</p>
              <p className="text-sm text-gray-500 mt-2">Maklum balas anda telah direkodkan.</p>
            </div>
          ) : (
            <form onSubmit={handleRSVP} className="space-y-4">
              <div className="space-y-1">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Nama Penuh</label>
                 <input required type="text" placeholder="Cth: Ahmad bin Abu" className="w-full p-4 bg-gray-50 rounded-2xl border-none text-sm" />
              </div>
              <div className="space-y-1">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Nombor Telefon</label>
                 <input required type="tel" placeholder="Cth: 012-3456789" className="w-full p-4 bg-gray-50 rounded-2xl border-none text-sm" />
              </div>
              <div className="space-y-1">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2 flex items-center gap-1">
                   <Users className="w-3 h-3" /> Jumlah Kehadiran
                 </label>
                 <div className="flex items-center gap-4 p-2 bg-gray-50 rounded-2xl px-4">
                    <button type="button" onClick={() => setGuestCount(Math.max(1, guestCount - 1))} className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm text-lg font-bold">-</button>
                    <span className="flex-1 text-center font-bold text-lg">{guestCount} pax</span>
                    <button type="button" onClick={() => setGuestCount(Math.min(10, guestCount + 1))} className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm text-lg font-bold">+</button>
                 </div>
              </div>
              <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-3xl font-bold shadow-xl mt-4 active:scale-95 transition-transform uppercase tracking-widest text-xs">Hantar Maklumat</button>
            </form>
          )}
        </ModalOverlay>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
      `}} />
    </div>
  );
};

export default TemplateRenderer;
