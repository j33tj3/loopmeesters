import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/layout/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Loopmeesters - Ben erbij",
  description: "Samen hardlopen is leuker",
  openGraph: {
    title: "Loopmeesters - Ben erbij",
    description: "Samen hardlopen is leuker",
    url: process.env.BEN_ERBIJ_BASE_URL,
    siteName: "Loopmeesters - Ben-erbij",
    images: [
      {
        url: `${process.env.BEN_ERBIJ_BASE_URL}og.png`,
        width: 320,
        height: 240,
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
};

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
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
