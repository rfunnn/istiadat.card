import React, { useState } from 'react';
import { EcardData, GiftItem } from '../types';
import { 
  Settings, Layout, Type, MapPin, List, Palette, 
  CheckSquare, Phone, Music, Gift, Eye, Plus, Trash2, 
  Sparkles, ChevronDown, ChevronRight 
} from 'lucide-react';
import { generateInviteQuote } from '../services/geminiService';

interface EditorPanelProps {
  data: EcardData;
  setData: (data: EcardData) => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({ data, setData }) => {
  const [activeSection, setActiveSection] = useState<string>('muka-depan');
  const [isGenerating, setIsGenerating] = useState(false);

  const updateData = (path: string, value: any) => {
    const keys = path.split('.');
    const newData = { ...data };
    let current: any = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setData(newData);
  };

  const handleAIRecount = async () => {
    setIsGenerating(true);
    const names = data.namaPanggilan.text.split('&');
    const quote = await generateInviteQuote(
      names[0]?.trim() || 'Pengantin', 
      names[1]?.trim() || 'Pasangan', 
      data.config.language === 'Bahasa Melayu' ? 'ms' : 'en'
    );
    updateData('ayatUcapan', quote);
    setIsGenerating(false);
  };

  // Fix: Added '?' to children prop type to resolve TypeScript errors in environments that don't implicitly include children in component props
  const Section = ({ id, icon: Icon, label, children }: { id: string, icon: any, label: string, children?: React.ReactNode }) => (
    <div className="border-b border-stone-100 last:border-0">
      <button 
        onClick={() => setActiveSection(activeSection === id ? '' : id)}
        className={`w-full flex items-center justify-between px-6 py-5 transition-all ${activeSection === id ? 'bg-stone-50/50' : 'hover:bg-stone-50/30'}`}
      >
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-xl transition-colors ${activeSection === id ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-400'}`}>
            <Icon className="w-4 h-4" />
          </div>
          <span className={`text-xs font-bold uppercase tracking-widest ${activeSection === id ? 'text-stone-900' : 'text-stone-500'}`}>
            {label}
          </span>
        </div>
        {activeSection === id ? <ChevronDown className="w-4 h-4 text-stone-300" /> : <ChevronRight className="w-4 h-4 text-stone-200" />}
      </button>
      {activeSection === id && (
        <div className="px-8 py-6 space-y-6 bg-white animate-in slide-in-from-top-2 duration-300">
          {children}
        </div>
      )}
    </div>
  );

  // Fix: Added '?' to children prop type to resolve TypeScript errors in environments that don't implicitly include children in component props
  const Field = ({ label, children, hint }: { label: string, children?: React.ReactNode, hint?: string }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 ml-1">{label}</label>
        {hint && <span className="text-[9px] text-stone-300 italic">{hint}</span>}
      </div>
      {children}
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-8 border-b border-stone-100 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-10">
        <div>
          <h3 className="font-black text-xl text-stone-900 tracking-tighter uppercase">Studio Editor</h3>
          <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mt-1 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" /> Professional Mode
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pb-24">
        {/* Section 1: Konfigurasi */}
        <Section id="config" icon={Settings} label="Konfigurasi Utama">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Bahasa">
              <select 
                value={data.config.language}
                onChange={(e) => updateData('config.language', e.target.value)}
                className="w-full p-3 bg-stone-50 border border-stone-100 rounded-xl text-xs outline-none"
              >
                <option>Bahasa Melayu</option>
                <option>English</option>
              </select>
            </Field>
            <Field label="Pakej">
              <div className="p-3 bg-stone-900 text-white rounded-xl text-[10px] font-bold text-center uppercase tracking-widest">
                {data.config.package} Plan
              </div>
            </Field>
          </div>
          <Field label="Gaya Pembukaan">
            <select 
              value={data.config.opening.style}
              onChange={(e) => updateData('config.opening.style', e.target.value)}
              className="w-full p-3 bg-stone-50 border border-stone-100 rounded-xl text-xs outline-none"
            >
              <option>Envelope</option>
              <option>Slide Up</option>
              <option>Fade In</option>
            </select>
          </Field>
        </Section>

        {/* Section 2: Muka Depan */}
        <Section id="muka-depan" icon={Layout} label="Muka Depan">
          <Field label="Jenis Majlis">
            <input 
              type="text" 
              value={data.jenisMajlis.text}
              onChange={(e) => updateData('jenisMajlis.text', e.target.value)}
              className="w-full p-3 bg-stone-50 border border-stone-100 rounded-xl text-xs outline-none"
            />
          </Field>
          <Field label="Nama Panggilan">
            <input 
              type="text" 
              value={data.namaPanggilan.text}
              onChange={(e) => updateData('namaPanggilan.text', e.target.value)}
              className="w-full p-3 bg-stone-50 border border-stone-100 rounded-xl text-xs outline-none"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Tarikh Mula">
              <input 
                type="datetime-local" 
                value={data.tarikhMula.split('.')[0]}
                onChange={(e) => updateData('tarikhMula', e.target.value)}
                className="w-full p-3 bg-stone-50 border border-stone-100 rounded-xl text-xs outline-none"
              />
            </Field>
            <Field label="Nama Tempat">
              <input 
                type="text" 
                value={data.namaTempat}
                onChange={(e) => updateData('namaTempat', e.target.value)}
                className="w-full p-3 bg-stone-50 border border-stone-100 rounded-xl text-xs outline-none"
              />
            </Field>
          </div>
        </Section>

        {/* Section 3: Ayat Undangan */}
        <Section id="ayat-undangan" icon={Type} label="Ayat Undangan">
          <Field label="Pembuka Ucapan">
            <input 
              type="text" 
              value={data.pembukaUcapan}
              onChange={(e) => updateData('pembukaUcapan', e.target.value)}
              className="w-full p-3 bg-stone-50 border border-stone-100 rounded-xl text-xs outline-none"
            />
          </Field>
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Ayat Undangan</label>
              <button 
                onClick={handleAIRecount}
                disabled={isGenerating}
                className="text-[10px] font-bold text-amber-600 flex items-center gap-1 hover:opacity-70 disabled:opacity-30 transition-all"
              >
                <Sparkles className="w-3 h-3" /> {isGenerating ? 'Generating...' : 'AI Quote'}
              </button>
            </div>
            <textarea 
              value={data.ayatUcapan}
              onChange={(e) => updateData('ayatUcapan', e.target.value)}
              rows={4}
              className="w-full p-4 bg-stone-50 border border-stone-100 rounded-2xl text-xs outline-none resize-none leading-relaxed"
            />
          </div>
          <Field label="Nama Penuh (Stacked)">
            <input 
              type="text" 
              value={data.namaPenuh.text}
              onChange={(e) => updateData('namaPenuh.text', e.target.value)}
              className="w-full p-3 bg-stone-50 border border-stone-100 rounded-xl text-xs outline-none"
            />
          </Field>
        </Section>

        {/* Section 4: Lokasi */}
        <Section id="lokasi" icon={MapPin} label="Lokasi & Navigasi">
          <Field label="Alamat Penuh">
            <textarea 
              value={data.alamatMajlis}
              onChange={(e) => updateData('alamatMajlis', e.target.value)}
              rows={3}
              className="w-full p-3 bg-stone-50 border border-stone-100 rounded-xl text-xs outline-none resize-none"
            />
          </Field>
          <Field label="Google Maps URL">
            <input 
              type="text" 
              value={data.googleMapsUrl}
              onChange={(e) => updateData('googleMapsUrl', e.target.value)}
              className="w-full p-3 bg-stone-50 border border-stone-100 rounded-xl text-xs outline-none"
            />
          </Field>
          <Field label="Tarikh Hijrah">
            <input 
              type="text" 
              value={data.tarikhHijrah}
              onChange={(e) => updateData('tarikhHijrah', e.target.value)}
              className="w-full p-3 bg-stone-50 border border-stone-100 rounded-xl text-xs outline-none"
              placeholder="Cth: 8 Syaaban 1447H"
            />
          </Field>
        </Section>

        {/* Section 5: Atur Cara */}
        <Section id="atur-cara" icon={List} label="Atur Cara Majlis">
          <Field label="Timeline Detail" hint="Line-by-line breakdown">
            <textarea 
              value={data.aturCaraMajlis}
              onChange={(e) => updateData('aturCaraMajlis', e.target.value)}
              rows={5}
              className="w-full p-4 bg-stone-50 border border-stone-100 rounded-2xl text-xs outline-none resize-none font-mono"
            />
          </Field>
          <Field label="Nota Tambahan">
             <input 
                type="text" 
                value={data.maklumatTambahan2}
                onChange={(e) => updateData('maklumatTambahan2', e.target.value)}
                className="w-full p-3 bg-stone-50 border border-stone-100 rounded-xl text-xs outline-none"
              />
          </Field>
        </Section>

        {/* Section 6: UI Customization */}
        <Section id="ui" icon={Palette} label="Gaya Antara Muka">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Warna Background">
              <input 
                type="color" 
                value={data.ui.bgColor}
                onChange={(e) => updateData('ui.bgColor', e.target.value)}
                className="w-full h-10 p-1 bg-stone-50 border border-stone-100 rounded-xl outline-none cursor-pointer"
              />
            </Field>
            <Field label="Warna Header">
              <input 
                type="color" 
                value={data.ui.headerColor}
                onChange={(e) => updateData('ui.headerColor', e.target.value)}
                className="w-full h-10 p-1 bg-stone-50 border border-stone-100 rounded-xl outline-none cursor-pointer"
              />
            </Field>
          </div>
          <Field label="Saiz Font Header">
             <input 
                type="range" min="16" max="72"
                value={data.ui.headerSize}
                onChange={(e) => updateData('ui.headerSize', parseInt(e.target.value))}
                className="w-full accent-stone-900"
              />
          </Field>
          <Field label="Margin Sisi (Rem)">
             <input 
                type="range" min="0" max="5" step="0.5"
                value={data.ui.marginSisi}
                onChange={(e) => updateData('ui.marginSisi', parseFloat(e.target.value))}
                className="w-full accent-stone-900"
              />
          </Field>
        </Section>

        {/* Section 7: RSVP */}
        <Section id="rsvp" icon={CheckSquare} label="RSVP & Ucapan">
          <Field label="Mode">
            <select 
              value={data.rsvp.mode}
              onChange={(e) => updateData('rsvp.mode', e.target.value)}
              className="w-full p-3 bg-stone-50 border border-stone-100 rounded-xl text-xs outline-none"
            >
              <option>RSVP + Ucapan</option>
              <option>Ucapan Sahaja</option>
              <option>Tiada</option>
            </select>
          </Field>
          <Field label="Nota Penutup">
            <input 
              type="text" 
              value={data.rsvp.note}
              onChange={(e) => updateData('rsvp.note', e.target.value)}
              className="w-full p-3 bg-stone-50 border border-stone-100 rounded-xl text-xs outline-none"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Had per RSVP">
              <input 
                type="number" 
                value={data.rsvp.limitPerRsvp}
                onChange={(e) => updateData('rsvp.limitPerRsvp', parseInt(e.target.value))}
                className="w-full p-3 bg-stone-50 border border-stone-100 rounded-xl text-xs outline-none"
              />
            </Field>
            <Field label="Total Slot">
              <input 
                type="number" 
                value={data.rsvp.totalLimit}
                onChange={(e) => updateData('rsvp.totalLimit', parseInt(e.target.value))}
                className="w-full p-3 bg-stone-50 border border-stone-100 rounded-xl text-xs outline-none"
              />
            </Field>
          </div>
        </Section>

        {/* Section 8: Hubungi */}
        <Section id="contacts" icon={Phone} label="Senarai Hubungi">
          <div className="space-y-3">
            {data.contacts.map((contact, idx) => (
              <div key={idx} className="p-4 border border-stone-100 rounded-2xl bg-stone-50/30 space-y-3 relative group">
                <button 
                  onClick={() => {
                    const next = [...data.contacts];
                    next.splice(idx, 1);
                    updateData('contacts', next);
                  }}
                  className="absolute top-4 right-4 text-stone-300 hover:text-rose-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <input placeholder="Nama" value={contact.name} onChange={(e) => {
                    const next = [...data.contacts];
                    next[idx].name = e.target.value;
                    updateData('contacts', next);
                  }} className="bg-white p-2 rounded-lg text-[11px] border border-stone-100 outline-none" />
                  <input placeholder="Kaitan" value={contact.relation} onChange={(e) => {
                    const next = [...data.contacts];
                    next[idx].relation = e.target.value;
                    updateData('contacts', next);
                  }} className="bg-white p-2 rounded-lg text-[11px] border border-stone-100 outline-none" />
                </div>
                <input placeholder="No. Telefon" value={contact.phone} onChange={(e) => {
                  const next = [...data.contacts];
                  next[idx].phone = e.target.value;
                  updateData('contacts', next);
                }} className="w-full bg-white p-2 rounded-lg text-[11px] border border-stone-100 outline-none" />
              </div>
            ))}
            <button 
              onClick={() => updateData('contacts', [...data.contacts, { name: '', relation: '', phone: '', whatsapp: true }])}
              className="w-full py-3 border-2 border-dashed border-stone-200 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:border-stone-400 hover:text-stone-600 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Tambah Kenalan
            </button>
          </div>
        </Section>

        {/* Section 9: Muzik */}
        <Section id="muzik" icon={Music} label="Lagu & Auto Skrol">
          <Field label="YouTube URL" hint="Masukkan link video YouTube">
            <input 
              type="text" 
              value={data.music.url}
              onChange={(e) => updateData('music.url', e.target.value)}
              className="w-full p-3 bg-stone-50 border border-stone-100 rounded-xl text-xs outline-none"
              placeholder="https://youtube.com/watch?v=..."
            />
          </Field>
          <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Auto Skrol (Kelajuan)</span>
            <input 
              type="range" min="0" max="10"
              value={data.music.scrollDelay}
              onChange={(e) => updateData('music.scrollDelay', parseInt(e.target.value))}
              className="w-1/2 accent-stone-900"
            />
          </div>
        </Section>

        {/* Section 10: Hadiah */}
        <Section id="gift" icon={Gift} label="Hadiah / Salam Kaut">
          <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl mb-4">
             <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Aktifkan Hadiah Digital</span>
             <input 
               type="checkbox" 
               checked={data.gift.enabled}
               onChange={(e) => updateData('gift.enabled', e.target.checked)}
               className="w-5 h-5 accent-stone-900"
             />
          </div>
          {data.gift.enabled && (
            <div className="space-y-4">
               <Field label="Tajuk Segmen">
                 <input 
                   type="text" 
                   value={data.gift.title}
                   onChange={(e) => updateData('gift.title', e.target.value)}
                   className="w-full p-3 bg-stone-50 border border-stone-100 rounded-xl text-xs outline-none"
                 />
               </Field>
               <div className="space-y-3">
                 {data.gift.items.map((item, idx) => (
                    <div key={idx} className="p-4 border border-stone-100 rounded-2xl bg-white space-y-3">
                       <input placeholder="QR Link / Bank URL" value={item.image} onChange={(e) => {
                         const next = [...data.gift.items];
                         next[idx].image = e.target.value;
                         updateData('gift.items', next);
                       }} className="w-full bg-stone-50 p-2 rounded-lg text-[10px] border border-stone-100 outline-none" />
                    </div>
                 ))}
               </div>
            </div>
          )}
        </Section>

        {/* Section 11: Visibility */}
        <Section id="visibility" icon={Eye} label="Kawalan Segmen">
          <div className="grid grid-cols-2 gap-3">
             {Object.entries(data.visibility).map(([key, val]) => (
               <label key={key} className="flex items-center justify-between p-3 border border-stone-100 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer">
                 <span className="text-[9px] font-bold uppercase tracking-widest text-stone-500">{key.replace('butang', '')}</span>
                 <input 
                   type="checkbox" 
                   checked={val}
                   onChange={(e) => updateData(`visibility.${key}`, e.target.checked)}
                   className="w-4 h-4 accent-stone-900"
                 />
               </label>
             ))}
          </div>
        </Section>
      </div>
    </div>
  );
};
