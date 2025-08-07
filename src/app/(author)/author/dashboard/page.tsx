import { getAuthor } from "@/actions/author";
import { getAuthorDesigns } from "@/actions/author-design";
import {
  getDesignPipelineByAuthor,
  getDesignPipelines,
} from "@/actions/design-pipeline";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Heading from "@/components/ui/title";
import FloatingDot from "@/partials/FloatingDot";
import SeoMeta from "@/partials/SeoMeta";
import { BadgeCheck, BadgeDollarSign } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import DesignRequirement from "./_components/DesignRequirement";

export default async function AuthorDashboard() {
  const { user } = (await auth()) || {};
  const { data: author } = await getAuthor(user?.id!);
  const { data: authorDesigns } = await getAuthorDesigns(user?.id!);
  const { data: designPipeline } = await getDesignPipelines();
  const { data: designPipelineByAuthor } = await getDesignPipelineByAuthor(
    user?.id!,
  );

  const excludedStatus = ["open", "completed", "rejected"];
  const ongoingProject = designPipelineByAuthor?.filter(
    (pipeline) => !excludedStatus.includes(pipeline.status),
  );

  const mapPipeline =
    ongoingProject?.length! > 0 ? ongoingProject : designPipeline;

  const authorData = [
    {
      title: "Balance",
      quantity: Number(author?.earnings! - author?.withdrawals! || 0) + " TK",
      icon: BadgeDollarSign,
    },
    {
      title: "Earnings",
      quantity: Number(author?.earnings! || 0) + " TK",
      icon: BadgeDollarSign,
    },
    {
      title: "Withdrawals",
      quantity: Number(author?.withdrawals! || 0) + " TK",
      icon: BadgeDollarSign,
    },
    {
      title: "Projects",
      quantity: authorDesigns?.length || 0,
      icon: BadgeCheck,
    },
  ];

  // check if the user has access to this page
  const hasAccess = author?.status === "approved";

  if (!hasAccess) {
    notFound();
  }

  return (
    <>
      <SeoMeta title={"Author Dashboard - Uihut"} />
      <section className="border-border border-b py-14 md:py-8">
        <div className="container-fluid">
          <Heading level="h3" variant={"gradient"}>
            Welcome, {user?.firstName} {user?.lastName}!
          </Heading>
        </div>
      </section>
      <section>
        <div className="relative grid md:grid-cols-2 lg:grid-cols-4 [&>div:nth-child(odd)]:sm:max-md:border-l-0">
          {authorData.map((item, i) => {
            return (
              <div
                className="border-border relative flex items-center gap-3 border-r border-b p-4 max-md:border-r max-md:border-b max-sm:flex-col max-sm:text-center lg:gap-5 lg:p-6 xl:px-[30px]"
                key={i}
              >
                <FloatingDot
                  position="top-left"
                  className="-top-[1.5px] -left-[1.5px] max-md:hidden"
                />
                <FloatingDot
                  position="bottom-left"
                  className="-bottom-[1.5px] -left-[1.5px] max-md:hidden"
                />
                <div className="bg-gradient-135 text-foreground flex size-14 items-center justify-center rounded-full border border-[#3A3F51] from-[#1A1F34] to-[#0A0E1E]">
                  <item.icon className="h-6 w-6 flex-shrink-0" />
                </div>
                <div>
                  <span className="text-muted-foreground text-xs tracking-[2.2px] uppercase">
                    {item.title}
                  </span>
                  <span className="text-text mt-1 block text-lg font-medium">
                    {item.quantity}
                  </span>
                </div>
                <FloatingDot
                  position="top-right"
                  className="-top-[1.5px] -right-[1.5px] max-md:hidden"
                />
                <FloatingDot
                  position="bottom-right"
                  className="-right-[1.5px] -bottom-[1.5px] max-md:hidden"
                />
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-14 md:py-8">
        <div className="container-fluid">
          <div className="dark-gradient-bg border-border relative mx-auto mb-8 w-full border-collapse rounded-[20px] border p-6 -tracking-[0.2px] sm:p-8">
            <Heading className="mb-6 sm:mb-8" level="h4">
              {ongoingProject?.length! > 0
                ? "You are currently working on these project"
                : "Products Needed"}
            </Heading>

            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-text text-base whitespace-nowrap">
                    Name
                  </TableHead>
                  <TableHead className="text-text text-base whitespace-nowrap">
                    Categories
                  </TableHead>
                  <TableHead className="text-text text-right text-base">
                    Details
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {mapPipeline?.map((item, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell className="capitalize">
                        {item.sub_category}
                      </TableCell>
                      <TableCell className="text-right">
                        {ongoingProject?.length! > 0 ? (
                          <Button size={"sm"} variant={"outline"}>
                            <Link href={"/author/ongoing-project"}>View</Link>
                          </Button>
                        ) : (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size={"sm"} variant={"outline"}>
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="border-border max-h-screen max-w-4xl overflow-auto rounded-lg border p-6 lg:max-h-[calc(100vh_-_86px)]">
                              <DesignRequirement
                                pipelineId={item.pipeline_id}
                              />
                            </DialogContent>
                          </Dialog>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </>
  );
}
