import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedSyllabusItem } from "../types";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found in environment variables");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateCourseDescription = async (title: string, keywords: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Error: API Key missing.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Write a compelling, professional course description (approx 100 words) for a course titled "${title}". Focus on these keywords: ${keywords}.`,
    });
    return response.text || "No description generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to generate description. Please try again.";
  }
};

export const generateCourseSyllabus = async (title: string, targetAudience: string): Promise<GeneratedSyllabusItem[]> => {
  const ai = getAiClient();
  if (!ai) return [];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Create a 4-module course syllabus for a course titled "${title}" aimed at ${targetAudience}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              moduleTitle: { type: Type.STRING, description: "Title of the module" },
              description: { type: Type.STRING, description: "Short summary of what is learned in this module" }
            },
            required: ["moduleTitle", "description"]
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return [];
    return JSON.parse(jsonText) as GeneratedSyllabusItem[];
  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
};