import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import Translator from "@/components/Translator";

const title = "Urdu to Roman Urdu Converter — Free Online Tool | NayaFix";
const description = "Convert Urdu script to Roman Urdu instantly. Free AI tool to transliterate Urdu Nastaliq to Roman letters. Fast, accurate, no registration needed.";
const url = "https://nayafix.me/translation/urdu-to-roman-urdu";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url },
};

export default function UrduToRomanUrdu() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Urdu to Roman Urdu Converter",
    "url": url,
    "description": description
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <AppShell
        title={<>Urdu to Roman Urdu Converter — <span className="hero-title-urdu" style={{ fontSize: '1.2em' }}>اردو سے رومن اردو</span></>}
        subtitle=""
        desc={
          <>
            Type or paste Nastaliq <strong>Urdu</strong> script and instantly transliterate it back into easy-to-read Roman Urdu English characters.
          </>
        }
        seoContent={
          <>
            <h2>Transliterate Urdu to Roman Urdu</h2>
            <p>If you struggle to read traditional Nastaliq script, simply paste the Urdu text here and convert it to Roman Urdu. This makes reading news articles, poetry, and messages much easier by using familiar English alphabets.</p>
            <p style={{ marginTop: '1rem', fontWeight: 600 }}>Also try: <a href="/translation/roman-urdu-to-urdu" style={{ textDecoration: 'underline' }}>Roman Urdu → Urdu</a> | <a href="/translation/urdu-to-english" style={{ textDecoration: 'underline' }}>Urdu → English</a></p>
          </>
        }
      >
        <Translator initialSourceLang="ur" initialTargetLang="ru" />
      </AppShell>
    </>
  );
}
