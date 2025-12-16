import styled from "styled-components";
import Heading from "../ui/Heading";
import { RxAvatar } from "react-icons/rx";
import { useRef, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import Button from "../ui/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdminDetails, updateAdminDetails } from "../services/apiAdmin";
import Spinner from "../ui/Spinner";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { updateCredentials } from "../services/apiAuth";
import { PiEyeClosedBold } from "react-icons/pi";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
`;
const SectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;
const DetailsForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputDiv = styled.div`
  display: flex;
  gap: 5px;
`;
const RowDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 55px;
`;
const Avatar = styled.img`
  width: 150px;
  border-radius: 100%;
`;
const HiddenInput = styled.input`
  display: none;
`;

function MyAccount() {
  const { register, handleSubmit } = useForm();
  const [changeAdminDetails, setChangeAdminDetails] = useState(false);
  const [changeAdminCredentials, setChangeAdminCredentials] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const passwordRef = useRef(null);

  const { isLoading, data, error } = useQuery({
    queryKey: ["adminDetails"],
    queryFn: getAdminDetails,
  });

  const queryClient = useQueryClient();
  const { mutate: mutateAdminDetails } = useMutation({
    mutationFn: updateAdminDetails,
    onSuccess: () => {
      console.log("Succes");
      queryClient.invalidateQueries({
        queryKey: ["adminDetails"],
      });
      toast("Account details have been updated successfully🎉");
    },
    onError: (error) => {
      toast(`Error: ${error.message} Please try again!💥`);
    },
  });
  const { mutate: mutateCredentials } = useMutation({
    mutationFn: updateCredentials,
    onSuccess: () => {
      console.log("Succes1");
      toast("Account credentials have been updated successfully🎉");
    },
    onError: (error) => {
      toast(`Error: ${error.message} Please try again!💥`);
    },
  });

  if (isLoading) return <Spinner />;

  const handleChangeAdminDetails = (e) => {
    e.preventDefault();
    //console.log(e.target.closest("div").querySelector("input").id);
    setChangeAdminDetails(true);
  };
  const handleChangeAdminCredentials = (e) => {
    e.preventDefault();
    setChangeAdminCredentials(true);
  };
  const handleUpdateAdminDetails = (data) => {
    mutateAdminDetails(data);
    setChangeAdminDetails(false);
  };
  const handleUpdateAdminCredentials = (data) => {
    mutateCredentials(data);
    setChangeAdminCredentials(false);
  };
  const handleShowPassword = (e) => {
    e.preventDefault();
    setHidePassword(false);
  };
  const handleHidePassword = (e) => {
    e.preventDefault();
    setHidePassword(true);
  };
  return (
    <MainDiv>
      <SectionDiv>
        <Heading as="h2">My account</Heading>
        <RowDiv>
          {<Avatar src="./avatar.jpg" alt="avatar" /> || (
            <RxAvatar size={150} />
          )}
          {data.map((admin) => {
            return (
              <DetailsForm
                onSubmit={handleSubmit(handleUpdateAdminDetails)}
                key={admin.id}
              >
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
          })}
        </RowDiv>
      </SectionDiv>
      <SectionDiv>
        {data.map((admin) => {
          return (
            <DetailsForm
              onSubmit={handleSubmit(handleUpdateAdminCredentials)}
              key={admin.id}
            >
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
                    ref={passwordRef}
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
        })}
      </SectionDiv>
    </MainDiv>
  );
}

export default MyAccount;
