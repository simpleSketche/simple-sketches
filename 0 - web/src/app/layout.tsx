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
      <head>
        {/* three.js r182 reads this WebGPU constant while its module loads, and throws in browsers
            that do not define it (no WebGPU, or a page not served securely) before it can fall
            back to WebGL2. It has to exist before any sketch is imported. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "self.GPUShaderStage = self.GPUShaderStage || { VERTEX: 1, FRAGMENT: 2, COMPUTE: 4 };",
          }}
        />
      </head>
      <body>
        <StatsMonitor />
        {children}
      </body>
    </html>
  );
}
