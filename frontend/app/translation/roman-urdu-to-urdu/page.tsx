import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import Translator from "@/components/Translator";

const title = "Roman Urdu to Urdu Converter — Free & Instant | NayaFix";
const description = "Convert Roman Urdu to Urdu script instantly for free. AI-powered transliteration tool. Type in Roman, get perfect Urdu Nastaliq script. No signup required.";
const url = "https://nayafix.me/translation/roman-urdu-to-urdu";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url },
};

export default function RomanUrduToUrdu() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Roman Urdu to Urdu Converter",
    "url": url,
    "description": description
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <AppShell
        title={<>Roman Urdu to Urdu Converter — <span className="hero-title-urdu">رومن اردو سے اردو</span></>}
        subtitle=""
        desc={
          <>
            Convert Roman Urdu text to Nastaliq Urdu instantly. Fast and accurate bidirectional translation online.
          </>
        }
        seoContent={
          <>
            <h2>Convert Roman Urdu to Nastaliq Script</h2>
            <p>Our bidirectional converter allows you to take everyday Roman Urdu (English alphabet) and instantly transliterate it into professional Nastaliq Urdu script. It's the fastest way to write formal Urdu documents or social media posts without knowing how to type on an Arabic keyboard.</p>
            <p style={{ marginTop: '1rem', fontWeight: 600 }}>Also try: <a href="/translation/urdu-to-roman-urdu" style={{ textDecoration: 'underline' }}>Urdu → Roman</a> | <a href="/translation/roman-urdu-to-english" style={{ textDecoration: 'underline' }}>Roman Urdu → English</a></p>
          </>
        }
      >
        <Translator initialSourceLang="ru" initialTargetLang="ur" />
      </AppShell>
    </>
  );
}
