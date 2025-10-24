import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductsForTable } from "../../services/apiProducts";
import { countPageNumber } from "../../utils/helpers";
import { useSearchParams } from "react-router-dom";

export function useLoadProductsForTable() {
  const [searchParams] = useSearchParams();

  //Get page number
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //Get selected sorting option
  const selectedSortingOption = !searchParams.get("sorting")
    ? "default"
    : searchParams.get("sorting");

  //Get selected filter options
  const filter = !searchParams.get("filter")
    ? null
    : searchParams.get("filter");

  //Fetch products for table with react query
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: { data: products, count } = {},
    error,
  } = useQuery({
    queryKey: ["productsForTable", selectedSortingOption, filter, page],
    queryFn: () => getProductsForTable({ selectedSortingOption, filter, page }),
    staleTime: 60 * 1000,
  });

  //Prefetch products for next page
  const pageCount = countPageNumber(count);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["productsForTable", selectedSortingOption, filter, page + 1],
      queryFn: () =>
        getProductsForTable({ selectedSortingOption, filter, page: page + 1 }),
    });
  }

  //Prefetch products for previous page
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["productsForTable", selectedSortingOption, filter, page - 1],
      queryFn: () =>
        getProductsForTable({ selectedSortingOption, filter, page: page - 1 }),
    });
  }

  return { isLoading, products, count, error };
}
