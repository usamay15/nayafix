from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, field_validator
from groq import Groq
import os
import re

app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)

# ── CORS ─────────────────────────────────────────────────────────────────────
# Vercel handles CORS naturally for same-domain, but we add this just in case
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Accept"],
    max_age=86400,
)

# ── Groq client ──────────────────────────────────────────────────────────────
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    # Do not raise error immediately so build succeeds. Raise on request.
    client = None
else:
    client = Groq(api_key=GROQ_API_KEY)

# ── System prompts ────────────────────────────────────────────────────────────
SYSTEM_PROMPTS = {
    ("ru", "ur"): """You are an expert NLP Engine specialized in converting Roman Urdu into grammatically accurate and context-aware Nastaliq Urdu Script (اردو رسم الخط).
Core Objective: Take user-provided Roman Urdu text and output strictly its clean, natural Urdu transliteration.
Execution Rules:
1. Context Understanding: Resolve ambiguous words using surrounding sentence context (e.g., 'is' -> 'اِس', 'kia' -> 'کیا').
2. Punctuation & Diacritics: Retain punctuation. Add subtle diacritics ONLY to distinguish highly ambiguous words.
3. English Terms: Keep English proper nouns unchanged or use standard transliteration.
4. Strict Output: Return ONLY the converted Urdu text without quotes or explanations.""",

    ("ur", "ru"): """You are an expert NLP Engine specialized in converting Nastaliq Urdu Script (اردو) into clean, readable Roman Urdu (Romanized Urdu using Latin alphabet).
Core Objective: Take user-provided Urdu Nastaliq text and output strictly its clean, natural Roman Urdu transliteration.
Execution Rules:
1. Phonetic Accuracy: Transliterate faithfully using common Roman Urdu spellings.
2. Consistency: Use consistent romanization (e.g., 'kh' for 'خ', 'sh' for 'ش').
3. Punctuation: Retain original punctuation.
4. Strict Output: Return ONLY the Roman Urdu text without quotes or explanations.""",

    ("en", "ur"): """You are an expert professional Translator specialized in translating English into natural, grammatically perfect Nastaliq Urdu Script (اردو).
Core Objective: Translate the user's English text into high-quality Urdu.
Execution Rules:
1. Accuracy & Tone: Ensure the translation captures the exact meaning and tone of the original English text.
2. Natural Phrasing: Do not do literal word-for-word translation if it sounds awkward in Urdu. Use natural idiomatic Urdu expressions.
3. Strict Output: Return ONLY the translated Urdu text. No quotes, notes, or conversational filler.""",

    ("ur", "en"): """You are an expert professional Translator specialized in translating Nastaliq Urdu Script (اردو) into fluent, native-sounding English.
Core Objective: Translate the user's Urdu text into high-quality English.
Execution Rules:
1. Fluency: The English output should read naturally to a native speaker.
2. Nuance: Capture the exact intent, politeness, and context of the Urdu input.
3. Strict Output: Return ONLY the translated English text. No quotes, notes, or conversational filler.""",

    ("en", "ru"): """You are an expert Translator specialized in translating English into conversational Roman Urdu (Urdu written in English alphabets).
Core Objective: Translate the user's English text into natural-sounding Roman Urdu.
Execution Rules:
1. Natural Speech: Translate it as if a native Urdu speaker is typing it on WhatsApp or SMS.
2. Accuracy: Capture the meaning accurately but keep the Roman Urdu spelling standard and readable.
3. Strict Output: Return ONLY the translated Roman Urdu text. No quotes, notes, or conversational filler.""",

    ("ru", "en"): """You are an expert Translator specialized in translating conversational Roman Urdu (Urdu written in English alphabets) into fluent, formal English.
Core Objective: Translate the user's Roman Urdu text into high-quality English.
Execution Rules:
1. Understand Slang: Accurately understand informal Roman Urdu grammar, slang, and context.
2. Fluency: The English output should be grammatically correct and read naturally.
3. Strict Output: Return ONLY the translated English text. No quotes, notes, or conversational filler."""
}

# ── Input Sanitization ───────────────────────────────────────────────────────
def sanitize_text(text: str) -> str:
    if not text:
        return ""
    text = text.replace("\x00", "")
    text = re.sub(r"[\x01-\x08\x0b\x0c\x0e-\x1f\x7f]", "", text)
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"\n{4,}", "\n\n\n", text)
    text = re.sub(r" {4,}", "   ", text)
    return text.strip()

class TranslateRequest(BaseModel):
    text: str
    source_lang: str
    target_lang: str

    @field_validator("text")
    @classmethod
    def validate_text(cls, v: str) -> str:
        if not v or not v.strip():
            raise ValueError("Input text cannot be empty.")
        if len(v) > 5000:
            raise ValueError("Input text exceeds 5000 character limit.")
        return sanitize_text(v)

    @field_validator("source_lang", "target_lang")
    @classmethod
    def validate_langs(cls, v: str) -> str:
        valid = ["en", "ur", "ru"]
        if v not in valid:
            raise ValueError(f"Language must be one of {valid}")
        return v

class TranslateResponse(BaseModel):
    result: str
    original: str
    source_lang: str
    target_lang: str

import hashlib
CACHE = {}

async def _run_conversion(text: str, system_prompt: str) -> str:
    cache_key = hashlib.md5((text + "|" + system_prompt).encode()).hexdigest()
    if cache_key in CACHE:
        return CACHE[cache_key]

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user",   "content": text},
            ],
            temperature=0.2,
            max_tokens=4096,
        )
        res = completion.choices[0].message.content.strip()
        
        if len(CACHE) > 2000:
            CACHE.clear()
            
        CACHE[cache_key] = res
        return res
    except Exception:
        raise HTTPException(
            status_code=502,
            detail="Conversion service temporarily unavailable. Please try again."
        )

# ── Routes ────────────────────────────────────────────────────────────────────
@app.get("/api")
async def root():
    return {"status": "ok", "service": "NayaFix Serverless API"}

@app.post("/api/translate", response_model=TranslateResponse)
async def translate_text(request: Request, payload: TranslateRequest):
    if not client:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY is not configured on the server.")
        
    if payload.source_lang == payload.target_lang:
        return TranslateResponse(
            result=payload.text, 
            original=payload.text,
            source_lang=payload.source_lang,
            target_lang=payload.target_lang
        )

    prompt = SYSTEM_PROMPTS.get((payload.source_lang, payload.target_lang))
    if not prompt:
        raise HTTPException(status_code=400, detail="Unsupported language pair.")

    result = await _run_conversion(payload.text, prompt)
    
    return TranslateResponse(
        result=result, 
        original=payload.text,
        source_lang=payload.source_lang,
        target_lang=payload.target_lang
    )
