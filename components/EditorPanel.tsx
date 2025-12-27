
import React, { useState } from 'react';
import { WeddingData } from '../types';
import { generateInviteQuote } from '../services/geminiService';

interface EditorPanelProps {
  data: WeddingData;
  setData: (data: WeddingData) => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({ data, setData }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleAiQuote = async (lang: 'en' | 'ms') => {
    setIsGenerating(true);
    const quote = await generateInviteQuote(data.brideNick, data.groomNick, lang);
    setData({ ...data, quote });
    setIsGenerating(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm h-full overflow-y-auto custom-scrollbar">
      <h3 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        Customize Details
      </h3>

      <div className="space-y-6">
        {/* Bride & Groom Section */}
        <section>
          <label className="text-xs font-bold text-stone-400 uppercase tracking-widest block mb-4">The Happy Couple</label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-[10px] text-stone-500 font-medium">Groom's Nickname</span>
              <input 
                name="groomNick"
                value={data.groomNick}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                placeholder="Daniel"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-stone-500 font-medium">Bride's Nickname</span>
              <input 
                name="brideNick"
                value={data.brideNick}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                placeholder="Izzah"
              />
            </div>
          </div>
        </section>

        {/* Event Section */}
        <section>
          <label className="text-xs font-bold text-stone-400 uppercase tracking-widest block mb-4">Event Logistics</label>
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] text-stone-500 font-medium">Date</span>
              <input 
                type="date"
                name="date"
                value={data.date}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-stone-500 font-medium">Time Range</span>
              <input 
                name="time"
                value={data.time}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none"
                placeholder="11:00 AM - 4:00 PM"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-stone-500 font-medium">Venue Name</span>
              <input 
                name="venue"
                value={data.venue}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none"
                placeholder="The Grand Palace"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-stone-500 font-medium">Address</span>
              <textarea 
                name="venueAddress"
                value={data.venueAddress}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none resize-none"
                placeholder="123 Jalan Ampang..."
              />
            </div>
          </div>
        </section>

        {/* AI Quote Section */}
        <section className="p-4 bg-amber-50 rounded-xl border border-amber-100">
          <div className="flex justify-between items-center mb-3">
            <label className="text-xs font-bold text-amber-800 uppercase tracking-widest">AI Romantic Quote</label>
            <div className="flex gap-2">
              <button 
                onClick={() => handleAiQuote('en')}
                disabled={isGenerating}
                className="text-[10px] bg-white border border-amber-200 px-2 py-1 rounded hover:bg-amber-100 transition-colors disabled:opacity-50"
              >
                {isGenerating ? '...' : 'English'}
              </button>
              <button 
                onClick={() => handleAiQuote('ms')}
                disabled={isGenerating}
                className="text-[10px] bg-white border border-amber-200 px-2 py-1 rounded hover:bg-amber-100 transition-colors disabled:opacity-50"
              >
                {isGenerating ? '...' : 'Melayu'}
              </button>
            </div>
          </div>
          <textarea 
            name="quote"
            value={data.quote}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 bg-white border border-amber-200 rounded-lg text-sm italic text-stone-600 outline-none resize-none"
            placeholder="Write or generate a quote..."
          />
        </section>

        {/* Social & RSVP */}
        <section>
          <label className="text-xs font-bold text-stone-400 uppercase tracking-widest block mb-4">RSVP & Others</label>
          <div className="space-y-4">
             <div className="space-y-1">
              <span className="text-[10px] text-stone-500 font-medium">RSVP Contact</span>
              <input 
                name="rsvpContact"
                value={data.rsvpContact}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none"
                placeholder="+6012-3456789"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
