import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DeliveryProvider } from "@/context/DeliveryContext";
import { AuthProvider } from "@/context/AuthContext";
import DeliveryStatusWidget from "@/components/delivery/DeliveryStatusWidget";
import GlobalNotificationPopup from "@/components/common/GlobalNotificationPopup";

export const metadata: Metadata = {
  title: "CampusMart - Student Marketplace",
  description: "Buy and sell safely on your campus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-poppins antialiased bg-bgmain flex flex-col min-h-screen text-textprimary">
        <AuthProvider>
          <DeliveryProvider>
            <TopBar />
            <Header />
            <div className="flex-grow">
              {children}
            </div>
            <DeliveryStatusWidget />
            <GlobalNotificationPopup />
            <Footer />
          </DeliveryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
