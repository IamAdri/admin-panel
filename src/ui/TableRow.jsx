import styled from "styled-components";

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: var(--color-grey-200);
  }
  &:hover {
    background-color: var(--color-grey-300);
  }
`;

function TableRow({ children }) {
  return <Tr>{children}</Tr>;
}

export default TableRow;
