import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import Translator from "@/components/Translator";

const title = "NayaFix — Free Universal Translation & Converter Tools | AI Powered";
const description = "Free universal translation tools powered by AI. Roman Urdu to Urdu, English to Urdu, Hindi translation and more. Fast, accurate, no signup required.";
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
        title={<>NayaFix — Universal Translation & Converter</>}
        subtitle=""
        desc={
          <>
            Instantly translate and transliterate between <strong>Roman Urdu</strong>, 
            <strong> Nastaliq Urdu</strong>, <strong>English</strong>, <strong>Hindi</strong>, and <strong>Roman Hindi</strong> — with flawless accuracy.
          </>
        }
        seoContent={
          <div style={{ padding: '2rem 0', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            
            {/* Introductory Section */}
            <section style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--clr-text-1)' }}>The Ultimate Translation Hub</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--clr-text-2)' }}>
                NayaFix is more than just a translator—it's a complete toolkit designed to break down language barriers across South Asia. Whether you're decoding a casual Roman Urdu message, translating professional English documents to Nastaliq Urdu, or typing in Hindi Devanagari, our AI handles it all instantly and for free.
              </p>
            </section>

            {/* How to Use Section */}
            <section style={{ background: 'var(--clr-surface-md)', padding: '2rem', borderRadius: 'var(--r-lg)', border: '1px solid var(--clr-border)' }}>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', textAlign: 'center', color: 'var(--clr-text-1)' }}>How to Use NayaFix</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div style={{ background: 'var(--clr-surface)', padding: '1.5rem', borderRadius: 'var(--r-md)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>1️⃣</div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--clr-text-1)' }}>Select Languages</h3>
                  <p style={{ color: 'var(--clr-text-2)', lineHeight: '1.6' }}>Use the dropdowns at the top of the converter to choose your source and target languages. We support English, Urdu, Hindi, Roman Urdu, and Roman Hindi.</p>
                </div>
                <div style={{ background: 'var(--clr-surface)', padding: '1.5rem', borderRadius: 'var(--r-md)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>2️⃣</div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--clr-text-1)' }}>Enter Text or Document</h3>
                  <p style={{ color: 'var(--clr-text-2)', lineHeight: '1.6' }}>Type directly into the box, paste text, or drag-and-drop a `.txt`, `.docx`, or `.pdf` file. You can even use our built-in virtual keyboards!</p>
                </div>
                <div style={{ background: 'var(--clr-surface)', padding: '1.5rem', borderRadius: 'var(--r-md)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>3️⃣</div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--clr-text-1)' }}>Translate & Share</h3>
                  <p style={{ color: 'var(--clr-text-2)', lineHeight: '1.6' }}>Click Convert! Once translated, you can instantly copy the text, download it as a file, share it to WhatsApp/Telegram, or save it to Favourites.</p>
                </div>
              </div>
            </section>

            {/* Features Grid */}
            <section>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', textAlign: 'center', color: 'var(--clr-text-1)' }}>Everything You Need in One Place</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                
                {/* Feature 1 */}
                <div style={{ padding: '1.5rem', border: '1px solid var(--clr-border)', borderRadius: 'var(--r-lg)', background: 'var(--clr-surface)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>⚡</span>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--clr-text-1)', margin: 0 }}>Smart AI Engine</h3>
                  </div>
                  <p style={{ color: 'var(--clr-text-2)', lineHeight: '1.6', margin: 0 }}>Unlike standard translators, our AI understands context, slang, and grammar perfectly, ensuring natural-sounding translations every time.</p>
                </div>

                {/* Feature 2 */}
                <div style={{ padding: '1.5rem', border: '1px solid var(--clr-border)', borderRadius: 'var(--r-lg)', background: 'var(--clr-surface)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>🎨</span>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--clr-text-1)', margin: 0 }}>Beautiful Quote Maker</h3>
                  </div>
                  <p style={{ color: 'var(--clr-text-2)', lineHeight: '1.6', margin: 0 }}>Turn any translation into a stunning, Instagram-ready aesthetic image quote with customizable backgrounds and Nastaliq fonts.</p>
                </div>

                {/* Feature 3 */}
                <div style={{ padding: '1.5rem', border: '1px solid var(--clr-border)', borderRadius: 'var(--r-lg)', background: 'var(--clr-surface)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>⭐</span>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--clr-text-1)', margin: 0 }}>History & Favourites</h3>
                  </div>
                  <p style={{ color: 'var(--clr-text-2)', lineHeight: '1.6', margin: 0 }}>Never lose a translation. Your recent translations are automatically saved to your History, and you can star important ones to your Favourites list.</p>
                </div>

                {/* Feature 4 */}
                <div style={{ padding: '1.5rem', border: '1px solid var(--clr-border)', borderRadius: 'var(--r-lg)', background: 'var(--clr-surface)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>📄</span>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--clr-text-1)', margin: 0 }}>Document Translation</h3>
                  </div>
                  <p style={{ color: 'var(--clr-text-2)', lineHeight: '1.6', margin: 0 }}>Why copy-paste? Just drag and drop your `.pdf`, `.docx`, or `.txt` files directly into the input box to instantly extract and translate the text.</p>
                </div>

                {/* Feature 5 */}
                <div style={{ padding: '1.5rem', border: '1px solid var(--clr-border)', borderRadius: 'var(--r-lg)', background: 'var(--clr-surface)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>⌨️</span>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--clr-text-1)', margin: 0 }}>Urdu & Hindi Keyboards</h3>
                  </div>
                  <p style={{ color: 'var(--clr-text-2)', lineHeight: '1.6', margin: 0 }}>Don't have the right keyboard installed on your device? We provide built-in virtual keyboards so you can easily type in Nastaliq Urdu or Devanagari Hindi.</p>
                </div>

                {/* Feature 6 */}
                <div style={{ padding: '1.5rem', border: '1px solid var(--clr-border)', borderRadius: 'var(--r-lg)', background: 'var(--clr-surface)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>📱</span>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--clr-text-1)', margin: 0 }}>Mobile Optimized</h3>
                  </div>
                  <p style={{ color: 'var(--clr-text-2)', lineHeight: '1.6', margin: 0 }}>NayaFix is designed as a Progressive Web App (PWA). It works flawlessly on your phone and can even be added to your home screen like a native app.</p>
                </div>
                
              </div>
            </section>

            {/* Quick Links */}
            <section style={{ textAlign: 'center', padding: '2rem 0', borderTop: '1px solid var(--clr-border)' }}>
              <p style={{ fontWeight: 600, color: 'var(--clr-text-1)', marginBottom: '1rem' }}>Explore our most popular translation tools:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                <a href="/translation/english-to-urdu" className="btn btn-outline">English to Urdu</a>
                <a href="/translation/urdu-to-english" className="btn btn-outline">Urdu to English</a>
                <a href="/translation/roman-urdu-to-urdu" className="btn btn-outline">Roman Urdu to Urdu</a>
                <a href="/translation/hindi-to-english" className="btn btn-outline">Hindi to English</a>
                <a href="/translation/english-to-hindi" className="btn btn-outline">English to Hindi</a>
              </div>
            </section>

          </div>
        }
      >
        <Translator initialSourceLang="ru" initialTargetLang="ur" />
      </AppShell>
    </>
  );
}
