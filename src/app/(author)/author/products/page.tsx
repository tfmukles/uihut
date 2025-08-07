import { getAuthor } from "@/actions/author";
import { getAuthorDesigns } from "@/actions/author-design";
import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Heading from "@/components/ui/title";
import dateFormat from "@/lib/utils/dateFormat";
import SeoMeta from "@/partials/SeoMeta";
import { notFound } from "next/navigation";

export default async function AuthorProducts() {
  const { user } = (await auth()) || {};
  const { data: authorDesigns } = await getAuthorDesigns(user?.id!);

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
          <div className="dark-gradient-bg relative mx-auto mb-8 w-full border-collapse rounded-[20px] border border-border p-6 -tracking-[0.2px] sm:p-8">
            <Heading className="mb-6 sm:mb-8" level="h4">
              All Products
            </Heading>

            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap text-base text-text">
                    Name
                  </TableHead>
                  <TableHead className="whitespace-nowrap text-base text-text">
                    Submitted On
                  </TableHead>
                  <TableHead className="whitespace-nowrap text-base text-text">
                    Price
                  </TableHead>
                  <TableHead className="text-right text-base text-text">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {authorDesigns?.map((item, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell className="capitalize">{item.title}</TableCell>
                      <TableCell>{dateFormat(item.createdAt)}</TableCell>
                      <TableCell>{item.price || 0}TK</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            item.status === "approved"
                              ? "success"
                              : item.status === "rejected"
                                ? "destructive"
                                : "warning"
                          }
                          className="capitalize"
                        >
                          {item.status}
                        </Badge>
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
