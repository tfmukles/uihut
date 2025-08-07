import Heading from "@/components/ui/title";
import Image, { StaticImageData } from "next/image";

type Platform = "facebook" | "twitter" | "producthunt";

export type ReviewType = {
  avatar: string | StaticImageData;
  name: string;
  designation: string;
  description: string;
  date: Date | string;
  viewedOn?: Platform;
};

export type TReview = {
  enable: boolean;
  title: string;
  description: string;
  review_items: ReviewType[];
};

function Review({
  review_items,
  isLineClamp,
}: {
  review_items: ReviewType;
  isLineClamp?: boolean;
}) {
  return (
    <div className="card-bg border-border from-dark to-background mb-6 inline-block !min-h-full rounded-lg border bg-gradient-to-b to-[100%] p-4 text-sm">
      <div className="mb-6 lg:mb-10">
        <div className="mb-3 flex items-center gap-2">
          <Image
            className="h-12 w-12 rounded-full"
            src={review_items.avatar}
            width={48}
            height={48}
            alt={review_items.name}
          />
          <div>
            <Heading className="!text-base" level="h4">
              {review_items.name}
            </Heading>
            <p className="text-text-light text-xs">
              {review_items.designation}
            </p>
          </div>
        </div>
        <p className="text-text">{review_items.description}</p>
      </div>

      {/* <div>
        <div className="relative mb-[22px] flex items-center justify-between gap-4 pb-2 text-xs text-muted-foreground">
          <span>14:15 PM · Oct 19, 2021</span>
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.88 9.38H10.5V13.76H11.12M10.5 17.5C14.64 17.5 18 14.14 18 10C18 5.86 14.64 2.5 10.5 2.5C6.36 2.5 3 5.86 3 10C3 14.14 6.36 17.5 10.5 17.5ZM10.5 7.01C10.75 7.01 10.95 6.81 10.95 6.56C10.95 6.31 10.75 6.11 10.5 6.11C10.25 6.11 10.05 6.31 10.05 6.56C10.05 6.81 10.25 7.01 10.5 7.01Z"
              stroke="#8897AE"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Separator className="absolute -left-6 bottom-0 w-[calc(100%_+_32px)]" />
        </div>
        <CustomLink
          className="w-full gap-2 text-nowrap rounded-3xl border border-border text-muted-foreground hover:border-light/20 hover:text-foreground"
          href="#"
          variant="basic"
        >
          <span>{icons[review_items.viewedOn!]}</span>
          View On facebook
        </CustomLink>
      </div> */}
    </div>
  );
}

export default Review;
