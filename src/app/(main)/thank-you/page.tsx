"use client";

import { getOrders, revalidateOrders } from "@/actions/order";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/title";
import { packageContext } from "@/helpers/PackageProvider";
import { getCurrentPlan } from "@/lib/utils/planFinder";
import BoxLayout from "@/partials/BoxLayout";
import SeoMeta from "@/partials/SeoMeta";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect } from "react";

const page = () => {
  const { setPackageName } = useContext(packageContext) || {};
  const { data: session } = useSession();

  // revalidate orders tag
  useEffect(() => {
    revalidateOrders("orders");

    getOrders(session?.user.id!).then((res) => {
      if (res?.data?.length && setPackageName) {
        const currentPlan = getCurrentPlan(res.data);
        setPackageName(currentPlan ?? "free");
      }
    });
  }, []);

  return (
    <>
      <SeoMeta title="Thank You" noindex={true} />
      <BoxLayout>
        <section className="pt-28">
          <div className="container">
            <div className="row">
              <div className="text-center">
                <Heading className="mb-6" level="h2" variant="gradient">
                  Thank you for your purchase <br />
                  Please browse and enjoy your resources
                </Heading>
                <p>Check your email for invoice</p>
                <Button className="mt-10">
                  <Link href="/designs">Explore Designs</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </BoxLayout>
    </>
  );
};

export default page;
