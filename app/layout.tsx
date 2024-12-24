''
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { CharactersFavoriteModal } from "@/components/characters/favorite-modal";
import LoginButtons from "@/components/auth/buttons";
import Search from "@/components/search";
import { ComicsFavoriteModal } from "@/components/comics/favorite-modal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marvel Comics Explorer",
  description: "Explore Marvel Comics and manage your favorites",
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
          <div className="min-h-screen bg-marvel-light">
            <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm border-b shadow-sm">
              <div className="container mx-auto px-4 py-2 sm:py-4">
                <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row items-center justify-between">
                  <h1 className="text-xl sm:text-2xl font-bold text-marvel-dark">
                    Marvel Comics
                  </h1>
                  
                  <div className="w-full sm:w-auto max-w-md">
                    <Search />
                  </div>
                  
                  <div className="flex flex-col lg:flex-row items-center gap-2 sm:gap-4">
                    <ComicsFavoriteModal />
                    <CharactersFavoriteModal />
                    <LoginButtons />
                  </div>
                </div>
              </div>
            </header>

            <main className="flex-1">
              {children}
            </main>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}