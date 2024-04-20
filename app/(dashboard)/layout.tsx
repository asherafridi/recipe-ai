"use client"
import { Montserrat } from "next/font/google";
import { Suspense, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import './app.css';
import nextAuth, { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";

const fontSans = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [sidebar, setSidebar] = useState('dashboard');
    return (
        <div className={fontSans.className}>
            <div className="main flex">
                <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
                <div className="wrapper w-full">
                    <Navbar />
                    <div className="p-5">
                        {children}
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
