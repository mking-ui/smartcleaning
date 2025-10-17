import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
// ✅ Load your local fonts
const outfit = localFont({
  src: [
    {
      path: "../public/fonts/Outfit-regular.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Outfit-Medium.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Outfit-Bold.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap", // improves font rendering
  fallback: ["Inter","sans-serif"], // ✅ Fallback fonts
  
});


export const metadata = {
  title: "SmartCleaning - Assigning Task",
  description: "Smart cleaning task assignment and tracking system ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased text-gray-700`} >

        <SessionProviderWrapper>
          <Toaster />

          {children}
        </SessionProviderWrapper>



      </body>
    </html>
  );
}
