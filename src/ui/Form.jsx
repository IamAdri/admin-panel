import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import { useLoadAllProducts } from "../features/products/useLoadAllProducts";
import { useState } from "react";
import SelectInput from "./SelectInput";
import Button from "./Button";
import toast from "react-hot-toast";
import ImagesForColorsOfProduct from "../features/products/ImagesForColorsOfProduct";

const MainDiv = styled.form`
  display: flex;
  gap: 15px;
  padding: 9px;
`;
const InputDiv = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
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
const ChangeImagesDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  ${({ $active }) =>
    $active
      ? css`
          border: 2px solid var(--color-blue-700);
          padding: 3px;
        `
      : ""}
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
  const [isProductForImg, setIsProductForImg] = useState(
    product ? true : false
  );
  if (isLoading) return;

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

  const colorsList = [...new Set(colorsAvailable)];

  const handleChangeImages = (e) => {
    e.preventDefault();
    if (e.target.textContent === "Change images") {
      setIsProductForImg(false);
      e.target.textContent = "Cancel";
    } else {
      setIsProductForImg(true);
      e.target.textContent = "Change images";
    }
  };
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
        {product && (
          <InputDiv>
            <span>Images:</span>
            <ImagesForColorsOfProduct product={product} />
          </InputDiv>
        )}
        <ChangeImagesDiv $active={product && !isProductForImg}>
          {product && (
            <InputDiv>
              <Button type="tertiary" onClick={handleChangeImages}>
                Change images
              </Button>
            </InputDiv>
          )}
          {!isProductForImg && (
            <>
              <InputDiv>
                <label htmlFor="imagesFirstColor">
                  Images for first color (2-4 images)
                </label>
                <input
                  type="file"
                  id="imagesFirstColor"
                  name="imagesFirstColor"
                  required
                  multiple
                  {...register("imagesFirstColor", {
                    validate: (value) =>
                      (value.length >= 2 && value.length <= 4) ||
                      toast("Please upload from 2 to 4 images for each color!"),
                  })}
                ></input>
              </InputDiv>
              <InputDiv>
                <label htmlFor="imagesSecondColor">
                  Images for second color (2-4 images)
                </label>
                <input
                  type="file"
                  id="imagesSecondColor"
                  name="imagesSecondColor"
                  required
                  multiple
                  {...register("imagesSecondColor", {
                    validate: (value) =>
                      (value.length >= 2 && value.length <= 4) ||
                      toast("Please upload from 2 to 4 images for each color!"),
                  })}
                ></input>
              </InputDiv>
            </>
          )}
        </ChangeImagesDiv>

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
