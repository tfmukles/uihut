import { useContext } from "react";
import { filterContext } from "../layouts/helpers/FilterProvider";

export function useFilter() {
  const store = useContext(filterContext);
  if (!store) {
    throw new Error("useProvider must be used within a filter context");
  }
  return store;
}
