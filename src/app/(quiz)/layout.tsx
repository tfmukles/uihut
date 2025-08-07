import { Toaster } from "@/components/ui/sonner";
import Providers from "@/partials/Providers";
import { SessionProvider } from "next-auth/react";

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Toaster theme="dark" />
      <Providers>
        <main>{children}</main>
      </Providers>
    </SessionProvider>
  );
}
