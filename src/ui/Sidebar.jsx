import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledSidebar = styled.aside`
  background-color: var(--color-blue-50);
  min-height: 100vh;
  padding: 2rem;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  list-style-type: none;
`;

const StyledNavLink = styled(NavLink)`
  display: block;
  text-decoration: none;
  border-radius: 5px;
  color: var(--color-grey-800);
  width: 100%;
  padding: 3px 5px;
  &:active,
  &:hover,
  &.active:link,
  &.active:visited {
    background-color: var(--color-blue-700);
    color: var(--color-grey-50);
  }
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <nav>
        <NavList>
          <li>
            <StyledNavLink to="dashboard">Dashboard</StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="products">Products</StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="orders">Orders</StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="myaccount">My account</StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="signout">Sign Out</StyledNavLink>
          </li>
        </NavList>
      </nav>
    </StyledSidebar>
  );
}

export default Sidebar;
