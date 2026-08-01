import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import Translator from "@/components/Translator";

const title = "Urdu to English Translation — Free AI Translator | NayaFix";
const description = "Translate Urdu to English instantly with AI. Free, accurate Urdu to English translator online. No signup, no limits. Powered by advanced AI models.";
const url = "https://nayafix.me/translation/urdu-to-english";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url },
};

export default function UrduToEnglish() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Urdu to English Translation",
    "url": url,
    "description": description
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <AppShell
        title={<>Urdu to English Translator — <span className="hero-title-urdu" style={{ fontSize: '1.2em' }}>اردو سے انگریزی</span></>}
        subtitle=""
        desc={
          <>
            Use the built-in virtual <strong>Urdu Keyboard</strong> to type Nastaliq script and instantly translate it to English, or translate English to Urdu.
          </>
        }
        seoContent={
          <>
            <h2>Urdu to English Translator with Keyboard</h2>
            <p>Translate traditional Urdu text into fluent English instantly. Don't have an Urdu keyboard installed? Click the keyboard icon in the translator to use our built-in virtual Urdu keyboard to type out the characters you need, and let our AI handle the translation.</p>
            <p style={{ marginTop: '1rem', fontWeight: 600 }}>Also try: <a href="/translation/english-to-urdu" style={{ textDecoration: 'underline' }}>English → Urdu</a> | <a href="/translation/urdu-to-roman-urdu" style={{ textDecoration: 'underline' }}>Urdu → Roman Urdu</a></p>
          </>
        }
      >
        <Translator initialSourceLang="ur" initialTargetLang="en" />
      </AppShell>
    </>
  );
}
