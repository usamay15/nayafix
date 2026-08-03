import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import Translator from "@/components/Translator";

const LANGUAGES = ["english", "urdu", "roman-urdu", "hindi", "roman-hindi", "german"];

const slugToCode: Record<string, any> = {
  "english": "en",
  "urdu": "ur",
  "roman-urdu": "ru",
  "hindi": "hi",
  "roman-hindi": "rh",
  "german": "de"
};

const codeToName: Record<string, string> = {
  "en": "English",
  "ur": "Nastaliq Urdu",
  "ru": "Roman Urdu",
  "hi": "Hindi",
  "rh": "Roman Hindi",
  "de": "German"
};

export function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (const source of LANGUAGES) {
    for (const target of LANGUAGES) {
      if (source !== target) {
        params.push({ slug: `${source}-to-${target}` });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [sourceSlug, targetSlug] = slug.split("-to-");
  const sourceName = codeToName[slugToCode[sourceSlug]] || sourceSlug;
  const targetName = codeToName[slugToCode[targetSlug]] || targetSlug;

  const title = `${sourceName} to ${targetName} Translation — Free AI Translator | NayaFix`;
  const description = `Translate ${sourceName} to ${targetName} with AI accuracy. Free online translator. Get perfect translation instantly. No signup required.`;
  const url = `https://nayafix.me/translation/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export default async function TranslationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [sourceSlug, targetSlug] = slug.split("-to-");
  const sourceLang = slugToCode[sourceSlug] || "ru";
  const targetLang = slugToCode[targetSlug] || "ur";
  
  const sourceName = codeToName[sourceLang] || sourceSlug;
  const targetName = codeToName[targetLang] || targetSlug;
  const url = `https://nayafix.me/translation/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `${sourceName} to ${targetName} Translation`,
    "url": url,
    "description": `Translate ${sourceName} to ${targetName} instantly.`
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <AppShell
        title={<>{sourceName} to {targetName} Translator</>}
        subtitle=""
        desc={<>Translate perfectly between <strong>{sourceName}</strong> and <strong>{targetName}</strong>.</>}
        seoContent={
          <>
            <h2>Free Online {sourceName} to {targetName} Translation</h2>
            <p style={{ marginBottom: '1rem' }}>
              Welcome to the best online tool for <strong>{sourceName} to {targetName}</strong> translation. Whether you need to translate messages, professional emails, or academic documents, our AI-powered converter delivers highly accurate results in an instant. 
              Translating from {sourceName} can often be tricky due to complex grammar rules and contextual nuances. However, our advanced model is specifically trained to understand these subtleties and output flawless {targetName} text. 
              Forget about clunky interfaces or signing up for accounts; our tool is 100% free, fast, and accessible directly from your browser on both mobile and desktop devices.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              We've designed this platform with speed and accuracy in mind. Our intelligent AI not only does word-to-word translation but also ensures the cultural context and natural flow of the sentence are preserved in {targetName}. Start translating now and experience seamless communication!
            </p>
            
            <h3>How to use the {sourceName} to {targetName} Translator?</h3>
            <ol style={{ marginLeft: '1.5rem', marginBottom: '2rem', lineHeight: '1.8' }}>
              <li><strong>Type or Paste:</strong> Enter your {sourceName} text into the input box on the left.</li>
              <li><strong>Convert:</strong> Click the vibrant "Translate" button to begin the magic.</li>
              <li><strong>Copy & Share:</strong> Once the {targetName} text appears in the output box, use the action buttons at the bottom to instantly copy, download as a file, or share it directly to WhatsApp and Telegram.</li>
            </ol>

            <h3>Frequently Asked Questions (FAQ)</h3>
            <div style={{ marginBottom: '2rem' }}>
              <p><strong>1. Is this {sourceName} to {targetName} translator free to use?</strong><br/>
              Yes! Our translation tool is completely free. There are no hidden fees, subscriptions, or daily limits for standard usage.</p>
              
              <p style={{ marginTop: '1rem' }}><strong>2. Do I need to create an account?</strong><br/>
              Not at all. We believe in instant access. You don't need to sign up or log in to translate your {sourceName} text to {targetName}.</p>
              
              <p style={{ marginTop: '1rem' }}><strong>3. How accurate is the {targetName} translation?</strong><br/>
              Our platform uses state-of-the-art AI technology. While no automated translator is 100% perfect, ours offers significantly higher accuracy and natural phrasing compared to traditional translation engines.</p>
            </div>

            <p style={{ marginTop: '1rem', fontWeight: 600 }}>Also try: <a href={`/translation/${targetSlug}-to-${sourceSlug}`} style={{ color: 'var(--clr-brand)', textDecoration: 'underline' }}>{targetName} → {sourceName}</a></p>
          </>
        }
      >
        <Translator initialSourceLang={sourceLang} initialTargetLang={targetLang} />
      </AppShell>
    </>
  );
}
