"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { convertLastWord, convertAllWords } from "@/lib/dictionary";
import dynamic from "next/dynamic";

const QuoteMaker = dynamic(() => import("@/components/QuoteMaker"), { ssr: false });
const UrduKeyboard = dynamic(() => import("@/components/UrduKeyboard"), { ssr: false });
const HindiKeyboard = dynamic(() => import("@/components/HindiKeyboard"), { ssr: false });
const GermanKeyboard = dynamic(() => import("@/components/GermanKeyboard"), { ssr: false });
const NepaliKeyboard = dynamic(() => import("@/components/NepaliKeyboard"), { ssr: false });
const BengaliKeyboard = dynamic(() => import("@/components/BengaliKeyboard"), { ssr: false });
const SinhalaKeyboard = dynamic(() => import("@/components/SinhalaKeyboard"), { ssr: false });

// ── Types ──────────────────────────────────────────────────────────────────
type ConvertState = "idle" | "loading" | "success" | "error";
type Language      = "en" | "ur" | "ru" | "hi" | "rh" | "de" | "rg" | "ne" | "rn" | "bn" | "rb" | "si" | "rs";
type Theme         = "light" | "dark";
type HistoryItem   = { id: string; input: string; output: string; sourceLang: Language; targetLang: Language; timestamp: number; };
type FavouriteItem = { id: string; input: string; output: string; sourceLang: Language; targetLang: Language; timestamp: number; };

// ── Helper ─────────────────────────────────────────────────────────────────
function relativeTime(ts: number): string {
  const m = Math.floor((Date.now() - ts) / 60000);
  if (m < 1)  return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

// ── Icons ──────────────────────────────────────────────────────────────────
const ConvertIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);
const CopyIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);
const ShareIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const SwapIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/>
  </svg>
);
const LogoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="10" fill="url(#lg)"/>
    <text x="8" y="28" fontSize="22" fontFamily="serif" fill="white">ن</text>
    <defs>
      <linearGradient id="lg" x1="0" y1="0" x2="40" y2="40">
        <stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#4f46e5"/>
      </linearGradient>
    </defs>
  </svg>
);
const SunIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
  </svg>
);
const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
const ChevronIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const WAIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);
const TelegramIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);
const TwitterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const NativeShareIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
  </svg>
);
const HistoryIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const LinkIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const KeyboardIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 8h.01"/><path d="M14 8h.01"/><path d="M18 8h.01"/><path d="M6 8h.01"/><path d="M7 12h.01"/><path d="M11 12h.01"/><path d="M15 12h.01"/><path d="M17 12h.01"/><path d="M8 16h8"/>
    <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/>
  </svg>
);
const FileTextIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
const StarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const StarFilledIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

// ── Main Component ─────────────────────────────────────────────────────────
export default function Translator({ initialSourceLang = "ru", initialTargetLang = "ur" }: { initialSourceLang?: Language, initialTargetLang?: Language }) {
  // Core state
  const [sourceLang, setSourceLang]     = useState<Language>(initialSourceLang);
  const [targetLang, setTargetLang]     = useState<Language>(initialTargetLang);
  const [theme, setTheme]               = useState<Theme>("light");
  const [inputText, setInputText]       = useState("");
  const [outputText, setOutputText]     = useState("");
  const [convertState, setConvertState] = useState<ConvertState>("idle");
  const [errorMsg, setErrorMsg]         = useState("");

  // UI state
  const [copySuccess, setCopySuccess]   = useState(false);
  const [showShare, setShowShare]       = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [showHistory, setShowHistory]   = useState(false);
  const [showFavourites, setShowFavourites] = useState(false);
  const [linkCopied, setLinkCopied]     = useState(false);
  
  // New features state
  const [showQuoteMaker, setShowQuoteMaker] = useState(false);
  const [showKeyboard, setShowKeyboard]     = useState(false);

  // Toast
  const [showToast, setShowToast]       = useState(false);
  const [toastMsg, setToastMsg]         = useState("");
  const [toastHide, setToastHide]       = useState(false);

  // History & Favourites
  const [history, setHistory]           = useState<HistoryItem[]>([]);
  const [favourites, setFavourites]     = useState<FavouriteItem[]>([]);

  // Refs
  const shareRef    = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);
  const toastTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const isRomanToUrdu = sourceLang === "ru" && targetLang === "ur";
  const isLoading     = convertState === "loading";

  // Is current conversion already favourited?
  const isFavourited = outputText
    ? favourites.some(f => f.input === inputText && f.output === outputText && f.sourceLang === sourceLang && f.targetLang === targetLang)
    : false;

  // ── On mount: theme + history + favourites + URL params ────────────────
  useEffect(() => {
    const saved = (document.documentElement.getAttribute("data-theme") as Theme) || "light";
    setTheme(saved);
    try {
      const h = localStorage.getItem("nayafix-history");
      if (h) {
        const parsedH = JSON.parse(h);
        if (parsedH.length > 0 && !parsedH[0].sourceLang) {
          // Old format detected, reset it
          localStorage.removeItem("nayafix-history");
        } else {
          setHistory(parsedH);
        }
      }
      
      const fav = localStorage.getItem("nayafix-favourites");
      if (fav) {
        const parsedFav = JSON.parse(fav);
        if (parsedFav.length > 0 && !parsedFav[0].sourceLang) {
          localStorage.removeItem("nayafix-favourites");
        } else {
          setFavourites(parsedFav);
        }
      }
    } catch { /* */ }

    const params = new URLSearchParams(window.location.search);
    const inp = params.get("input");
    const out = params.get("output");
    const sL  = params.get("sourceLang") as Language | null;
    const tL  = params.get("targetLang") as Language | null;
    if (sL) setSourceLang(sL);
    if (tL) setTargetLang(tL);
    if (inp) {
      setInputText(inp);
      if (out) { setOutputText(out); setConvertState("success"); }
    }
  }, []);

  // ── Theme ──────────────────────────────────────────────────────────────
  const toggleTheme = useCallback(() => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("nayafix-theme", next); } catch { /* */ }
  }, [theme]);

  // ── Click-outside: share ───────────────────────────────────────────────
  useEffect(() => {
    if (!showShare) return;
    const fn = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) setShowShare(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [showShare]);

  // ── Click-outside: download ────────────────────────────────────────────
  useEffect(() => {
    if (!showDownload) return;
    const fn = (e: MouseEvent) => {
      if (downloadRef.current && !downloadRef.current.contains(e.target as Node)) setShowDownload(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [showDownload]);

  // ── Swap languages (carries output → input) ─────────────────────────
  const handleSwap = useCallback(() => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInputText(outputText || "");
    setOutputText("");
    setConvertState("idle");
    setErrorMsg("");
    setShowKeyboard(false);
    window.history.replaceState({}, "", window.location.pathname);
  }, [sourceLang, targetLang, outputText]);

  // ── Real-time dictionary (Roman→Urdu) ──────────────────────────────────
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const raw = e.target.value;
      if (isRomanToUrdu) {
        const converted = convertLastWord(raw);
        setInputText(converted);
        if (converted !== raw) setOutputText(convertAllWords(converted));
      } else {
        setInputText(raw);
      }
    },
    [isRomanToUrdu]
  );


  // ── Toast ──────────────────────────────────────────────────────────────
  const fireToast = useCallback((msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastMsg(msg); setToastHide(false); setShowToast(true);
    toastTimer.current = setTimeout(() => {
      setToastHide(true);
      setTimeout(() => setShowToast(false), 280);
    }, 2600);
  }, []);

  const processFileContent = useCallback(async (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    
    if (ext !== "txt" && ext !== "docx" && ext !== "pdf") {
      fireToast("Only .txt, .docx, and .pdf supported");
      return;
    }

    setConvertState("loading");
    try {
      let text = "";
      if (ext === "txt") {
        text = await file.text();
      } else if (ext === "docx") {
        const mammoth = (await import("mammoth")).default;
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      } else if (ext === "pdf") {
        const arrayBuffer = await file.arrayBuffer();
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map((item: any) => item.str);
          fullText += strings.join(" ") + "\n";
        }
        text = fullText;
      }
      
      setInputText(text);
      if (isRomanToUrdu) {
         setOutputText(convertAllWords(text));
      }
      fireToast(`Loaded text from ${file.name}`);
    } catch (err) {
      console.error(err);
      fireToast("Failed to read file");
    } finally {
      setConvertState("idle");
    }
  }, [isRomanToUrdu, fireToast]);

  const handleTextareaDrop = useCallback((e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return;
    processFileContent(e.dataTransfer.files[0]);
  }, [processFileContent]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFileContent(e.target.files[0]);
      // Reset input so the same file can be uploaded again if needed
      if (hiddenFileInput.current) hiddenFileInput.current.value = "";
    }
  }, [processFileContent]);

  // ── Convert ────────────────────────────────────────────────────────────
  const handleConvert = useCallback(async () => {
    if (!inputText.trim()) return;
    setConvertState("loading"); setErrorMsg("");
    try {
      const res = await fetch(`/api/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, source_lang: sourceLang, target_lang: targetLang }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.detail ?? `Server error ${res.status}`);
      }
      const data   = await res.json();
      const result = data.result ?? "";
      setOutputText(result);
      setConvertState("success");

      // Save to history
      const item: HistoryItem = { id: Date.now().toString(), input: inputText, output: result, sourceLang, targetLang, timestamp: Date.now() };
      const updatedH = [item, ...history].slice(0, 10);
      setHistory(updatedH);
      try { localStorage.setItem("nayafix-history", JSON.stringify(updatedH)); } catch { /* */ }

      // Update URL to a clean SEO-friendly path based on selected languages
      try {
        const slugMap: Record<string, string> = { 
          en: "english", ur: "urdu", ru: "roman-urdu", hi: "hindi", rh: "roman-hindi", 
          de: "german", rg: "roman-german", ne: "nepali", rn: "roman-nepali", 
          bn: "bengali", rb: "roman-bengali", si: "sri-lankan", rs: "roman-sri-lankan" 
        };
        const newPath = `/translation/${slugMap[sourceLang]}-to-${slugMap[targetLang]}`;
        window.history.replaceState({}, "", newPath);
      } catch { /* */ }

    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Connection error. Please try again.");
      setConvertState("error");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText, sourceLang, targetLang, history]);

  // ── Keyboard shortcuts ─────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && !e.shiftKey && e.key === "Enter") {
        e.preventDefault();
        document.getElementById("btn-convert")?.click();
      }
      if (e.ctrlKey && e.shiftKey && e.key === "C") {
        e.preventDefault();
        document.getElementById("btn-copy")?.click();
      }
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        e.preventDefault();
        document.getElementById("btn-download-txt")?.click();
      }
      if (e.ctrlKey && e.shiftKey && e.key === "S") {
        e.preventDefault();
        document.getElementById("btn-favourite")?.click();
      }
      if (e.key === "Escape") {
        setShowHistory(false); setShowFavourites(false);
        setShowShare(false); setShowDownload(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // ── Copy ───────────────────────────────────────────────────────────────
  const handleCopy = useCallback(async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopySuccess(true); setTimeout(() => setCopySuccess(false), 2200);
      fireToast("Text copied to clipboard");
    } catch { fireToast("Clipboard access denied"); }
  }, [outputText, fireToast]);

  // ── Share ──────────────────────────────────────────────────────────────
  const shareUrl  = typeof window !== "undefined" ? window.location.href : "https://nayafix.me";
  const shareText = outputText;

  const handleWhatsApp = useCallback(() => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n— nayafix.me\n${shareUrl}`)}`, "_blank", "noopener,noreferrer");
    setShowShare(false);
  }, [shareText, shareUrl]);

  const handleTelegram = useCallback(() => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, "_blank", "noopener,noreferrer");
    setShowShare(false);
  }, [shareText, shareUrl]);

  const handleTwitter = useCallback(() => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText.slice(0, 240) + "\n\n— via nayafix.me")}`, "_blank", "noopener,noreferrer");
    setShowShare(false);
  }, [shareText]);

  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try { await navigator.share({ title: "nayafix.me", text: shareText, url: shareUrl }); } catch { /* */ }
    }
    setShowShare(false);
  }, [shareText, shareUrl]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true); setTimeout(() => setLinkCopied(false), 2200);
      fireToast("Share link copied!");
    } catch { /* */ }
    setShowShare(false);
  }, [fireToast]);

  // ── Download ───────────────────────────────────────────────────────────
  const handleDownloadTXT = useCallback(() => {
    setShowDownload(false);
    const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = `nayafix-${Date.now()}.txt`; a.click();
    URL.revokeObjectURL(url);
    fireToast("Text file downloaded");
  }, [outputText, fireToast]);

  const handleDownloadDOCX = useCallback(async () => {
    setShowDownload(false);
    try {
      const { Document, Packer, Paragraph, TextRun } = await import("docx");
      const isUrdu = isRomanToUrdu || targetLang === "ur";
      
      const doc = new Document({
        sections: [{
          properties: {},
          children: outputText.split('\n').map(line => 
            new Paragraph({
              children: [
                new TextRun({
                  text: line,
                  rightToLeft: isUrdu,
                  font: isUrdu ? "Noto Nastaliq Urdu" : "Arial"
                })
              ],
              bidirectional: isUrdu
            })
          )
        }]
      });
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `nayafix-${Date.now()}.docx`; a.click();
      URL.revokeObjectURL(url);
      fireToast("Word Document downloaded");
    } catch (e) {
      fireToast("Failed to generate DOCX");
    }
  }, [outputText, isRomanToUrdu, targetLang, fireToast]);

  const handleDownloadPDF = useCallback(() => {
    setShowDownload(false);
    const isUrdu = isRomanToUrdu;
    const date   = new Date().toLocaleDateString("en-PK", { year:"numeric", month:"long", day:"numeric" });
    const html   = `<!DOCTYPE html><html lang="${isUrdu?"ur":"en"}" dir="${isUrdu?"rtl":"ltr"}"><head><meta charset="UTF-8"><title>nayafix.me Export</title><link href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400..700&family=Inter:wght@400&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:${isUrdu?"'Noto Nastaliq Urdu',serif":"'Inter',sans-serif"};direction:${isUrdu?"rtl":"ltr"};padding:48px;font-size:${isUrdu?"22px":"15px"};line-height:${isUrdu?"3":"1.8"};color:#111827;}.meta{font-family:'Inter',sans-serif;font-size:11px;color:#6b7280;direction:ltr;margin-bottom:28px;padding-bottom:12px;border-bottom:1px solid #e5e7eb;}.content{word-break:break-word;}@media print{body{padding:20px;}}</style></head><body><div class="meta">nayafix.me Urdu Converter &nbsp;·&nbsp; ${date} &nbsp;·&nbsp; nayafix.me</div><div class="content">${outputText.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}</div></body></html>`;
    
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(html);
      doc.close();
      
      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
        }, 1000);
      }, 500);
    }
  }, [outputText, isRomanToUrdu]);

  // ── Favourites ─────────────────────────────────────────────────────────
  const handleToggleFavourite = useCallback(() => {
    if (!outputText || !inputText) return;
    const exists = favourites.findIndex(f => f.input === inputText && f.output === outputText && f.sourceLang === sourceLang && f.targetLang === targetLang);
    let updated: FavouriteItem[];
    if (exists >= 0) {
      updated = favourites.filter((_, i) => i !== exists);
      fireToast("Removed from favourites");
    } else {
      const newFav: FavouriteItem = { id: Date.now().toString(), input: inputText, output: outputText, sourceLang, targetLang, timestamp: Date.now() };
      updated = [newFav, ...favourites];
      fireToast("Saved to favourites ⭐");
    }
    setFavourites(updated);
    try { localStorage.setItem("nayafix-favourites", JSON.stringify(updated)); } catch { /* */ }
  }, [outputText, inputText, sourceLang, targetLang, favourites, fireToast]);

  const handleRemoveFavourite = useCallback((id: string) => {
    const updated = favourites.filter(f => f.id !== id);
    setFavourites(updated);
    try { localStorage.setItem("nayafix-favourites", JSON.stringify(updated)); } catch { /* */ }
  }, [favourites]);

  const handleClearFavourites = useCallback(() => {
    setFavourites([]);
    try { localStorage.removeItem("nayafix-favourites"); } catch { /* */ }
  }, []);

  const handleFavouriteFromHistory = useCallback((item: HistoryItem) => {
    const alreadyFav = favourites.some(f => f.input === item.input && f.output === item.output);
    if (alreadyFav) { fireToast("Already in favourites"); return; }
    const newFav: FavouriteItem = { ...item, id: `fav-${Date.now()}` };
    const updated = [newFav, ...favourites];
    setFavourites(updated);
    try { localStorage.setItem("nayafix-favourites", JSON.stringify(updated)); } catch { /* */ }
    fireToast("Saved to favourites ⭐");
  }, [favourites, fireToast]);

  const isItemFavourited = useCallback((item: HistoryItem) =>
    favourites.some(f => f.input === item.input && f.output === item.output),
  [favourites]);

  // ── Restore ────────────────────────────────────────────────────────────
  const handleRestoreItem = useCallback((item: HistoryItem | FavouriteItem) => {
    if (item.sourceLang !== sourceLang) setSourceLang(item.sourceLang);
    if (item.targetLang !== targetLang) setTargetLang(item.targetLang);
    setInputText(item.input); setOutputText(item.output); setConvertState("success");
    setShowHistory(false); setShowFavourites(false);
    try {
      const url = new URL(window.location.href);
      if (item.input.length < 1500) {
        url.searchParams.set("input", item.input);
        url.searchParams.set("output", item.output);
        url.searchParams.set("sourceLang", item.sourceLang);
        url.searchParams.set("targetLang", item.targetLang);
      } else {
        url.searchParams.delete("input");
        url.searchParams.delete("output");
        url.searchParams.delete("sourceLang");
        url.searchParams.delete("targetLang");
      }
      window.history.replaceState({}, "", url.toString());
    } catch { /* */ }
  }, [sourceLang, targetLang]);

  // ── History ────────────────────────────────────────────────────────────
  const handleClearHistory = useCallback(() => {
    setHistory([]);
    try { localStorage.removeItem("nayafix-history"); } catch { /* */ }
  }, []);

  const handleRemoveHistory = useCallback((id: string) => {
    const updated = history.filter(h => h.id !== id);
    setHistory(updated);
    try { localStorage.setItem("nayafix-history", JSON.stringify(updated)); } catch { /* */ }
  }, [history]);

  // ── Clear all ──────────────────────────────────────────────────────────
  const handleClear = useCallback(() => {
    setInputText(""); setOutputText(""); setConvertState("idle"); setErrorMsg("");
    window.history.replaceState({}, "", window.location.pathname);
  }, []);

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const charCount = inputText.length;

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
          {/* ═══ CONVERTER ════════════════════════════════════════════ */}
          <section id="converter" className="converter-section">
            <div className="converter-card">

              {/* Language Selectors */}
              <div className="language-selectors-wrapper">
                <div className="lang-select-box">
                  <span className="lang-select-label">Translate from</span>
                  <select className="lang-select" value={sourceLang} onChange={(e) => {
                    setSourceLang(e.target.value as Language);
                    setInputText(""); setOutputText(""); setShowKeyboard(false);
                  }}>
                    <option value="en">English</option>
                    <option value="ur">Urdu (اردو)</option>
                    <option value="ru">Roman Urdu</option>
                    <option value="hi">Hindi (हिंदी)</option>
                    <option value="rh">Roman Hindi</option>
                    <option value="de">German (Deutsch)</option>
                    <option value="rg">Roman German</option>
                    <option value="ne">Nepali (नेपाली)</option>
                    <option value="rn">Roman Nepali</option>
                    <option value="bn">Bengali (বাংলা)</option>
                    <option value="rb">Roman Bengali</option>
                    <option value="si">Sinhala/Sri Lankan (සිංහල)</option>
                    <option value="rs">Roman Sinhala</option>
                  </select>
                </div>
                
                <button className="lang-swap-icon-btn" onClick={handleSwap} title="Swap Languages">
                  <SwapIcon/>
                </button>

                <div className="lang-select-box">
                  <span className="lang-select-label">Translate to</span>
                  <select className="lang-select" value={targetLang} onChange={(e) => {
                    setTargetLang(e.target.value as Language);
                    setOutputText("");
                  }}>
                    <option value="en">English</option>
                    <option value="ur">Urdu (اردو)</option>
                    <option value="ru">Roman Urdu</option>
                    <option value="hi">Hindi (हिंदी)</option>
                    <option value="rh">Roman Hindi</option>
                    <option value="de">German (Deutsch)</option>
                    <option value="rg">Roman German</option>
                    <option value="ne">Nepali (नेपाली)</option>
                    <option value="rn">Roman Nepali</option>
                    <option value="bn">Bengali (বাংলা)</option>
                    <option value="rb">Roman Bengali</option>
                    <option value="si">Sinhala/Sri Lankan (සිංහල)</option>
                    <option value="rs">Roman Sinhala</option>
                  </select>
                </div>
              </div>

              {/* Card Header */}
              <div className="converter-header">
                <div className="converter-header-left">
                  <span className="converter-header-title">nayafix.me Translator</span>
                  <span className="converter-header-desc">Instant translation & transliteration</span>
                </div>
                <div className="converter-header-actions">
                  {/* File Upload button */}
                  <input type="file" ref={hiddenFileInput} style={{ display: "none" }} accept=".txt,.docx,.pdf" onChange={handleFileInputChange} />
                  <button className="btn btn-ghost btn-sm"
                    onClick={() => hiddenFileInput.current?.click()}
                    title="Upload .txt, .docx, or .pdf to translate">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" x2="12" y1="18" y2="12"/><line x1="9" x2="15" y1="15" y2="15"/></svg>
                    <span className="btn-label-desktop">Translate File</span>
                  </button>
                  {/* Favourites button */}
                  <button id="btn-open-favourites" className="btn btn-ghost btn-sm"
                    onClick={() => { setShowFavourites(true); setShowHistory(false); }}
                    title="My Favourites (Ctrl+Shift+S to save current)">
                    <StarFilledIcon/>
                    <span className="btn-label-desktop">Favourites</span>
                    {favourites.length > 0 && <span className="fav-badge">{favourites.length}</span>}
                  </button>
                  {/* History button */}
                  <button id="btn-history" className="btn btn-ghost btn-sm"
                    onClick={() => { setShowHistory(true); setShowFavourites(false); }}
                    title="Conversion history">
                    <HistoryIcon/>
                    <span className="btn-label-desktop">History</span>
                    {history.length > 0 && <span className="history-badge">{history.length}</span>}
                  </button>
                  <button id="btn-clear" className="btn btn-ghost btn-sm"
                    onClick={handleClear} disabled={isLoading || (!inputText && !outputText)}>
                    <TrashIcon/> <span className="btn-label-desktop">Clear</span>
                  </button>
                </div>
              </div>

              {/* Panels */}
              <div className="panels-wrapper">
                {/* INPUT */}
                <div className="panel panel-input">
                  <div className="panel-header">
                    <span className="panel-lang-badge">
                      {sourceLang === "en" ? "ENG" : sourceLang === "de" ? "GER" : sourceLang === "ur" ? "اردو" : sourceLang === "hi" ? "हिंदी" : sourceLang === "ne" ? "नेपा" : sourceLang === "bn" ? "বাংলা" : sourceLang === "si" ? "සිංහ" : sourceLang.startsWith("r") ? "ROM" : "LANG"}
                    </span>
                    <span className="panel-lang-label">
                      {sourceLang === "en" ? "English" : sourceLang === "de" ? "German" : sourceLang === "ur" ? "Urdu Script" : sourceLang === "hi" ? "Hindi Script" : sourceLang === "ne" ? "Nepali Script" : sourceLang === "bn" ? "Bengali Script" : sourceLang === "si" ? "Sinhala Script" : sourceLang === "rh" ? "Roman Hindi" : sourceLang === "rg" ? "Roman German" : sourceLang === "rn" ? "Roman Nepali" : sourceLang === "rb" ? "Roman Bengali" : sourceLang === "rs" ? "Roman Sinhala" : "Roman Urdu"}
                      <span className="drag-drop-badge" title="Drag & Drop .txt, .docx, .pdf">📂 Drag & Drop</span>
                    </span>
                    <div className="panel-header-right">
                      {["ur", "hi", "de", "ne", "bn", "si"].includes(sourceLang) && (
                        <button 
                          className={`btn-keyboard-toggle ${showKeyboard ? "active" : ""}`} 
                          onClick={() => setShowKeyboard(!showKeyboard)}
                          title="Toggle Keyboard"
                        >
                          <KeyboardIcon/>
                          <span>Keyboard</span>
                        </button>
                      )}
                    </div>
                  </div>
                  <textarea id="input-text" className="panel-textarea"
                    dir={sourceLang === "ur" ? "rtl" : "ltr"} lang={sourceLang}
                    placeholder={`Enter text here...`}
                    value={inputText} onChange={handleInputChange}
                    onDragOver={(e) => e.preventDefault()} onDrop={handleTextareaDrop}
                    disabled={isLoading} spellCheck={false}/>
                  
                  {/* Virtual Keyboard rendering */}
                  {showKeyboard && sourceLang === "ur" && (
                    <UrduKeyboard 
                      onClose={() => setShowKeyboard(false)}
                      onKeyPress={(char) => setInputText(prev => prev + char)}
                      onBackspace={() => setInputText(prev => prev.slice(0, -1))}
                    />
                  )}
                  {showKeyboard && sourceLang === "hi" && (
                    <HindiKeyboard 
                      onClose={() => setShowKeyboard(false)}
                      onKeyPress={(char) => setInputText(prev => prev + char)}
                      onBackspace={() => setInputText(prev => prev.slice(0, -1))}
                    />
                  )}
                  {showKeyboard && sourceLang === "de" && (
                    <GermanKeyboard 
                      onClose={() => setShowKeyboard(false)}
                      onKeyPress={(char) => setInputText(prev => prev + char)}
                      onBackspace={() => setInputText(prev => prev.slice(0, -1))}
                    />
                  )}
                  {showKeyboard && sourceLang === "ne" && (
                    <NepaliKeyboard 
                      onClose={() => setShowKeyboard(false)}
                      onKeyPress={(char) => setInputText(prev => prev + char)}
                      onBackspace={() => setInputText(prev => prev.slice(0, -1))}
                    />
                  )}
                  {showKeyboard && sourceLang === "bn" && (
                    <BengaliKeyboard 
                      onClose={() => setShowKeyboard(false)}
                      onKeyPress={(char) => setInputText(prev => prev + char)}
                      onBackspace={() => setInputText(prev => prev.slice(0, -1))}
                    />
                  )}
                  {showKeyboard && sourceLang === "si" && (
                    <SinhalaKeyboard 
                      onClose={() => setShowKeyboard(false)}
                      onKeyPress={(char) => setInputText(prev => prev + char)}
                      onBackspace={() => setInputText(prev => prev.slice(0, -1))}
                    />
                  )}
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: wordCount > 1200 ? 'var(--clr-error)' : 'var(--clr-text-3)' }}>
                    <span>{wordCount > 1200 ? "⚠ Maximum 1200 words allowed" : ""}</span>
                    <span>{wordCount} / 1200 words</span>
                  </div>
                </div>

                {/* SWAP & MOBILE CONVERT BUTTON */}
                <div className="panels-divider">
                  <button
                    id="btn-swap"
                    className="panels-swap-btn"
                    onClick={handleSwap}
                    title="Swap languages"
                    aria-label="Swap languages">
                    <SwapIcon/>
                  </button>
                  <button id="btn-convert-mobile" className="btn btn-primary btn-convert-mobile"
                    onClick={handleConvert} disabled={isLoading || !inputText.trim() || wordCount > 1200}>
                    {isLoading ? <><span className="btn-spinner"/> Translating…</> : <><ConvertIcon/> Translate</>}
                  </button>
                </div>

                {/* OUTPUT */}
                <div className="panel panel-output">
                  <div className="panel-header">
                    <span className="panel-lang-badge">
                      {targetLang === "en" ? "ENG" : targetLang === "de" ? "GER" : targetLang === "ur" ? "اردو" : targetLang === "hi" ? "हिंदी" : targetLang === "ne" ? "नेपा" : targetLang === "bn" ? "বাংলা" : targetLang === "si" ? "සිංහ" : targetLang.startsWith("r") ? "ROM" : "LANG"}
                    </span>
                    <span className="panel-lang-label">
                      {targetLang === "en" ? "English" : targetLang === "de" ? "German" : targetLang === "ur" ? "Nastaliq Urdu" : targetLang === "hi" ? "Hindi Script" : targetLang === "ne" ? "Nepali Script" : targetLang === "bn" ? "Bengali Script" : targetLang === "si" ? "Sinhala Script" : targetLang === "rh" ? "Roman Hindi" : targetLang === "rg" ? "Roman German" : targetLang === "rn" ? "Roman Nepali" : targetLang === "rb" ? "Roman Bengali" : targetLang === "rs" ? "Roman Sinhala" : "Roman Urdu"}
                    </span>
                    {convertState === "success" && <span className="panel-status-ok"><CheckIcon/> Success</span>}
                    {isLoading && <span className="panel-status-loading"><span className="mini-spinner"/> Processing…</span>}
                  </div>
                  <div id="output-text"
                    className={`panel-output-box${outputText ? " has-text" : ""}`}
                    dir={targetLang === "ur" ? "rtl" : "ltr"} lang={targetLang}
                    aria-live="polite">
                    {outputText
                      ? <span className={targetLang === "ur" ? "urdu-text" : "roman-text"}>{outputText}</span>
                      : <span className={`output-placeholder${targetLang === "ur" ? " output-placeholder--rtl" : ""}`}
                          dir={targetLang === "ur" ? "rtl" : "ltr"}>
                          Translation will appear here…
                        </span>
                    }
                  </div>
                  {convertState === "error" && errorMsg && <p className="panel-error">⚠ {errorMsg}</p>}
                </div>
              </div>

              {/* Action Bar */}
              <div className="action-bar">
                <div className="action-bar-hint">
                  <span className="hint-dot"/>
                  <span>{sourceLang === "ru" && targetLang === "ur" ? "Spacebar se instantly convert" : "Type and click Convert"}</span>
                  <span className="shortcut-hints">
                    <kbd>Ctrl</kbd>+<kbd>↵</kbd> Convert &nbsp;·&nbsp;
                    <kbd>Ctrl</kbd>+<kbd>⇧</kbd>+<kbd>C</kbd> Copy &nbsp;·&nbsp;
                    <kbd>Ctrl</kbd>+<kbd>⇧</kbd>+<kbd>S</kbd> Save
                  </span>
                </div>

                <div className="action-bar-buttons">
                  {/* COPY */}
                  <button id="btn-copy" className={`btn ${copySuccess ? "btn-success" : "btn-outline"}`}
                    onClick={handleCopy} disabled={!outputText}>
                    {copySuccess ? <CheckIcon/> : <CopyIcon/>}
                    <span>{copySuccess ? "Copied!" : "Copy"}</span>
                  </button>

                  {/* FAVOURITE */}
                  <button id="btn-favourite"
                    className={`btn ${isFavourited ? "btn-favourite--active" : "btn-outline"}`}
                    onClick={handleToggleFavourite} disabled={!outputText}
                    title={isFavourited ? "Remove from favourites (Ctrl+Shift+S)" : "Save to favourites (Ctrl+Shift+S)"}>
                    {isFavourited ? <StarFilledIcon/> : <StarIcon/>}
                    <span>{isFavourited ? "Saved" : "Save"}</span>
                  </button>

                  {/* QUOTE MAKER */}
                  <button id="btn-quote" className="btn btn-outline"
                    onClick={() => setShowQuoteMaker(true)} disabled={!outputText}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    <span>Create Image</span>
                  </button>

                  {/* DOWNLOAD */}
                  <div className="share-wrapper" ref={downloadRef}>
                    <button id="btn-download"
                      className={`btn btn-outline${showDownload ? " btn-outline--active" : ""}`}
                      onClick={() => setShowDownload(s => !s)} disabled={!outputText}
                      aria-expanded={showDownload}>
                      <DownloadIcon/> <span>Download</span> <ChevronIcon/>
                    </button>
                    {showDownload && (
                      <div className="share-dropdown" role="menu">
                        <button id="btn-download-txt" className="share-item" onClick={handleDownloadTXT} role="menuitem">
                          <FileTextIcon/> Download as TXT <kbd className="item-kbd">Ctrl+⇧+D</kbd>
                        </button>
                        <button className="share-item" onClick={handleDownloadDOCX} role="menuitem">
                          <DownloadIcon/> Download as DOCX
                        </button>
                        <button className="share-item" onClick={handleDownloadPDF} role="menuitem">
                          <DownloadIcon/> Print / Save as PDF
                        </button>
                      </div>
                    )}
                  </div>

                  {/* SHARE */}
                  <div className="share-wrapper" ref={shareRef}>
                    <button id="btn-share"
                      className={`btn btn-outline${showShare ? " btn-outline--active" : ""}`}
                      onClick={() => setShowShare(s => !s)} disabled={!outputText}
                      aria-expanded={showShare}>
                      <ShareIcon/> <span>Share</span> <ChevronIcon/>
                    </button>
                    {showShare && (
                      <div className="share-dropdown" role="menu">
                        <button className="share-item share-item--wa" onClick={handleWhatsApp} role="menuitem"><WAIcon/> Share on WhatsApp</button>
                        <button className="share-item share-item--tg" onClick={handleTelegram} role="menuitem"><TelegramIcon/> Share on Telegram</button>
                        <button className="share-item share-item--tw" onClick={handleTwitter} role="menuitem"><TwitterIcon/> Share on Twitter / X</button>
                        {typeof navigator !== "undefined" && "share" in navigator && (
                          <button className="share-item share-item--native" onClick={handleNativeShare} role="menuitem"><NativeShareIcon/> More options…</button>
                        )}
                        <div className="share-divider"/>
                        <button className={`share-item share-item--link${linkCopied ? " share-item--copied" : ""}`}
                          onClick={handleCopyLink} role="menuitem">
                          {linkCopied ? <CheckIcon/> : <LinkIcon/>}
                          {linkCopied ? "Link Copied!" : "Copy Share Link"}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* CONVERT (Desktop) */}
                  <button id="btn-convert-desktop" className="btn btn-primary btn-convert-desktop"
                    onClick={handleConvert} disabled={isLoading || !inputText.trim() || wordCount > 1200} title="Ctrl+Enter">
                    {isLoading
                      ? <><span className="btn-spinner"/> Converting…</>
                      : <><ConvertIcon/> Convert to {{ en: 'English', ur: 'Urdu', ru: 'Roman Urdu', hi: 'Hindi', rh: 'Roman Hindi', de: 'German', rg: 'Roman German', ne: 'Nepali', rn: 'Roman Nepali', bn: 'Bengali', rb: 'Roman Bengali', si: 'Sinhala', rs: 'Roman Sinhala' }[targetLang]}</>
                    }
                  </button>
                </div>
              </div>
            </div>
          </section>

      {/* ── FAVOURITES PANEL ─────────────────────────────────────────── */}
      {showFavourites && (
        <>
          <div className="history-backdrop" onClick={() => setShowFavourites(false)} aria-hidden="true"/>
          <aside className="history-panel fav-panel" role="dialog" aria-label="Favourites">
            <div className="history-header">
              <div className="history-header-left">
                <StarFilledIcon/>
                <h2 className="history-title">Favourites</h2>
                {favourites.length > 0 && <span className="history-count fav-count">{favourites.length}</span>}
              </div>
              <div className="history-header-right">
                {favourites.length > 0 && (
                  <button className="btn btn-ghost btn-sm" onClick={handleClearFavourites}>
                    <TrashIcon/> Clear All
                  </button>
                )}
                <button className="btn btn-ghost btn-sm" onClick={() => setShowFavourites(false)} aria-label="Close"><CloseIcon/></button>
              </div>
            </div>
            <div className="history-list">
              {favourites.length === 0 ? (
                <div className="history-empty">
                  <span className="history-empty-icon">⭐</span>
                  <p>No favourites yet</p>
                  <span>Convert text, then click the star button to save</span>
                </div>
              ) : favourites.map(item => (
                <div key={item.id} className="history-item fav-item">
                  <div className="history-item-meta">
                    <span className="history-item-badge badge-roman">
                      {item.sourceLang.toUpperCase()}→{item.targetLang.toUpperCase()}
                    </span>
                    <span className="history-item-time">{relativeTime(item.timestamp)}</span>
                    <button className="fav-remove-btn" onClick={() => handleRemoveFavourite(item.id)} title="Remove from favourites">
                      <CloseIcon/>
                    </button>
                  </div>
                  <button className="fav-item-content" onClick={() => handleRestoreItem(item)}>
                    <p className="history-item-input" dir={item.sourceLang === "ur" ? "rtl" : "ltr"}>
                      {item.input.slice(0, 80)}{item.input.length > 80 ? "…" : ""}
                    </p>
                    <p className="history-item-output" dir={item.targetLang === "ur" ? "rtl" : "ltr"}
                      lang={item.targetLang}
                      style={{ fontFamily: item.targetLang === "ur" ? "var(--font-nastaliq)" : "inherit" }}>
                      {item.output.slice(0, 60)}{item.output.length > 60 ? "…" : ""}
                    </p>
                  </button>
                </div>
              ))}
            </div>
          </aside>
        </>
      )}

      {/* ── HISTORY PANEL ─────────────────────────────────────────────── */}
      {showHistory && (
        <>
          <div className="history-backdrop" onClick={() => setShowHistory(false)} aria-hidden="true"/>
          <aside className="history-panel" role="dialog" aria-label="Conversion History">
            <div className="history-header">
              <div className="history-header-left">
                <HistoryIcon/>
                <h2 className="history-title">Recent Conversions</h2>
                {history.length > 0 && <span className="history-count">{history.length}</span>}
              </div>
              <div className="history-header-right">
                {history.length > 0 && (
                  <button className="btn btn-ghost btn-sm" onClick={handleClearHistory}>
                    <TrashIcon/> Clear All
                  </button>
                )}
                <button className="btn btn-ghost btn-sm" onClick={() => setShowHistory(false)} aria-label="Close"><CloseIcon/></button>
              </div>
            </div>
            <div className="history-list">
              {history.length === 0 ? (
                <div className="history-empty">
                  <span className="history-empty-icon">🕐</span>
                  <p>No conversions yet</p>
                  <span>Convert some text to see it here</span>
                </div>
              ) : history.map(item => (
                <div key={item.id} className="history-item">
                  <div className="history-item-meta">
                    <span className="history-item-badge badge-roman">
                      {item.sourceLang.toUpperCase()}→{item.targetLang.toUpperCase()}
                    </span>
                    <span className="history-item-time">{relativeTime(item.timestamp)}</span>
                    {/* Star from history */}
                    <button
                      className={`history-star-btn${isItemFavourited(item) ? " history-star-btn--active" : ""}`}
                      onClick={() => handleFavouriteFromHistory(item)}
                      title={isItemFavourited(item) ? "Already in favourites" : "Save to favourites"}>
                      {isItemFavourited(item) ? <StarFilledIcon/> : <StarIcon/>}
                    </button>
                    <button className="fav-remove-btn" onClick={() => handleRemoveHistory(item.id)} title="Remove from history">
                      <CloseIcon/>
                    </button>
                  </div>
                  <button className="fav-item-content" onClick={() => handleRestoreItem(item)}>
                    <p className="history-item-input" dir={item.sourceLang === "ur" ? "rtl" : "ltr"}>
                      {item.input.slice(0, 80)}{item.input.length > 80 ? "…" : ""}
                    </p>
                    <p className="history-item-output" dir={item.targetLang === "ur" ? "rtl" : "ltr"}
                      lang={item.targetLang}
                      style={{ fontFamily: item.targetLang === "ur" ? "var(--font-nastaliq)" : "inherit" }}>
                      {item.output.slice(0, 60)}{item.output.length > 60 ? "…" : ""}
                    </p>
                  </button>
                </div>
              ))}
            </div>
          </aside>
        </>
      )}

      {/* Backdrops for dropdowns on mobile */}
      {showShare    && <div className="share-backdrop" onClick={() => setShowShare(false)} aria-hidden="true"/>}
      {showDownload && <div className="share-backdrop" onClick={() => setShowDownload(false)} aria-hidden="true"/>}

      {/* Toast */}
      {showToast && (
        <div className={`toast ${toastHide ? "toast-hide" : ""}`} role="alert">
          {toastMsg}
        </div>
      )}

      {/* Quote Maker Modal */}
      <QuoteMaker
        isOpen={showQuoteMaker}
        onClose={() => setShowQuoteMaker(false)}
        urduText={outputText}
      />

    </>
  );
}
