import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DrawSync",
  description:
    "DrawSync is a collaborative whiteboard for teams to brainstorm and collaborate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black overflow-x-hidden`}
      >
        {/* <div className="absolute z-[-10] top-[-370px] left-30 w-[200px] h-[1000px] rounded-full rotate-[-35deg] bg-radial from-blue-800 to-black opacity-30 blur-lg "></div> */}
        {/* <div className="absolute z-[-10] top-[300px] right-0 w-[200px] h-[1000px] rounded-full rotate-[40deg] bg-radial from-blue-800 to-black opacity-30 blur-lg "></div> */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
