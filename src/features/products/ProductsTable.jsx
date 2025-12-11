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
  if (error) toast(error);
  if (isLoading) return <Spinner />;

  return (
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
  );
}

export default ProductsTable;

/*const Table = styled.table`
  border: 1px solid var(--color-grey-400);
  border-collapse: collapse;
  text-align: left;
  position: relative;
  justify-content: center;
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
  display: flex;
  gap: 10px;
  align-items: end;
  width: 500px;
`;
const DescriptionText = styled.p`
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const DescriptionTextModal = styled.p`
  padding: 0px 10px 10px 10px;
`;
const Li = styled.li`
  list-style-type: none;
  text-align: start;
  display: flex;
  gap: 5px;
  align-items: center;
`;

const UlForColors = styled.ul`
  display: flex;
  gap: 5px;
`;

const TdForEditAnDelete = styled.td`
  border: 1px solid var(--color-grey-400);
`;
const DivForButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px 0px;
`;
const EditDiv = styled.div`
  position: absolute;
  top: 5%;
  right: 25%;
  left: 15%;
  width: fit-content;
  background-color: var(--color-grey-50);
  flex-direction: column;
`;

const ImagesList = styled.ul`
  display: grid;
  padding: 25px 55px;
  list-style: none;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 25px;
  row-gap: 15px;
`;
const ImageElement = styled.li`
  width: fit-content;
`;

function ProductsTable() {
  const { isLoading, products, count, error } = useLoadProductsForTable();
  const nameRef = useRef(null);
  const queryClient = useQueryClient();
  const { mutate: mutateForEdit } = useMutation({
    mutationFn: addNewProduct,
    onSuccess: () => {
      console.log("Succes");
      queryClient.invalidateQueries({
        queryKey: ["productsForTable"],
      });
      toast("Product has been added successfully🎉");
    },
    onError: (error) => {
      toast(`Error: ${error.message} Please try again!💥`);
    },
  });
  const { mutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      console.log("Succes");
      queryClient.invalidateQueries({
        queryKey: ["productsForTable"],
      });
      toast("Product has been deleted successfully🎉");
    },
  });
  if (error) toast(error);
  if (isLoading) return <Spinner />;

  const handleOpenImages = (e) => {
    const images = e.target.closest("li").lastChild;
    images.style.display = "flex";
  };

  const handleCloseImages = (e) => {
    const images = e.target.closest("div");
    console.log(images);
    images.style.display = "none";
  };
  const handleOpenDescription = (e) => {
    console.log(e.target.nextSibling);
    const description = e.target.nextSibling;
    description.style.display = "flex";
  };
  const handleCloseDescription = (e) => {
    const description = e.target.closest("div");
    description.style.display = "none";
  };
  const handleDeleteProduct = (e) => {
    const productName = e.target.closest("tr").firstChild.textContent;
    mutate(productName);
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Type</Th>
            <Th>Category</Th>
            <Th>Description</Th>
            <Th>Colors & sizes</Th>
            <Th>Price</Th>
            <Th>Discount</Th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const colors = Object.keys(product.variants);
            console.log(colors);
            return (
              <Tr key={product.id}>
                <Td ref={nameRef}>{product.name}</Td>
                <Td>{product.itemType}</Td>
                <Td>
                  {product.category.length > 1
                    ? product.category.map((categoryOption) => {
                        const option =
                          categoryOption === "newCollection"
                            ? "new collection"
                            : categoryOption;
                        console.log(option);
                        return (
                          <Li key={(product.id, categoryOption)}>{option}</Li>
                        );
                      })
                    : product.category}
                </Td>

                <Td>
                  <DescriptionDiv>
                    <DescriptionText>{product.description}</DescriptionText>

                    <Button type="tertiary" onClick={handleOpenDescription}>
                      Show more
                    </Button>

                    <Modal handleCloseModal={handleCloseDescription}>
                      <DescriptionTextModal>
                        {product.description}
                      </DescriptionTextModal>
                    </Modal>
                  </DescriptionDiv>
                </Td>
                <Td>
                  <UlForColors>
                    {colors.map((color) => {
                      return (
                        <Li key={(product.id, color)}>
                          {color}:
                          <Button type="tertiary" onClick={handleOpenImages}>
                            <FaImages size={17} />
                          </Button>
                          <Modal handleCloseModal={handleCloseImages}>
                            <ImagesList>
                              {product.variants[color].length > 0
                                ? product.variants[color].map((image) => {
                                    return (
                                      <ImageElement key={image}>
                                        <img
                                          src={image}
                                          width="150px"
                                          alt="Product image"
                                        ></img>
                                      </ImageElement>
                                    );
                                  })
                                : "No images for this color."}
                            </ImagesList>
                          </Modal>
                        </Li>
                      );
                    })}
                  </UlForColors>
                </Td>
                <Td>{product.price} EUR</Td>
                <Td>{!product.discount ? "-" : `${product.discount}%`}</Td>
                <TdForEditAnDelete>
                  <DivForButtons>
                    <Button size="medium">
                      <span>Edit</span> <FaRegEdit />
                    </Button>

                    <Button
                      type="secondary"
                      size="medium"
                      onClick={handleDeleteProduct}
                    >
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
*/
