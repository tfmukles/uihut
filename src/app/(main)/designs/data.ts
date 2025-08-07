import { FilterParam } from "../(filter)/_components/data";

export type TFilter = {
  params: Array<FilterParam>;
  sort: string | undefined;
  [key: string]: any;
};

export const INITIAL_FILTER: TFilter = {
  params: [],
  sort: "",
};
