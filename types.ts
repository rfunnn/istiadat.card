
export enum ViewMode {
  LANDING = 'LANDING',
  GALLERY = 'GALLERY',
  EDITOR = 'EDITOR',
  PREVIEW = 'PREVIEW',
  PRICING = 'PRICING',
  MY_COLLECTIONS = 'MY_COLLECTIONS',
  MY_LIKES = 'MY_LIKES'
}

export type TemplateId = 'classic-gold' | 'floral-pink' | 'modern-dark' | 'minimal-light';

export interface GiftItem {
  id: string;
  url: string;
  image: string;
}

export interface EcardData {
  id: string;
  template: TemplateId;
  
  // Page 1: Utama & Pembukaan
  config: {
    language: 'English' | 'Bahasa Melayu';
    package: string;
    addOns: { ownDesign: boolean; coverVideo: boolean };
    designCode: string;
    opening: { style: string; color: string };
    animation: { effect: string; color: string };
  };

  // Page 2: Muka Depan
  jenisMajlis: { text: string; fontSize: number };
  namaPanggilan: { text: string; font: string; color: string; fontSize: number };
  tarikhMula: string;
  tarikhAkhir: string;
  hariTarikh: { text: string; fontSize: number };
  namaTempat: string;
  
  // Page 3: Ayat Undangan
  pembukaUcapan: string;
  bilanganPenganjur: 1 | 2;
  penganjur1: { name: string; relation: string };
  penganjur2: { name: string; relation: string };
  ayatUcapan: string;
  namaPenuh: { text: string; font: string; fontSize: number };
  
  // Page 4: Tempat & Navigasi
  tarikhHijrah: string;
  alamatMajlis: string;
  googleMapsUrl: string;
  wazeUrl: string;
  gpsCoordinates: string;
  
  // Page 5: Atur Cara & Lain-lain
  maklumatTambahan1: string;
  aturCaraMajlis: string;
  maklumatTambahan2: string;
  
  // Page 6: Antara Muka (UI)
  ui: {
    commonFont: string;
    commonSize: number;
    commonColor: string;
    headerFont: string;
    headerSize: number;
    headerColor: string;
    bgColor: string;
    marginSisi: number;
  };
  
  // Page 7: RSVP / Ucapan
  rsvp: {
    mode: 'RSVP + Ucapan' | 'Ucapan Sahaja' | 'Pihak Ketiga' | 'Tiada';
    note: string;
    closingDate: string;
    showInputs: string[];
    separateKids: boolean;
    limitPerRsvp: number;
    totalLimit: number;
    hasSlots: boolean;
  };
  
  // Page 8: Hubungi
  contacts: Array<{ name: string; relation: string; phone: string; whatsapp: boolean }>;
  
  // Page 9: Lagu & Auto Skrol
  music: {
    url: string;
    startTime: string;
    showButton: boolean;
    autoplay: boolean;
    scrollDelay: number;
  };

  // Page 10: Hadiah / Salam Kaut
  gift: {
    enabled: boolean;
    title: string;
    note: string;
    items: GiftItem[];
  };
  
  // Page 11: Segmen (Visibility)
  visibility: {
    tempat: boolean;
    tarikh: boolean;
    masa: boolean;
    masaTamat: boolean;
    butangSaveDate: boolean;
    aturCara: boolean;
    countdown: boolean;
    kehadiran: boolean;
    ucapan: boolean;
    butangSahkan: boolean;
    butangTulisUcapan: boolean;
  };
}

export interface RSVPResponse {
  name: string;
  phone: string;
  attending: boolean;
  guests: number;
  message?: string;
  timestamp: number;
}
