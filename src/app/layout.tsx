import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ResumeBuilder — Engineering LaTeX Workstation",
  description: "Deterministic LaTeX resume compilation with algorithmic ATS keyword evaluation.",
  icons: {
    icon: "/icon.svg",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
