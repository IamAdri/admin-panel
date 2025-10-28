import { useEffect, useState } from "react";
import Button from "./Button";
import styled from "styled-components";
import Heading from "./Heading";
import Range from "./Range";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductsForFilterAndForm } from "../services/apiProducts";

const Modal = styled.div`
  border: 1px solid;
  position: absolute;
  z-index: 1;
  top: 200px;
  background-color: var(--color-grey-50);
  display: flex;
  flex-direction: column;
  align-items: end;
  padding: 10px 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormDiv = styled.div`
  display: flex;
  gap: 55px;
`;

const FilterCategory = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterOptionsDiv = styled.div`
  margin-left: 75px;
  margin-bottom: 15px;
`;

const FilterOption = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
`;

const ViewMoreButton = styled.div`
  cursor: pointer;
`;

const Submit = styled.input`
  background: none;
  color: inherit;
  border: none;
  cursor: pointer;
`;

function FilterProducts({ setSelectedSortOption }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openedModal, setOpenedModal] = useState(false);
  const [colorsShown, setColorsShown] = useState(false);
  const [maxPrice, setMaxPrice] = useState(0);
  const { register, setValue, watch, handleSubmit, reset } = useForm({
    defaultValues: {
      minPrice: 0,
      maxPrice: maxPrice,
    },
  });

  //Open/close filter model
  const handleOpenFilterModal = () => {
    setOpenedModal(!openedModal);
  };

  //Change minPrice and maxPrice value based on user interaction with price range
  const minValue = watch("minPrice");
  const maxValue = watch("maxPrice");

  //Get products from supabase with react query
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["productsForFilterAndForm"],
    queryFn: getProductsForFilterAndForm,
  });

  //Update default value of maxPrice
  useEffect(() => {
    if (maxPrice) {
      reset({
        minPrice: 0,
        maxPrice: maxPrice,
      });
    }
  }, [maxPrice, reset]);

  if (isLoading) return;

  //Get types and categories for filter
  const categoryOptionsArray = ["new collection"];
  const typeOptionsArray = [];
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
  //Get biggest price from products
  products?.length > 0 &&
    products.forEach((product) => {
      if (product.price > maxPrice) setMaxPrice(product.price);
    });

  const sizesAvailable = [34, 35, 36, 37, 38, 39, 40, 41];

  //Get colors available from products and display on filter modal
  const colorsAvailable = products
    .flatMap((product) => {
      if (product?.variants) return Object.keys(product?.variants) || "";
    })
    .sort();
  const colorsDisplayed = [...new Set(colorsAvailable)].slice(0, 5);
  const colorsViewMore = [...new Set(colorsAvailable)];
  const colors = colorsShown ? colorsViewMore : colorsDisplayed;
  const handleViewMoreColors = () => {
    setColorsShown(!colorsShown);
  };

  //Submit selected filter options and update products displayed in ProductsTable
  const onSubmit = (data) => {
    const urlSearchParams = new URLSearchParams(searchParams);
    urlSearchParams.set("filter", data);
    setSearchParams(urlSearchParams);
    searchParams.set("page", 1);
    searchParams.set("sorting", "default");
    setSearchParams(searchParams);
    setSearchParams({ filter: JSON.stringify(data) });
    setSelectedSortOption("default");
    setOpenedModal(false);
  };

  return (
    <>
      <Button type="tertiary" size="medium" onClick={handleOpenFilterModal}>
        Filter
      </Button>
      {openedModal && (
        <Modal>
          <Button
            type="tertiary"
            selfalign="end"
            onClick={() => setOpenedModal(false)}
          >
            <IoMdClose size="15px" />
          </Button>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormDiv>
              <div>
                <FilterCategory>
                  <Heading as="h4">Type</Heading>
                  <FilterOptionsDiv>
                    {typeOptionsArray.map((type) => {
                      return (
                        <FilterOption key={type}>
                          <input
                            type="checkbox"
                            id={type}
                            name={type}
                            value={type}
                            {...register("type")}
                          />
                          <label htmlFor={type}>{type}</label>
                        </FilterOption>
                      );
                    })}
                  </FilterOptionsDiv>
                </FilterCategory>
                <FilterCategory>
                  <Heading as="h4">Category</Heading>
                  <FilterOptionsDiv>
                    {categoryOptionsArray.map((categoryOption) => {
                      return (
                        <FilterOption key={categoryOption}>
                          <input
                            type="checkbox"
                            id={categoryOption}
                            name={categoryOption}
                            value={
                              categoryOption === "new collection"
                                ? "newCollection"
                                : categoryOption
                            }
                            {...register("category")}
                          />
                          <label htmlFor={categoryOption}>
                            {categoryOption}
                          </label>
                        </FilterOption>
                      );
                    })}
                  </FilterOptionsDiv>
                </FilterCategory>
                <FilterCategory>
                  <Heading as="h4">Price range</Heading>
                  <FilterOptionsDiv>
                    <Range
                      maxPrice={maxPrice}
                      minValue={minValue}
                      maxValue={maxValue}
                      setValue={setValue}
                    />
                  </FilterOptionsDiv>
                </FilterCategory>
              </div>
              <div>
                <FilterCategory>
                  <Heading as="h4">Sizes</Heading>
                  <FilterOptionsDiv>
                    {sizesAvailable.map((size) => {
                      return (
                        <FilterOption key={size}>
                          <input
                            type="checkbox"
                            id={size}
                            name={size}
                            value={size}
                            {...register("size")}
                          />
                          <label htmlFor={size}>{size}</label>
                        </FilterOption>
                      );
                    })}
                  </FilterOptionsDiv>
                </FilterCategory>
              </div>
              <div>
                <FilterCategory>
                  <Heading as="h4">Colors</Heading>
                  <FilterOptionsDiv>
                    {colors.map((color) => {
                      return (
                        <FilterOption key={color}>
                          <input
                            type="checkbox"
                            id={color}
                            name={color}
                            value={color}
                            {...register("color")}
                          />
                          <label htmlFor={color}>{color}</label>
                        </FilterOption>
                      );
                    })}
                    <ViewMoreButton onClick={handleViewMoreColors}>
                      {colorsShown ? "View less" : "View more"}
                    </ViewMoreButton>
                  </FilterOptionsDiv>
                </FilterCategory>
              </div>
            </FormDiv>
            <Button selfalign="end">
              <Submit type="submit" />
            </Button>
          </Form>
        </Modal>
      )}
    </>
  );
}

export default FilterProducts;
/* const [searchParams, setSearchParams] = useSearchParams();
  const [openedModal, setOpenedModal] = useState(false);
  const [colorsShown, setColorsShown] = useState(false);
  const [maxPrice, setMaxPrice] = useState(0);
  const { register, setValue, watch, handleSubmit, reset } = useForm({
    defaultValues: {
      minPrice: 0,
      maxPrice: maxPrice,
    },
  });

  //Open/close filter model
  const handleOpenFilterModal = () => {
    setOpenedModal(!openedModal);
  };

  //Change minPrice and maxPrice value based on user interaction with price range
  const minValue = watch("minPrice");
  const maxValue = watch("maxPrice");

  //Get products from supabase with react query
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["productsForFilter"],
    queryFn: getProductsForFilter,
  });

  //Update default value of maxPrice
  useEffect(() => {
    if (maxPrice) {
      reset({
        minPrice: 0,
        maxPrice: maxPrice,
      });
    }
  }, [maxPrice, reset]);

  if (isLoading) return;

  //Get types and categories for filter
  const categoryOptionsArray = ["new collection"];
  const typeOptionsArray = [];
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
  //Get biggest price from products
  products?.length > 0 &&
    products.forEach((product) => {
      if (product.price > maxPrice) setMaxPrice(product.price);
    });

  const sizesAvailable = [34, 35, 36, 37, 38, 39, 40, 41];

  //Get colors available from products and display on filter modal
  const colorsAvailable = products.flatMap((product) => {
    return Object.keys(product.variants);
  });
  const colorsDisplayed = [...new Set(colorsAvailable)].slice(0, 5);
  const colorsViewMore = [...new Set(colorsAvailable)];
  const colors = colorsShown ? colorsViewMore : colorsDisplayed;
  const handleViewMoreColors = () => {
    setColorsShown(!colorsShown);
  };

  //Submit selected filter options and update products displayed in ProductsTable
  const onSubmit = (data) => {
    const urlSearchParams = new URLSearchParams(searchParams);
    urlSearchParams.set("filter", data);
    setSearchParams(urlSearchParams);
    searchParams.set("page", 1);
    searchParams.set("sorting", "default");
    setSearchParams(searchParams);
    setSearchParams({ filter: JSON.stringify(data) });
    setSelectedSortOption("default");
    setOpenedModal(false);
  };
  console.log(searchParams.get("sorting"));*/
