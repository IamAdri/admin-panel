import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Pagination from "../../ui/Pagination";
import toast from "react-hot-toast";
import { useLoadProductsForTable } from "./useLoadProductsForTable";
import { FaImages } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../services/apiProducts";

const Table = styled.table`
  border: 1px solid var(--color-grey-400);
  border-collapse: collapse;
  text-align: left;
  position: relative;
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
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const ImagesModal = styled.div`
  display: none;
  position: absolute;
  padding: 3px;
  top: 5%;
  right: 25%;
  left: 25%;
  border: 1px solid;
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
  const { mutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      console.log("Succes");
      queryClient.invalidateQueries({
        queryKey: ["productsForTable"],
      });
      toast("Product has been deleted successfully.");
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
                        return (
                          <Li key={(product.id, categoryOption)}>
                            {categoryOption}
                          </Li>
                        );
                      })
                    : product.category}
                </Td>

                <Td>
                  <DescriptionDiv>{product.description}</DescriptionDiv>
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
                          <ImagesModal>
                            <Button
                              type="tertiary"
                              selfalign="end"
                              onClick={handleCloseImages}
                            >
                              <IoMdClose size="15px" />
                            </Button>
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
                          </ImagesModal>
                        </Li>
                      );
                    })}
                  </UlForColors>
                </Td>
                <Td>{product.price} EUR</Td>
                <Td>{!product.discount ? "-" : `${product.discount}%`}</Td>
                <TdForEditAnDelete>
                  <DivForButtons>
                    <Button size="medium" selfalign="end">
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
