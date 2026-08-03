"use client";

import React from "react";

interface NepaliKeyboardProps {
  onKeyPress: (char: string) => void;
  onBackspace: () => void;
  onClose: () => void;
}

const NEPALI_CHARS = [
  "अ", "आ", "इ", "ई", "उ", "ऊ", "ए", "ऐ", "ओ", "औ",
  "क", "ख", "ग", "घ", "ङ",
  "च", "छ", "ज", "झ", "ञ",
  "ट", "ठ", "ड", "ढ", "ण",
  "त", "थ", "द", "ध", "न",
  "प", "फ", "ब", "भ", "म",
  "य", "र", "ल", "व", "श", "ष", "स", "ह",
  "्", "ा", "ि", "ी", "ु", "ू", "े", "ै", "ो", "ौ", "ं", "ँ"
];

export default function NepaliKeyboard({ onKeyPress, onBackspace, onClose }: NepaliKeyboardProps) {
  return (
    <div className="urdu-keyboard-container">
      <div className="uk-header">
        <span className="uk-title">Nepali Keyboard | नेपाली किबोर्ड</span>
        <button type="button" className="uk-close-btn" onClick={onClose} aria-label="Close keyboard">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="uk-keys-grid">
        {NEPALI_CHARS.map((char) => (
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
