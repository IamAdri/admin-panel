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
  const [hidePassword, setHidePassword] = useState(false);
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
      toast("credentials🎉");
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
  const handleUpdateAdminDetails = (data) => {
    mutateAdminDetails(data);
    mutateCredentials(data);
    setChangeAdminDetails(false);
  };
  let passwordDots;
  const handleShowPassword = (e) => {
    e.preventDefault();
    console.log(passwordRef.current.innerText);
    if (!changeAdminDetails) {
      console.log(Array.from(passwordRef.current.innerText));
      // passwordRef.current.innerText = <GoDotFill />;
      setHidePassword(true);
      passwordDots = Array.from(passwordRef.current.innerText);
      //  passwordDots = Array.from(passwordRef.current.innerText).map(() => {
      //    return <GoDotFill />;
      //  });
    }
    /* if (passwordRef.current)
      if (passwordRef.current.type === "password") {
        passwordRef.current.type = "text";
      } else {
        passwordRef.current.type = "password";
      }*/
  };
  if (passwordDots) console.log(passwordDots);
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
                  {!changeAdminDetails ? (
                    <span ref={passwordRef}>
                      {hidePassword && passwordDots
                        ? passwordDots.forEach(() => {
                            return (
                              <ul>
                                <li>
                                  <GoDotFill />
                                </li>
                              </ul>
                            );
                          })
                        : admin.password}
                    </span>
                  ) : (
                    <input
                      type="password"
                      ref={passwordRef}
                      id="password"
                      autoComplete="current-password"
                      name="password"
                      defaultValue={admin.password}
                      minLength="8"
                      {...register("password")}
                    ></input>
                  )}

                  <Button type="transparent" onClick={handleShowPassword}>
                    <FaRegEye size={17} />
                  </Button>
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
    </MainDiv>
  );
}

export default MyAccount;
