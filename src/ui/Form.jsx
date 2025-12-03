import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useLoadAllProducts } from "../features/products/useLoadAllProducts";
import { useState } from "react";
import SelectInput from "./SelectInput";
import Button from "./Button";

const MainDiv = styled.form`
  display: flex;
  gap: 15px;
  padding: 9px;
`;
const InputDiv = styled.div`
  display: flex;
  gap: 5px;
  align-items: start;
`;
const Submit = styled.input`
  background: none;
  color: inherit;
  border: none;
  cursor: pointer;
`;
const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const InvisibleField = styled.div`
  display: none;
`;

function Form({ product = null, onSubmit = null }) {
  const { register, handleSubmit } = useForm();
  const { products, isLoading, error } = useLoadAllProducts();
  const colors = product ? Object.keys(product.variants) : null;
  const [type, setType] = useState(product?.itemType || "shoes");
  const [category, setCategory] = useState(product?.category[0] || "heels");
  const [newCollection, setNewCollection] = useState(
    product?.category.length > 1 ? "yes" : "no"
  );
  const [firstColor, setFirstColor] = useState(colors ? colors[0] : "beige");
  const [secondColor, setSecondColor] = useState(colors ? colors[1] : "beige");
  if (isLoading) return;
  console.log(category);

  const categoryOptionsArray = [];
  const newCollectionOptions = ["no", "yes"];
  const typeOptionsArray = [];
  if (products.length > 0)
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
    products.length > 0
      ? products.flatMap((product) => {
          if (product?.variants) return Object.keys(product.variants).sort();
        })
      : "";

  // console.log(products);
  const colorsList = [...new Set(colorsAvailable)];
  //const onSubmit = () => {};
  return (
    <MainDiv onSubmit={handleSubmit(onSubmit)}>
      <ColumnDiv>
        <SelectInput
          optionValue={type}
          setOptionValue={setType}
          optionArray={typeOptionsArray}
          labelTitle="Type"
          register={{ ...register("itemType") }}
        />
        <SelectInput
          optionValue={category}
          setOptionValue={setCategory}
          optionArray={categoryOptionsArray}
          labelTitle="Category"
          register={{ ...register("category") }}
        />
        <SelectInput
          optionValue={newCollection}
          setOptionValue={setNewCollection}
          optionArray={newCollectionOptions}
          labelTitle="New collection"
          register={{ ...register("newCollection") }}
        />
        <InputDiv>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={product ? product.name : ""}
            placeholder={!product ? "name" : undefined}
            required
            {...register("name")}
          ></input>
        </InputDiv>
        <InputDiv>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            defaultValue={product ? product.description : ""}
            placeholder={!product ? "description" : undefined}
            rows="4"
            cols="30"
            required
            {...register("description")}
          ></textarea>
        </InputDiv>
      </ColumnDiv>
      <ColumnDiv>
        <SelectInput
          optionValue={firstColor}
          setOptionValue={setFirstColor}
          optionArray={colorsList}
          labelTitle="First color"
          register={{ ...register("color1") }}
        />
        <SelectInput
          optionValue={secondColor}
          setOptionValue={setSecondColor}
          optionArray={colorsList}
          labelTitle="Second color"
          register={{ ...register("color2") }}
        />
        <InputDiv>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            defaultValue={product ? product.price : ""}
            required
            {...register("price")}
          ></input>
          <span>EUR</span>
        </InputDiv>
        <InputDiv>
          <label htmlFor="discount">Discount</label>
          <input
            type="number"
            id="discount"
            name="discount"
            min="0"
            defaultValue={product ? product.discount : ""}
            {...register("discount")}
          ></input>
          <span>%</span>
        </InputDiv>
        {product && (
          <InvisibleField>
            <input
              type="text"
              id="productID"
              name="productID"
              defaultValue={product.id}
              {...register("productID")}
            ></input>
          </InvisibleField>
        )}
      </ColumnDiv>

      <Button selfalign="end">
        <Submit type="submit" />
      </Button>
    </MainDiv>
  );
}

export default Form;
