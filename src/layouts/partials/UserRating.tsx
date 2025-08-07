import { Star } from "@/assets/icons";
import { cn } from "@/lib/utils/shadcn";
import UserAvatar1 from "@/public/images/reviews/barry.jpeg";
import UserAvatar2 from "@/public/images/reviews/bernhard.jpeg";
import UserAvatar3 from "@/public/images/reviews/julius.jpeg";
import UserAvatar4 from "@/public/images/reviews/leo.jpeg";
import { IUserRating } from "@/types";
import Image from "next/image";

function UserRating({
  rating,
  description,
  className,
  variant = "default",
}: IUserRating) {
  const isDefault = variant === "default";
  const isSecondary = variant === "secondary";
  return (
    <div className={className}>
      <div
        className={cn(
          "max-w-[360px] text-sm",
          isDefault && "mx-auto text-center",
          isSecondary && "max-lg:mx-auto max-lg:text-center",
        )}
      >
        <div
          className={cn(
            "mb-4 flex flex-col gap-3.5",
            isSecondary &&
              "mb-4 flex flex-row flex-wrap items-center gap-3 max-lg:justify-center",
          )}
        >
          <div
            className={cn(
              "flex items-center justify-center gap-2",
              isSecondary && "order-1 max-lg:justify-center",
            )}
          >
            <ul className="flex items-center gap-[1px]">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <li className="inline-block" key={i}>
                    <Star key={i} />
                  </li>
                ))}
            </ul>
            <span className="text-white/60">{rating}</span>
          </div>
          <ul className={cn("flex items-center justify-center")}>
            <li className="flex-shrink-0 rounded-full border-2 border-[#0A0E1E]">
              <Image
                className="rounded-full"
                height={34}
                width={34}
                src={UserAvatar1}
                alt="user"
              />
            </li>
            <li className="-ml-2 flex-shrink-0 rounded-full border-2 border-[#0A0E1E]">
              <Image
                className="rounded-full"
                height={34}
                width={34}
                src={UserAvatar2}
                alt="user"
              />
            </li>
            <li className="-ml-2 flex-shrink-0 rounded-full border-2 border-[#0A0E1E]">
              <Image
                className="rounded-full"
                height={34}
                width={34}
                src={UserAvatar3}
                alt="user"
              />
            </li>
            <li className="-ml-2 flex-shrink-0 rounded-full border-2 border-[#0A0E1E]">
              <Image
                className="rounded-full"
                height={34}
                width={34}
                src={UserAvatar4}
                alt="user"
              />
            </li>
            <li className="-ml-2 flex-shrink-0 rounded-full border-2 border-[#0A0E1E]">
              <span className="text-background inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#A9B7FF] to-[#FFB595] text-[8px] font-medium uppercase">
                100K+
              </span>
            </li>
          </ul>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default UserRating;
