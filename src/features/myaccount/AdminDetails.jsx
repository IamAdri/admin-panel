import { useForm } from "react-hook-form";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdminDetails } from "../../services/apiAdmin";
import toast from "react-hot-toast";

const DetailsForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const InputDiv = styled.div`
  display: flex;
  gap: 5px;
`;
const HiddenInput = styled.input`
  display: none;
`;

function AdminDetails({ admin }) {
  const { register, handleSubmit } = useForm();
  const [changeAdminDetails, setChangeAdminDetails] = useState(false);
  //Mutate function for changing admin details
  const queryClient = useQueryClient();
  const { mutate: mutateAdminDetails } = useMutation({
    mutationFn: updateAdminDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["adminDetails"],
      });
      toast("Account details have been updated successfully🎉");
    },
    onError: (error) => {
      toast(`Error: ${error.message} Please try again!💥`);
    },
  });
  //Set state for admin details to change type from span to input when clicking on edit button
  const handleChangeAdminDetails = (e) => {
    e.preventDefault();
    setChangeAdminDetails(true);
  };
  //Submit changed details
  const handleUpdateAdminDetails = (data) => {
    mutateAdminDetails(data);
    setChangeAdminDetails(false);
  };
  return (
    <DetailsForm onSubmit={handleSubmit(handleUpdateAdminDetails)}>
      <InputDiv>
        <label htmlFor="firstName">
          <Heading as="h4">First name:</Heading>
        </label>
        {!changeAdminDetails ? (
          <span>{admin.firstName}</span>
        ) : (
          <input
            type="text"
            id="firstName"
            name="firstName"
            defaultValue={admin.firstName}
            {...register("firstName")}
          ></input>
        )}
      </InputDiv>
      <InputDiv>
        <label htmlFor="lastName">
          <Heading as="h4">Last name:</Heading>
        </label>
        {!changeAdminDetails ? (
          <span>{admin.lastName}</span>
        ) : (
          <input
            type="text"
            id="lastName"
            name="lastName"
            defaultValue={admin.lastName}
            {...register("lastName")}
          ></input>
        )}
        <HiddenInput
          type="text"
          id="adminID"
          name="adminID"
          defaultValue={admin.id}
          {...register("adminID")}
        ></HiddenInput>
      </InputDiv>
      <InputDiv>
        <label htmlFor="phone">
          <Heading as="h4">Phone number:</Heading>
        </label>
        {!changeAdminDetails ? (
          <span>{admin.phone}</span>
        ) : (
          <input
            type="tel"
            id="phone"
            name="phone"
            defaultValue={admin.phone}
            {...register("phone")}
          ></input>
        )}
      </InputDiv>
      {!changeAdminDetails ? (
        <Button
          selfalign="start"
          type="transparent"
          onClick={handleChangeAdminDetails}
        >
          <FaRegEdit size={25} />
        </Button>
      ) : (
        <Button selfalign="start">Change details</Button>
      )}
    </DetailsForm>
  );
}

export default AdminDetails;
