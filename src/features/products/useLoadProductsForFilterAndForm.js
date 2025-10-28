import { useQuery } from "@tanstack/react-query";
import { getProductsForFilterAndForm } from "../../services/apiProducts";

export function useLoadProductsForFilterAndForm() {
  const {
    isLoading,
    data: products = {},
    error,
  } = useQuery({
    queryKey: ["productsForFilterAndForm"],
    queryFn: getProductsForFilterAndForm,
  });
  /*
  const categoryOptionsArray = ["new collection"];
  const typeOptionsArray = [];
  const colorsAvailable = [];
  useEffect(() => {
    if (products) {
      products.map((product) => {
        const categories = product.category.join();
        const category = categories.includes(",")
          ? categories.split(",").slice(0, -1).join()
          : categories;
        if (!categoryOptionsArray.includes(category))
          categoryOptionsArray.push(category);
        if (!typeOptionsArray.includes(product.itemType))
          typeOptionsArray.push(product.itemType);
      });
      const colors = products.flatMap((product) => {
        return Object.keys(product.variants);
      });
      colorsAvailable.push(colors);
    }
  }, [products]);
*/
  console.log(products);
  return {
    products,
    isLoading,
    error,
  };
}
