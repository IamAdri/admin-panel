import styled from "styled-components";
import ProductsTable from "../features/products/ProductsTable";
import TableOperations from "../features/products/TableOperations";
import ProductForm from "../ui/ProductForm";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 65px 0px 25px;
`;

function Products() {
  return (
    <MainDiv>
      <TableOperations />
      <ProductsTable />
      <ProductForm />
    </MainDiv>
  );
}

export default Products;
