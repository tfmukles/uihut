import TwSizeIndicator from "@/helpers/TwSizeIndicator";
import Footer from "@/partials/Footer";
import Header from "@/partials/Header";
import Providers from "@/partials/Providers";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import CookieConsent from "./components/CookieConsent";
import DealPopup from "./components/DealPopup";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Providers>
        <TwSizeIndicator />
        <Toaster theme="dark" />
        <Header />
        <DealPopup />
        {/* <MinihutPopup />
        <MinihutUpgradePopup /> */}
        {children}
        <CookieConsent />
        <Footer />
      </Providers>
    </SessionProvider>
  );
}
