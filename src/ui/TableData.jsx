import styled from "styled-components";

const Td = styled.td`
  border: 1px solid var(--color-grey-400);
  border-collapse: collapse;
  padding: 0px 15px 0px 5px;
`;

function TableData({ children }) {
  return <Td>{children}</Td>;
}

export default TableData;
