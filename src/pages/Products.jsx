import ProductsTable from "../features/products/ProductsTable";
import TableOperations from "../features/products/TableOperations";
import ProductForm from "../ui/ProductForm";

function Products() {
  return (
    <>
      <TableOperations />
      <ProductsTable />
      <ProductForm />
    </>
  );
}

export default Products;
