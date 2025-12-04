import styled from "styled-components";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, editProduct } from "../../services/apiProducts";
import toast from "react-hot-toast";
import { useRef } from "react";
import Form from "../../ui/Form";

const TdForEditAnDelete = styled.td`
  border: 1px solid var(--color-grey-400);
`;
const DivForButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px 0px;
`;

function ProductRowActions({ product }) {
  const modalRef = useRef(null);
  //Mutate function for editing product details
  const queryClient = useQueryClient();
  const { mutate: mutateForEdit } = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      console.log("Succes");
      queryClient.invalidateQueries({
        queryKey: ["productsForTable"],
      });
      toast("Product has been updated successfully🎉");
    },
    onError: (error) => {
      toast(`Error: ${error.message} Please try again!💥`);
    },
  });
  const handleOpenEditForm = () => {
    const editForm = modalRef.current.firstChild;
    editForm.style.display = "flex";
  };
  const handleCloseEditForm = () => {
    const editForm = modalRef.current.firstChild;
    editForm.style.display = "none";
  };

  //Mutate function for deleting product
  const { mutate: mutateForDelete } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productsForTable"],
      });
      toast("Product has been deleted successfully🎉");
    },
  });
  const handleDeleteProduct = (e) => {
    const productName = e.target.closest("tr").firstChild.textContent;
    mutateForDelete(productName);
  };

  //Submit edited product
  const onSubmit = (data) => {
    mutateForEdit(data);
    handleCloseEditForm();
  };
  return (
    <TdForEditAnDelete>
      <DivForButtons>
        <Button size="medium" onClick={handleOpenEditForm}>
          <span>Edit</span> <FaRegEdit />
        </Button>
        <div ref={modalRef}>
          <Modal handleCloseModal={handleCloseEditForm}>
            <Form product={product} onSubmit={onSubmit} />
          </Modal>
        </div>
        <Button type="secondary" size="medium" onClick={handleDeleteProduct}>
          <span>Delete</span>
          <RiDeleteBin6Line />
        </Button>
      </DivForButtons>
    </TdForEditAnDelete>
  );
}

export default ProductRowActions;
