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
            <section className="py-12 relative overflow-hidden">
              <h2 className="text-4xl font-extrabold mb-12 text-center text-[var(--clr-text-1)] tracking-tight">How to Use NayaFix</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                
                {/* Step 1 - Light */}
                <div className="bg-[var(--clr-bg-2)] p-10 rounded-[2.5rem] shadow-sm border border-[var(--clr-border)] flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <div className="text-gray-800 dark:text-gray-200 mb-6 transition-transform hover:scale-110">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="64" height="64"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--clr-text-1)] mb-4">Select Languages</h3>
                  <p className="text-[var(--clr-text-2)] leading-relaxed mb-10 flex-grow text-lg">
                    Use the dropdowns at the top of the converter to choose your source and target languages. We support English, Urdu, Hindi, Roman Urdu, and Roman Hindi.
                  </p>
                  <div className="px-8 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-full text-sm font-bold text-gray-500 dark:text-gray-400 tracking-wider uppercase shadow-sm">
                    Step 01
                  </div>
                </div>

                {/* Step 2 - Highlighted */}
                <div className="bg-[#FF4D00] p-10 rounded-[2.5rem] shadow-xl shadow-[#FF4D00]/20 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF4D00]/30 hover:-translate-y-2 transform md:-translate-y-4 relative">
                  <div className="text-white mb-6 transition-transform hover:scale-110">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="64" height="64"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Enter Text</h3>
                  <p className="text-white/90 leading-relaxed mb-10 flex-grow text-lg">
                    Type directly into the box, paste text, or drag-and-drop a `.txt`, `.docx`, or `.pdf` file. You can even use our built-in virtual keyboards!
                  </p>
                  <div className="px-8 py-2.5 border-2 border-white/50 rounded-full text-sm font-bold text-white tracking-wider uppercase hover:bg-white hover:text-[#FF4D00] transition-colors cursor-pointer">
                    Step 02
                  </div>
                </div>

                {/* Step 3 - Light */}
                <div className="bg-[var(--clr-bg-2)] p-10 rounded-[2.5rem] shadow-sm border border-[var(--clr-border)] flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <div className="text-gray-800 dark:text-gray-200 mb-6 transition-transform hover:scale-110">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="64" height="64"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--clr-text-1)] mb-4">Translate & Share</h3>
                  <p className="text-[var(--clr-text-2)] leading-relaxed mb-10 flex-grow text-lg">
                    Click Convert! Once translated, you can instantly copy the text, download it as a file, share it to WhatsApp/Telegram, or save it to Favourites.
                  </p>
                  <div className="px-8 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-full text-sm font-bold text-gray-500 dark:text-gray-400 tracking-wider uppercase shadow-sm">
                    Step 03
                  </div>
                </div>
              </div>
            </section>

            {/* Features Grid */}
            <section className="py-12">
              <h2 className="text-4xl font-extrabold mb-12 text-center text-[var(--clr-text-1)] tracking-tight">Everything You Need in One Place</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
                
                {/* Feature 1 */}
                <div className="bg-[var(--clr-bg-2)] p-10 rounded-[2rem] shadow-sm border border-[var(--clr-border)] flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-[#FF4D00]">
                  <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-100 mb-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40"><path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/></svg>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--clr-text-1)] mb-4">Smart AI Engine</h3>
                  <p className="text-[var(--clr-text-2)] leading-relaxed">Unlike standard translators, our AI understands context, slang, and grammar perfectly, ensuring natural-sounding translations every time.</p>
                </div>

                {/* Feature 2 */}
                <div className="bg-[var(--clr-bg-2)] p-10 rounded-[2rem] shadow-sm border border-[var(--clr-border)] flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-[#FF4D00]">
                  <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-100 mb-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--clr-text-1)] mb-4">Beautiful Quote Maker</h3>
                  <p className="text-[var(--clr-text-2)] leading-relaxed">Turn any translation into a stunning, Instagram-ready aesthetic image quote with customizable backgrounds and Nastaliq fonts.</p>
                </div>

                {/* Feature 3 */}
                <div className="bg-[var(--clr-bg-2)] p-10 rounded-[2rem] shadow-sm border border-[var(--clr-border)] flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-[#FF4D00]">
                  <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-100 mb-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--clr-text-1)] mb-4">History & Favourites</h3>
                  <p className="text-[var(--clr-text-2)] leading-relaxed">Never lose a translation. Your recent translations are automatically saved to your History, and you can star important ones to your Favourites list.</p>
                </div>

                {/* Feature 4 */}
                <div className="bg-[var(--clr-bg-2)] p-10 rounded-[2rem] shadow-sm border border-[var(--clr-border)] flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-[#FF4D00]">
                  <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-100 mb-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--clr-text-1)] mb-4">Document Translation</h3>
                  <p className="text-[var(--clr-text-2)] leading-relaxed">Why copy-paste? Just drag and drop your `.pdf`, `.docx`, or `.txt` files directly into the input box to instantly extract and translate the text.</p>
                </div>

                {/* Feature 5 */}
                <div className="bg-[var(--clr-bg-2)] p-10 rounded-[2rem] shadow-sm border border-[var(--clr-border)] flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-[#FF4D00]">
                  <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-100 mb-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40"><path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z"/></svg>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--clr-text-1)] mb-4">Virtual Keyboards</h3>
                  <p className="text-[var(--clr-text-2)] leading-relaxed">Don't have the right keyboard installed on your device? We provide built-in virtual keyboards so you can easily type in Nastaliq Urdu or Devanagari Hindi.</p>
                </div>

                {/* Feature 6 */}
                <div className="bg-[var(--clr-bg-2)] p-10 rounded-[2rem] shadow-sm border border-[var(--clr-border)] flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-[#FF4D00]">
                  <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-100 mb-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--clr-text-1)] mb-4">Mobile Optimized</h3>
                  <p className="text-[var(--clr-text-2)] leading-relaxed">NayaFix is designed as a Progressive Web App (PWA). It works flawlessly on your phone and can even be added to your home screen like a native app.</p>
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
