import { NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';

const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;

const LANG_MAP: Record<string, string> = {
  "en": "English",
  "ur": "Nastaliq Urdu Script (اردو)",
  "ru": "Roman Urdu",
  "hi": "Hindi Devanagari Script (हिंदी)",
  "rh": "Roman Hindi"
};

function getSystemPrompt(sourceLang: string, targetLang: string) {
  const sName = LANG_MAP[sourceLang];
  const tName = LANG_MAP[targetLang];
  
  let prompt = `You are an expert NLP Engine and Translator specialized in converting ${sName} into ${tName}.
Core Objective: Take user-provided ${sName} text and output strictly its clean, natural ${tName} equivalent.
Execution Rules:
1. Accuracy: Ensure the exact meaning and tone is perfectly captured.
2. Fluency: The output must read naturally to a native speaker.
3. Strict Output: Return ONLY the converted ${tName} text without any quotes, notes, or explanations.`;

  if (targetLang === "ur") {
    prompt += `\n4. Script: Output MUST be in proper Nastaliq Urdu Script (اردو رسم الخط). Use contextual clues to resolve ambiguous words (e.g. is -> اِس).`;
  }
  if (targetLang === "hi") {
    prompt += `\n4. Script: Output MUST be in proper Hindi Devanagari Script (हिंदी).`;
  }
  if (targetLang === "ru" || targetLang === "rh") {
    prompt += `\n4. Style: Output should sound like natural SMS/WhatsApp chat. Use standard transliteration.`;
  }

  return prompt;
}

function sanitizeText(text: string): string {
  if (!text) return "";
  let s = text.replace(/\x00/g, "");
  s = s.replace(/[\x01-\x08\x0b\x0c\x0e-\x1f\x7f]/g, "");
  s = s.replace(/<[^>]+>/g, "");
  s = s.replace(/\n{4,}/g, "\n\n\n");
  s = s.replace(/ {4,}/g, "   ");
  return s.trim();
}

export async function POST(req: Request) {
  try {
    if (!groq) {
      return NextResponse.json(
        { detail: "GROQ_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { text, source_lang, target_lang } = body;

    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ detail: "Input text cannot be empty." }, { status: 400 });
    }
    
    const sanitizedText = sanitizeText(text);

    if (sanitizedText.length > 5000) {
      return NextResponse.json({ detail: "Input text exceeds 5000 character limit." }, { status: 400 });
    }

    const validLangs = ["en", "ur", "ru", "hi", "rh"];
    if (!validLangs.includes(source_lang) || !validLangs.includes(target_lang)) {
      return NextResponse.json({ detail: "Invalid language selection." }, { status: 400 });
    }

    if (source_lang === target_lang) {
      return NextResponse.json({
        result: sanitizedText,
        original: sanitizedText,
        source_lang,
        target_lang
      });
    }

    const systemPrompt = getSystemPrompt(source_lang, target_lang);

    // Call Groq AI
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: sanitizedText }
      ],
      temperature: 0.2,
      max_tokens: 4096,
    });

    const result = completion.choices[0]?.message?.content?.trim() || "";

    return NextResponse.json({
      result,
      original: sanitizedText,
      source_lang,
      target_lang
    });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { detail: "Conversion service temporarily unavailable. Please try again." },
      { status: 502 }
    );
  }
}
