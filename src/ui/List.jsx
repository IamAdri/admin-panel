import styled from "styled-components";

const Li = styled.li`
  list-style-type: none;
  text-align: start;
  display: flex;
  gap: 5px;
  align-items: center;
`;
function List({ children }) {
  return <Li>{children}</Li>;
}

export default List;
