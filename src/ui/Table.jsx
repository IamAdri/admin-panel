import styled from "styled-components";

const MainDiv = styled.table`
  border: 1px solid var(--color-grey-400);
  border-collapse: collapse;
  text-align: left;
  position: relative;
  justify-content: center;
`;

function Table({ children }) {
  return <MainDiv>{children}</MainDiv>;
}

export default Table;
