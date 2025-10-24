import { ITEMS_PER_PAGE } from "./constants";

export function countPageNumber(items) {
  const count = Math.ceil(items / ITEMS_PER_PAGE);
  return count;
}
