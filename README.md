# NayaFix Urdu Converter 🌙

> **Roman Urdu → Nastaliq Urdu Script** — Instant AI-powered transliteration tool for [nayafix.me](https://nayafix.me)

A full-stack web app with a **Next.js + Tailwind CSS** frontend and a **Python FastAPI** backend powered by the **Groq `llama-3.3-70b-versatile`** model.

---

## Features

- ⚡ **Real-time dictionary conversion** — 160+ common words convert instantly on spacebar
- ✨ **AI Refine & Convert** — full context-aware Nastaliq Urdu via Groq LLM
- 📋 **One-click copy** — RTL Urdu text to clipboard
- 🧹 **Clear All** — reset both panels
- 🎨 **Beautiful dark UI** — glassmorphism, animated gradient header, Noto Nastaliq Urdu font
- 📱 **Fully responsive** — mobile + desktop layouts

---

## Project Structure

```
NayaFix Urdu Converter/
├── backend/
│   ├── main.py              # FastAPI app + Groq SDK
│   ├── requirements.txt
│   ├── .env.example         # → copy to .env and add your key
│   └── Dockerfile           # For Render.com / HF Spaces
└── frontend/
    ├── app/
    │   ├── layout.tsx       # Fonts + SEO metadata
    │   ├── globals.css      # Design system (glass, gradients, etc.)
    │   └── page.tsx         # Main dual-panel converter UI
    ├── lib/
    │   └── dictionary.ts    # Client-side Roman→Urdu word map
    └── .env.local.example   # → copy to .env.local and set API URL
```

---

## Quick Start (Local Development)

### Step 1 — Get a Free Groq API Key
1. Go to [console.groq.com](https://console.groq.com)
2. Sign up / log in → **API Keys** → **Create API Key**
3. Copy the key

### Step 2 — Run the Backend

```bash
cd backend

# Copy env template and add your key
copy .env.example .env
# Edit .env: GROQ_API_KEY=your_actual_key_here

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload
# → API running at http://localhost:8000
# → Docs at http://localhost:8000/docs
```

### Step 3 — Run the Frontend

```bash
cd frontend

# Copy env template (default points to localhost:8000)
copy .env.local.example .env.local

# Install and start
npm install   # (already done if scaffolded)
npm run dev
# → App running at http://localhost:3000
```

---

## Deployment (Zero-Cost)

### Backend → Render.com

1. Push `backend/` folder to a GitHub repo
2. Go to [render.com](https://render.com) → **New → Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Environment Variable**: `GROQ_API_KEY` = your key
5. Deploy → copy the Render URL (e.g. `https://nayafix-api.onrender.com`)

### Frontend → Vercel

1. Push `frontend/` folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → **New Project** → import repo
3. Add **Environment Variable**:
   - `NEXT_PUBLIC_API_URL` = `https://nayafix-api.onrender.com`
4. Deploy → copy your Vercel URL

### DNS → Cloudflare (nayafix.me)

1. In Cloudflare DNS for `nayafix.me`:
   - **CNAME** `@` → `cname.vercel-dns.com` (proxied)
   - **CNAME** `www` → `cname.vercel-dns.com` (proxied)
2. In Vercel Project Settings → **Domains** → Add `nayafix.me`

---

## API Reference

### `POST /api/convert`

**Request:**
```json
{ "text": "Aap ka shukriya, mujhe bohat khushi hui." }
```

**Response:**
```json
{
  "urdu": "آپ کا شکریہ، مجھے بہت خوشی ہوئی۔",
  "original": "Aap ka shukriya, mujhe bohat khushi hui."
}
```

**Health check:** `GET /` → `{ "status": "NayaFix Urdu Converter API is running ✅" }`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS |
| Backend | Python FastAPI, Uvicorn |
| AI Model | Groq `llama-3.3-70b-versatile` |
| Font | Noto Nastaliq Urdu (Google Fonts) |
| Hosting | Vercel (frontend) + Render.com (backend) |
| DNS | Cloudflare |

---

*Built with ❤️ for NayaFix — [nayafix.me](https://nayafix.me)*
