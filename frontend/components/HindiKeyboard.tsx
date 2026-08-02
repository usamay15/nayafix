"use client";

import React from "react";

interface HindiKeyboardProps {
  onKeyPress: (char: string) => void;
  onBackspace: () => void;
  onClose: () => void;
}

// Hindi Devanagari Alphabet grouped logically for a clean grid
const HINDI_CHARS = [
  "अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ए", "ऐ", "ओ", "औ", "अं", "अः",
  "क", "ख", "ग", "घ", "ङ",
  "च", "छ", "ज", "झ", "ञ",
  "ट", "ठ", "ड", "ढ", "ण",
  "त", "थ", "द", "ध", "न",
  "प", "फ", "ब", "भ", "म",
  "य", "र", "ल", "व",
  "श", "ष", "स", "ह",
  "क्ष", "त्र", "ज्ञ",
  "ा", "ि", "ी", "ु", "ू", "ृ", "े", "ै", "ो", "ौ", "ं", "ः", "्",
  "०", "१", "२", "३", "४", "५", "६", "७", "८", "९",
  "|", "॥", "ॐ", "₹"
];

export default function HindiKeyboard({ onKeyPress, onBackspace, onClose }: HindiKeyboardProps) {
  return (
    <div className="urdu-keyboard-container">
      <div className="uk-header">
        <span className="uk-title">Hindi Keyboard | हिंदी कीबोर्ड</span>
        <button type="button" className="uk-close-btn" onClick={onClose} aria-label="Close keyboard">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="uk-keys-grid">
        {HINDI_CHARS.map((char) => (
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
          className="uk-key uk-key-action"
          onClick={(e) => {
            e.preventDefault();
            onKeyPress("\n");
          }}
        >
          Enter
        </button>
        <button
          type="button"
          className="uk-key uk-key-space"
          onClick={(e) => {
            e.preventDefault();
            onKeyPress(" ");
          }}
        >
          Space (अंतर)
        </button>
        <button
          type="button"
          className="uk-key uk-key-action"
          onClick={(e) => {
            e.preventDefault();
            onBackspace();
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
            <line x1="18" y1="9" x2="12" y2="15" />
            <line x1="12" y1="9" x2="18" y2="15" />
          </svg>
        </button>
      </div>
    </div>
  );
}
