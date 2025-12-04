import styled from "styled-components";
import Heading from "../ui/Heading";

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
const DetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputDiv = styled.div`
  display: flex;
  gap: 5px;
`;

function MyAccount() {
  return (
    <form>
      <MainDiv>
        <SectionDiv>
          <Heading as="h2">My account</Heading>
          <DetailsDiv>
            <InputDiv>
              <label htmlFor="firstName">
                <Heading as="h4">First name</Heading>
              </label>
              <input type="text" id="firstName" name="firstName"></input>
            </InputDiv>
            <InputDiv>
              <label htmlFor="lastName">
                <Heading as="h4">Last name</Heading>
              </label>
              <input type="text" id="lastName" name="lastName"></input>
            </InputDiv>
            <InputDiv>
              <label htmlFor="email">
                <Heading as="h4">Email address</Heading>
              </label>
              <input type="email" id="email" name="email"></input>
            </InputDiv>
            <InputDiv>
              <label htmlFor="phone">
                <Heading as="h4">Phone number</Heading>
              </label>
              <input type="tel" id="phone" name="phone"></input>
            </InputDiv>
          </DetailsDiv>
        </SectionDiv>
        <SectionDiv>
          <Heading as="h2">Account credentials</Heading>
          <DetailsDiv>
            <InputDiv>
              <label htmlFor="username">
                <Heading as="h4">Username</Heading>
              </label>
              <input type="text" id="username" name="username"></input>
            </InputDiv>
            <InputDiv>
              <label htmlFor="password">
                <Heading as="h4">Password</Heading>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                minLength="8"
              ></input>
            </InputDiv>
          </DetailsDiv>
        </SectionDiv>
      </MainDiv>
    </form>
  );
}

export default MyAccount;
