import { useDialog } from "@/hooks/useDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/layouts/components/ui/popover";
import { MenuItem } from "@/partials/Header";
import { Separator } from "@radix-ui/react-separator";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BoxedIcon from "./ui/boxed-icon";
import Heading from "./ui/title";

type MegaMenuProps = {
  link: MenuItem;
};

const MenuItemComponent = ({
  child,
  onClick,
}: {
  child: any;
  onClick: () => void;
}) => (
  <div
    className="hover:border-border/40 hover:bg-background relative flex cursor-pointer rounded-lg border border-transparent p-[18px] transition"
    onClick={onClick}
  >
    <BoxedIcon className="mr-2">
      <Image
        src={child.logo!}
        alt={child.name}
        width={50}
        height={50}
        quality={100}
      />
    </BoxedIcon>
    <div className="my-auto">
      <Heading level={"h6"}>{child.name}</Heading>
      <p className="text-text/75 text-sm">{child.badge}</p>
    </div>
    <Link
      className="stretched-link ml-auto self-center"
      href={child.url}
      target={child.url.startsWith("http") ? "_blank" : ""}
      rel={child.url.startsWith("http") ? "noopener noreferrer nofollow" : ""}
    >
      {child.url.startsWith("http") && (
        <ExternalLinkIcon className="text-text-light" />
      )}
    </Link>
  </div>
);

const MegaMenu = ({ link }: MegaMenuProps) => {
  const { isOpen, onOpenChange } = useDialog();
  const [showChildMenu, setShowChildMenu] = useState(false);

  const handleChildMenuClick = () => {
    setShowChildMenu(!showChildMenu);
  };

  const handleMouseEnter = () => {
    onOpenChange(true);
  };

  const handleMouseLeave = () => {
    onOpenChange(false);
  };

  const handleCloseMenu = () => {
    const button = document.querySelector(".hamburger") as HTMLButtonElement;
    if (button) button.click();
  };

  return (
    <>
      <div className="hidden lg:block">
        <Popover open={isOpen} onOpenChange={onOpenChange}>
          <PopoverTrigger
            asChild
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="nav-link relative outline-none">
              {link.name}
              <ChevronDown
                width={16}
                height={16}
                className="text-text ml-auto inline-block"
              />
            </button>
          </PopoverTrigger>

          <PopoverContent
            className={`w-screen border-none !bg-transparent p-0`}
            sideOffset={-10}
            align="center"
            side="top"
          >
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="mx-auto w-[var(--radix-popper-available-width)] max-w-5xl rounded-[12px]"
            >
              <div className="border-border from-dark to-background relative flex w-full items-start justify-start gap-x-20 rounded-[12px] border bg-gradient-to-r to-[100%] p-6">
                <Separator
                  orientation="vertical"
                  className="bg-border/50 absolute top-0 left-1/2 h-full w-px -translate-x-1/2"
                />
                {/* resources */}
                <div className="relative flex-1">
                  <div className="relative">
                    {link.children
                      ?.filter((d) => d.group === "resources")
                      ?.map((child, index) => (
                        <MenuItemComponent
                          key={`${child.name}-${index}`}
                          child={child}
                          onClick={() => onOpenChange(false)}
                        />
                      ))}
                  </div>
                </div>

                {/* tools */}
                <div className="relative flex-1">
                  <div className="relative">
                    {link.children
                      ?.filter((d) => d.group === "tools")
                      ?.map((child, index) => (
                        <MenuItemComponent
                          key={`${child.name}-${index}`}
                          child={child}
                          onClick={() => onOpenChange(false)}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="block lg:hidden">
        <button
          onClick={handleChildMenuClick}
          className="nav-link relative flex w-full items-center justify-between outline-none"
        >
          {link.name}
          <ChevronDown width={16} height={16} className="text-text ml-auto" />
        </button>

        <AnimatePresence initial={false}>
          {showChildMenu && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{
                type: "tween",
                duration: 0.3,
                ease: "easeOut",
              }}
              className="overflow-hidden"
            >
              <div className="border-border to-background from-dark my-2 flex flex-shrink-0 flex-wrap gap-5 overflow-hidden rounded-lg border bg-gradient-to-r to-[100%] p-3 lg:hidden">
                <div className="flex-1 basis-full md:basis-0">
                  {link.children?.map((child, index) => (
                    <MenuItemComponent
                      key={`col-${index}`}
                      child={child}
                      onClick={handleCloseMenu}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default MegaMenu;
