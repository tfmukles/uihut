import BaseLayout from "@/layouts/BaseLayout";
import PartneroSignup from "./_components/PartneroSignup";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BaseLayout key={"auth"}>
      <PartneroSignup />
      <main>{children}</main>
    </BaseLayout>
  );
}
