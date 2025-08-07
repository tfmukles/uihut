import { TOrder } from "@/actions/order/types";
import { TTeam } from "@/actions/team/types";

export function getCurrentPlanDetails(
  orders: Omit<TOrder[], "variables"> | null,
) {
  // Function to get the latest payment from a package
  const getLatestPayment = (payments: any[]) => {
    return (
      payments.length > 0 &&
      payments.reduce((latest, payment) => {
        return new Date(payment.createdAt) > new Date(latest.createdAt)
          ? payment
          : latest;
      })
    );
  };

  // Adding latest payment to each package
  const packagesWithLatestPayment =
    orders?.map((packageItem) => {
      return {
        ...packageItem,
        latestPayment: getLatestPayment(packageItem?.payments),
      };
    }) || [];

  // remove refunded and expired packages
  const purchasedPackages = packagesWithLatestPayment.filter(
    (packageItem) =>
      packageItem.status !== "refunded" && packageItem.status !== "expired",
  );

  // Sorting packages based on latest payment date
  const sortedPackages = purchasedPackages?.sort((a, b) => {
    return (
      new Date(b.latestPayment.createdAt).getTime() -
      new Date(a.latestPayment.createdAt).getTime()
    );
  });

  // lifetime package
  const lifetimePackage = sortedPackages.filter(
    (packageItem) => packageItem.expires_date === "never",
  );

  // The package with the overall latest payment
  const currentPlan =
    lifetimePackage?.length > 0 ? lifetimePackage[0] : sortedPackages[0];

  // check if expires_date is in the past for subscription packages
  if (
    lifetimePackage?.length === 0 &&
    new Date(currentPlan?.expires_date).getTime() < Date.now()
  ) {
    return null;
  }

  return currentPlan;
}

// Function to get the current plan from orders
export function getCurrentPlan(orders: Omit<TOrder[], "variables"> | null) {
  const currentPlan = getCurrentPlanDetails(orders);
  return currentPlan?.package.toLowerCase();
}

// Function to get the current plan from team
export function getTeamPlan(team: Omit<TTeam, "variables"> | null) {
  // check if expires_date is in the past
  if (new Date(team?.expires_date!).getTime() < Date.now()) {
    return null;
  }

  return team?.package.toLowerCase();
}

// Function to find the minihut plan from all orders
export function checkMinihutPlan(orders: Omit<TOrder[], "variables"> | null) {
  // Function to check if the package is minihut
  const isMinihut = (packageItem: any) => {
    return packageItem?.package.toLowerCase() === "minihut";
  };

  // Check if any of the orders are minihut
  const hasMinihutPlan = orders?.some((packageItem) => isMinihut(packageItem));

  return hasMinihutPlan;
}

// Function to find expired subscription plans
export function checkExpiredPlans(orders: Omit<TOrder[], "variables"> | null) {
  // Function to check if the package is expired
  const isExpired = (packageItem: any) => {
    return packageItem?.subscription_id && packageItem?.status === "expired";
  };

  // Check if any of the orders are expired
  const hasExpiredPlans = orders?.some((packageItem) => isExpired(packageItem));

  return hasExpiredPlans;
}
