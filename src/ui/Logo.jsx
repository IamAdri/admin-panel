import styled from "styled-components";

const Img = styled.img`
  width: 70px;
`;

function Logo() {
  return <Img src="/logo.png" />;
}

export default Logo;
