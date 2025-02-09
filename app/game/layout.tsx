
import { Geist, Geist_Mono } from "next/font/google";
import "./../globals.css";
import { GameProvider } from "@/context/GameContext";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Toaster position="top-center" />
            <GameProvider>
                {children}
            </GameProvider>
        </>
    );
}
