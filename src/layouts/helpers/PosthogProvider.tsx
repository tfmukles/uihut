"use client";

import config from "@/config/config.json";
import { POSTHOG_KEY } from "@/lib/constant";
import countryDetector from "@/lib/utils/countryDetector";
import { useSession } from "next-auth/react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { Suspense, useEffect } from "react";
import PostHogPageView from "./PosthogPageView";

export default function PostHogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const country = countryDetector();

  useEffect(() => {
    const initializePosthog = () => {
      if (
        typeof window !== "undefined" &&
        process.env.NODE_ENV !== "development" &&
        status === "authenticated" &&
        config.posthog.enable &&
        country &&
        !config.posthog.disabled_countries.includes(country)
      ) {
        posthog.init(POSTHOG_KEY, {
          api_host: "https://app.posthog.com",
          capture_pageview: false, // Disable automatic pageview capture, as we capture manually
          loaded: (posthog) => {
            if (process.env.NODE_ENV === "development") posthog.debug();
          },
        });
      }
    };
    initializePosthog();

    // // Add the event listener for mouse clicks
    // window.addEventListener("mousedown", initializePosthog);

    // // Cleanup event listener on component unmount
    // return () => {
    //   window.removeEventListener("mousedown", initializePosthog);
    // };
  }, [status, country]);

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
}
