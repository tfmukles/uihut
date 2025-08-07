"use client";

import { TTeam } from "@/actions/team/types";
import Heading from "@/components/ui/title";
import { titleify } from "@/lib/utils/textConverter";

const TeamPart = ({
  team,
}: {
  team: Omit<TTeam & { owner: any }, "variables"> | null;
}) => {
  return (
    <>
      {team?.owner_id && (
        <div className="dark-gradient-bg relative mx-auto mb-6 w-full rounded-[20px] border border-border p-6 -tracking-[0.2px]">
          <Heading className="mb-6" level="h4" variant="gradient">
            Your Team
          </Heading>
          <p>
            You're a member of <strong>{team?.owner.first_name}'s</strong> team,
            and your package is <strong>{titleify(team?.package!)}</strong>.
          </p>
        </div>
      )}
    </>
  );
};

export default TeamPart;
