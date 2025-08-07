import { getAuthor } from "@/actions/author";
import { auth } from "@/auth";
import BoxLayout from "@/partials/BoxLayout";
import SeoMeta from "@/partials/SeoMeta";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import AuthorFaq from "./_components/AuthorFaq";
import OnboardingSteps from "./_components/OnboardingSteps";

export default async function AuthorProfile() {
  const { user } = (await auth()) || {};
  const { data: author } = await getAuthor(user?.id!);
  const status = author?.status;

  // if status approved, then redirect to dashboard
  if (status === "approved") {
    return redirect("/author/dashboard");
  }

  return (
    <>
      <SeoMeta title="Author" />
      <BoxLayout
        headerTitle="Partner with UIHut"
        headerDescription="Get paid for your design."
        disableBgStars
      >
        <section>
          <div className="container">
            <div className="row justify-center">
              <div className="xl:col-8">
                <div className="dark-gradient-bg relative mx-auto mb-20 w-full rounded-[20px] border border-border p-6 -tracking-[0.2px] sm:p-8">
                  <Suspense>
                    <OnboardingSteps status={status} />
                  </Suspense>
                </div>
              </div>
              <div className="xl:col-10">
                <AuthorFaq />
              </div>
            </div>
          </div>
        </section>
      </BoxLayout>
    </>
  );
}
