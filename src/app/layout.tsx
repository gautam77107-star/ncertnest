import "./globals.css";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "NCERT Nest — Notes & Solutions for Classes 6–12",
  description: "Understand every chapter with simple notes, step-by-step solutions, video lessons, and revision resources for Classes 6 to 12.",
  openGraph: {
    title: "NCERT Nest — Notes & Solutions for Classes 6–12",
    description: "Understand every chapter with simple notes, step-by-step solutions, video lessons, and revision resources.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}