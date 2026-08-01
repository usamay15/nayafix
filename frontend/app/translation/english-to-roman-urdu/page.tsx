import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import Translator from "@/components/Translator";

const title = "English to Roman Urdu Translator — Free Online | NayaFix";
const description = "Convert English to Roman Urdu instantly. Free AI tool that translates English text to Roman Urdu. Perfect for chatting and social media. No signup needed.";
const url = "https://nayafix.me/translation/english-to-roman-urdu";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url },
};

export default function EnglishToRomanUrdu() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "English to Roman Urdu Translator",
    "url": url,
    "description": description
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <AppShell
        title={<>English to Roman Urdu Translator</>}
        subtitle=""
        desc={
          <>
            Translate messages written in <strong>English</strong> directly into Roman Urdu slang, or quickly translate Roman Urdu back to English.
          </>
        }
        seoContent={
          <>
            <h2>English to Roman Urdu Translator</h2>
            <p>Want to message an Urdu speaker using everyday chat language? Translate your standard English sentences directly into conversational Roman Urdu. Our AI understands idioms and slang, ensuring your messages sound natural and friendly.</p>
            <p style={{ marginTop: '1rem', fontWeight: 600 }}>Also try: <a href="/translation/roman-urdu-to-english" style={{ textDecoration: 'underline' }}>Roman Urdu → English</a> | <a href="/translation/english-to-urdu" style={{ textDecoration: 'underline' }}>English → Urdu</a></p>
          </>
        }
      >
        <Translator initialSourceLang="en" initialTargetLang="ru" />
      </AppShell>
    </>
  );
}
