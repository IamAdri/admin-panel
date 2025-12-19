import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr;
`;

const Main = styled.main`
  padding: 4rem 5rem 4rem;
  color: var(--color-grey-800);
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      {sessionStorage.length === 0 ? null : <Sidebar />}
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
