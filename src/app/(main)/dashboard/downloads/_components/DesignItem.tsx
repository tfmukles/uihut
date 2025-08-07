import CopyButton from "@/components/CopyButton";
import DownloadButton from "@/components/DownloadButton";
import Spinner from "@/components/ui/spinner";
import { BUCKET_URL } from "@/lib/constant";
import dateFormat from "@/lib/utils/dateFormat";
import { ClipboardCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Ref, forwardRef } from "react";

const DesignItem = forwardRef(function DesignItem(
  {
    item,
    isWebFlow = false,
  }: {
    item: {
      product_id: string;
      title: string;
      thumbnail: string;
      category: string;
      type: string;
      date: string;
    };
    isWebFlow?: boolean;
  },
  ref: Ref<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      className="dark-gradient-bg relative mx-auto w-full rounded-xl border border-border p-6 -tracking-[0.2px] sm:p-8"
    >
      <div className="row gy-3 justify-center md:justify-start">
        <div className="md:col-4 lg:col-3">
          <Image
            src={BUCKET_URL + "/" + item.thumbnail}
            width={500}
            height={500}
            alt="download history"
            className="mx-auto aspect-[4/3] w-full rounded-lg object-cover object-top"
          />
        </div>
        <div className="flex flex-col justify-between md:col-8 lg:col-9">
          <div>
            <h2 className="mb-2 text-2xl font-medium">
              <Link href={`/designs/${item.product_id}`}>{item.title}</Link>
            </h2>
            <p className="text-text-light">{dateFormat(item.date)}</p>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {!isWebFlow && (
              <DownloadButton
                size={"xl"}
                product={item}
                type="button"
                variant={"outline"}
                className="rounded-full before:rounded-full after:rounded-full max-md:flex-1"
                loadingComponent={
                  <>
                    <p>Downloading</p>
                    <Spinner className="size-4" />
                  </>
                }
              >
                Download Again
              </DownloadButton>
            )}

            <CopyButton
              size={"xl"}
              {...item}
              {...(isWebFlow && {
                product_id: item.product_id,
                type: item.type,
                format: "application/json",
              })}
              className="mt-0 rounded-full before:rounded-full after:rounded-full max-md:flex-1"
              variant="outline"
              loadingComponent={
                <>
                  <Spinner />
                  Copying
                </>
              }
              successComponent={
                <>
                  <ClipboardCheck />
                  Copied
                </>
              }
            >
              <>
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.8333 6H7.83333C7.09695 6 6.5 6.59695 6.5 7.33333V13.3333C6.5 14.0697 7.09695 14.6667 7.83333 14.6667H13.8333C14.5697 14.6667 15.1667 14.0697 15.1667 13.3333V7.33333C15.1667 6.59695 14.5697 6 13.8333 6Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.83325 9.99967H3.16658C2.81296 9.99967 2.47382 9.8592 2.22378 9.60915C1.97373 9.3591 1.83325 9.01996 1.83325 8.66634V2.66634C1.83325 2.31272 1.97373 1.97358 2.22378 1.72353C2.47382 1.47348 2.81296 1.33301 3.16658 1.33301H9.16658C9.5202 1.33301 9.85934 1.47348 10.1094 1.72353C10.3594 1.97358 10.4999 2.31272 10.4999 2.66634V3.33301"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {isWebFlow ? "Copy Again" : "Copy For Figma"}
              </>
            </CopyButton>
          </div>
        </div>
      </div>
    </div>
  );
});

export default DesignItem;
