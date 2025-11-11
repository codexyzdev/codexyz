import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: {
    default: "Codexyz.dev — Alejandro Baez",
    template: "%s | Codexyz.dev",
  },
  applicationName: "Codexyz.dev",
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
  ],
  authors: [{ name: "Alejandro Baez" }],
  creator: "Alejandro Baez",
  publisher: "Codexyz.dev",
  generator: "Next.js",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    title: "Codexyz.dev — Alejandro Baez",
    description:
      "Portafolio de Alejandro Baez — Desarrollo web moderno con Next.js, React y Supabase.",
    url: "/",
    siteName: "Codexyz.dev",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Codexyz.dev",
      },
    ],
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codexyz.dev — Alejandro Baez",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
