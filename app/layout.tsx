import type { Metadata } from "next";
import { IoLogoWhatsapp } from "react-icons/io";
import { Geist, Geist_Mono } from "next/font/google";
import { CONTACT, SITE } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.URL),
  title: {
    default: SITE.TITLE,
    template: `%s | ${SITE.NAME}`,
  },
  applicationName: SITE.NAME,
  description:
    "Portafolio de Alejandro Baez — Web developer building modern apps with Next.js, React y Supabase.",
  keywords: [
    // Español
    "Alejandro Baez",
    "desarrollador web",
    "portafolio",
    "Next.js",
    "React",
    "TypeScript",
    "Supabase",
    "Tailwind CSS",
    // English
    "web developer",
    "portfolio",
    "JavaScript",
    "frontend",
    "backend",
    "Venezuela",
    "full-stack developer",
  ],
  authors: [{ name: SITE.AUTHOR }],
  creator: SITE.AUTHOR,
  publisher: SITE.NAME,
  generator: "Next.js",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    title: SITE.TITLE,
    description:
      "Portafolio de Alejandro Baez — Desarrollo web moderno con Next.js, React y Supabase.",
    url: "/",
    siteName: SITE.NAME,
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: SITE.NAME,
      },
    ],
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.TITLE,
    description:
      "Portafolio de Alejandro Baez — Desarrollo web moderno con Next.js, React y Supabase.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

// Viewport meta para un escalado correcto en móviles
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
} as const;

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.AUTHOR,
  url: SITE.URL,
  jobTitle: "Web Developer",
  description: "Venezuelan web developer specializing in Next.js, React, and Supabase",
  image: `${SITE.URL}/logo.png`,
  sameAs: [
    // Add social media profiles when available
  ],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Supabase",
    "Tailwind CSS",
    "Web Development",
    "Frontend Development",
    "Backend Development",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "VE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const waText = encodeURIComponent(CONTACT.WHATSAPP_MESSAGE.es);
  const waNumber = CONTACT.WHATSAPP.replace(/\D/g, "");
  const waUrl = `https://wa.me/${waNumber}?text=${waText}`;

  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Skip to main content
        </a>

        <main id="main-content">
          {children}
        </main>

        {/* WhatsApp floating button */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="fixed bottom-4 right-4 z-50 inline-flex items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 h-12 w-12 min-h-[44px] min-w-[44px]"
        >
          <IoLogoWhatsapp size={24} />
        </a>
      </body>
    </html>
  );
}
