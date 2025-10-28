import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import {
  addNewProduct,
  getProductsForFilterAndForm,
} from "../services/apiProducts";
import SelectInput from "./SelectInput";
import styled from "styled-components";
import InputField from "./InputField";
import Button from "./Button";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import Spinner from "./Spinner";
import toast from "react-hot-toast";

const ProductFormMain = styled.div`
  width: fit-content;
  margin: auto;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-grey-400);
  padding: 3px 3px 9px 3px;
`;
const Form = styled.form`
  display: flex;
  gap: 150px;
  margin: 0px 15px;
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
const Submit = styled.input`
  background: none;
  color: inherit;
  border: none;
  cursor: pointer;
`;

function ProductForm() {
  const [type, setType] = useState("shoes");
  const [category, setCategory] = useState("heels");
  const [firstColor, setFirstColor] = useState("beige");
  const [secondColor, setSecondColor] = useState("beige");
  const [openForm, setOpenForm] = useState(false);
  const { register, setValue, watch, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["productsForFilterAndForm"],
    queryFn: getProductsForFilterAndForm,
  });
  const { mutate } = useMutation({
    mutationFn: addNewProduct,
    onSuccess: () => {
      console.log("Succes");
      queryClient.invalidateQueries({
        queryKey: ["productsForTable"],
      });
      toast("Product has been added successfully🎉");
    },
  });
  const openFormButton = useRef(null);
  const categoryOptionsArray = ["new collection"];
  const typeOptionsArray = [];
  if (isLoading) return <Spinner />;
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

  const colorsAvailable = products
    ? products.flatMap((product) => {
        if (product?.variants) return Object.keys(product.variants).sort();
      })
    : "";

  const colorsList = [...new Set(colorsAvailable)];
  // const sizesAvailable = [34, 35, 36, 37, 38, 39, 40, 41, "no size"];
  const handleOpenForm = () => {
    setOpenForm(true);
    openFormButton.current.style.display = "none";
  };
  const handleCloseForm = () => {
    setOpenForm(false);
    openFormButton.current.style.display = "flex";
  };

  const onSubmit = (data) => {
    mutate(data);
  };
  return (
    <ProductFormMain>
      <Button size="full" ref={openFormButton} onClick={handleOpenForm}>
        Add new product
      </Button>
      {openForm && (
        <FormDiv>
          <Button type="tertiary" selfalign="end" onClick={handleCloseForm}>
            <IoMdClose size="15px" />
          </Button>
          <Form onSubmit={handleSubmit(onSubmit)}>
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
              <InputDiv>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="name"
                  {...register("name")}
                ></input>
              </InputDiv>
              <InputDiv>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="description"
                  rows="4"
                  cols="30"
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
                  {...register("discount")}
                ></input>
                <span>%</span>
              </InputDiv>
            </ColumnDiv>
            <Button selfalign="end">
              <Submit type="submit" />
            </Button>
          </Form>
        </FormDiv>
      )}
    </ProductFormMain>
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
//<InputField inputValue="id" inputType="text" />
/*<InputField
                inputValue="name"
                inputType="text"
                register={{ ...register("name") }}
              />
              <SelectInput
                optionValue={size}
                setOptionValue={setSize}
                optionArray={sizesAvailable}
                labelTitle="Sizes"
                //register={{ ...register("size") }}
              />*/
