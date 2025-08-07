import { Toaster } from "@/components/ui/sonner";
import TwSizeIndicator from "@/helpers/TwSizeIndicator";
import Header from "@/partials/Header";
import Providers from "@/partials/Providers";
import { SessionProvider } from "next-auth/react";
import Sidebar from "./_components/Sidebar";

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Providers>
        <TwSizeIndicator />
        <Toaster theme="dark" />
        <Header hideMenu />
        <div className="relative flex">
          <Sidebar />
          <div className="flex-1">{children}</div>
        </div>
      </Providers>
    </SessionProvider>
  );
}
