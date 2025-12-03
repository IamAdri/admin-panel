import { IoMdClose } from "react-icons/io";
import styled from "styled-components";
import Button from "./Button";
const MainDiv = styled.div`
  display: none;
  position: absolute;
  padding: 3px;
  top: 5%;
  right: 25%;
  left: 25%;
  border: 1px solid;
  width: fit-content;
  background-color: var(--color-grey-50);
  flex-direction: column;
`;
function Modal({ handleCloseModal, children }) {
  return (
    <MainDiv>
      <Button type="tertiary" selfalign="end" onClick={handleCloseModal}>
        <IoMdClose size="15px" />
      </Button>
      {children}
    </MainDiv>
  );
}

export default Modal;
