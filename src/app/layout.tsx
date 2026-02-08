import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohit Rawat | UI/UX & Product Designer",
  description: "Portfolio of Mohit Rawat, a UI/UX and Product Designer specializing in creating user-friendly digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-black text-white selection:bg-red-600 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
