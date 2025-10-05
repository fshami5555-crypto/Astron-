
import { GoogleGenAI } from "@google/genai";
import type { MenuItem } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getPairingSuggestion = async (item: MenuItem, lang: 'en' | 'ar'): Promise<string> => {
  if (!API_KEY) {
    return lang === 'en' 
      ? "API Key not configured. Please contact the administrator."
      : "مفتاح API غير مهيأ. يرجى الاتصال بالمسؤول.";
  }
  
  const model = 'gemini-2.5-flash';
  const itemName = item.name[lang];
  const itemDescription = item.description[lang];

  const prompt = `You are a world-class sommelier for a luxurious restaurant. For the dish "${itemName}: ${itemDescription}", recommend a perfect wine or cocktail pairing. Keep the description brief, elegant, and enticing (max 30 words). Respond in ${lang === 'ar' ? 'Arabic' : 'English'}.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching pairing suggestion from Gemini API:", error);
    return lang === 'en' 
      ? "Sorry, we couldn't fetch a suggestion at this time."
      : "عذراً، لم نتمكن من جلب اقتراح في الوقت الحالي.";
  }
};
