import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "nayafix.me — Roman Urdu to Urdu Converter | اردو کنورٹر",
  description:
    "Roman Urdu ko khoobsoorat Nastaliq Urdu script mein convert karein — bilkul sahih aur ek second mein. nayafix.me ka free online Urdu converter tool.",
  keywords: [
    "Roman Urdu to Urdu",
    "Urdu converter",
    "Roman Urdu translator",
    "Nastaliq Urdu",
    "اردو کنورٹر",
    "رومن اردو",
    "nayafix.me",
    "roman urdu",
    "urdu script",
    "urdu typing",
  ],
  authors: [{ name: "nayafix.me", url: "https://nayafix.me" }],
  creator: "nayafix.me",
  publisher: "nayafix.me",
  metadataBase: new URL("https://nayafix.me"),
  openGraph: {
    title: "nayafix.me — Roman Urdu to Urdu Converter | رومن اردو سے اردو",
    description:
      "Roman Urdu ko Nastaliq Urdu script mein convert karein — fast, accurate, free. File upload, Quote Maker, aur bohat kuch.",
    url: "https://nayafix.me",
    siteName: "nayafix.me",
    locale: "ur_PK",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "nayafix.me — Roman Urdu to Nastaliq Urdu Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "nayafix.me — Roman Urdu to Urdu Converter",
    description:
      "Roman Urdu ko Nastaliq Urdu script mein convert karein — fast, accurate, free.",
    images: ["/og-image.png"],
    creator: "@nayafix",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-PK" dir="auto" data-theme="light" suppressHydrationWarning>
      <head>
        {/* Instant theme load — runs before paint to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('nayafix-theme')||'light';document.documentElement.setAttribute('data-theme',t)}catch(e){}` }} />
        {/* Noto Nastaliq Urdu — RTL Urdu display font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#6366f1" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#4f46e5" media="(prefers-color-scheme: dark)" />
        {/* Apple mobile web app */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="nayafix.me" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
        
        {/* Google Analytics */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=G-9RQTST586F`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9RQTST586F');
          `}
        </Script>
      </body>
    </html>
  );
}
