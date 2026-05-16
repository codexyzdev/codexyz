import type { Metadata } from "next";
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
  alternates: {
    canonical: SITE.URL,
  },
  description:
    "Desarrollador web especializado en Next.js, React y Supabase. Creo aplicaciones rápidas, accesibles y mantenibles para empresas y emprendedores.",
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
    "aplicaciones web",
    "desarrollo web moderno",
    // English
    "web developer",
    "portfolio",
    "JavaScript",
    "frontend",
    "backend",
    "Venezuela",
    "full-stack developer",
    "modern web apps",
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
      "Desarrollador web especializado en Next.js, React y Supabase. Creo aplicaciones rápidas, accesibles y mantenibles.",
    url: SITE.URL,
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
      "Desarrollador web especializado en Next.js, React y Supabase. Creo aplicaciones rápidas, accesibles y mantenibles.",
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
  description: "Desarrollador web especializado en Next.js, React y Supabase. Creo aplicaciones rápidas, accesibles y mantenibles.",
  image: `${SITE.URL}/logo.png`,
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
      </body>
    </html>
  );
}
