"use client";

import DownloadButton from "@/components/DownloadButton";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import MinihutUpgradePopup from "@/layouts/components/MinihutUpgradePopup";
import { checkMinihutPlan } from "@/lib/utils/planFinder";
import { default as Link } from "next/link";
import { useState } from "react";

export default function PremiumDownloadButton({
  product,
  orders,
  files,
}: {
  product: any;
  orders: any[];
  files: any[];
}) {
  const [showMinihutPopup, setShowMinihutPopup] = useState(false);
  const hasMinihutPackage = checkMinihutPlan(orders);

  return (
    <>
      {showMinihutPopup && (
        <MinihutUpgradePopup
          forceOpen={showMinihutPopup}
          onForceClose={() => setShowMinihutPopup(false)}
        />
      )}
      <DownloadButton
        product={product}
        loadingComponent={
          <Button size={"xl"} className="w-full" type="button">
            Starting Download <Spinner />
          </Button>
        }
        size={"xl"}
        className="w-full"
        asChild
      >
        <Button
          size="xl"
          className="w-full"
          onClick={
            hasMinihutPackage
              ? (e) => {
                  e.preventDefault();
                  setShowMinihutPopup(true);
                }
              : undefined
          }
        >
          Download Figma File
        </Button>
      </DownloadButton>
      {files?.find((file: any) => file.type === "figma_code") && (
        <>
          <Link
            className="block"
            href="https://www.figma.com/community/plugin/1401906007073649951"
            target="_blank"
          >
            <Button size="xl" className="w-full" variant="outline">
              Copy With Figma Plugin
            </Button>
          </Link>
        </>
      )}
    </>
  );
}
