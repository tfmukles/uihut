"use client";

import { getDesignCategories } from "@/actions/designs";
import { getUserDetails } from "@/actions/user";
import { userPersona } from "@/actions/user-persona";
import { FilterProvider } from "@/helpers/FilterProvider";
import { PackageProvider } from "@/helpers/PackageProvider";
import PostHogProvider from "@/helpers/PosthogProvider";
import { titleify } from "@/lib/utils/textConverter";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { getCookie, setCookie } from "react-use-cookie";

const Providers = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    getDesignCategories().then((res) => {
      setCategories(
        res?.data?.map((item) => ({
          label: titleify(item._id),
          value: item._id,
          type: "category",
        })) || [],
      );
    });
  }, [session?.user?.accessToken]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.href);
    if (status === "authenticated") {
      Promise.all([userPersona(session?.user.id!)]).then((res) => {
        const [userPersona] = res;
        const onboarding = getCookie("onboarding") !== "true";
        if (
          !userPersona.data?.user_id &&
          onboarding &&
          session.user.isPasswordExit &&
          pathname !== "/pricing" &&
          params.get("from") !== "/pricing" &&
          params.get("from") !== "/figma-connect" &&
          pathname !== "/figma-connect"
        ) {
          setCookie("onboarding", "true");
          router.push("/onboarding");
        }
      });
    }
  }, [status]);

  useEffect(() => {
    if (session?.user.id) {
      getUserDetails(session?.user.id!).then((res) => {
        update({ status: res.data?.status });
      });
    }
  }, [session?.user.id]);

  return (
    <PostHogProvider>
      <FilterProvider categories={categories}>
        <PackageProvider>{children}</PackageProvider>
      </FilterProvider>
    </PostHogProvider>
  );
};

export default Providers;
