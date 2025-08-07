"use client";

import { Button } from "@/components/ui/button";
import BaseLayout from "@/layouts/BaseLayout";
import BoxLayout from "@/partials/BoxLayout";
import SeoMeta from "@/partials/SeoMeta";
import Image from "next/image";
import Link from "next/link";

function NotFound() {
  return (
    <>
      <SeoMeta
        title="Page Not Found"
        description="The page you are looking for does not exist"
      />

      <BaseLayout key={"not-found"}>
        <BoxLayout>
          <section className="pt-12">
            <div className="container">
              <div className="row justify-center">
                <div className="text-center sm:col-10 md:col-8 lg:col-6">
                  <Image
                    src="/images/404.svg"
                    width={418}
                    height={174}
                    alt="404 image"
                    className="mx-auto mb-4"
                  />
                  <p>Error! Page Not Found</p>
                  <Button className="mt-10">
                    <Link href="/">Back to Home</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </BoxLayout>
      </BaseLayout>
    </>
  );
}

export default NotFound;
