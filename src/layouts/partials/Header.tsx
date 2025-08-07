"use client";

import { UserStatusType } from "@/actions/user/types";
import Avatar from "@/components/Avatar";
import MegaMenu from "@/components/MegaMenu";
import { Badge } from "@/components/ui/badge";
import Heading from "@/components/ui/title";
import menu from "@/config/menu.json";
import { useDialog } from "@/hooks/useDialog";
import { useFilter } from "@/hooks/useFilter";
import { usePackage } from "@/hooks/usePackage";
import { CustomLink } from "@/layouts/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/layouts/components/ui/popover";
import { cn } from "@/lib/utils/shadcn";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Lock, ShieldAlert } from "lucide-react";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { removeCookie } from "react-use-cookie";
import Logo from "./Logo";
import { NavLink } from "./NavLink";
import SearchModal from "./SearchModal";

export type MenuItem = {
  name: string;
  url: string;
  hasChildren?: boolean;
  children?: MenuItem[];
  logo?: string;
  badge?: string;
  group?: string;
  megaMenu?: boolean;
};

type DropdownMenuProps = {
  link: MenuItem;
};

type StableAuthState = {
  isAuthenticated: boolean;
  user: any | null;
  status: "loading" | "authenticated" | "unauthenticated";
};

const variants = {
  close: {
    height: 0,
  },
  open: {
    height: "auto",
  },
};

const Announcement = dynamic(() => import("./Announcement"), {
  ssr: false,
});

// header
export default function Header({ hideMenu }: { hideMenu?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { user } = session || {};

  // Stabilize auth state to prevent excessive re-renders from NextAuth status flipping
  const stableAuthState = useMemo((): StableAuthState => {
    if (user?.id) {
      return {
        isAuthenticated: true,
        user,
        status: "authenticated",
      };
    }
    if (status === "unauthenticated") {
      return {
        isAuthenticated: false,
        user: null,
        status: "unauthenticated",
      };
    }
    return {
      isAuthenticated: false,
      user: null,
      status: "loading",
    };
  }, [user?.id, status]);

  const currentPlan = usePackage();
  const { openSearchModal, toggleSearchModal, height } = useFilter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showChildMenu, setShowChildMenu] = useState(false);

  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };

  const handleChildMenuClick = () => {
    setShowChildMenu(!showChildMenu);
  };

  // Close menu on navigation
  useEffect(() => {
    setIsOpen(false);
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <div className="sticky top-0 left-0 z-40" id="navbar">
      <motion.header
        className={cn(
          `border-border bg-background relative w-full lg:py-0 ${!hideMenu ? "lg:border-b" : "border-b"}`,
        )}
      >
        <motion.div className={cn("text-sm")}>
          <Announcement />
          <div className="container-fluid grid w-full grid-cols-[auto_auto] items-center justify-between gap-6 bg-inherit py-5 lg:grid-cols-[minmax(auto,230px)_1fr_minmax(auto,230px)] lg:py-0 2xl:grid-cols-[minmax(auto,300px)_1fr_minmax(auto,300px)]">
            <Logo className="flex-shrink" />

            {/* Mobile auth section */}
            <div className="flex items-center gap-3 lg:hidden">
              {/* Restricted user notice */}
              {stableAuthState.user?.status === UserStatusType.RESTRICTED && (
                <button
                  onClick={() => {
                    router.push("/contact");
                  }}
                  className="bg-destructive flex items-center space-x-2 rounded-full px-2.5 py-2 font-medium text-white"
                >
                  <Lock className="size-4" />
                  <span className="text-sm font-medium">Restricted</span>
                </button>
              )}

              {/* Auth-dependent navigation */}
              {stableAuthState.isAuthenticated ? (
                <DashMenu
                  user={stableAuthState.user!}
                  currentPlan={currentPlan}
                />
              ) : (
                <Link href="/login">Login</Link>
              )}

              {/* Hamburger menu toggle */}
              {!hideMenu && (
                <button
                  type="button"
                  aria-label="Toggle Menu"
                  className={cn("hamburger h-8 w-8", isOpen && "open")}
                  onClick={toggleNavigation}
                >
                  <span className="relative inline-block h-0.5 w-6 rounded-md" />
                </button>
              )}
            </div>

            {!hideMenu ? (
              <>
                {/* Main navigation menu */}
                <motion.div
                  id="border"
                  className={cn(
                    "max-lg:border-border max-lg:bg-background absolute top-full left-0 flex-1 overflow-hidden max-lg:w-full max-lg:overflow-y-auto max-lg:rounded-b-lg max-lg:border-b lg:static lg:!h-auto",
                  )}
                  style={{ maxHeight: `calc(100svh - ${height}px)` }}
                  variants={variants}
                  initial="close"
                  animate={isOpen ? "open" : "close"}
                  transition={{ type: "tween" }}
                >
                  <nav className="max-lg:px-6 max-lg:pt-3 max-lg:pb-6">
                    <ul className="items-center justify-center gap-4 max-lg:space-y-8 lg:flex xl:gap-8">
                      {menu.main.map((link, i) => (
                        <li key={link.name + "_" + i}>
                          {link.hasChildren ? (
                            link.megaMenu ? (
                              <MegaMenu link={link} />
                            ) : (
                              <>
                                <div className="block lg:hidden">
                                  <button
                                    onClick={handleChildMenuClick}
                                    className="nav-link relative flex w-full items-center justify-between outline-none"
                                  >
                                    {link.name}
                                    <ChevronDown
                                      width={16}
                                      height={16}
                                      className="text-text ml-auto"
                                    />
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
                                        }}
                                        className="overflow-hidden lg:hidden"
                                      >
                                        <div className="border-border from-dark to-background my-2 rounded-md border bg-gradient-to-r to-[100%]">
                                          {link.children?.map((child) => (
                                            <NavLink
                                              key={child.name}
                                              href={child.url}
                                              onClick={(e) => {
                                                e.preventDefault();
                                                router.push(child.url);
                                                setShowChildMenu(false);
                                                setIsOpen(false);
                                              }}
                                              className="link text-text block rounded-md px-3 py-2 text-sm whitespace-nowrap transition-none"
                                              activeClassName="border border-background/20 bg-background text-light"
                                            >
                                              {child.name}
                                            </NavLink>
                                          ))}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>

                                <div className="hidden lg:block">
                                  <DropdownMenu link={link} />
                                </div>
                              </>
                            )
                          ) : (
                            <NavLink
                              activeClassName="active"
                              className={cn("nav-link")}
                              href={link.url}
                            >
                              <div className="relative inline">
                                {link.name}
                                {link.badge && (
                                  <Badge
                                    variant={"default"}
                                    className="btn-gradient absolute -top-2 -right-9 overflow-hidden border-none px-2 text-xs lowercase outline-none"
                                    size={"sm"}
                                  >
                                    {link.badge}
                                  </Badge>
                                )}
                              </div>
                            </NavLink>
                          )}
                        </li>
                      ))}

                      {/* Search button (hidden on certain pages) */}
                      {!["/designs", "/icons", "/webflow-templates"].includes(
                        pathname,
                      ) && (
                        <li className="leading-none max-lg:hidden lg:pl-7 xl:pl-3 2xl:pl-5">
                          <button
                            className="hover:text-text-dark text-[#60677F] transition-all duration-200"
                            type="button"
                            id="search-button"
                            title="Search"
                            onClick={toggleSearchModal}
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M17.5 17.5L13.875 13.875"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </li>
                      )}
                    </ul>
                    {/* button mobile */}
                  </nav>
                </motion.div>
              </>
            ) : (
              <div className="hidden lg:block lg:h-[76px]" />
            )}

            {/* Desktop auth section */}
            <div className="ml-auto hidden items-center justify-between gap-[7px] lg:flex">
              {/* Restricted user notice */}
              {stableAuthState.user?.status === UserStatusType.RESTRICTED && (
                <button
                  onClick={() => {
                    router.push("/contact");
                  }}
                  className="bg-destructive flex items-center space-x-2 rounded-full px-2.5 py-2 font-medium text-white"
                >
                  <Lock className="size-4" />
                  <span className="text-sm font-medium">Restricted</span>
                </button>
              )}

              {/* Auth-dependent navigation */}
              {stableAuthState.isAuthenticated ? (
                <>
                  {currentPlan === "free" && (
                    <CustomLink
                      href="/pricing"
                      className="mr-4"
                      variant="default"
                      glow
                    >
                      Upgrade
                    </CustomLink>
                  )}
                  <DashMenu
                    user={stableAuthState.user!}
                    currentPlan={currentPlan}
                  />
                </>
              ) : (
                <>
                  <Link className="mr-3" href="/login">
                    Login
                  </Link>
                  <CustomLink
                    href="/pricing"
                    className="pl-[30px]"
                    variant="default"
                    glow
                  >
                    Unlock All-Access
                  </CustomLink>
                </>
              )}
            </div>
          </div>
          <motion.div
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0, display: "none" }}
            animate={
              isOpen
                ? { opacity: 1, display: "block" }
                : { opacity: 0, display: "none" }
            }
            className="bg-background/20 fixed top-0 left-0 -z-[1] h-screen w-full backdrop-blur-md lg:!hidden"
          />
        </motion.div>
      </motion.header>

      <SearchModal isOpen={openSearchModal} toggle={toggleSearchModal} />
    </div>
  );
}

function DropdownMenu({ link }: DropdownMenuProps) {
  const { isOpen, onOpenChange } = useDialog();
  const router = useRouter();

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger
        asChild
        onMouseEnter={() => onOpenChange(true)}
        onMouseLeave={() => onOpenChange(false)}
      >
        <button className="nav-link relative flex items-center outline-none">
          {link.name}
          <ChevronDown width={16} height={16} className="text-text" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        onMouseEnter={() => onOpenChange(true)}
        onMouseLeave={() => onOpenChange(false)}
        side="top"
        sideOffset={-10}
        className="w-60 border-none p-0"
      >
        <div className="border-border from-dark to-background rounded-md border bg-gradient-to-r to-[100%] p-2">
          {link.children?.map((child) => (
            <NavLink
              key={child.name}
              onClick={(e) => {
                e.preventDefault();
                router.push(child.url);
                onOpenChange();
              }}
              href={child.url}
              className="link text-text block rounded-md px-3 py-2 text-sm whitespace-nowrap transition-none"
              activeClassName="border border-background/20 bg-background text-foreground"
            >
              {child.name}
            </NavLink>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function DashMenu({ user, currentPlan }: { user: User; currentPlan: any }) {
  const router = useRouter();
  const { isOpen, onOpenChange } = useDialog();

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button className="inline-flex items-center gap-1 rounded-[68px] border border-[#3A3F51] p-0.5 pr-3 [&>span]:data-[state=open]:rotate-180">
          <Avatar
            src={user?.image!}
            email={user?.email!}
            className="h-[32px] w-[32px] rounded-full object-cover"
            width={32}
            height={32}
            alt={user?.firstName + " " + user?.lastName}
          />
          <span className="transition-transform">
            <ChevronDown width={14} height={14} className="text-text" />
          </span>
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="to-background bg-dark from-dark 3xl:max-w-[400px] z-40 max-w-[240px] overflow-hidden rounded-xl bg-gradient-to-r to-[100%] p-0"
        align="end"
      >
        <div className="to-background from-dark border-b border-white/[6%] bg-gradient-to-b to-[100%] p-3.5">
          <Heading
            level="h6"
            className="inline-block text-sm"
            variant="gradient"
          >
            {user?.email}
          </Heading>
        </div>

        {/* Restriction notice - subtle and clean */}
        {user.status === UserStatusType.RESTRICTED && (
          <div className="bg-destructive/10 px-4 py-3">
            <div className="text-destructive mb-1 flex items-center gap-2 font-semibold">
              <ShieldAlert className="h-4 w-4" />
              <span className="text-xs">Account Restricted</span>
            </div>
            <p className="text-foreground mt-1 text-xs">
              Your account has been restricted due to unusual activity.
            </p>
          </div>
        )}

        <div className="p-3.5">
          {menu.dashboard.map((item) => (
            <NavLink
              key={item.name}
              onClick={(e) => {
                e.preventDefault();
                const { href } = e.target as HTMLAnchorElement;
                router.push(href);
                onOpenChange();
              }}
              href={item.url}
              className="link text-text block rounded-md px-3 py-2 text-sm transition-none"
              activeClassName="border border-border/25 bg-background text-light"
            >
              {item.name}
            </NavLink>
          ))}

          <button
            onClick={() => {
              signOut();
              removeCookie("onboarding");
            }}
            className="link text-text mt-[30px] w-full rounded-md px-3 py-2 text-left text-sm"
          >
            Logout
          </button>

          {/* dash menu button */}
          {currentPlan === "free" && (
            <div className="border-background/20 mt-3 border-t pt-3">
              <CustomLink className="h-10 w-full" href="/pricing" size="lg">
                Get Unlimited Access{" "}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.59375 6.53125C7.31761 6.53125 7.09375 6.75511 7.09375 7.03125C7.09375 7.30739 7.31761 7.53125 7.59375 7.53125V6.53125ZM10.9688 7.03125H11.4688C11.4688 6.75511 11.2449 6.53125 10.9688 6.53125V7.03125ZM10.4688 10.4062C10.4688 10.6824 10.6926 10.9062 10.9688 10.9062C11.2449 10.9062 11.4688 10.6824 11.4688 10.4062H10.4688ZM6.6777 10.6152C6.48243 10.8105 6.48243 11.127 6.6777 11.3223C6.87296 11.5176 7.18954 11.5176 7.3848 11.3223L6.6777 10.6152ZM15.25 9C15.25 12.4518 12.4518 15.25 9 15.25V16.25C13.0041 16.25 16.25 13.0041 16.25 9H15.25ZM9 15.25C5.54822 15.25 2.75 12.4518 2.75 9H1.75C1.75 13.0041 4.99594 16.25 9 16.25V15.25ZM2.75 9C2.75 5.54822 5.54822 2.75 9 2.75V1.75C4.99594 1.75 1.75 4.99594 1.75 9H2.75ZM9 2.75C12.4518 2.75 15.25 5.54822 15.25 9H16.25C16.25 4.99594 13.0041 1.75 9 1.75V2.75ZM7.59375 7.53125H10.9688V6.53125H7.59375V7.53125ZM10.4688 7.03125V10.4062H11.4688V7.03125H10.4688ZM7.3848 11.3223L11.3223 7.3848L10.6152 6.6777L6.6777 10.6152L7.3848 11.3223Z"
                    fill="white"
                  />
                </svg>
              </CustomLink>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
