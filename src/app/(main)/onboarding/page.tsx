import { userPersona } from "@/actions/user-persona";
import { auth } from "@/auth";
import HeroBorder from "@/components/HeroBorder";
import { getListPage } from "@/lib/contentParser";
import { cn } from "@/lib/utils/shadcn";
import BlurSvg from "@/partials/BlurSvg";
import FloatingDot from "@/partials/FloatingDot";
import PageDots from "@/partials/PageDots";
import SeoMeta from "@/partials/SeoMeta";
import { redirect } from "next/navigation";
import OnboardingForm from "./_components/onboarding-form";
import { IOnboardingForm } from "./type";

const page = async () => {
  const { frontmatter: onboardingData } = getListPage<IOnboardingForm>(
    "onboarding/_index.md",
  );

  const { user } = (await auth()) || {};
  const persona = await userPersona(user?.id!);

  if (persona.data?.user_id) {
    redirect("/designs");
  }

  return (
    <>
      <PageDots />
      <SeoMeta title={"Onboarding"} noindex={true} />

      <section className="bg-gradient-gradient">
        <div className="relative overflow-hidden">
          <div
            className={cn(
              "container-md bg-gradient-b relative w-full pt-[126px] pb-10 max-lg:overflow-hidden",
            )}
          >
            <HeroBorder />
            <div
              className={
                "pointer-events-none absolute -bottom-[1.5px] left-0 z-1 h-[3px] w-full"
              }
            >
              <FloatingDot
                className="-translate-x-1/2 max-lg:hidden"
                shape={"default"}
                position="bottom-left"
              />

              <div className="pointer-events-none absolute top-0 bottom-0 left-1/2 w-[410px] max-w-full -translate-x-1/2 max-lg:hidden">
                <FloatingDot
                  className="-translate-x-px"
                  shape={"default"}
                  position="bottom-left"
                />

                <FloatingDot
                  className="translate-x-px"
                  shape={"default"}
                  position="bottom-right"
                />
              </div>

              <FloatingDot
                className="max-lg:hidden"
                shape={"default"}
                position="bottom-right"
              />
            </div>

            <div className="min-h-[calc(100vh_-_295px)]">
              <div className="border-border relative z-20 mx-auto w-full rounded-[16px] border bg-[#13172A] px-4 py-12 md:px-[59px] md:py-14 lg:max-w-[840px]">
                <OnboardingForm questions={onboardingData?.questions} />
              </div>
            </div>
          </div>

          <BlurSvg
            className="absolute top-96 left-0 aspect-square -translate-x-1/2 -translate-y-1/2 blur-[120px] max-lg:w-[120px]"
            width={240}
            height={240}
            viewBox="0 0 240 240"
            cy="120"
            cx="120"
            rx="120"
            ry="120"
            fill={"#B561EE"}
          />
          <BlurSvg
            className="absolute top-96 right-0 aspect-square translate-x-1/2 -translate-y-1/2 blur-[120px] max-lg:w-[120px]"
            width={240}
            height={240}
            viewBox="0 0 240 240"
            cx="120"
            cy="120"
            rx="120"
            ry="120"
            fill={"#B561EE"}
          />
        </div>
      </section>
    </>
  );
};

export default page;
