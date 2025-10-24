import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { getProductsForFilterAndForm } from "../services/apiProducts";
import SelectInput from "./SelectInput";
import styled from "styled-components";
import InputField from "./InputField";
import Button from "./Button";

const ProductFormDiv = styled.div`
  width: 750px;
  margin: auto;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid;
`;
const Form = styled.form`
  display: flex;
  gap: 75px;
`;
const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const InputDiv = styled.div`
  display: flex;
  gap: 5px;
  align-items: start;
`;

function ProductForm() {
  const [type, setType] = useState("shoes");
  const [category, setCategory] = useState("heels");
  const [color, setColor] = useState("beige");
  const [size, setSize] = useState("34");
  const [openForm, setOpenForm] = useState(false);
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["productsForFilterAndForm"],
    queryFn: getProductsForFilterAndForm,
  });
  const openFormButton = useRef(null);
  const categoryOptionsArray = ["new collection"];
  const typeOptionsArray = [];
  if (products)
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

  const colorsAvailable =
    products &&
    products.flatMap((product) => {
      return Object.keys(product.variants).sort();
    });

  const colorsList = [...new Set(colorsAvailable)];
  const sizesAvailable = [34, 35, 36, 37, 38, 39, 40, 41];
  const handleOpenForm = () => {
    setOpenForm(true);
    openFormButton.current.style.display = "none";
  };
  return (
    <ProductFormDiv>
      <Button size="full" ref={openFormButton} onClick={handleOpenForm}>
        Add new product
      </Button>
      {openForm && (
        <Form>
          <ColumnDiv>
            <InputField inputValue="id" inputType="text" />
            <SelectInput
              optionValue={type}
              setOptionValue={setType}
              optionArray={typeOptionsArray}
              labelTitle="Type"
            />
            <SelectInput
              optionValue={category}
              setOptionValue={setCategory}
              optionArray={categoryOptionsArray}
              labelTitle="Category"
            />
            <InputField inputValue="name" inputType="text" />
            <InputDiv>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="description"
                rows="4"
                cols="30"
              ></textarea>
            </InputDiv>
          </ColumnDiv>

          <ColumnDiv>
            <SelectInput
              optionValue={color}
              setOptionValue={setColor}
              optionArray={colorsList}
              labelTitle="Colors"
            />
            <SelectInput
              optionValue={size}
              setOptionValue={setSize}
              optionArray={sizesAvailable}
              labelTitle="Sizes"
            />
            <InputDiv>
              <InputField inputValue="price" inputType="number" minValue="0" />
              <span>EUR</span>
            </InputDiv>
            <InputDiv>
              <InputField
                inputValue="discount"
                inputType="number"
                minValue="0"
              />
              <span>%</span>
            </InputDiv>
          </ColumnDiv>
        </Form>
      )}
    </ProductFormDiv>
  );
}

export default ProductForm;
/*  <label for="productId">Product ID</label>
      <input
        type="text"
        id="productId"
        name="productId"
        placeholder="productId"
      ></input>
      <label for="name">Name</label>
      <input type="text" id="name" name="name" placeholder="name"></input>
       <label for="price">Price</label>
      <input
        type="number"
        id="price"
        name="price"
        placeholder="price"
        min="0"
      ></input>
      <label for="discount">Discount</label>
      <input
        type="number"
        id="discount"
        name="discount"
        placeholder="discount"
        min="0"
      ></input>*/
