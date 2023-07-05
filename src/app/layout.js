import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { Noto_Sans } from "next/font/google";
import NextAuthSessionProvider from "@/providers/sessionProvider";
const notosans = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "500", "700", "900"],
});

export const metadata = {
  title: "Eduardo Orozco Mendoza Portfolio",
  description:
    "Explore a Senior Developer's portfolio, expert in Javascript, React, Next.js, Node.js, MongoDB, showcasing dynamic, scalable web applications",
  keywords:
    "Senior Developer, JavaScript, React, Next.js, Node.js, MongoDB, Web Development, Full Stack Development, Portfolio, Scalable Web Applications, Front-end Development, Back-end Development, Data Management",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },

  "apple-mobile-web-app-capable": "yes",
  fragment: "!",
  charset: "utf-8",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
