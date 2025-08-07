"use client";

import { removeTeamMember } from "@/actions/team";
import { TMember } from "@/actions/team/types";
import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/title";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const MemberList = ({ members }: { members: TMember[] }) => {
  const { data: session } = useSession();

  const handleDelete = async (member_email: string) => {
    if (session) {
      const res = await removeTeamMember(session.user.id!, member_email);
      if (res.statusCode === 200) {
        toast.success("Member removed successfully");
      }
    }
  };

  return (
    <>
      {members.length > 0 && (
        <div className="dark-gradient-bg relative mx-auto w-full rounded-[20px] border border-border -tracking-[0.2px]">
          <Heading
            className="border-b border-border px-8 py-6"
            level="h4"
            variant="gradient"
          >
            Team Members
          </Heading>
          <div className="[&>div:not(:last-child)]:dark-gradient-bg [&>div:not(:last-child)]:border-b [&>div:not(:last-child)]:border-border">
            {members?.map((member: TMember) => (
              <div
                key={member.user_id}
                className={`relative flex flex-none items-center justify-between px-3 py-4 md:px-8`}
              >
                <div className="flex max-w-[calc(100%_-_50px)] flex-shrink items-center md:space-x-5">
                  <div className="dark-gradient-bg relative hidden h-10 w-10 flex-none items-center justify-center rounded-full border border-border md:flex">
                    <Avatar src="" email={member.email} alt="user" />
                  </div>
                  <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    {member.email}
                  </p>
                </div>

                <Button
                  size={"icon"}
                  onClick={() => handleDelete(member.email)}
                  variant={"outline"}
                  className="h-8 w-8 flex-none"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MemberList;
