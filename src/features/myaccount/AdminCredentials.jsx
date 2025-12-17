import styled from "styled-components";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import { PiEyeClosedBold } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCredentials } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";

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

function AdminCredentials({ admin }) {
  const { register, handleSubmit } = useForm();
  const [changeAdminCredentials, setChangeAdminCredentials] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  //Mutate function for changing admin credentials
  const queryClient = useQueryClient();
  const { mutate: mutateCredentials } = useMutation({
    mutationFn: updateCredentials,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["adminDetails"],
      });
      toast("Account credentials have been updated successfully🎉");
    },
    onError: (error) => {
      toast(
        `Error: ${error.message} Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character. Please try again!💥`
      );
    },
  });

  //Set state for admin credentials to change type from span to input when clicking on edit button
  const handleChangeAdminCredentials = (e) => {
    e.preventDefault();
    setChangeAdminCredentials(true);
  };
  //Set state to show or hide password
  const handleShowPassword = (e) => {
    e.preventDefault();
    setHidePassword(false);
  };
  const handleHidePassword = (e) => {
    e.preventDefault();
    setHidePassword(true);
  };
  //Submit changed credentials
  const handleUpdateAdminCredentials = (data) => {
    mutateCredentials(data);
    setChangeAdminCredentials(false);
  };
  return (
    <DetailsForm onSubmit={handleSubmit(handleUpdateAdminCredentials)}>
      <InputDiv>
        <label htmlFor="email">
          <Heading as="h4">Email address:</Heading>
        </label>
        <span>{admin.email}</span>
      </InputDiv>
      <InputDiv>
        <label htmlFor="password">
          <Heading as="h4">Password:</Heading>
        </label>
        {!changeAdminCredentials ? (
          hidePassword ? (
            <span>
              {Array.from(admin.password).map((dot) => {
                return (
                  <span key={`${Math.random()}-${dot}`}>
                    <GoDotFill size={9} />
                  </span>
                );
              })}
            </span>
          ) : (
            <span>{admin.password}</span>
          )
        ) : (
          <input
            type={hidePassword ? "password" : "text"}
            id="password"
            autoComplete="current-password"
            name="password"
            defaultValue={admin.password}
            minLength="8"
            {...register("password")}
          ></input>
        )}
        {hidePassword && (
          <Button type="transparent" onClick={handleShowPassword}>
            <FaRegEye size={17} />
          </Button>
        )}
        {!hidePassword && (
          <Button type="transparent" onClick={handleHidePassword}>
            <PiEyeClosedBold size={17} />
          </Button>
        )}
      </InputDiv>
      <HiddenInput
        type="text"
        id="adminID"
        name="adminID"
        defaultValue={admin.id}
        {...register("adminID")}
      ></HiddenInput>
      {!changeAdminCredentials ? (
        <Button
          selfalign="start"
          type="transparent"
          onClick={handleChangeAdminCredentials}
        >
          <FaRegEdit size={25} />
        </Button>
      ) : (
        <Button selfalign="start">Change details</Button>
      )}
    </DetailsForm>
  );
}

export default AdminCredentials;
