import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import Translator from "@/components/Translator";

const LANGUAGES = ["english", "urdu", "roman-urdu", "hindi", "roman-hindi"];

const slugToCode: Record<string, any> = {
  "english": "en",
  "urdu": "ur",
  "roman-urdu": "ru",
  "hindi": "hi",
  "roman-hindi": "rh"
};

const codeToName: Record<string, string> = {
  "en": "English",
  "ur": "Nastaliq Urdu",
  "ru": "Roman Urdu",
  "hi": "Hindi",
  "rh": "Roman Hindi"
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
            <h2>{sourceName} to {targetName} Translation Online</h2>
            <p>Achieve flawless {sourceName} to {targetName} translations for academic, professional, or personal use. Our advanced AI model captures the nuance and grammar of both languages, providing you with high-quality outputs instantly.</p>
            <p style={{ marginTop: '1rem', fontWeight: 600 }}>Also try: <a href={`/translation/${targetSlug}-to-${sourceSlug}`} style={{ textDecoration: 'underline' }}>{targetName} → {sourceName}</a></p>
          </>
        }
      >
        <Translator initialSourceLang={sourceLang} initialTargetLang={targetLang} />
      </AppShell>
    </>
  );
}
