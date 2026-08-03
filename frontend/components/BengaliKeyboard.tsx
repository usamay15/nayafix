"use client";

import React from "react";

interface BengaliKeyboardProps {
  onKeyPress: (char: string) => void;
  onBackspace: () => void;
  onClose: () => void;
}

const BENGALI_CHARS = [
  "অ", "আ", "ই", "ঈ", "উ", "ঊ", "ঋ", "এ", "ঐ", "ও", "ঔ",
  "ক", "খ", "গ", "ঘ", "ঙ",
  "চ", "ছ", "জ", "ঝ", "ঞ",
  "ট", "ঠ", "ড", "ঢ", "ণ",
  "ত", "থ", "দ", "ধ", "ন",
  "প", "ফ", "ব", "ভ", "ম",
  "য", "র", "ল", "শ", "ষ", "স", "হ",
  "ড়", "ঢ়", "য়",
  "্", "া", "ি", "ী", "ু", "ূ", "ৃ", "ে", "ৈ", "ো", "ৌ", "ং", "ঃ", "ঁ"
];

export default function BengaliKeyboard({ onKeyPress, onBackspace, onClose }: BengaliKeyboardProps) {
  return (
    <div className="urdu-keyboard-container">
      <div className="uk-header">
        <span className="uk-title">Bengali Keyboard | বাংলা কীবোর্ড</span>
        <button type="button" className="uk-close-btn" onClick={onClose} aria-label="Close keyboard">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="uk-keys-grid">
        {BENGALI_CHARS.map((char) => (
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
