
export enum ViewMode {
  LANDING = 'LANDING',
  GALLERY = 'GALLERY',
  EDITOR = 'EDITOR',
  PREVIEW = 'PREVIEW',
  PRICING = 'PRICING'
}

export interface WeddingData {
  brideName: string;
  groomName: string;
  brideNick: string;
  groomNick: string;
  date: string;
  time: string;
  venue: string;
  venueAddress: string;
  fatherName: string;
  motherName: string;
  quote: string;
  rsvpContact: string;
  musicUrl: string;
  imageUrl?: string;
}

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  themeColor: string;
  accentColor: string;
  textColor: string;
  fontFamily: 'serif' | 'sans' | 'script';
  bgPattern: string;
}

export type TemplateId = 'classic-gold' | 'minimalist-white' | 'royal-floral' | 'modern-dark';
