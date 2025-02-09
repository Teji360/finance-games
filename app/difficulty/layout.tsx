import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../globals.css";
import { GameProvider } from "@/context/GameContext";
import Header from "../components/Header";

export const metadata: Metadata = {
    title: "Difficulty Selection",
    description: "Select your difficulty",
};

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function DifficultyLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <GameProvider>
                    <Header />
                    {children}
                </GameProvider>
            </body>
        </html>
    );
}
