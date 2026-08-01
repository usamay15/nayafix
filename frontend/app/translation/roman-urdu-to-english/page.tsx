import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import Translator from "@/components/Translator";

const title = "Roman Urdu to English Translator — Free AI Tool | NayaFix";
const description = "Translate Roman Urdu to English instantly. Free AI-powered tool — type Roman Urdu, get English translation. No signup, works on all devices.";
const url = "https://nayafix.me/translation/roman-urdu-to-english";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url },
};

export default function RomanUrduToEnglish() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Roman Urdu to English Translator",
    "url": url,
    "description": description
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <AppShell
        title={<>Roman Urdu to English Translator</>}
        subtitle=""
        desc={
          <>
            Translate messages written in <strong>Roman Urdu</strong> directly into English, or quickly translate English phrases back to Roman Urdu.
          </>
        }
        seoContent={
          <>
            <h2>Roman Urdu to English Translation</h2>
            <p>Easily translate casual SMS language (Roman Urdu) into proper English. This tool is perfect for understanding texts from friends or family, or translating English sentences back into Roman Urdu so they are easier for native speakers to read on their phones.</p>
            <p style={{ marginTop: '1rem', fontWeight: 600 }}>Also try: <a href="/translation/english-to-roman-urdu" style={{ textDecoration: 'underline' }}>English → Roman Urdu</a> | <a href="/translation/roman-urdu-to-urdu" style={{ textDecoration: 'underline' }}>Roman Urdu → Urdu</a></p>
          </>
        }
      >
        <Translator initialSourceLang="ru" initialTargetLang="en" />
      </AppShell>
    </>
  );
}
