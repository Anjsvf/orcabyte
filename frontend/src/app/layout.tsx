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
  title: "Ocabyte",
  description: "Gerador de orçamentos para programadores freelancers",
  keywords: ["orçamentos", "freelancer", "programação", "Ocabyte"],
  authors: [{ name: "Seu Nome", url: "" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Ocabyte",
    description: "Gerador de orçamentos para programadores freelancers",
    url: "https://ocabyte.com",
    siteName: "Ocabyte",
    images: [
      {
        url: "", 
        width: 800,
        height: 600,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ocabyte",
    description: "Gerador de orçamentos para programadores freelancers",
    images: [""],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
