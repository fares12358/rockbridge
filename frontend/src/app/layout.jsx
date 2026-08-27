import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LanguageProvider from "./providers/LanguageProvider";
import { AppContextProvider } from "./context/contextApi";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  // 🔹 Basic SEO
  title: {
    default: "ROCK BRIDGE | Import & Export Solutions",
    template: "%s | ROCK BRIDGE",
  },
  description:
    "ROCK BRIDGE provides world-class import, export, and commercial mediation services with reliability, transparency, and speed. We connect your business to global markets with confidence.",
  // 🔹 Author & Publisher Info
  
  creator: "fares mohamed",
  publisher: "ROCK BRIDGE",
  keywords: [
    "ROCK BRIDGE",
    "Import and Export",
    "Commercial Mediation",
    "Trade Services",
    "Saudi Arabia",
    "Business Logistics",
    "Global Trade",
    "Shipping",
    "Procurement",
    "Inspection Services",
  ],

  // 🔹 Open Graph (for social media previews)
  openGraph: {
    title: "ROCK BRIDGE – Import & Export Solutions",
    description:
      "Connecting your business to the world through reliable import, export, and mediation services from Saudi Arabia.",
    url: "https://rockbridge.store",
    siteName: "ROCK BRIDGE",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "ROCK BRIDGE - Import & Export Solutions",
      },
    ],
  },

  // 🔹 Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "ROCK BRIDGE – Import & Export Solutions",
    description:
      "Reliable import, export, and commercial mediation services – connecting your business to global markets.",
    creator: "fares mohamed",
    images: ["/images/logo.png"],
  },

  // 🔹 Robots & Canonical
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  alternates: {
    canonical: "https://rockbridge.store",
  },

  authors: [
    { name: "fares mohamed", url: "https://fares-dev.com" },
    { name: "fares mohamed" }
  ],

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/images/logo.png", sizes: "192x192", type: "image/png" },
      { url: "/images/logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/images/logo.png", sizes: "180x180" },
    ],
  },

  // 🔹 Theme and viewport

  // 🔹 Misc
  metadataBase: new URL("https://rockbridge.store"),
  category: "Business & Trade",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppContextProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
