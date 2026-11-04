import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope, Sora } from "next/font/google";
import "./globals.css";
import { AmbientBackdrop } from "@/components/branding/AmbientBackdrop";
import { SITE } from "@/lib/site";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "KNOW ME — Your Identity. Your Story. Your Connection.",
    template: "%s",
  },
  description:
    "KNOW ME is a centrally managed digital identity platform. One person. One profile. One link. One QR code. A complete digital identity. A product of M.A.R.J.E.N.E Software Development.",
  applicationName: "KNOW ME",
  authors: [{ name: "M.A.R.J.E.N.E Software Development" }],
  creator: "M.A.R.J.E.N.E Software Development",
  publisher: "M.A.R.J.E.N.E Software Development",
  keywords: [
    "KNOW ME",
    "digital identity",
    "personal profile",
    "QR profile",
    "digital business card",
    "M.A.R.J.E.N.E Software Development",
    "Arsene Kahunga",
    "Kampala",
    "Uganda",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "KNOW ME",
    title: "KNOW ME — Your Identity. Your Story. Your Connection.",
    description:
      "One person. One profile. One link. One QR code. A complete digital identity. A product of M.A.R.J.E.N.E Software Development.",
    url: "/",
    images: [
      {
        url: "/branding/og-arsene.jpg",
        width: 1200,
        height: 630,
        alt: "KNOW ME — Arsene Kahunga, Founder & Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KNOW ME — Your Identity. Your Story. Your Connection.",
    description:
      "One person. One profile. One link. One QR code. A complete digital identity.",
    images: ["/branding/og-arsene.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070a18",
  colorScheme: "light dark",
};

const themeScript = `(function(){try{var t=localStorage.getItem("know-me-theme");if(t!=="light"&&t!=="dark"){t="dark";}var d=document.documentElement;d.dataset.theme=t;d.style.colorScheme=t;}catch(e){document.documentElement.dataset.theme="dark";}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${sora.variable} ${manrope.variable} ${instrument.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <AmbientBackdrop />
        {children}
      </body>
    </html>
  );
}
