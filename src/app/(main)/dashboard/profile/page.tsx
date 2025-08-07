import { getUserDetails } from "@/actions/user";
import { auth } from "@/auth";
import BoxLayout from "@/partials/BoxLayout";
import SeoMeta from "@/partials/SeoMeta";
import UpdatePassword from "./_components/UpdatePassword";
import UpdateProfile from "./_components/UpdateProfile";

export default async function ProfileSettings() {
  const { user } = (await auth()) || {};
  const { data: userDetails } = await getUserDetails(user?.id!);

  return (
    <>
      <SeoMeta title="Profile Settings" />
      <BoxLayout
        headerTitle="Profile Settings"
        headerDescription="Update your profile information"
        disableBgStars
      >
        <section>
          <div className="container">
            <div className="row justify-center">
              <div className="xl:col-10">
                <UpdateProfile {...userDetails!} key={userDetails as any} />
                <UpdatePassword />
              </div>
            </div>
          </div>
        </section>
      </BoxLayout>
    </>
  );
}
