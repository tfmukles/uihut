import { getDownloadHistory } from "@/actions/downloads";
import { auth } from "@/auth";
import BoxLayout from "@/partials/BoxLayout";
import SeoMeta from "@/partials/SeoMeta";
import DownloadFilter from "./_components/DownloadFilter";

export default async function Downloads() {
  const { user } = (await auth()) || {};
  const { data: downloadHistory } = await getDownloadHistory(user?.id!);

  return (
    <>
      <SeoMeta title="Download History" />
      <BoxLayout
        headerTitle="Download History"
        headerDescription="View your download history"
        disableBgStars
      >
        <section>
          <div className="container">
            <div className="row justify-center">
              <div className="xl:col-10">
                <DownloadFilter allDownloads={downloadHistory} />
              </div>
            </div>
          </div>
        </section>
      </BoxLayout>
    </>
  );
}
