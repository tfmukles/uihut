"use client";

import Axios from "@/lib/utils/axios";
import { getCurrentPlan, getTeamPlan } from "@/lib/utils/planFinder";
import { useSession } from "next-auth/react";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export type context = {
  packageName: string;
  setPackageName: Dispatch<SetStateAction<string>>;
  teamPackageName: string;
  setTeamPackageName: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  error: string | null;
};

export const packageContext = React.createContext<context | null>(null);

export function PackageProvider(props: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [packageName, setPackageName] = useState("free");
  const [teamPackageName, setTeamPackageName] = useState("free");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  const fetchData = useCallback(async () => {
    if (status === "loading") {
      return;
    }

    if (status === "unauthenticated" || !session?.user?.id) {
      setIsLoading(false);
      setPackageName("free");
      setTeamPackageName("free");
      setHasInitialized(true);
      return;
    }

    if (!hasInitialized) {
      setIsLoading(true);
    }
    setError(null);

    try {
      const [ordersRes, teamRes] = await Promise.allSettled([
        Axios.get(`/order/${session.user.id}`).catch((err) => {
          if (err.response?.status === 401) {
            console.warn("Unauthorized access to orders API");
            throw err;
          }
          console.warn("Orders API failed:", err.message);
          return { data: { result: [] } };
        }),
        Axios.get(`/team/member/${session.user.id}`).catch((err) => {
          if (err.response?.status === 401) {
            console.warn("Unauthorized access to team API");
            throw err;
          }
          console.warn("Team API failed:", err.message);
          return { data: { result: null } };
        }),
      ]);

      if (ordersRes.status === "fulfilled") {
        const ordersData = ordersRes.value?.data?.result || [];
        const currentPlan = getCurrentPlan(ordersData);
        setPackageName(currentPlan || "free");
      } else {
        console.error("Error fetching orders:", ordersRes.reason);
        setPackageName("free");
        if (ordersRes.reason?.response?.status === 401) {
          setError("Authentication failed. Please sign in again.");
        }
      }

      if (teamRes.status === "fulfilled") {
        const currentTeamPlan = getTeamPlan(teamRes.value?.data?.result);
        setTeamPackageName(currentTeamPlan || "free");
      } else {
        console.error("Error fetching team data:", teamRes.reason);
        setTeamPackageName("free");
        if (teamRes.reason?.response?.status === 401 && !error) {
          setError("Authentication failed. Please sign in again.");
        }
      }
    } catch (error: any) {
      console.error("Error fetching data:", error);
      if (error.response?.status === 401) {
        setError("Authentication failed. Please sign in again.");
      } else {
        setError("Failed to load package information");
      }
      setPackageName("free");
      setTeamPackageName("free");
    } finally {
      setIsLoading(false);
      setHasInitialized(true);
    }
  }, [session?.user?.id, status, hasInitialized]);

  // Only fetch data when session becomes stable and user ID is available
  useEffect(() => {
    if (status !== "loading" && session?.user?.id && !hasInitialized) {
      fetchData();
    }
  }, [status, session?.user?.id, hasInitialized, fetchData]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => {
    return {
      packageName,
      setPackageName,
      teamPackageName,
      setTeamPackageName,
      isLoading,
      error,
    };
  }, [packageName, teamPackageName, isLoading, error]);

  return (
    <packageContext.Provider value={contextValue}>
      {props.children}
    </packageContext.Provider>
  );
}
