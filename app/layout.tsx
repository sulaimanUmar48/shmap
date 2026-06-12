import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SideBar } from "@/components/SideBar/SideBar";
import { AuthProvider } from "@/lib/auth/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shmap",
  description: "A shift scheduling app for your daily company needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-dvh max-h-dvh w-full max-w-full">
        
        {/* App Container */}
        <div className="h-full max-h-full w-full max-w-full bg-accent-one text-text-main flex gap-1 p-1" >  
          <AuthProvider>
            <div className="w-40 h-full max-h-full">
              <SideBar />
            </div>
            <main className="h-full max-h-full max-w-[calc(100%-160px)] w-[calc(100%-160px)] bg-background rounded">
              {children}
            </main>
          </AuthProvider>
        </div>
        
      </body>
    </html>
  );
}
