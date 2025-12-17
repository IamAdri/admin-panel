import Pagination from "../../ui/Pagination";
import toast from "react-hot-toast";
import { useLoadProductsForTable } from "./useLoadProductsForTable";
import Table from "../../ui/Table";
import TableHead from "../../ui/TableHead";
import TableRow from "../../ui/TableRow";
import TableData from "../../ui/TableData";
import DescriptionSectionForProduct from "./DescriptionSectionForProduct";
import List from "../../ui/List";
import ImagesForColorsOfProduct from "./ImagesForColorsOfProduct";
import ProductRowActions from "./ProductRowActions";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Heading from "../../ui/Heading";

const MainDiv = styled.div`
  display: block;
  max-width: 100vw;
  min-width: 0;
  width: 100%;
  overflow-x: auto;
`;

function ProductsTable() {
  //Loading products for table
  const { isLoading, products, count, error } = useLoadProductsForTable();
  //Manage error or awaiting time for loading products for table
  if (error) {
    return toast(`Error: ${error.message} Please try again!💥`);
  }
  if (isLoading) return <Spinner />;

  return (
    <>
      {products.length > 0 ? (
        <>
          <MainDiv>
            <Table>
              <thead>
                <tr>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Colors</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Discount</TableHead>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  return (
                    <TableRow key={product.id}>
                      <TableData>{product.name}</TableData>
                      <TableData>{product.itemType}</TableData>
                      <TableData>
                        {product.category.length > 1
                          ? product.category.map((categoryOption) => {
                              const option =
                                categoryOption === "newCollection"
                                  ? "new collection"
                                  : categoryOption;
                              return (
                                <List key={(product.id, categoryOption)}>
                                  {option}
                                </List>
                              );
                            })
                          : product.category}
                      </TableData>
                      <TableData>
                        <DescriptionSectionForProduct product={product} />
                      </TableData>
                      <TableData>
                        <ImagesForColorsOfProduct product={product} />
                      </TableData>
                      <TableData>{product.price} EUR</TableData>
                      <TableData>
                        {!product.discount ? "-" : `${product.discount}%`}
                      </TableData>
                      <ProductRowActions product={product} />
                    </TableRow>
                  );
                })}
              </tbody>
            </Table>
          </MainDiv>
          <Pagination itemsLength={count} />
        </>
      ) : (
        <Heading as="h3">
          No products that match with selected filter or sorting options.
        </Heading>
      )}
    </>
  );
}

export default ProductsTable;
