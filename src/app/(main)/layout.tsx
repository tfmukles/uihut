import BaseLayout from "@/layouts/BaseLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BaseLayout key={"main"}>
      <main>{children}</main>
    </BaseLayout>
  );
}
