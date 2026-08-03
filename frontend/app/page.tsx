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
            <strong> Nastaliq Urdu</strong>, <strong>English</strong>, <strong>Hindi</strong>, <strong>Roman Hindi</strong>, and <strong>German</strong> — with flawless accuracy.
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
              <div className="flex flex-col gap-6 max-w-4xl mx-auto px-4">
                
                {/* Step 1 - Red */}
                <div className="flex flex-col md:flex-row w-full bg-[var(--clr-bg-2)] shadow-sm rounded-xl overflow-hidden border border-[var(--clr-border)] hover:shadow-md transition-all group">
                  <div className="md:w-32 p-6 flex items-center justify-center bg-white dark:bg-gray-900 border-b md:border-b-0 md:border-r border-[var(--clr-border)] relative overflow-hidden">
                    <span className="text-6xl font-black text-[#C41C1C] relative z-10 group-hover:scale-110 transition-transform">01</span>
                  </div>
                  
                  <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center bg-white dark:bg-gray-900">
                    <p className="text-[var(--clr-text-2)] text-sm leading-relaxed max-w-xl">
                      Use the dropdowns at the top of the converter to choose your source and target languages. We support English, Urdu, Hindi, Roman Urdu, and Roman Hindi.
                    </p>
                  </div>
                  
                  <div className="md:w-64 bg-[#C41C1C] relative overflow-hidden flex items-center justify-center p-6 text-white md:[clip-path:polygon(15%_0,100%_0,100%_100%,0_100%)]">
                    <div className="relative z-10 flex flex-col items-center gap-2 md:ml-4">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40" className="group-hover:rotate-12 transition-transform"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>
                      <span className="font-bold tracking-widest text-xs uppercase opacity-90">Step One</span>
                    </div>
                    <div className="absolute right-4 text-white/50 group-hover:text-white group-hover:translate-x-2 transition-all hidden md:block">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                </div>

                {/* Step 2 - Teal/Green */}
                <div className="flex flex-col md:flex-row w-full bg-[var(--clr-bg-2)] shadow-sm rounded-xl overflow-hidden border border-[var(--clr-border)] hover:shadow-md transition-all group">
                  <div className="md:w-32 p-6 flex items-center justify-center bg-white dark:bg-gray-900 border-b md:border-b-0 md:border-r border-[var(--clr-border)] relative overflow-hidden">
                    <span className="text-6xl font-black text-[#5E9E81] relative z-10 group-hover:scale-110 transition-transform">02</span>
                  </div>
                  
                  <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center bg-white dark:bg-gray-900">
                    <p className="text-[var(--clr-text-2)] text-sm leading-relaxed max-w-xl">
                      Type directly into the box, paste text, or drag-and-drop a `.txt`, `.docx`, or `.pdf` file. You can even use our built-in virtual keyboards!
                    </p>
                  </div>
                  
                  <div className="md:w-64 bg-[#5E9E81] relative overflow-hidden flex items-center justify-center p-6 text-white md:[clip-path:polygon(15%_0,100%_0,100%_100%,0_100%)]">
                    <div className="relative z-10 flex flex-col items-center gap-2 md:ml-4">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40" className="group-hover:rotate-12 transition-transform"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                      <span className="font-bold tracking-widest text-xs uppercase opacity-90">Step Two</span>
                    </div>
                    <div className="absolute right-4 text-white/50 group-hover:text-white group-hover:translate-x-2 transition-all hidden md:block">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                </div>

                {/* Step 3 - Light Green */}
                <div className="flex flex-col md:flex-row w-full bg-[var(--clr-bg-2)] shadow-sm rounded-xl overflow-hidden border border-[var(--clr-border)] hover:shadow-md transition-all group">
                  <div className="md:w-32 p-6 flex items-center justify-center bg-white dark:bg-gray-900 border-b md:border-b-0 md:border-r border-[var(--clr-border)] relative overflow-hidden">
                    <span className="text-6xl font-black text-[#A3C340] relative z-10 group-hover:scale-110 transition-transform">03</span>
                  </div>
                  
                  <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center bg-white dark:bg-gray-900">
                    <p className="text-[var(--clr-text-2)] text-sm leading-relaxed max-w-xl">
                      Click Convert! Once translated, you can instantly copy the text, download it as a file, share it to WhatsApp/Telegram, or save it to Favourites.
                    </p>
                  </div>
                  
                  <div className="md:w-64 bg-[#A3C340] relative overflow-hidden flex items-center justify-center p-6 text-white md:[clip-path:polygon(15%_0,100%_0,100%_100%,0_100%)]">
                    <div className="relative z-10 flex flex-col items-center gap-2 md:ml-4">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40" className="group-hover:rotate-12 transition-transform"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
                      <span className="font-bold tracking-widest text-xs uppercase opacity-90">Step Three</span>
                    </div>
                    <div className="absolute right-4 text-white/50 group-hover:text-white group-hover:translate-x-2 transition-all hidden md:block">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Features List */}
            <section className="py-16 overflow-hidden relative">
              <h2 className="text-4xl font-extrabold text-center text-[var(--clr-text-1)] tracking-tight" style={{ marginBottom: '3.5rem' }}>Everything You Need in One Place</h2>
              <div className="flex flex-col gap-6 max-w-4xl mx-auto px-4">
                
                {/* Feature 1 - Red */}
                <div className="relative w-full h-32 md:h-36 flex items-center group">
                  <div className="absolute left-8 md:left-12 right-0 h-28 md:h-32 bg-[#E63946] flex items-center pr-4 md:pr-8 text-white rounded-l-lg shadow-md transition-transform group-hover:scale-[1.02] md:[clip-path:polygon(0_0,calc(100%-2rem)_0,100%_50%,calc(100%-2rem)_100%,0_100%)] [clip-path:polygon(0_0,calc(100%-1rem)_0,100%_50%,calc(100%-1rem)_100%,0_100%)]">
                    {/* Spacer to guarantee text is never hidden behind the left floating tag */}
                    <div className="w-16 sm:w-20 md:w-28 shrink-0"></div>
                    <div className="flex-1 pr-4 md:pr-8 pl-2">
                      <h3 className="font-bold text-sm md:text-xl uppercase tracking-wider mb-1">Smart AI Engine</h3>
                      <p className="text-[10px] md:text-sm opacity-90 leading-snug line-clamp-5 sm:line-clamp-none">Unlike standard translators, our AI understands context, slang, and grammar perfectly, ensuring natural-sounding translations every time.</p>
                    </div>
                    <div className="text-5xl md:text-7xl font-black opacity-30 mr-2 md:mr-8 font-mono tracking-tighter">01</div>
                  </div>

                  <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 filter drop-shadow-[4px_4px_4px_rgba(0,0,0,0.2)] dark:drop-shadow-[4px_4px_4px_rgba(0,0,0,0.5)]">
                    <div className="w-20 md:w-28 h-36 md:h-40 bg-white dark:bg-gray-800 flex flex-col items-center justify-center -skew-x-6 rounded-sm border border-gray-100 dark:border-gray-700">
                      <div className="skew-x-6 flex flex-col items-center">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-red-100 dark:border-red-900/30 flex items-center justify-center mb-2">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-[#E63946]"><path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/></svg>
                        </div>
                        <span className="text-[9px] md:text-[11px] font-bold text-gray-500 uppercase tracking-widest text-center">AI Engine</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature 2 - Amber */}
                <div className="relative w-full h-32 md:h-36 flex items-center group">
                  <div className="absolute left-8 md:left-12 right-0 h-28 md:h-32 bg-[#F4A261] flex items-center pr-4 md:pr-8 text-white rounded-l-lg shadow-md transition-transform group-hover:scale-[1.02] md:[clip-path:polygon(0_0,calc(100%-2rem)_0,100%_50%,calc(100%-2rem)_100%,0_100%)] [clip-path:polygon(0_0,calc(100%-1rem)_0,100%_50%,calc(100%-1rem)_100%,0_100%)]">
                    {/* Spacer to guarantee text is never hidden behind the left floating tag */}
                    <div className="w-16 sm:w-20 md:w-28 shrink-0"></div>
                    <div className="flex-1 pr-4 md:pr-8 pl-2">
                      <h3 className="font-bold text-sm md:text-xl uppercase tracking-wider mb-1">Quote Maker</h3>
                      <p className="text-[10px] md:text-sm opacity-90 leading-snug line-clamp-5 sm:line-clamp-none">Turn any translation into a stunning, Instagram-ready aesthetic image quote with customizable backgrounds and Nastaliq fonts.</p>
                    </div>
                    <div className="text-5xl md:text-7xl font-black opacity-30 mr-2 md:mr-8 font-mono tracking-tighter">02</div>
                  </div>

                  <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 filter drop-shadow-[4px_4px_4px_rgba(0,0,0,0.2)] dark:drop-shadow-[4px_4px_4px_rgba(0,0,0,0.5)]">
                    <div className="w-20 md:w-28 h-36 md:h-40 bg-white dark:bg-gray-800 flex flex-col items-center justify-center -skew-x-6 rounded-sm border border-gray-100 dark:border-gray-700">
                      <div className="skew-x-6 flex flex-col items-center">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-orange-100 dark:border-orange-900/30 flex items-center justify-center mb-2">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-[#F4A261]"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
                        </div>
                        <span className="text-[9px] md:text-[11px] font-bold text-gray-500 uppercase tracking-widest text-center">Quotes</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature 3 - Green */}
                <div className="relative w-full h-32 md:h-36 flex items-center group">
                  <div className="absolute left-8 md:left-12 right-0 h-28 md:h-32 bg-[#2A9D8F] flex items-center pr-4 md:pr-8 text-white rounded-l-lg shadow-md transition-transform group-hover:scale-[1.02] md:[clip-path:polygon(0_0,calc(100%-2rem)_0,100%_50%,calc(100%-2rem)_100%,0_100%)] [clip-path:polygon(0_0,calc(100%-1rem)_0,100%_50%,calc(100%-1rem)_100%,0_100%)]">
                    {/* Spacer to guarantee text is never hidden behind the left floating tag */}
                    <div className="w-16 sm:w-20 md:w-28 shrink-0"></div>
                    <div className="flex-1 pr-4 md:pr-8 pl-2">
                      <h3 className="font-bold text-sm md:text-xl uppercase tracking-wider mb-1">History</h3>
                      <p className="text-[10px] md:text-sm opacity-90 leading-snug line-clamp-5 sm:line-clamp-none">Never lose a translation. Your recent translations are automatically saved to your History, and you can star important ones to your Favourites list.</p>
                    </div>
                    <div className="text-5xl md:text-7xl font-black opacity-30 mr-2 md:mr-8 font-mono tracking-tighter">03</div>
                  </div>

                  <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 filter drop-shadow-[4px_4px_4px_rgba(0,0,0,0.2)] dark:drop-shadow-[4px_4px_4px_rgba(0,0,0,0.5)]">
                    <div className="w-20 md:w-28 h-36 md:h-40 bg-white dark:bg-gray-800 flex flex-col items-center justify-center -skew-x-6 rounded-sm border border-gray-100 dark:border-gray-700">
                      <div className="skew-x-6 flex flex-col items-center">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-teal-100 dark:border-teal-900/30 flex items-center justify-center mb-2">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-[#2A9D8F]"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                        </div>
                        <span className="text-[9px] md:text-[11px] font-bold text-gray-500 uppercase tracking-widest text-center">History</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature 4 - Teal Blue */}
                <div className="relative w-full h-32 md:h-36 flex items-center group">
                  <div className="absolute left-8 md:left-12 right-0 h-28 md:h-32 bg-[#457B9D] flex items-center pr-4 md:pr-8 text-white rounded-l-lg shadow-md transition-transform group-hover:scale-[1.02] md:[clip-path:polygon(0_0,calc(100%-2rem)_0,100%_50%,calc(100%-2rem)_100%,0_100%)] [clip-path:polygon(0_0,calc(100%-1rem)_0,100%_50%,calc(100%-1rem)_100%,0_100%)]">
                    {/* Spacer to guarantee text is never hidden behind the left floating tag */}
                    <div className="w-16 sm:w-20 md:w-28 shrink-0"></div>
                    <div className="flex-1 pr-4 md:pr-8 pl-2">
                      <h3 className="font-bold text-sm md:text-xl uppercase tracking-wider mb-1">Documents</h3>
                      <p className="text-[10px] md:text-sm opacity-90 leading-snug line-clamp-5 sm:line-clamp-none">Why copy-paste? Just drag and drop your `.pdf`, `.docx`, or `.txt` files directly into the input box to instantly extract and translate the text.</p>
                    </div>
                    <div className="text-5xl md:text-7xl font-black opacity-30 mr-2 md:mr-8 font-mono tracking-tighter">04</div>
                  </div>

                  <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 filter drop-shadow-[4px_4px_4px_rgba(0,0,0,0.2)] dark:drop-shadow-[4px_4px_4px_rgba(0,0,0,0.5)]">
                    <div className="w-20 md:w-28 h-36 md:h-40 bg-white dark:bg-gray-800 flex flex-col items-center justify-center -skew-x-6 rounded-sm border border-gray-100 dark:border-gray-700">
                      <div className="skew-x-6 flex flex-col items-center">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-blue-100 dark:border-blue-900/30 flex items-center justify-center mb-2">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-[#457B9D]"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                        </div>
                        <span className="text-[9px] md:text-[11px] font-bold text-gray-500 uppercase tracking-widest text-center">Files</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature 5 - Dark Blue */}
                <div className="relative w-full h-32 md:h-36 flex items-center group">
                  <div className="absolute left-8 md:left-12 right-0 h-28 md:h-32 bg-[#1D3557] flex items-center pr-4 md:pr-8 text-white rounded-l-lg shadow-md transition-transform group-hover:scale-[1.02] md:[clip-path:polygon(0_0,calc(100%-2rem)_0,100%_50%,calc(100%-2rem)_100%,0_100%)] [clip-path:polygon(0_0,calc(100%-1rem)_0,100%_50%,calc(100%-1rem)_100%,0_100%)]">
                    {/* Spacer to guarantee text is never hidden behind the left floating tag */}
                    <div className="w-16 sm:w-20 md:w-28 shrink-0"></div>
                    <div className="flex-1 pr-4 md:pr-8 pl-2">
                      <h3 className="font-bold text-sm md:text-xl uppercase tracking-wider mb-1">Keyboards</h3>
                      <p className="text-[10px] md:text-sm opacity-90 leading-snug line-clamp-5 sm:line-clamp-none">Don't have the right keyboard installed on your device? We provide built-in virtual keyboards so you can easily type in Nastaliq Urdu or Devanagari Hindi.</p>
                    </div>
                    <div className="text-5xl md:text-7xl font-black opacity-30 mr-2 md:mr-8 font-mono tracking-tighter">05</div>
                  </div>

                  <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 filter drop-shadow-[4px_4px_4px_rgba(0,0,0,0.2)] dark:drop-shadow-[4px_4px_4px_rgba(0,0,0,0.5)]">
                    <div className="w-20 md:w-28 h-36 md:h-40 bg-white dark:bg-gray-800 flex flex-col items-center justify-center -skew-x-6 rounded-sm border border-gray-100 dark:border-gray-700">
                      <div className="skew-x-6 flex flex-col items-center">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-slate-100 dark:border-slate-700 flex items-center justify-center mb-2">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-[#1D3557]"><path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z"/></svg>
                        </div>
                        <span className="text-[9px] md:text-[11px] font-bold text-gray-500 uppercase tracking-widest text-center">Typing</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature 6 - Purple */}
                <div className="relative w-full h-32 md:h-36 flex items-center group">
                  <div className="absolute left-8 md:left-12 right-0 h-28 md:h-32 bg-[#6D28D9] flex items-center pr-4 md:pr-8 text-white rounded-l-lg shadow-md transition-transform group-hover:scale-[1.02] md:[clip-path:polygon(0_0,calc(100%-2rem)_0,100%_50%,calc(100%-2rem)_100%,0_100%)] [clip-path:polygon(0_0,calc(100%-1rem)_0,100%_50%,calc(100%-1rem)_100%,0_100%)]">
                    {/* Spacer to guarantee text is never hidden behind the left floating tag */}
                    <div className="w-16 sm:w-20 md:w-28 shrink-0"></div>
                    <div className="flex-1 pr-4 md:pr-8 pl-2">
                      <h3 className="font-bold text-sm md:text-xl uppercase tracking-wider mb-1">Mobile App</h3>
                      <p className="text-[10px] md:text-sm opacity-90 leading-snug line-clamp-5 sm:line-clamp-none">NayaFix is designed as a Progressive Web App (PWA). It works flawlessly on your phone and can even be added to your home screen like a native app.</p>
                    </div>
                    <div className="text-5xl md:text-7xl font-black opacity-30 mr-2 md:mr-8 font-mono tracking-tighter">06</div>
                  </div>

                  <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 filter drop-shadow-[4px_4px_4px_rgba(0,0,0,0.2)] dark:drop-shadow-[4px_4px_4px_rgba(0,0,0,0.5)]">
                    <div className="w-20 md:w-28 h-36 md:h-40 bg-white dark:bg-gray-800 flex flex-col items-center justify-center -skew-x-6 rounded-sm border border-gray-100 dark:border-gray-700">
                      <div className="skew-x-6 flex flex-col items-center">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-purple-100 dark:border-purple-900/30 flex items-center justify-center mb-2">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-[#6D28D9]"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>
                        </div>
                        <span className="text-[9px] md:text-[11px] font-bold text-gray-500 uppercase tracking-widest text-center">Mobile</span>
                      </div>
                    </div>
                  </div>
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
                <a href="/translation/german-to-english" className="btn btn-outline">German to English</a>
                <a href="/translation/english-to-german" className="btn btn-outline">English to German</a>
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
