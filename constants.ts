
import { TemplateId, EcardData } from './types';

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  primaryColor: string;
  accentColor: string;
  bgClass: string;
  fontClass: string;
  headerFont: string;
  thumbnail: string;
}

export const TEMPLATES: TemplateConfig[] = [
  {
    id: 'classic-gold',
    name: 'Classic Gold',
    primaryColor: '#B8860B',
    accentColor: '#DAA520',
    bgClass: 'bg-[#FFFDF5]',
    fontClass: 'text-gray-800',
    headerFont: 'font-serif',
    thumbnail: 'https://images.unsplash.com/photo-1522673607200-1648832cee98?auto=format&fit=crop&q=80&w=400&h=600'
  },
  {
    id: 'floral-pink',
    name: 'Floral Pink',
    primaryColor: '#D27685',
    accentColor: '#E9A178',
    bgClass: 'bg-[#FDF6F7]',
    fontClass: 'text-[#5E3B4D]',
    headerFont: 'font-script',
    thumbnail: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&q=80&w=400&h=600'
  },
  {
    id: 'modern-dark',
    name: 'Modern Dark',
    primaryColor: '#6366F1',
    accentColor: '#A5B4FC',
    bgClass: 'bg-[#0F172A]',
    fontClass: 'text-gray-100',
    headerFont: 'font-sans',
    thumbnail: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c62?auto=format&fit=crop&q=80&w=400&h=600'
  },
  {
    id: 'minimal-light',
    name: 'Minimalist',
    primaryColor: '#1F2937',
    accentColor: '#9CA3AF',
    bgClass: 'bg-white',
    fontClass: 'text-slate-900',
    headerFont: 'font-sans',
    thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=400&h=600'
  }
];

export const INITIAL_ECARD_DATA: EcardData = {
  id: 'preview-123',
  template: 'classic-gold',
  config: {
    language: 'Bahasa Melayu',
    package: 'Gold',
    addOns: { ownDesign: false, coverVideo: false },
    designCode: 'STD-001',
    opening: { style: 'Envelope', color: '#1a1c18' },
    animation: { effect: 'Sakura', color: '#ffc0cb' }
  },
  jenisMajlis: { text: 'Walimatul Urus', fontSize: 14 },
  namaPanggilan: { text: 'Adam & Hawa', font: 'Cormorant Garamond', color: '#1a1c18', fontSize: 48 },
  tarikhMula: '2026-01-27T11:00:00',
  tarikhAkhir: '2026-01-27T16:00:00',
  hariTarikh: { text: 'Selasa, 27 Januari 2026', fontSize: 16 },
  namaTempat: 'Laman Wedding Hall',
  pembukaUcapan: 'Assalammualaikum W.B.T',
  bilanganPenganjur: 1,
  penganjur1: { name: 'Ibrahim Bin Hassan', relation: 'Bapa' },
  penganjur2: { name: 'Aminah Binti Ismail', relation: 'Ibu' },
  ayatUcapan: 'Dengan segala hormatnya, kami ingin menjemput Tuan/Puan/Encik/Cik ke majlis perkahwinan putera kami.',
  namaPenuh: { text: 'Adam Bin Ibrahim & Hawa Binti Ahmad', font: 'Cormorant Garamond', fontSize: 24 },
  tarikhHijrah: '8 Syaaban 1447H',
  alamatMajlis: 'Lot 123, Jalan Permai, Kuala Lumpur',
  googleMapsUrl: 'https://maps.google.com',
  wazeUrl: 'https://waze.com',
  gpsCoordinates: '3.1390, 101.6869',
  maklumatTambahan1: 'Semoga kehadiran anda memeriahkan lagi majlis kami.',
  aturCaraMajlis: '11:00 AM: Ketibaan Tetamu\n12:30 PM: Kehadiran Pengantin\n1:00 PM: Jamuan Makan\n4:00 PM: Majlis Bersurai',
  maklumatTambahan2: 'Doa kalian adalah hadiah buat kami.',
  ui: {
    commonFont: 'Montserrat',
    commonSize: 14,
    commonColor: '#4b5563',
    headerFont: 'Cormorant Garamond',
    headerSize: 32,
    headerColor: '#1a1c18',
    bgColor: '#ffffff',
    marginSisi: 2
  },
  rsvp: {
    mode: 'RSVP + Ucapan',
    note: 'Sila sahkan kehadiran sebelum 15 Januari 2026',
    closingDate: '2026-01-15',
    showInputs: ['nama', 'telefon', 'kehadiran'],
    separateKids: false,
    limitPerRsvp: 5,
    totalLimit: 500,
    hasSlots: false
  },
  contacts: [
    { name: 'Adam', relation: 'Pengantin', phone: '012-3456789', whatsapp: true },
    { name: 'Hawa', relation: 'Pengantin', phone: '012-9876543', whatsapp: true }
  ],
  music: {
    url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    startTime: '0:00',
    showButton: true,
    autoplay: true,
    scrollDelay: 0
  },
  gift: {
    enabled: true,
    title: 'Salam Kaut / Hadiah',
    note: 'Sumbangan anda amat kami hargai.',
    items: [
      { id: '1', url: '', image: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=AdamHawaWedding' }
    ]
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
