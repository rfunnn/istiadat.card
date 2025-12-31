import React, { useState } from 'react';
import { EcardData } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  Save,
  Bold,
  Italic,
  Underline,
  List,
  AlignCenter,
  Strikethrough,
  Type,
  ChevronDown,
  Image as ImageIcon,
  ChevronLeft as ChevronLeftIcon,
  ListOrdered,
  Indent,
  Outdent,
  HelpCircle,
  Calendar,
  Link2,
  Palette,
  Highlighter,
  Play,
  ArrowUp,
  ArrowDown,
  Plus,
  Trash2,
  RotateCcw,
  Eye,
  EyeOff,
  Upload
} from 'lucide-react';

interface Props {
  data: EcardData;
  onChange: (data: EcardData) => void;
  onPreview: () => void;
}

const PAGES = [
  "1. Utama & Pembukaan",
  "2. Muka Depan",
  "3. Ayat Undangan",
  "4. Tempat & Navigasi",
  "5. Atur Cara & Lain-lain",
  "6. Antara Muka",
  "7. RSVP / Ucapan",
  "8. Hubungi",
  "9. Lagu & Auto Skrol",
  "10. Hadiah / Salam Kaut",
  "11. Segmen & Tamat"
];

const FONTS = [
  "Spartan",
  "Cormorant",
  "Great Vibes",
  "Cinzel",
  "Dancing Script",
  "Playfair Display",
  "PlaylistScript"
];

const RSVP_INPUTS = [
  "Nama",
  "Telefon",
  "Alamat Emel",
  "Alamat Rumah",
  "Nama Syarikat",
  "Jawatan Pekerjaan",
  "No. Plat Kenderaan",
  "Catatan",
  "Ucapan"
];

const Editor: React.FC<Props> = ({ data, onChange, onPreview }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const updateField = (path: string, value: any) => {
    const newData = { ...data };
    const keys = path.split('.');
    let current: any = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    onChange(newData);
  };

  const PageHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div className="flex flex-col items-center mb-8">
      <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-2 cursor-pointer w-full justify-start pl-2">
        <ChevronLeftIcon className="w-4 h-4" /> <span>Orders</span>
      </div>
      <h2 className="text-[20px] font-bold tracking-tight text-gray-900 uppercase">{title}</h2>
      {subtitle && (
        <p className="text-[13px] mt-1 text-gray-900 border-b border-gray-900 pb-0.5 cursor-pointer">
          {subtitle}
        </p>
      )}
    </div>
  );

  const Label = ({ children, required = false, info = false }: any) => (
    <label className="block text-[14px] font-bold mb-2 flex items-center gap-1.5 text-gray-900">
      {children}
      {required && <span className="text-red-500">*</span>}
      {info && <div className="w-4 h-4 rounded-full bg-[#FFD700] flex items-center justify-center text-[10px] text-white font-bold">?</div>}
    </label>
  );

  const Slider = ({ value, min, max, onChange, unit = "" }: any) => (
    <div className="flex items-center gap-4 py-1">
      <input
        type="range"
        min={min} max={max} step={unit === "rem" || unit === "s" ? 0.05 : 1}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="flex-1 accent-blue-600 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <span className="text-xs text-gray-600 w-12 text-right font-medium">{value}{unit}</span>
    </div>
  );

  const ColorInput = ({ value, onChange, label }: { value: string; onChange: (val: string) => void; label?: string }) => {
    return (
      <div className="flex items-center gap-3">
        <div className="flex border border-gray-400 rounded-lg overflow-hidden w-[100px] bg-white h-[42px]">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-2 text-[12px] font-mono focus:outline-none"
          />
          <div className="relative w-10 border-l border-gray-400 h-full">
            <input
              type="color"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-full h-full" style={{ backgroundColor: value }}></div>
          </div>
        </div>
        {label && <span className="text-[13px] text-gray-600 font-medium">{label}</span>}
      </div>
    );
  };

  const Toggle = ({ active, onToggle }: { active: boolean; onToggle: () => void }) => (
    <div
      onClick={onToggle}
      className={`w-[44px] h-[22px] rounded-full relative transition-colors cursor-pointer ${active ? 'bg-black' : 'bg-[#D1D1D6]'}`}
    >
      <div className={`absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-all ${active ? 'left-[24px]' : 'left-[2px]'}`} />
    </div>
  );

  const RichToolBar = ({ full = false, compact = false }: { full?: boolean; compact?: boolean }) => {
    return (
      <div className="border-b border-gray-200 bg-white rounded-t-xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-2 border-b border-gray-100 flex-wrap text-gray-600">
          <Bold className="w-4 h-4 cursor-pointer" />
          <Italic className="w-4 h-4 cursor-pointer" />
          <Underline className="w-4 h-4 cursor-pointer" />
          <Strikethrough className="w-4 h-4 cursor-pointer" />
          <Link2 className="w-4 h-4 cursor-pointer" />
          <ImageIcon className="w-4 h-4 cursor-pointer" />
          <div className="w-px h-4 bg-gray-200"></div>
          <ListOrdered className="w-4 h-4 cursor-pointer" />
          <List className="w-4 h-4 cursor-pointer" />
          <div className="w-px h-4 bg-gray-200"></div>
          <Indent className="w-4 h-4 cursor-pointer" />
          <Outdent className="w-4 h-4 cursor-pointer" />
          {full && (
            <>
              <div className="w-px h-4 bg-gray-200"></div>
              <div className="flex items-center gap-1 cursor-pointer text-[10px] font-serif uppercase tracking-tighter">
                <span>Cinzel</span>
                <ChevronDown className="w-3 h-3" />
              </div>
              <div className="w-px h-4 bg-gray-200"></div>
              <Palette className="w-4 h-4" />
            </>
          )}
        </div>
        {!compact && (
          <div className="flex items-center gap-4 px-4 py-2 flex-wrap text-gray-600">
            <Type className="w-4 h-4 cursor-pointer" />
            <Highlighter className="w-4 h-4 cursor-pointer" />
            <div className="flex items-center gap-1.5 cursor-pointer">
              <span className="text-[11px] font-medium">Default</span>
              <ChevronDown className="w-3 h-3" />
            </div>
            <div className="flex-1"></div>
            <AlignCenter className="w-4 h-4 cursor-pointer" />
          </div>
        )}
      </div>
    );
  };

  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newItems = [...data.gift.items];
        newItems[index].image = reader.result as string;
        updateField('gift.items', newItems);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputToggle = (input: string) => {
    const inputs = [...(data.rsvp.showInputs || [])];
    if (inputs.includes(input)) {
      updateField('rsvp.showInputs', inputs.filter(i => i !== input));
    } else {
      updateField('rsvp.showInputs', [...inputs, input]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white text-gray-900 shadow-xl border-r border-gray-200">
      <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
        {currentPage === 0 && (
          <div className="space-y-6">
            <PageHeader title="EDIT CARD" subtitle="Utama & Pembukaan" />
            <div>
              <Label>Bahasa Kad</Label>
              <div className="flex items-center gap-4 mt-1">
                <label className="flex items-center gap-2 cursor-pointer text-[14px] font-medium text-gray-600">
                  <input type="radio" checked={data.config.language === 'English'} onChange={() => updateField('config.language', 'English')} className="w-4 h-4 accent-blue-600" /> English
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-[14px] font-medium text-gray-600">
                  <input type="radio" checked={data.config.language === 'Bahasa Melayu'} onChange={() => updateField('config.language', 'Bahasa Melayu')} className="w-4 h-4 accent-blue-600" /> Bahasa Melayu
                </label>
              </div>
            </div>
            <div className="pt-2">
              <Label info>Pakej Pilihan</Label>
              <div className="relative">
                <select value={data.config.package} onChange={(e) => updateField('config.package', e.target.value)} className="w-full border border-gray-800 rounded-lg p-3 text-[14px] font-medium appearance-none bg-white focus:outline-none">
                  <option value="Gold (RM60)">🏅 Gold (RM60)</option>
                  <option value="Silver (RM40)">🥈 Silver (RM40)</option>
                  <option value="Bronze (RM30)">🥉 Bronze (RM30)</option>
                </select>
                <ChevronDown className="absolute right-3 top-4 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
            <div className="pt-2">
              <Label info>Add-On</Label>
              <div className="space-y-3 mt-2">
                <div className="flex items-center gap-3">
                  <Toggle active={data.config.addOns.ownDesign} onToggle={() => updateField('config.addOns.ownDesign', !data.config.addOns.ownDesign)} />
                  <span className="text-[14px] font-medium text-gray-700">Muatnaik Rekaan Sendiri (+RM10)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Toggle active={data.config.addOns.coverVideo} onToggle={() => updateField('config.addOns.coverVideo', !data.config.addOns.coverVideo)} />
                  <span className="text-[14px] font-medium text-gray-700">Muatnaik Cover Video (+RM10)</span>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <Label required>Kod Rekaan</Label>
              <div className="relative">
                <select value={data.config.designCode} onChange={(e) => updateField('config.designCode', e.target.value)} className="w-full border border-gray-400 rounded-lg p-3 text-[14px] font-medium appearance-none bg-white focus:outline-none text-gray-500">
                  <option value="FLO085">FLO085</option>
                  <option value="GLD001">GLD001</option>
                </select>
                <ChevronDown className="absolute right-3 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="mb-4">
              <Label required>Gaya Pembukaan</Label>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <select value={data.config.opening.style} onChange={(e) => updateField('config.opening.style', e.target.value)} className="w-full border border-gray-800 rounded-lg p-2.5 text-[14px] font-medium appearance-none bg-white focus:outline-none">
                    <option value="Tingkap A">Tingkap A</option>
                    <option value="Tingkap B">Tingkap B</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <ColorInput value={data.config.opening.color} onChange={(val) => updateField('config.opening.color', val)} />
              </div>
            </div>
            <div className="mb-4">
              <Label required>Animasi Efek</Label>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <select value={data.config.animation.effect} onChange={(e) => updateField('config.animation.effect', e.target.value)} className="w-full border border-gray-800 rounded-lg p-2.5 text-[14px] font-medium appearance-none bg-white focus:outline-none">
                    <option value="Salji #1">Salji #1</option>
                    <option value="Kelopak Bunga">Kelopak Bunga</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <ColorInput value={data.config.animation.color} onChange={(val) => updateField('config.animation.color', val)} />
              </div>
            </div>
          </div>
        )}

        {currentPage === 1 && (
          <div className="space-y-6">
            <PageHeader title="EDIT CARD" subtitle="Muka Depan" />
            <div>
              <Label>Jenis Majlis</Label>
              <textarea value={data.jenisMajlis.text} onChange={(e) => updateField('jenisMajlis.text', e.target.value)} className="w-full border border-gray-800 rounded-lg p-3 text-center min-h-[60px] text-[14px] focus:outline-none resize-none" />
              <Slider value={data.jenisMajlis.fontSize} min={10} max={30} onChange={(v: any) => updateField('jenisMajlis.fontSize', v)} />
            </div>
            <div>
              <Label required info>Nama Panggilan</Label>
              <input type="text" value={data.namaPanggilan.text} onChange={(e) => updateField('namaPanggilan.text', e.target.value)} className="w-full border border-gray-800 rounded-lg p-2.5 text-[14px] font-medium focus:outline-none mb-3" />
              <div className="flex gap-4 mb-3">
                <div className="relative flex-1">
                  <select value={data.namaPanggilan.font} onChange={(e) => updateField('namaPanggilan.font', e.target.value)} className="w-full border border-gray-800 rounded-lg p-2.5 text-[14px] italic appearance-none bg-white focus:outline-none" style={{ fontFamily: data.namaPanggilan.font }}>
                    {FONTS.map(f => <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <ColorInput value={data.namaPanggilan.color} onChange={(val) => updateField('namaPanggilan.color', val)} />
              </div>
              <Slider value={data.namaPanggilan.fontSize} min={10} max={100} onChange={(v: any) => updateField('namaPanggilan.fontSize', v)} />
            </div>
            <div>
              <Label required>Tarikh & Waktu Majlis Bermula</Label>
              <div className="relative">
                <input type="datetime-local" value={data.tarikhMula} onChange={(e) => updateField('tarikhMula', e.target.value)} className="w-full border border-gray-800 rounded-lg p-2.5 text-[14px] focus:outline-none pr-10" />
                <Calendar className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <Label required>Tarikh & Waktu Majlis Berakhir</Label>
              <div className="relative">
                <input type="datetime-local" value={data.tarikhAkhir} onChange={(e) => updateField('tarikhAkhir', e.target.value)} className="w-full border border-gray-800 rounded-lg p-2.5 text-[14px] focus:outline-none pr-10" />
                <Calendar className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <Label>Hari & Tarikh</Label>
              <textarea value={data.hariTarikh.text} onChange={(e) => updateField('hariTarikh.text', e.target.value)} className="w-full border border-gray-800 rounded-lg p-3 text-center min-h-[70px] text-[14px] focus:outline-none resize-none leading-relaxed" />
              <Slider value={data.hariTarikh.fontSize} min={10} max={40} onChange={(v: any) => updateField('hariTarikh.fontSize', v)} />
            </div>
            <div>
              <Label>Nama Tempat / Hashtag / dll (jika ada)</Label>
              <textarea value={data.namaTempat} onChange={(e) => updateField('namaTempat', e.target.value)} className="w-full border border-gray-800 rounded-lg p-3 text-center min-h-[60px] text-[14px] focus:outline-none resize-none leading-relaxed" />
            </div>
          </div>
        )}

        {currentPage === 2 && (
          <div className="space-y-6">
            <PageHeader title="EDIT CARD" subtitle="Ayat Undangan" />
            <div>
              <Label>Pembuka Ucapan</Label>
              <div className="border border-gray-800 rounded-xl overflow-hidden bg-white">
                <RichToolBar />
                <div className="p-4 bg-white border-t border-gray-100">
                  <textarea value={data.pembukaUcapan} onChange={(e) => updateField('pembukaUcapan', e.target.value)} className="w-full min-h-[60px] text-center focus:outline-none text-sm placeholder-gray-300 resize-none" placeholder="Walimatul Urus" />
                </div>
              </div>
            </div>
            <div className="pt-2">
              <Label required>Bilangan Penganjur</Label>
              <div className="flex items-center gap-6 mt-1">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                  <input type="radio" checked={data.bilanganPenganjur === 1} onChange={() => updateField('bilanganPenganjur', 1)} className="w-4 h-4 accent-blue-600" /> Satu
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                  <input type="radio" checked={data.bilanganPenganjur === 2} onChange={() => updateField('bilanganPenganjur', 2)} className="w-4 h-4 accent-blue-600" /> Dua
                </label>
              </div>
            </div>
            <div className="space-y-4 pt-2">
              <div className="space-y-3">
                <Label>Penganjur Pertama</Label>
                <input type="text" placeholder="Nama Penganjur 1" value={data.penganjur1.name} onChange={(e) => updateField('penganjur1.name', e.target.value)} className="w-full border border-gray-800 rounded-lg p-2.5 text-sm" />
                <input type="text" placeholder="Hubungan (cth: Bapa & Ibu Pengantin)" value={data.penganjur1.relation} onChange={(e) => updateField('penganjur1.relation', e.target.value)} className="w-full border border-gray-800 rounded-lg p-2.5 text-sm" />
              </div>
              {data.bilanganPenganjur === 2 && (
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <Label>Penganjur Kedua</Label>
                  <input type="text" placeholder="Nama Penganjur 2" value={data.penganjur2.name} onChange={(e) => updateField('penganjur2.name', e.target.value)} className="w-full border border-gray-800 rounded-lg p-2.5 text-sm" />
                  <input type="text" placeholder="Hubungan (cth: Bapa & Ibu Pengantin)" value={data.penganjur2.relation} onChange={(e) => updateField('penganjur2.relation', e.target.value)} className="w-full border border-gray-800 rounded-lg p-2.5 text-sm" />
                </div>
              )}
            </div>
            <div>
              <Label required>Ayat Ucapan</Label>
              <div className="border border-gray-800 rounded-xl overflow-hidden bg-white">
                <RichToolBar />
                <div className="p-4 bg-white border-t border-gray-100">
                  <textarea value={data.ayatUcapan} onChange={(e) => updateField('ayatUcapan', e.target.value)} className="w-full min-h-[120px] text-center focus:outline-none text-[11px] leading-relaxed resize-none" />
                </div>
              </div>
            </div>
            <div>
              <Label info>Nama Penuh Pengantin (jika ada)</Label>
              <input type="text" value={data.namaPenuh.text} onChange={(e) => updateField('namaPenuh.text', e.target.value)} className="w-full border border-gray-800 rounded-lg p-2.5 text-sm font-medium" />
              <Slider value={data.namaPenuh.fontSize} min={10} max={60} onChange={(v: any) => updateField('namaPenuh.fontSize', v)} />
            </div>
          </div>
        )}

        {currentPage === 3 && (
          <div className="space-y-6">
            <PageHeader title="EDIT CARD" subtitle="Tempat & Navigasi" />
            <div>
              <Label>Tarikh Hijrah (jika ada)</Label>
              <input type="text" value={data.tarikhHijrah} onChange={(e) => updateField('tarikhHijrah', e.target.value)} className="w-full border border-gray-800 rounded-lg p-2.5 text-[14px] font-medium" placeholder="12 Rejab 1446H" />
            </div>
            <div className="pt-2">
              <Label required info>Alamat Majlis</Label>
              <div className="border border-gray-800 rounded-xl overflow-hidden bg-white">
                <RichToolBar full />
                <div className="p-4 bg-white border-t border-gray-100">
                  <textarea value={data.alamatMajlis} onChange={(e) => updateField('alamatMajlis', e.target.value)} className="w-full min-h-[140px] text-center focus:outline-none text-[13px] leading-relaxed font-serif" />
                </div>
              </div>
            </div>
            <div className="pt-4">
              <Label info>Navigasi (jika perlu)</Label>
              <div className="border border-gray-300 rounded-2xl p-5 space-y-5 bg-[#FAFAFA]">
                <div>
                  <Label>Pautan Google Maps</Label>
                  <input type="text" value={data.googleMapsUrl} onChange={(e) => updateField('googleMapsUrl', e.target.value)} className="w-full border border-gray-800 rounded-lg p-2.5 text-[12px] bg-white focus:outline-none" placeholder="https://maps.google.com/..." />
                </div>
                <div>
                  <Label>Pautan Waze</Label>
                  <input type="text" value={data.wazeUrl} onChange={(e) => updateField('wazeUrl', e.target.value)} className="w-full border border-gray-800 rounded-lg p-2.5 text-[12px] bg-white focus:outline-none" placeholder="https://waze.com/..." />
                </div>
                <div className="relative flex items-center justify-center py-2">
                  <div className="absolute inset-x-0 h-px bg-gray-200"></div>
                  <span className="relative bg-[#FAFAFA] px-3 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Atau</span>
                </div>
                <div>
                  <Label info>Koordinat GPS</Label>
                  <input type="text" value={data.gpsCoordinates} onChange={(e) => updateField('gpsCoordinates', e.target.value)} className="w-full border border-gray-800 rounded-lg p-2.5 text-[12px] bg-white focus:outline-none" placeholder="2.3456, 102.3456" />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentPage === 4 && (
          <div className="space-y-6">
            <PageHeader title="EDIT CARD" subtitle="Atur Cara & Lain-lain" />
            <div className="space-y-2">
              <Label>Maklumat Tambahan #1 (jika ada)</Label>
              <div className="border border-gray-800 rounded-xl overflow-hidden bg-white">
                <RichToolBar compact />
                <div className="p-4 bg-white border-t border-gray-100">
                  <textarea value={data.maklumatTambahan1} onChange={(e) => updateField('maklumatTambahan1', e.target.value)} className="w-full min-h-[80px] text-sm focus:outline-none italic" placeholder="Insert text here ..." />
                </div>
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <Label required>Atur Cara Majlis</Label>
              <div className="border border-gray-800 rounded-xl overflow-hidden bg-white">
                <RichToolBar compact />
                <div className="p-6 bg-white border-t border-gray-100">
                  <textarea value={data.aturCaraMajlis} onChange={(e) => updateField('aturCaraMajlis', e.target.value)} className="w-full min-h-[220px] text-center text-sm leading-loose focus:outline-none" />
                </div>
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <Label>Maklumat Tambahan #2 (jika ada)</Label>
              <div className="border border-gray-800 rounded-xl overflow-hidden bg-white">
                <RichToolBar compact />
                <div className="p-4 bg-white border-t border-gray-100">
                  <textarea value={data.maklumatTambahan2} onChange={(e) => updateField('maklumatTambahan2', e.target.value)} className="w-full min-h-[100px] text-center text-[13px] font-serif focus:outline-none" />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentPage === 5 && (
          <div className="space-y-8">
            <PageHeader title="EDIT CARD" subtitle="Antara Muka" />
            <div className="space-y-4">
              <Label info>Teks Tajuk (Header)</Label>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <select value={data.ui.headerFont} onChange={(e) => updateField('ui.headerFont', e.target.value)} className="w-full border border-gray-800 rounded-lg p-2.5 text-sm appearance-none bg-white focus:outline-none">
                    {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <ColorInput value={data.ui.headerColor} onChange={(v) => updateField('ui.headerColor', v)} />
              </div>
              <Slider value={data.ui.headerSize} min={20} max={100} onChange={(v: any) => updateField('ui.headerSize', v)} />
            </div>
            <div className="space-y-4 pt-2">
              <Label info>Teks Umum (Common)</Label>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <select value={data.ui.commonFont} onChange={(e) => updateField('ui.commonFont', e.target.value)} className="w-full border border-gray-800 rounded-lg p-2.5 text-sm appearance-none bg-white focus:outline-none">
                    {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <ColorInput value={data.ui.commonColor} onChange={(v) => updateField('ui.commonColor', v)} />
              </div>
              <Slider value={data.ui.commonSize} min={8} max={30} onChange={(v: any) => updateField('ui.commonSize', v)} />
            </div>
            <div className="pt-2">
              <Label>Warna Latar Belakang</Label>
              <ColorInput value={data.ui.bgColor} onChange={(v) => updateField('ui.bgColor', v)} label="Warna Latar" />
            </div>
            <div className="pt-2">
              <Label>Margin Sisi</Label>
              <Slider value={data.ui.marginSisi} min={0} max={5} onChange={(v: any) => updateField('ui.marginSisi', v)} unit=" rem" />
            </div>
          </div>
        )}

        {currentPage === 6 && (
          <div className="space-y-6">
            <PageHeader title="EDIT CARD" subtitle="RSVP / Ucapan" />
            <div>
              <Label>Mod Pilihan</Label>
              <div className="space-y-3 mt-2">
                {['RSVP + Ucapan', 'Ucapan Sahaja', 'Pihak Ketiga', 'Tiada'].map(m => (
                  <label key={m} className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" checked={data.rsvp.mode === m} onChange={() => updateField('rsvp.mode', m)} className="w-4 h-4 accent-blue-600" />
                    <span className="text-[14px] font-medium text-gray-700 group-hover:text-black transition-colors">{m}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="pt-4">
              <Label info>Tarikh Tutup RSVP</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input type="datetime-local" value={data.rsvp.closingDate} onChange={(e) => updateField('rsvp.closingDate', e.target.value)} className="w-full border border-gray-800 rounded-lg p-2.5 text-sm focus:outline-none" />
                  <Calendar className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <button onClick={() => updateField('rsvp.closingDate', '')} className="px-5 border border-gray-800 rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-gray-50 active:bg-gray-100 transition-colors">RESET</button>
              </div>
            </div>
            <div className="pt-4">
              <Label>Tunjukkan Input</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {RSVP_INPUTS.map(i => (
                  <label key={i} className="flex items-center gap-2.5 text-[13px] font-medium text-gray-600 cursor-pointer">
                    <input type="checkbox" checked={data.rsvp.showInputs.includes(i)} onChange={() => handleInputToggle(i)} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /> {i}
                  </label>
                ))}
              </div>
            </div>
            <div className="pt-4">
               <Label required>Had Tetamu per RSVP</Label>
               <input type="number" value={data.rsvp.limitPerRsvp} onChange={(e) => updateField('rsvp.limitPerRsvp', parseInt(e.target.value) || 0)} className="w-full border border-gray-800 rounded-lg p-2.5 font-medium focus:outline-none" />
            </div>
          </div>
        )}

        {currentPage === 7 && (
          <div className="space-y-6">
            <PageHeader title="EDIT CARD" subtitle="Hubungi" />
            <div className="text-gray-500 text-[13px] font-medium text-gray-800">Isi sehingga 7 kenalan</div>
            <div className="space-y-6">
              {data.contacts.map((contact, index) => (
                <div key={index} className="space-y-3 pb-6 border-b border-gray-100 last:border-0 relative">
                  <Label>Kenalan {index + 1}</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" value={contact.name} onChange={(e) => {
                      const newC = [...data.contacts]; newC[index].name = e.target.value; updateField('contacts', newC);
                    }} className="w-full border border-gray-800 rounded-xl p-3 text-sm focus:outline-none" placeholder="Nama" />
                    <input type="text" value={contact.relation} onChange={(e) => {
                      const newC = [...data.contacts]; newC[index].relation = e.target.value; updateField('contacts', newC);
                    }} className="w-full border border-gray-800 rounded-xl p-3 text-sm focus:outline-none" placeholder="Hubungan" />
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="text" value={contact.phone} onChange={(e) => {
                      const newC = [...data.contacts]; newC[index].phone = e.target.value; updateField('contacts', newC);
                    }} className="flex-1 border border-gray-800 rounded-xl p-3 text-sm focus:outline-none" placeholder="No. Telefon" />
                    <div className="flex items-center gap-2">
                      <Toggle active={contact.whatsapp} onToggle={() => {
                        const newC = [...data.contacts]; newC[index].whatsapp = !contact.whatsapp; updateField('contacts', newC);
                      }} />
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">WhatsApp</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-3.5 mt-1 text-gray-400">
                    <button onClick={() => { if (index > 0) { const c = [...data.contacts]; [c[index-1], c[index]] = [c[index], c[index-1]]; updateField('contacts', c); } }} className="hover:text-black transition-colors"><ArrowUp className="w-4 h-4" /></button>
                    <button onClick={() => { if (index < data.contacts.length - 1) { const c = [...data.contacts]; [c[index], c[index+1]] = [c[index+1], c[index]]; updateField('contacts', c); } }} className="hover:text-black transition-colors"><ArrowDown className="w-4 h-4" /></button>
                    {index === data.contacts.length - 1 && data.contacts.length < 7 && <button onClick={() => updateField('contacts', [...data.contacts, { name: '', relation: '', phone: '', whatsapp: true }])} className="text-gray-300 hover:text-black transition-colors"><Plus className="w-5 h-5" /></button>}
                    {data.contacts.length > 1 && <button onClick={() => updateField('contacts', data.contacts.filter((_, i) => i !== index))} className="text-red-200 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 8 && (
          <div className="space-y-10">
            <PageHeader title="EDIT CARD" subtitle="Lagu & Auto Skrol" />
            <div>
              <Label>Pautan Lagu YouTube (jika ada)</Label>
              <input type="text" value={data.music.url} onChange={(e) => updateField('music.url', e.target.value)} className="w-full border border-gray-800 rounded-xl p-3 text-sm focus:outline-none" placeholder="https://youtu.be/..." />
            </div>
            <div>
              <Label>Mula Dari (mm:ss.ms)</Label>
              <div className="flex border border-gray-800 rounded-xl overflow-hidden bg-white">
                <input type="text" value={data.music.startTime} onChange={(e) => updateField('music.startTime', e.target.value)} className="flex-1 p-3 text-sm focus:outline-none" placeholder="00:00" />
                <button className="px-5 border-l border-gray-800 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-gray-50 active:bg-gray-100 transition-colors"><Play className="w-3.5 h-3.5 fill-black" /> MAINKAN</button>
              </div>
            </div>
            <div className="space-y-5 pt-2">
              <div className="flex items-center gap-3">
                <Toggle active={data.music.showButton} onToggle={() => updateField('music.showButton', !data.music.showButton)} />
                <span className="text-[14px] font-medium flex items-center gap-2">Tunjukkan Butang Lagu <Play className="w-4 h-4 border border-black rounded-full p-0.5" /></span>
              </div>
              <div className="flex items-center gap-3">
                <Toggle active={data.music.autoplay} onToggle={() => updateField('music.autoplay', !data.music.autoplay)} />
                <span className="text-[14px] font-medium">Autoplay</span>
              </div>
            </div>
            <div className="pt-6 border-t border-gray-100">
              <Label>Delay Auto Skrol (saat)</Label>
              <Slider value={data.music.scrollDelay} min={0} max={10} onChange={(v: any) => updateField('music.scrollDelay', v)} unit="s" />
            </div>

            {/* PREVIEW BLOCK - Robustly handle YouTube thumbnails */}
            <div className="pt-4 border-t border-gray-100 animate-fade-in">
               <Label>Previu Media Kad Digital</Label>
               <div className="w-full max-w-sm mx-auto aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl relative group ring-4 ring-gray-50">
                  {getYoutubeId(data.music.url) ? (
                     <>
                       <img 
                        src={`https://img.youtube.com/vi/${getYoutubeId(data.music.url)}/hqdefault.jpg`} 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" 
                        alt="Video preview"
                       />
                       <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform mb-4">
                             <Play className="w-8 h-8 fill-white" />
                          </div>
                          <span className="text-[11px] font-bold tracking-widest uppercase opacity-80">Pautan Video Aktif</span>
                       </div>
                     </>
                  ) : (
                     <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-3 bg-gray-50">
                        <Play className="w-10 h-10 opacity-20" />
                        <span className="text-[10px] font-bold tracking-tighter opacity-50">PAUTAN VIDEO KOSONG</span>
                     </div>
                  )}
               </div>
            </div>
          </div>
        )}

        {currentPage === 9 && (
          <div className="space-y-6">
            <PageHeader title="EDIT CARD" subtitle="Hadiah / Salam Kaut" />
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-[14px] font-bold">Aktifkan Hadiah / Salam Kaut</span>
              <Toggle active={data.gift.enabled} onToggle={() => updateField('gift.enabled', !data.gift.enabled)} />
            </div>
            
            {data.gift.enabled && (
              <div className="space-y-6 pt-2 animate-fade-in">
                <div>
                  <Label>Tajuk Seksyen</Label>
                  <input type="text" value={data.gift.title} onChange={(e) => updateField('gift.title', e.target.value)} className="w-full border border-gray-800 rounded-xl p-3 text-sm focus:outline-none" placeholder="Cth: Hadiah / Salam Kaut" />
                </div>
                <div>
                  <Label>Nota / Ucapan</Label>
                  <textarea value={data.gift.note} onChange={(e) => updateField('gift.note', e.target.value)} className="w-full border border-gray-800 rounded-xl p-3 text-sm focus:outline-none min-h-[80px] resize-none" placeholder="Cth: Sumbangan anda amat dihargai..." />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Senarai Hadiah / QR</Label>
                    <button 
                      onClick={() => updateField('gift.items', [...data.gift.items, { id: Math.random().toString(36).substr(2, 9), url: '', image: '' }])}
                      className="p-1.5 bg-black text-white rounded-lg hover:opacity-80 transition-opacity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {data.gift.items.map((item, index) => (
                    <div key={item.id} className="p-4 border border-gray-200 rounded-2xl bg-white space-y-3 relative group shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Item #{index + 1}</span>
                        <button onClick={() => updateField('gift.items', data.gift.items.filter(i => i.id !== item.id))} className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div className="relative">
                          <Label>Muatnaik Imej QR (Library)</Label>
                          <div className="flex flex-col items-center justify-center w-full aspect-square max-w-[140px] mx-auto bg-white border-2 border-dashed border-gray-200 rounded-3xl relative overflow-hidden group/upload cursor-pointer hover:border-blue-400 transition-colors">
                            {item.image ? (
                              <>
                                <img src={item.image} className="w-full h-full object-cover" alt="QR Preview" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/upload:opacity-100 flex items-center justify-center transition-opacity">
                                  <Upload className="text-white w-6 h-6" />
                                </div>
                              </>
                            ) : (
                              <div className="flex flex-col items-center gap-2 text-gray-300">
                                <Upload className="w-6 h-6" />
                                <span className="text-[9px] font-bold uppercase tracking-tighter">Buka Library</span>
                              </div>
                            )}
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => handleFileUpload(e, index)}
                              className="absolute inset-0 opacity-0 cursor-pointer" 
                            />
                          </div>
                        </div>
                        <input 
                          type="text" 
                          placeholder="Pautan Luar / URL (https://...)" 
                          value={item.url} 
                          onChange={(e) => {
                            const newItems = [...data.gift.items];
                            newItems[index].url = e.target.value;
                            updateField('gift.items', newItems);
                          }}
                          className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:outline-none" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {currentPage === 10 && (
          <div className="space-y-6">
            <PageHeader title="EDIT CARD" subtitle="Segmen & Tamat" />
            <div className="text-[12px] text-gray-400 italic mb-4">
              Pilih bahagian mana yang ingin dipaparkan pada kad digital anda.
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {Object.entries(data.visibility).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer group" onClick={() => updateField(`visibility.${key}`, !value)}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${value ? 'bg-black text-white' : 'bg-gray-200 text-gray-400'}`}>
                      {value ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </div>
                    <span className={`text-[13px] font-bold uppercase tracking-wider ${value ? 'text-gray-900' : 'text-gray-400'}`}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                  <Toggle active={value as boolean} onToggle={() => {}} />
                </div>
              ))}
            </div>
            
            <div className="pt-8 border-t border-gray-100 text-center">
              <button onClick={onPreview} className="w-full py-5 bg-black text-white rounded-[2rem] font-bold tracking-[0.2em] uppercase text-xs shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3">
                <Save className="w-4 h-4" /> Simpan & Previu
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-gray-100 flex flex-col gap-3">
        <div className="flex items-center gap-2 px-1">
          <button onClick={() => setCurrentPage(Math.max(0, currentPage - 1))} className="p-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1 relative">
            <select value={currentPage} onChange={(e) => setCurrentPage(parseInt(e.target.value))} className="w-full border border-gray-300 rounded-xl p-3 text-[14px] font-medium focus:outline-none bg-white appearance-none">
              {PAGES.map((p, idx) => <option key={idx} value={idx}>{p}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-4 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <button onClick={() => setCurrentPage(Math.min(PAGES.length - 1, currentPage + 1))} className="p-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
          <button onClick={onPreview} className="p-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            <Save className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="bg-[#FFF9E5] p-3 rounded-xl text-center mx-1 shadow-sm">
           <p className="text-[11px] text-[#B4943A] leading-tight font-medium">
             Pastikan browser anda bukan dalam dark mode<br/>
             Previu ini tidak sepenuhnya tepat seperti produk sebenar
           </p>
        </div>
      </div>
    </div>
  );
};

export default Editor;