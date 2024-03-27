import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Noto_Sans } from "next/font/google";
import NextAuthSessionProvider from "@/providers/sessionProvider";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import QCProvider from "@/config/QCProvider";
const notosans = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "500", "700", "900"],
});
import { SpeedInsights } from "@vercel/speed-insights/next";
export const viewport = {
  width: "device-width",
  initialScale: 1,
};
export const metadata = {
  title: "Eduardo Orozco Mendoza Portfolio",
  description:
    "Explore a Senior Developer's portfolio, expert in Javascript, React, Next.js, Node.js, MongoDB, showcasing dynamic, scalable web applications",
  keywords:
    "Eduardo Orozco, Orozcorp, Senior Developer, JavaScript, React, Next.js, Node.js, MongoDB, Web Development, Full Stack Development, Portfolio, Scalable Web Applications, Front-end Development, Back-end Development, Data Management",

  "apple-mobile-web-app-capable": "yes",
  fragment: "!",
  charset: "utf-8",
  "og:image": "https://orozcorp.live/api/og",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="G-YJ1328V7SY" />
      <body>
        <QCProvider>
          <NextAuthSessionProvider>
            <main
              style={{
                display: "flex",
                flexFlow: "column nowrap",
                minHeight: "100vh",
              }}
              className={notosans.className}
            >
              <Navbar />
              <div style={{ flex: 1 }}>{children}</div>
              <Footer />
            </main>
            <Toaster />
          </NextAuthSessionProvider>
        </QCProvider>
        <SpeedInsights />
      </body>

      <GoogleAnalytics gaId="G-YJ1328V7SY" />
    </html>
  );
}
