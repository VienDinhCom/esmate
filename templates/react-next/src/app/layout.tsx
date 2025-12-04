import { Manrope } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { Toaster } from "@esmate/shadcn/pkgs/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "ESMate React Next",
  description: "Get started quickly with Next.js, Postgres, and Stripe.",
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`bg-white text-black dark:bg-gray-950 dark:text-white ${manrope.className}`}>
      <body className="min-h-[100dvh] bg-gray-50">
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
