"use client";

import React, { useRef, useState, useCallback } from "react";
import * as htmlToImage from "html-to-image";

interface QuoteMakerProps {
  isOpen: boolean;
  onClose: () => void;
  urduText: string;
}

const BACKGROUNDS = [
  { id: "bg-1", name: "Sunset",     css: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",       textColor: "#1a1a2e" },
  { id: "bg-2", name: "Lavender",   css: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",       textColor: "#1a1a2e" },
  { id: "bg-3", name: "Ocean",      css: "linear-gradient(135deg, #243949 0%, #517fa4 100%)",       textColor: "#ffffff" },
  { id: "bg-4", name: "Dark",       css: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",     textColor: "#ffffff" },
  { id: "bg-5", name: "Indigo",     css: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",       textColor: "#ffffff" },
  { id: "bg-6", name: "Emerald",    css: "linear-gradient(135deg, #059669 0%, #10b981 100%)",       textColor: "#ffffff" },
  { id: "bg-7", name: "Rose Gold",  css: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",       textColor: "#ffffff" },
  { id: "bg-8", name: "White",      css: "#ffffff",                                                 textColor: "#111827" },
];

const FONT_SIZES = [
  { id: "sm",  label: "چھوٹا",   size: "1.5rem",  lineHeight: "2" },
  { id: "md",  label: "درمیانہ", size: "2rem",    lineHeight: "2.2" },
  { id: "lg",  label: "بڑا",    size: "2.6rem",  lineHeight: "2.4" },
];

export default function QuoteMaker({ isOpen, onClose, urduText }: QuoteMakerProps) {
  const [bgIndex, setBgIndex]         = useState(0);
  const [align, setAlign]             = useState<"center" | "right">("center");
  const [fontSizeIdx, setFontSizeIdx] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [copySuccess, setCopySuccess]   = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Generate PNG blob
  const generateBlob = useCallback(async (): Promise<Blob | null> => {
    if (!canvasRef.current) return null;
    return await htmlToImage.toBlob(canvasRef.current, {
      quality: 1.0,
      pixelRatio: 2,
      cacheBust: true,
      fontEmbedCSS: '', // <--- FIX: prevents cross-origin cssRules crash
    });
  }, []);

  // Download PNG
  const handleDownload = useCallback(async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await htmlToImage.toPng(canvasRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        cacheBust: true,
        fontEmbedCSS: '', // <--- FIX: prevents cross-origin cssRules crash
      });
      const link = document.createElement("a");
      link.download = `nayafix-quote-${Date.now()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Export failed", err);
    } finally {
      setIsExporting(false);
    }
  }, []);

  // Share via Web Share API
  const handleShare = useCallback(async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    try {
      const blob = await generateBlob();
      if (!blob) throw new Error("Could not generate image blob");
      
      const file = new File([blob], "nayafix-quote.png", { type: "image/png" });
      
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "nayafix.me — Urdu Quote",
          text: urduText + "\n\n— nayafix.me",
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2500);
      } else {
        // Fallback: copy image to clipboard
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2500);
      }
    } catch (err: any) {
      console.error("Share failed:", err);
      alert("Sharing failed: " + (err.message || "Your browser might not support this feature. Try using the Save Image button instead."));
    } finally {
      setIsExporting(false);
    }
  }, [generateBlob, urduText]);

  if (!isOpen) return null;

  const activeBg   = BACKGROUNDS[bgIndex];
  const activeFont = FONT_SIZES[fontSizeIdx];

  return (
    <div className="qm-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="qm-modal">

        {/* ── Header ── */}
        <div className="qm-header">
          <button className="qm-back-btn" onClick={onClose} aria-label="Back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5"/><path d="m12 5-7 7 7 7"/>
            </svg>
            <span>Back</span>
          </button>
          <h2 className="qm-title">🖼️ Create Image</h2>
          <button className="qm-close-btn" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>

        <div className="qm-body">
          {/* ── Canvas Preview ── */}
          <div className="qm-canvas-wrapper">
            <div
              ref={canvasRef}
              className="qm-canvas"
              style={{ background: activeBg.css, color: activeBg.textColor, textAlign: align }}
            >
              <div className="qm-text-area">
                <p className="qm-urdu-text" style={{ fontSize: activeFont.size, lineHeight: activeFont.lineHeight }} dir="rtl">
                  {urduText}
                </p>
              </div>
              <div className="qm-watermark">
                <span>nayafix.me</span>
              </div>
            </div>
          </div>

          {/* ── Controls ── */}
          <div className="qm-controls">

            {/* Background */}
            <div className="qm-control-group">
              <label className="qm-control-label">Background</label>
              <div className="qm-bg-row">
                {BACKGROUNDS.map((bg, i) => (
                  <button
                    key={bg.id}
                    className={`qm-swatch${i === bgIndex ? " qm-swatch--active" : ""}`}
                    style={{ background: bg.css }}
                    title={bg.name}
                    onClick={() => setBgIndex(i)}
                  />
                ))}
              </div>
            </div>

            {/* Font Size + Alignment on same row */}
            <div className="qm-control-row">
              <div className="qm-control-group">
                <label className="qm-control-label">Font Size</label>
                <div className="qm-toggle-group">
                  {FONT_SIZES.map((f, i) => (
                    <button
                      key={f.id}
                      className={`qm-toggle-btn${i === fontSizeIdx ? " active" : ""}`}
                      onClick={() => setFontSizeIdx(i)}
                    >{f.label}</button>
                  ))}
                </div>
              </div>

              <div className="qm-control-group">
                <label className="qm-control-label">Alignment</label>
                <div className="qm-toggle-group">
                  <button className={`qm-toggle-btn${align === "center" ? " active" : ""}`} onClick={() => setAlign("center")}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="10" x2="6" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="18" y1="18" x2="6" y2="18"/></svg>
                    Center
                  </button>
                  <button className={`qm-toggle-btn${align === "right" ? " active" : ""}`} onClick={() => setAlign("right")}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="21" y1="10" x2="7" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="9" y2="18"/></svg>
                    Right
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Footer — Save & Share buttons ── */}
        <div className="qm-footer">
          <button className="qm-btn qm-btn--outline" onClick={handleShare} disabled={isExporting}>
            {shareSuccess ? (
              <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Shared!</>
            ) : copySuccess ? (
              <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copied!</>
            ) : (
              <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> Share Image</>
            )}
          </button>

          <button className="qm-btn qm-btn--primary" onClick={handleDownload} disabled={isExporting}>
            {isExporting ? (
              <><span className="qm-spinner"/> Saving…</>
            ) : (
              <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg> Save Image</>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
