import { getOrders } from "@/actions/order";
import { auth } from "@/auth";
import Assistant from "@/components/Assistant";
import { Button, CustomLink } from "@/components/ui/button";
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
import { getCurrentPlanDetails } from "@/lib/utils/planFinder";
import { titleify } from "@/lib/utils/textConverter";
import BoxLayout from "@/partials/BoxLayout";
import SeoMeta from "@/partials/SeoMeta";
import Link from "next/link";
import CancelSubscription from "./_components/CancelSubscription";
import UpdatePayment from "./_components/UpdatePayment";

export default async function Billing() {
  const { user } = (await auth()) || {};
  const { data: orders } = await getOrders(user?.id!);
  const currentPlan = getCurrentPlanDetails(orders);

  // get all payments
  const allPaymentsWithPackage =
    orders?.flatMap((item: { payments: any[]; package: any }) =>
      item.payments.map((payment: any) => ({
        ...payment,
        package: item.package,
      })),
    ) || [];

  // get next day date
  const getNextDate = (dateStr: any) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date.toISOString();
  };

  return (
    <>
      <SeoMeta title="Billing" />
      <Assistant enable />

      <BoxLayout
        headerTitle="Billing"
        headerDescription="Billing information"
        disableBgStars
      >
        <section>
          <div className="container">
            <div className="row justify-center">
              <div className="xl:col-10">
                {/* My subscription */}
                <div className="dark-gradient-bg border-border relative mx-auto mb-8 w-full rounded-[20px] border p-6 -tracking-[0.2px] sm:p-8">
                  <Heading className="mb-6 sm:mb-8" level="h3">
                    My subscription
                  </Heading>
                  <div className="space-y-6 sm:space-y-8">
                    <div className="dark-gradient-bg border-border relative mx-auto w-full rounded-xl border p-6 -tracking-[0.2px] sm:p-8">
                      <div className="mb-8 space-y-2">
                        <Heading className="mb-2" level="h4">
                          Current Plan
                        </Heading>
                        <p>
                          {currentPlan?.package
                            ? titleify(currentPlan?.package)
                            : "Free"}
                        </p>
                        {currentPlan?.expires_date &&
                          currentPlan?.expires_date !== "never" && (
                            <p>
                              Your plan will expire on{" "}
                              {dateFormat(currentPlan?.expires_date)}
                            </p>
                          )}
                        {currentPlan?.package !== "minihut" &&
                          currentPlan?.expires_date &&
                          currentPlan?.expires_date !== "never" &&
                          currentPlan?.status === "active" && (
                            <>
                              <p className="text-foreground">
                                Next payment on{" "}
                                {dateFormat(
                                  getNextDate(currentPlan?.expires_date),
                                )}
                              </p>
                            </>
                          )}
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        {currentPlan?.package !== "minihut" &&
                          currentPlan?.expires_date !== "never" &&
                          currentPlan?.status === "active" && (
                            <>
                              <CancelSubscription
                                subscription_id={currentPlan?.subscription_id}
                              />
                              <UpdatePayment
                                subscription_id={currentPlan?.subscription_id}
                              />
                            </>
                          )}
                      </div>
                    </div>

                    {/* upgrade from regular package */}
                    {currentPlan &&
                      currentPlan.package !== "team-lifetime" &&
                      currentPlan.package !== "minihut" && (
                        <div className="dark-gradient-bg border-border relative mx-auto w-full rounded-xl border p-6 -tracking-[0.2px] sm:p-8">
                          <div className="mb-8 space-y-2">
                            <Heading className="mb-2" level="h4">
                              Upgrade
                            </Heading>
                            <p>Want to upgrade your current plan?</p>
                          </div>
                          <CustomLink
                            className="h-10 rounded-full"
                            href="/pricing"
                            size="lg"
                          >
                            Upgrade Now
                          </CustomLink>
                        </div>
                      )}

                    {/* upgrade from minihut */}
                    {currentPlan && currentPlan.package === "minihut" && (
                      <div className="dark-gradient-bg border-border relative mx-auto w-full rounded-xl border p-6 -tracking-[0.2px] sm:p-8">
                        <div className="mb-8">
                          <Heading className="mb-2" level="h4">
                            Upgrade to a Lifetime Package
                          </Heading>
                          <p className="text-text-light">
                            As a Minihut subscriber, you qualify for a{" "}
                            <strong className="text-text-dark">$40.00</strong>{" "}
                            discount on any Lifetime Package. The discount will
                            be applied automatically during checkout.
                          </p>
                          <ul className="mt-6 mb-4 list-disc space-y-2 pl-5 text-sm">
                            <li>
                              Supports up to 5/1 users (depending on your
                              package)
                            </li>
                            <li>
                              Enjoy 60/40 downloads per day per user (based on
                              your package)
                            </li>
                            <li>Lifetime membership</li>
                            <li>
                              Applicable for personal and commercial projects
                            </li>
                            <li>Access to all current and future products</li>
                          </ul>
                        </div>
                        <CustomLink
                          className="h-10 rounded-full"
                          href="/pricing"
                          size="lg"
                        >
                          Upgrade Now
                        </CustomLink>
                      </div>
                    )}
                  </div>
                </div>

                {/* billing history */}
                {allPaymentsWithPackage.length > 0 && (
                  <div className="dark-gradient-bg border-border relative mx-auto mb-8 w-full border-collapse rounded-[20px] border p-6 -tracking-[0.2px] sm:p-8">
                    <Heading className="mb-6 sm:mb-8" level="h3">
                      Billing History
                    </Heading>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-text text-base whitespace-nowrap">
                            Plan Name
                          </TableHead>
                          <TableHead className="text-text text-base whitespace-nowrap">
                            Payment Date
                          </TableHead>
                          <TableHead className="text-text text-base whitespace-nowrap">
                            Expire Date
                          </TableHead>
                          <TableHead className="text-text text-base">
                            Amount
                          </TableHead>
                          <TableHead className="text-text text-right text-base">
                            Invoice
                          </TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {allPaymentsWithPackage.map((item, i) => {
                          return (
                            <TableRow key={i}>
                              <TableCell>{titleify(item.package)}</TableCell>
                              <TableCell>
                                {dateFormat(item.createdAt)}
                              </TableCell>
                              <TableCell>
                                {item.expires_date === "never"
                                  ? "Never"
                                  : dateFormat(item.expires_date)}
                              </TableCell>
                              <TableCell>${item.total}</TableCell>
                              <TableCell className="text-right">
                                <Link
                                  target="_blank"
                                  href={item.receipt_url ?? ""}
                                >
                                  <Button
                                    variant={"outline"}
                                    className="rounded-full py-5 before:rounded-full after:rounded-full"
                                  >
                                    Download Invoice
                                  </Button>
                                </Link>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
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
