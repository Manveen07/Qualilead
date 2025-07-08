import type { Metadata } from "next";
import "./globals.css";
// app/layout.tsx or app/providers.tsx (whichever wraps your layout)
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "QualiLead - AI-Powered Lead Scoring",
  description: "Your AI-powered lead scoring for Startups.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
