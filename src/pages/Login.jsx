import styled from "styled-components";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import { login } from "../services/apiAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import SpinnerSmall from "../ui/SpinnerSmall";

const MainDiv = styled.div`
  position: absolute;
  top: 30%;
  right: 40%;
  display: flex;
  flex-direction: column;
  gap: 35px;
  justify-content: center;
  align-items: center;
`;
const LoginSection = styled.form`
  display: flex;
  flex-direction: column;
  background-color: var(--color-grey-50);
  padding: 25px;
`;
const DetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
`;

const InputDiv = styled.div`
  display: flex;
  gap: 15px;
`;
const Submit = styled.input`
  background: none;
  color: inherit;
  border: none;
  cursor: pointer;
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //Mutate function for inserting correct email & password
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (user) => {
      sessionStorage.setItem("user", user.email);
      navigate("/dashboard");
      window.location.reload(false);
    },
    onError: () => {
      toast.error(
        "Provided email or password are incorrect. Please try again!💥"
      );
    },
  });

  //Login click event
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    mutate({ email, password });
  };
  return (
    <MainDiv>
      <Heading as="h2">Log in to your account</Heading>
      <LoginSection onSubmit={handleLogin}>
        <DetailsDiv>
          <InputDiv>
            <label htmlFor="email">
              <Heading as="h4">Email</Heading>
            </label>
            <input
              type="email"
              id="email"
              autoComplete="username"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </InputDiv>
          <InputDiv>
            <label htmlFor="password">
              <Heading as="h4">Password</Heading>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              minLength="8"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </InputDiv>
        </DetailsDiv>
        <Button $selfalign="start" disabled={email === "" || password === ""}>
          {!isLoading ? (
            <Submit type="submit" defaultValue="Log in" />
          ) : (
            <SpinnerSmall />
          )}
        </Button>
      </LoginSection>
    </MainDiv>
  );
}

export default Login;
