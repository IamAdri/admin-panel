import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Pagination from "../../ui/Pagination";
import toast from "react-hot-toast";
import { useLoadProductsForTable } from "./useLoadProductsForTable";

const Table = styled.table`
  border: 1px solid var(--color-grey-400);
  border-collapse: collapse;
  text-align: left;
`;

const Th = styled.th`
  border: 1px solid var(--color-grey-400);
  border-collapse: collapse;
  padding: 20px 10px 20px 3px;
  background-color: var(--color-blue-600);
  color: var(--color-grey-50);
`;

const Td = styled.td`
  border: 1px solid var(--color-grey-400);
  border-collapse: collapse;
  padding: 0px 15px 0px 5px;
`;
const Tr = styled.tr`
  &:nth-child(even) {
    background-color: var(--color-grey-200);
  }
  &:hover {
    background-color: var(--color-grey-300);
  }
`;

const DescriptionDiv = styled.div`
  padding: 3px;

  width: 500px;
  overflow-y: scroll;
`;

const TdForColors = styled.td`
  display: flex;
  padding: 0px 15px 0px 5px;
  border-bottom: 1px solid var(--color-grey-400);
`;

const Li = styled.li`
  list-style-type: none;
  text-align: start;
`;

const UlForColors = styled.ul`
  display: flex;
  height: 40px;
`;

const Select = styled.select`
  height: 25px;
`;

const TdForEditAnDelete = styled.td`
  border: 1px solid var(--color-grey-400);
`;
const DivForButtons = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

function ProductsTable() {
  const { isLoading, products, count, error } = useLoadProductsForTable();

  if (error) toast(error);
  if (isLoading) return <Spinner />;
  // console.log(products);
  return (
    <>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Type</Th>
            <Th>Category</Th>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Colors & sizes</Th>
            <Th>Price</Th>
            <Th>Discount</Th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <Tr key={product.id}>
                <Td>{product.id}</Td>
                <Td>{product.itemType}</Td>
                <Td>
                  {product.category.length > 1
                    ? product.category.map((categoryOption) => {
                        return (
                          <Li key={(product.id, categoryOption)}>
                            {categoryOption}
                          </Li>
                        );
                      })
                    : product.category}
                </Td>
                <Td>{product.name}</Td>
                <Td>
                  <DescriptionDiv>{product.description}</DescriptionDiv>
                </Td>
                <TdForColors>
                  <div>
                    {Object.entries(product.variants).map(([color, data]) => {
                      return (
                        <UlForColors key={(product.id, color)}>
                          <Li>{color}:</Li>
                          <Select id="sizes" name="sizes">
                            <option value="sizes">sizes</option>
                            {data?.sizes &&
                              Object.entries(data.sizes || {}).map(
                                ([size, quantity]) => {
                                  return (
                                    <option value={size} key={size}>
                                      {size}:{quantity} units
                                    </option>
                                  );
                                }
                              )}
                          </Select>
                        </UlForColors>
                      );
                    })}
                  </div>
                </TdForColors>
                <Td>{product.price} EUR</Td>
                <Td>{!product.discount ? "-" : `${product.discount}%`}</Td>
                <TdForEditAnDelete>
                  <DivForButtons>
                    <Button size="medium">
                      <span>Edit</span> <FaRegEdit />
                    </Button>
                    <Button type="secondary" size="medium">
                      <span>Delete</span>
                      <RiDeleteBin6Line />
                    </Button>
                  </DivForButtons>
                </TdForEditAnDelete>
              </Tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination itemsLength={count} />
    </>
  );
}

export default ProductsTable;
