import { GoogleGenAI, Type } from "@google/genai";

// Fix: instantiate GoogleGenAI inside functions to ensure process.env.API_KEY is fresh

export const generateInviteQuote = async (bride: string, groom: string, language: 'en' | 'ms' = 'en'): Promise<string> => {
  try {
    // Correctly instantiate GoogleGenAI right before use to ensure latest API_KEY is utilized
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
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

    // Directly access the .text property from the response
    return response.text || "Together is a beautiful place to be.";
  } catch (error) {
    console.error("Error generating quote:", error);
    return "Two souls with but a single thought, two hearts that beat as one.";
  }
};