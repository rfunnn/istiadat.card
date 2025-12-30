
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Always use direct process.env.API_KEY reference for security and compliance
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateInviteQuote = async (bride: string, groom: string, language: 'en' | 'ms' = 'en'): Promise<string> => {
  try {
    const prompt = language === 'ms' 
      ? `Tuliskan satu petikan perkahwinan yang sangat romantis dan puitis dalam Bahasa Melayu untuk pasangan ${bride} dan ${groom}. Pastikan ia ringkas tetapi menyentuh hati. Maksimum 30 patah perkataan.`
      : `Write a very romantic and poetic wedding quote for the couple ${bride} and ${groom} in English. Make it concise but beautiful. Maximum 30 words.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });

    return response.text || "Together is a beautiful place to be.";
  } catch (error) {
    console.error("Error generating quote:", error);
    return "Two souls with but a single thought, two hearts that beat as one.";
  }
};
