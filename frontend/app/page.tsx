import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import Translator from "@/components/Translator";

const title = "NayaFix — Free Urdu Translation & Converter Tools | AI Powered";
const description = "Free Urdu translation tools powered by AI. Roman Urdu to Urdu, English to Urdu, Urdu to English and more. Fast, accurate, no signup required.";
const url = "https://nayafix.me";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url },
};

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "NayaFix",
    "url": url,
    "description": description
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <AppShell
        title={<>NayaFix — Urdu Translation & Converter</>}
        subtitle=""
        desc={
          <>
            Instantly translate and transliterate between <strong>Roman Urdu</strong>, 
            <strong> Nastaliq Urdu</strong>, <strong>English</strong>, <strong>Hindi</strong>, and <strong>Roman Hindi</strong> — with flawless accuracy.
          </>
        }
        seoContent={
          <>
            <h2>Free Online Urdu Translator</h2>
            <p>Welcome to nayafix.me! Whether you need to convert English to Nastaliq Urdu, read Roman Urdu messages in English, translate Hindi to English, or quickly type using our virtual keyboards, our AI-powered converter has you covered. It's fast, accurate, and completely free.</p>
            <p style={{ marginTop: '1rem', fontWeight: 600 }}>Popular Tools: <a href="/translation/english-to-urdu" style={{ textDecoration: 'underline' }}>English to Urdu</a> | <a href="/translation/urdu-to-english" style={{ textDecoration: 'underline' }}>Urdu to English</a> | <a href="/translation/roman-urdu-to-urdu" style={{ textDecoration: 'underline' }}>Roman Urdu to Urdu</a></p>
          </>
        }
      >
        <Translator initialSourceLang="ru" initialTargetLang="ur" />
      </AppShell>
    </>
  );
}
