import { NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';

// Initialize Groq client securely on the server
// Will be undefined during build if environment variable is not present
const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;

// System Prompts Map
const SYSTEM_PROMPTS: Record<string, string> = {
  "ru-ur": `You are an expert NLP Engine specialized in converting Roman Urdu into grammatically accurate and context-aware Nastaliq Urdu Script (اردو رسم الخط).
Core Objective: Take user-provided Roman Urdu text and output strictly its clean, natural Urdu transliteration.
Execution Rules:
1. Context Understanding: Resolve ambiguous words using surrounding sentence context (e.g., 'is' -> 'اِس', 'kia' -> 'کیا').
2. Punctuation & Diacritics: Retain punctuation. Add subtle diacritics ONLY to distinguish highly ambiguous words.
3. English Terms: Keep English proper nouns unchanged or use standard transliteration.
4. Strict Output: Return ONLY the converted Urdu text without quotes or explanations.`,

  "ur-ru": `You are an expert NLP Engine specialized in converting Nastaliq Urdu Script (اردو) into clean, readable Roman Urdu (Romanized Urdu using Latin alphabet).
Core Objective: Take user-provided Urdu Nastaliq text and output strictly its clean, natural Roman Urdu transliteration.
Execution Rules:
1. Phonetic Accuracy: Transliterate faithfully using common Roman Urdu spellings.
2. Consistency: Use consistent romanization (e.g., 'kh' for 'خ', 'sh' for 'ش').
3. Punctuation: Retain original punctuation.
4. Strict Output: Return ONLY the Roman Urdu text without quotes or explanations.`,

  "en-ur": `You are an expert professional Translator specialized in translating English into natural, grammatically perfect Nastaliq Urdu Script (اردو).
Core Objective: Translate the user's English text into high-quality Urdu.
Execution Rules:
1. Accuracy & Tone: Ensure the translation captures the exact meaning and tone of the original English text.
2. Natural Phrasing: Do not do literal word-for-word translation if it sounds awkward in Urdu. Use natural idiomatic Urdu expressions.
3. Strict Output: Return ONLY the translated Urdu text. No quotes, notes, or conversational filler.`,

  "ur-en": `You are an expert professional Translator specialized in translating Nastaliq Urdu Script (اردو) into fluent, native-sounding English.
Core Objective: Translate the user's Urdu text into high-quality English.
Execution Rules:
1. Fluency: The English output should read naturally to a native speaker.
2. Nuance: Capture the exact intent, politeness, and context of the Urdu input.
3. Strict Output: Return ONLY the translated English text. No quotes, notes, or conversational filler.`,

  "en-ru": `You are an expert Translator specialized in translating English into conversational Roman Urdu (Urdu written in English alphabets).
Core Objective: Translate the user's English text into natural-sounding Roman Urdu.
Execution Rules:
1. Natural Speech: Translate it as if a native Urdu speaker is typing it on WhatsApp or SMS.
2. Accuracy: Capture the meaning accurately but keep the Roman Urdu spelling standard and readable.
3. Strict Output: Return ONLY the translated Roman Urdu text. No quotes, notes, or conversational filler.`,

  "ru-en": `You are an expert Translator specialized in translating conversational Roman Urdu (Urdu written in English alphabets) into fluent, formal English.
Core Objective: Translate the user's Roman Urdu text into high-quality English.
Execution Rules:
1. Understand Slang: Accurately understand informal Roman Urdu grammar, slang, and context.
2. Fluency: The English output should be grammatically correct and read naturally.
3. Strict Output: Return ONLY the translated English text. No quotes, notes, or conversational filler.`
};

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

    const validLangs = ["en", "ur", "ru"];
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

    const promptKey = `${source_lang}-${target_lang}`;
    const systemPrompt = SYSTEM_PROMPTS[promptKey];

    if (!systemPrompt) {
      return NextResponse.json({ detail: "Unsupported language pair." }, { status: 400 });
    }

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
