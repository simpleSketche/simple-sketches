import type { Metadata } from "next";
import "./globals.css";
import StatsMonitor from "@/components/StatsMonitor";

export const metadata: Metadata = {
  title: "Simple Sketches",
  description: "A creative web experience with Three.js and GSAP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StatsMonitor />
        {children}
      </body>
    </html>
  );
}
