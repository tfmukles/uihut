import { getAuthor } from "@/actions/author";
import { auth } from "@/auth";
import Heading from "@/components/ui/title";
import SeoMeta from "@/partials/SeoMeta";
import { notFound } from "next/navigation";
import BankForm from "./_components/bank-info";

export default async function BankInfo() {
  const { user } = (await auth()) || {};

  const { data: author } = await getAuthor(user?.id!);

  // check if the user has access to this page
  const hasAccess = author?.status === "approved";

  if (!hasAccess) {
    notFound();
  }

  return (
    <>
      <SeoMeta title={"Author Products - Uihut"} />
      <section className="border-b border-border py-14 md:py-8">
        <div className="container-fluid">
          <Heading level="h3" variant={"gradient"}>
            Welcome, {user?.firstName} {user?.lastName}!
          </Heading>
        </div>
      </section>
      <section className="py-14 md:py-8">
        <div className="container-fluid">
          <div className="dark-gradient-bg relative mx-auto mb-8 w-full rounded-[20px] border border-border p-6 -tracking-[0.2px] sm:p-8">
            <BankForm />
          </div>
        </div>
      </section>
    </>
  );
}
