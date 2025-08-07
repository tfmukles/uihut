import { TDesign } from "@/actions/designs/types";
import { getOrders } from "@/actions/order";
import { getTeamByMemberId } from "@/actions/team";
import { CardGridPattern2 } from "@/assets/patterns";
import { auth } from "@/auth";
import AnimatedStarryBg from "@/components/AnimatedStarryBg";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/title";
import { getCurrentPlan, getTeamPlan } from "@/lib/utils/planFinder";
import { titleify } from "@/lib/utils/textConverter";
import BlurSvg from "@/partials/BlurSvg";
import { MovingBorder } from "@/partials/MovingBorder";
import { Lock } from "lucide-react";
import { default as Link } from "next/link";
import FreeDownloadButton from "./FreeDownloadButton";
import PremiumDownloadButton from "./PremiumDownloadButton";

async function ProductSidebar(product: TDesign) {
  const { description, category, premium, files } = product;
  const session = await auth();
  const { user } = session || {};
  const { data: orders } = await getOrders(user?.id!);
  const currentPlan = getCurrentPlan(orders);

  const { data: team } = await getTeamByMemberId(user?.id!);
  const teamPlan = getTeamPlan(team);

  return (
    <aside className="[&>*:not(last-child)]:mb-[22px]">
      <div className="card-bg space-y-3 rounded-2xl border border-border p-4 lg:p-6">
        {!session ? (
          <Button isProtected className="w-full" size="xl" variant="default">
            <Lock className="h-4 w-4" />
            Login to Download
          </Button>
        ) : currentPlan || teamPlan ? (
          <PremiumDownloadButton
            product={product}
            orders={orders ?? []}
            files={files}
          />
        ) : !premium ? (
          <>
            <FreeDownloadButton product={product} />
            {files?.find((file) => file.type === "figma_code") && (
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
        ) : (
          <Link href="/pricing">
            <Button className="w-full" size="xl" variant="outline">
              <Lock className="h-4 w-4" />
              Unlock Full Access
            </Button>
          </Link>
        )}
      </div>
      {!currentPlan && !teamPlan && (
        <MovingBorder
          duration={7000}
          rounded={16}
          containerClassName="bg-border"
        >
          <div className="card-bg relative overflow-hidden p-6 pt-10 leading-[22px] text-muted-foreground">
            <BlurSvg
              className="absolute right-0 top-0 opacity-40 blur-[35px]"
              width="223"
              height="207"
              viewBox="0 0 223 207"
              cx="179.5"
              cy="27.5"
              rx="79.5"
              ry="79.5"
            >
              <linearGradient
                id="paint0_linear_104_10160_2ei"
                x1="282.055"
                y1="175.659"
                x2="99.4119"
                y2="163.718"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FFDE67" />
                <stop offset="0.320191" stopColor="#FF808D" />
                <stop offset="1" stopColor="#AC5EFA" />
              </linearGradient>
            </BlurSvg>
            <BlurSvg
              className="absolute bottom-0 left-0 blur-[35px]"
              width="262"
              height="206"
              viewBox="0 0 262 206"
              cx="44"
              cy="218"
              rx="78"
              ry="78"
              fill="#70CF96B2"
            />
            <CardGridPattern2 className="absolute right-0 top-0 aspect-square h-[260px] w-[260px]" />
            <AnimatedStarryBg className="absolute inset-2" />
            <div className="relative">
              <Heading
                className="mb-2 flex items-center gap-2 text-foreground"
                level="h6"
              >
                <Lock className="inline-block" width={16} /> Unlock All Design
                Resources
              </Heading>
              <p className="mb-11 tracking-normal text-current">
                Get access to UIHut’s 26,000+ design resources, including this
                design with All-Access pass.
              </p>
              <Link href="/pricing">
                <Button className="w-full" size="xl">
                  <Lock className="inline-block" width={16} /> Unlock All-Access
                  pass
                </Button>
              </Link>
            </div>
          </div>
        </MovingBorder>
      )}
      <div className="card-bg space-y-[22px] rounded-2xl border border-border p-4 text-muted-foreground lg:p-6">
        {description && (
          <div>
            <Heading level="h6" className="mb-1.5 text-foreground">
              Overview
            </Heading>
            <p className="text-xs leading-[1.6] tracking-xs text-muted-foreground">
              {description}
            </p>
          </div>
        )}
        {/* <div>
        <Heading level="h6" className="mb-1.5 text-foreground">
          Published
        </Heading>
        <p className="text-xs leading-[1.6] tracking-xs text-muted-foreground">
          {dateFormat(date)}
        </p>
      </div> */}
        <div>
          <Heading level="h6" className="mb-1.5 text-foreground">
            Category
          </Heading>
          <p className="text-xs leading-[1.6] tracking-xs text-muted-foreground">
            {titleify(category!)}
          </p>
        </div>
      </div>
      <div className="card-bg rounded-2xl border border-border p-4 text-muted-foreground lg:p-6">
        <Heading level="h6" className="mb-2 text-foreground">
          License
        </Heading>
        <div className="flex items-start justify-between gap-6">
          <span>{premium ? "Premium" : "Free"}</span>
          <Link className="text-sm underline" href="/license">
            More info
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default ProductSidebar;
