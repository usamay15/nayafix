"use client";

import { useState, useEffect } from "react";

// ── Icons ──────────────────────────────────────────────────────────────────
export const LogoIcon = () => (
  <img src="/apple-touch-icon.png" alt="nayafix.me Logo" width="28" height="28" style={{ borderRadius: "6px" }} />
);
export const SunIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
  </svg>
);
export const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

type Theme = "light" | "dark";

interface AppShellProps {
  title: React.ReactNode;
  subtitle: string;
  desc: React.ReactNode;
  seoContent?: React.ReactNode;
  children: React.ReactNode;
}

export default function AppShell({ title, subtitle, desc, seoContent, children }: AppShellProps) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("nayafix-theme") as Theme | null;
      if (stored === "dark" || stored === "light") {
        setTheme(stored);
        document.documentElement.setAttribute("data-theme", stored);
      } else {
        const wantsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(wantsDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", wantsDark ? "dark" : "light");
      }
    } catch { /* */ }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const nxt = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", nxt);
      try { localStorage.setItem("nayafix-theme", nxt); } catch { /* */ }
      return nxt;
    });
  };

  return (
    <>
      <div className="bg-mesh" aria-hidden="true"/>
      <div className="bg-orb bg-orb-1" aria-hidden="true"/>
      <div className="bg-orb bg-orb-2" aria-hidden="true"/>

      <div className="page-shell">
        <nav className="navbar">
          <div className="nav-inner">
            <a href="/" className="nav-brand" aria-label="nayafix.me Home">
              <LogoIcon/>
              <span className="nav-brand-text">nayafix.me</span>
              <span className="nav-brand-tag">Beta</span>
            </a>
            <div className="nav-right">
              <div className="nav-links">
                <a href="#converter" className="nav-link">Converter</a>
                <a href="https://nayafix.me" className="nav-link" target="_blank" rel="noopener noreferrer">Website</a>
              </div>
              <button id="btn-theme" className="theme-toggle" onClick={toggleTheme}
                aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}>
                <span className="theme-toggle-track">
                  <span className="theme-toggle-thumb">{theme === "light" ? <MoonIcon/> : <SunIcon/>}</span>
                </span>
                <span className="theme-toggle-label">{theme === "light" ? "Dark" : "Light"}</span>
              </button>
            </div>
          </div>
        </nav>

        <main>
          <section className="hero-section">
            <div className="hero-badge"><span className="hero-badge-dot"/>Instant · Accurate · Bidirectional</div>
            <h1 className="hero-title">
              {title}
              <br/><span className="hero-title-sub">{subtitle}</span>
            </h1>
            <p className="hero-desc">
              {desc}
            </p>
          </section>

          {children}

          {seoContent && (
            <section className="seo-content" style={{ padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto', color: 'var(--clr-text-2)', lineHeight: '1.6' }}>
              {seoContent}
            </section>
          )}

          <section className="features-strip">
            {[
              { icon: "⚡", title: "Instant",       desc: "Get fast and reliable results across all supported languages" },
              { icon: "🔄", title: "Bidirectional", desc: "Seamlessly translate back and forth between any language pair" },
              { icon: "⭐", title: "Favourites",    desc: "Save your best conversions and access them anytime" },
            ].map(f => (
              <div key={f.title} className="feature-card">
                <span className="feature-icon">{f.icon}</span>
                <span className="feature-title">{f.title}</span>
                <span className="feature-desc">{f.desc}</span>
              </div>
            ))}
          </section>
        </main>

        <footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-brand"><LogoIcon/><span className="footer-brand-name">nayafix.me</span></div>
            <p className="footer-tagline">Urdu, Roman Urdu, Hindi, aur English ke darmian asaan tarjuma karein</p>
            <div className="footer-links" style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="/translation/roman-urdu-to-urdu" style={{ color: 'var(--clr-text-2)', fontSize: '0.85rem', textDecoration: 'underline' }}>Roman Urdu to Urdu</a>
              <a href="/translation/roman-urdu-to-english" style={{ color: 'var(--clr-text-2)', fontSize: '0.85rem', textDecoration: 'underline' }}>Roman Urdu to English</a>
              <a href="/translation/urdu-to-english" style={{ color: 'var(--clr-text-2)', fontSize: '0.85rem', textDecoration: 'underline' }}>Urdu to English</a>
              <a href="/translation/urdu-to-roman-urdu" style={{ color: 'var(--clr-text-2)', fontSize: '0.85rem', textDecoration: 'underline' }}>Urdu to Roman Urdu</a>
              <a href="/translation/english-to-roman-urdu" style={{ color: 'var(--clr-text-2)', fontSize: '0.85rem', textDecoration: 'underline' }}>English to Roman Urdu</a>
              <a href="/translation/english-to-urdu" style={{ color: 'var(--clr-text-2)', fontSize: '0.85rem', textDecoration: 'underline' }}>English to Urdu</a>
              <a href="/translation/hindi-to-english" style={{ color: 'var(--clr-text-2)', fontSize: '0.85rem', textDecoration: 'underline' }}>Hindi to English</a>
              <a href="/translation/english-to-hindi" style={{ color: 'var(--clr-text-2)', fontSize: '0.85rem', textDecoration: 'underline' }}>English to Hindi</a>
            </div>
            <p className="footer-copy">© {new Date().getFullYear()} nayafix.me. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
