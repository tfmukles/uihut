import { getOrders } from "@/actions/order";
import { getTeam, getTeamByMemberId } from "@/actions/team";
import { auth } from "@/auth";
import Heading from "@/components/ui/title";
import { getCurrentPlan } from "@/lib/utils/planFinder";
import BoxLayout from "@/partials/BoxLayout";
import SeoMeta from "@/partials/SeoMeta";
import AddMember from "./_components/AddMember";
import MemberList from "./_components/MemberList";
import TeamPart from "./_components/TeamPart";

export default async function Member() {
  const { user } = (await auth()) || {};
  const { data: team } = await getTeam(user?.id!);
  const { data: teamPart } = await getTeamByMemberId(user?.id!);
  const { data: orders } = await getOrders(user?.id!);
  const currentPlan = getCurrentPlan(orders);
  const hasAccess =
    currentPlan?.includes("team") || currentPlan?.includes("b2b");

  return (
    <>
      <SeoMeta title="Team Members" />
      <BoxLayout
        headerTitle="Team Members"
        headerDescription="View your team members"
        disableBgStars
      >
        <section>
          <div className="container">
            <div className="mx-auto max-w-[725px]">
              <div className="dark-gradient-bg relative mx-auto mb-8 w-full rounded-[20px] border border-border px-6 py-9 -tracking-[0.2px]">
                <TeamPart team={teamPart} />
                {hasAccess ? (
                  <div className="space-y-6 sm:space-y-8">
                    <MemberList members={team?.members || []} />
                    <AddMember />
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <Heading className="mb-4" level="h3">
                      You Don't Have Access To Add Members
                    </Heading>
                    <p>Please upgrade your package to create your own team</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </BoxLayout>
    </>
  );
}
