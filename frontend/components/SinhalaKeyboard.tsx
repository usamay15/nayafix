"use client";

import React from "react";

interface SinhalaKeyboardProps {
  onKeyPress: (char: string) => void;
  onBackspace: () => void;
  onClose: () => void;
}

const SINHALA_CHARS = [
  "අ", "ආ", "ඇ", "ඈ", "ඉ", "ඊ", "උ", "ඌ", "එ", "ඒ", "ඔ", "ඕ",
  "ක", "ඛ", "ග", "ඝ", "ඞ",
  "ච", "ඡ", "ජ", "ඣ", "ඤ",
  "ට", "ඨ", "ඩ", "ඪ", "ණ",
  "ත", "ථ", "ද", "ධ", "න",
  "ප", "ඵ", "බ", "භ", "ම",
  "ය", "ර", "ල", "ව", "ශ", "ෂ", "ස", "හ", "ළ",
  "්", "ා", "ැ", "ෑ", "ි", "ී", "ු", "ූ", "ෙ", "ේ", "ො", "ෝ", "ං", "ඃ"
];

export default function SinhalaKeyboard({ onKeyPress, onBackspace, onClose }: SinhalaKeyboardProps) {
  return (
    <div className="urdu-keyboard-container">
      <div className="uk-header">
        <span className="uk-title">Sinhala Keyboard | සිංහල යතුරුපුවරුව</span>
        <button type="button" className="uk-close-btn" onClick={onClose} aria-label="Close keyboard">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="uk-keys-grid">
        {SINHALA_CHARS.map((char) => (
          <button
            key={char}
            type="button"
            className="uk-key"
            onClick={(e) => {
              e.preventDefault();
              onKeyPress(char);
            }}
          >
            {char}
          </button>
        ))}
      </div>

      <div className="uk-bottom-row">
        <button
          type="button"
          className="uk-action-btn"
          onClick={(e) => {
            e.preventDefault();
            onKeyPress(" ");
          }}
        >
          Space
        </button>
        <button
          type="button"
          className="uk-action-btn uk-backspace-btn"
          onClick={(e) => {
            e.preventDefault();
            onBackspace();
          }}
          aria-label="Backspace"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
            <line x1="18" y1="9" x2="12" y2="15"></line>
            <line x1="12" y1="9" x2="18" y2="15"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}
