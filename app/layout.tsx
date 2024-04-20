import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "@/styles/globals.css"
import { Montserrat as FontSans } from "next/font/google"
import { Toaster } from "react-hot-toast";

import { cn } from "@/lib/utils"
import { Session } from "inspector";
import { SessionProvider } from "next-auth/react";
import Provider from "@/components/Provider";
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
 

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.APP_NAME,
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
      <Toaster position="top-right" />
      <Provider>

      {children}
      </Provider>

        </body>
    </html>
  );
}
