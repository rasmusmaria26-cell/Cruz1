import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cruze Marine Service — Your Gateway to a Maritime Career",
  description:
    "Cruze Marine Service, Tuticorin. Expert guidance for Crew Manning, Marine College Admissions, STCW Course Bookings & Seafarer Passport services. Call +91 90033 54028.",
  keywords:
    "merchant navy, crew manning, marine college admission, STCW courses, seafarer passport, Tuticorin maritime consultancy",
  openGraph: {
    title: "Cruze Marine Service — Your Gateway to a Maritime Career",
    description:
      "Professional maritime consultancy in Tuticorin. Crew Manning, College Admissions, STCW Bookings & Passport services.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#060e1a" />
      </head>
      <body className={`${outfit.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
