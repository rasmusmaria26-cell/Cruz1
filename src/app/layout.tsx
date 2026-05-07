import type { Metadata, Viewport } from "next";
import { Playfair_Display, Source_Serif_4, Outfit } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cruze Marine Service — Your Gateway to a Maritime Career",
  description:
    "Expert maritime consultancy in Tuticorin. Crew Manning, Marine College Admissions, STCW Course Bookings & Seafarer Passport services. Call +91 90033 54028.",
  keywords:
    "merchant navy, crew manning, marine college admission, STCW courses, seafarer passport, Tuticorin maritime consultancy, Cruze Marine",
  openGraph: {
    title: "Cruze Marine Service — Your Gateway to a Maritime Career",
    description:
      "Professional maritime consultancy in Tuticorin. Crew Manning, College Admissions, STCW Bookings & Passport services.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0c0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${playfair.variable} ${sourceSerif.variable} ${outfit.variable} antialiased bg-[var(--bg-ink)] text-[var(--ivory)] overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
