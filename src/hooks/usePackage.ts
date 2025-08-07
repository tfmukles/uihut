import { packageContext } from "@/helpers/PackageProvider";
import { useContext, useMemo } from "react";

type Package =
  | "free"
  | "minihut"
  | "basic"
  | "premium"
  | "team"
  | "b2b"
  | "basic-lifetime"
  | "premium-lifetime"
  | "team-lifetime"
  | "b2b-lifetime";

// This hook is used to get the current package of the user
export function usePackage(): Package {
  const packages = useContext(packageContext);

  if (!packages) {
    throw new Error("usePackage must be used within a package context");
  }

  // Memoize the package calculation to prevent unnecessary re-renders
  const currentPackage = useMemo(() => {
    let result = "free";

    if (packages.packageName && packages.packageName !== "free") {
      result = packages.packageName;
    }

    if (packages.teamPackageName && packages.teamPackageName !== "free") {
      result = packages.teamPackageName;
    }

    return result as Package;
  }, [packages.packageName, packages.teamPackageName]);

  return currentPackage;
}
