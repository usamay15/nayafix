import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import Translator from "@/components/Translator";

const title = "English to Urdu Translation — Free AI Translator | NayaFix";
const description = "Translate English to Urdu with AI accuracy. Free online English to Urdu translator. Get perfect Urdu script translation instantly. No signup required.";
const url = "https://nayafix.me/translation/english-to-urdu";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url },
};

export default function EnglishToUrdu() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "English to Urdu Translation",
    "url": url,
    "description": description
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <AppShell
        title={<>English to Urdu Translator — <span className="hero-title-urdu">انگریزی سے اردو</span></>}
        subtitle=""
        desc={
          <>
            Type in <strong>English</strong> and translate it directly into Nastaliq Urdu script, or use the Urdu keyboard to translate back to English.
          </>
        }
        seoContent={
          <>
            <h2>English to Urdu Translation Online</h2>
            <p>Achieve flawless English to Urdu translations for academic, professional, or personal use. Our advanced AI model captures the nuance and grammar of both languages, providing you with high-quality Nastaliq script outputs instantly.</p>
            <p style={{ marginTop: '1rem', fontWeight: 600 }}>Also try: <a href="/translation/urdu-to-english" style={{ textDecoration: 'underline' }}>Urdu → English</a> | <a href="/translation/roman-urdu-to-urdu" style={{ textDecoration: 'underline' }}>Roman Urdu → Urdu</a></p>
          </>
        }
      >
        <Translator initialSourceLang="en" initialTargetLang="ur" />
      </AppShell>
    </>
  );
}
