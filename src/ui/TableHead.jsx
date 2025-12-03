import styled from "styled-components";

const Th = styled.th`
  border: 1px solid var(--color-grey-400);
  border-collapse: collapse;
  padding: 20px 10px 20px 3px;
  background-color: var(--color-blue-600);
  color: var(--color-grey-50);
`;
function TableHead({ children }) {
  return <Th>{children}</Th>;
}

export default TableHead;
