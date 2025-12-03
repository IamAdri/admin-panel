import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { addNewProduct } from "../services/apiProducts";
import styled from "styled-components";
import Button from "./Button";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import Form from "./Form";

const ProductFormMain = styled.div`
  width: fit-content;
  margin: auto;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FormMain = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-grey-400);
  padding: 3px 3px 9px 3px;
`;

function ProductForm() {
  const [openForm, setOpenForm] = useState(false);
  const { reset } = useForm();
  const openFormButton = useRef(null);

  //Mutate function for adding new product
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
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

  //Open form for adding new product
  const handleOpenForm = () => {
    setOpenForm(true);
    openFormButton.current.style.display = "none";
  };

  //Close form for adding new product
  const handleCloseForm = () => {
    setOpenForm(false);
    openFormButton.current.style.display = "flex";
  };

  //Submit actions: send data, clear form and closing it
  const onSubmit = (data) => {
    mutate(data);
    reset();
    handleCloseForm();
  };
  return (
    <ProductFormMain>
      <Button size="full" ref={openFormButton} onClick={handleOpenForm}>
        Add new product
      </Button>
      {openForm && (
        <FormMain>
          <Button type="tertiary" selfalign="end" onClick={handleCloseForm}>
            <IoMdClose size="15px" />
          </Button>
          <Form onSubmit={onSubmit} />
        </FormMain>
      )}
    </ProductFormMain>
  );
}

export default ProductForm;
