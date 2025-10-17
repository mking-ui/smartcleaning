import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
// ✅ Load your local fonts



const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })
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
