# nayafix.me Brand Kit — Style Guide

## Brand Identity

nayafix.me is a modern, elegant Urdu conversion tool. Our brand feels:
- **Trustworthy** and precise (like a dictionary)
- **Modern** and tech-forward (like a SaaS tool)
- **Culturally rooted** (Urdu / Pakistani identity)

---

## Logo Files

| File | Usage |
|------|-------|
| `logo-full-light.svg` | Light backgrounds — website header |
| `logo-full-dark.svg` | Dark backgrounds — dark mode header |
| `logo-icon.svg` | Square icon — app icon, favicons, social avatar |
| `logo-wordmark.svg` | Text only — email footers, simple placements |
| `favicon.svg` | Browser tab favicon (SVG — scales any size) |

---

## 🎨 Colors

### Primary Palette

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Indigo 500** (Brand Primary) | `#6366f1` | 99, 102, 241 | Buttons, links, active tabs |
| **Indigo 600** (Brand Dark) | `#4f46e5` | 79, 70, 229 | Hover states, gradient end |
| **Indigo 400** (Dark Mode) | `#818cf8` | 129, 140, 248 | Text/icons in dark mode |
| **Emerald 500** (Accent) | `#10b981` | 16, 185, 129 | Success, "Converted" badge |
| **Emerald 700** (Accent Dark) | `#059669` | 5, 150, 105 | Accent hover |

### Neutral Palette

| Name | Hex | Usage |
|------|-----|-------|
| Gray 900 | `#111827` | Primary body text (light) |
| Gray 600 | `#4b5563` | Secondary text |
| Gray 400 | `#9ca3af` | Placeholder, hints |
| White | `#ffffff` | Cards, inputs (light) |
| BG Light | `#f0f3fb` | Page background |
| BG Dark | `#07090f` | Dark mode page background |
| Surface Dark | `#0c0f1a` | Dark mode cards |

### Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| Danger | `#e11d48` | Errors |
| Warning | `#d97706` | Warnings |

---

## 🔤 Typography

### Fonts Used

| Font | Source | Weights | Usage |
|------|--------|---------|-------|
| **Inter** | Google Fonts | 300, 400, 500, 600, 700 | All UI, English text, headings, body |
| **Noto Nastaliq Urdu** | Google Fonts | 400, 600, 700 | All Urdu Nastaliq script display |

### Type Scale

| Element | Size | Weight |
|---------|------|--------|
| Hero Title | 3.5rem | 800 |
| Section Heading | 1.5rem | 700 |
| Card Title | 1rem | 600 |
| Body Text | 0.975rem | 400 |
| Small / Caption | 0.775rem | 400–500 |
| Urdu Display | 1.45rem | 400 (Nastaliq) |
| Urdu Large | 2.5rem | 400 (Nastaliq) |

---

## 📐 Spacing & Borders

| Token | Value |
|-------|-------|
| `--r-sm` | 4px |
| `--r-md` | 10px |
| `--r-lg` | 16px |
| `--r-xl` | 20px |
| `--r-2xl` | 24px |

---

## 🖼️ OG Image

**File:** `public/og-image.png`  
**Size:** 1200 × 630 px  
**Usage:** Auto-loads when nayafix.me link shared on:
- WhatsApp
- Facebook
- Twitter / X  
- Telegram
- LinkedIn

---

## Icon Style Guidelines

- **Shape:** Rounded square (`border-radius: 24%`)
- **Background:** `#6366f1 → #4f46e5` diagonal gradient (top-left to bottom-right)
- **Foreground:** White `ن` (Noon) Urdu character in Nastaliq style
- **Minimum size:** 16×16 px (use SVG for best quality)
- **Don't:** Stretch, recolor, or add drop shadows to the icon

---

## Voice & Tone

- **Language:** Mix of Urdu (Roman) and English — e.g., "Convert karo"
- **Tone:** Friendly, helpful, approachable
- **Avoid:** Very formal/corporate tone; keep it warm and approachable
