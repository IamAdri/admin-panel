import styled from "styled-components";
import Logo from "./Logo";

const StyledHeader = styled.header`
  background-color: var(--color-blue-700);
  color: var(--color-grey-50);
  padding: 0.3rem 2rem;
  grid-column: 1 / span 2;
`;

function Header() {
  return (
    <StyledHeader>
      <Logo />
    </StyledHeader>
  );
}

export default Header;
