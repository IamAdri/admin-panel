import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../services/apiProducts";

export function useLoadAllProducts() {
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  });

  return {
    products,
    isLoading,
    error,
  };
}
