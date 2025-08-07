import BoxLayout from "@/partials/BoxLayout";
import SeoMeta from "@/partials/SeoMeta";

export default function DashboardTicketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SeoMeta title="Support Tickets" />
      <BoxLayout
        headerTitle="Support Tickets"
        headerDescription="Contact with Support agents & view all support history"
        disableBgStars
      >
        <section>
          <div className="container">
            <div className="row justify-center">
              <div className="xl:col-10">
                <div className="dark-gradient-bg rounded-[20px] border border-border p-6 sm:p-8">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </section>
      </BoxLayout>
    </>
  );
}
