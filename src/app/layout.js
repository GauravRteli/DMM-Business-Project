import Footer from "@/app/components/Footer";
import Logobar from "@/app/components/Logobar";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DMM : Service WebApp",
  description: "Web Application for the services of the business !",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body
        className={`backdrop-blur-md ${inter.className} bg-slate-300 w-full md:w-10/12 m-auto `}
      >
        <Logobar />
        {children}
        <Footer />
        <Script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js" />
      </body>
    </html>
  );
}
