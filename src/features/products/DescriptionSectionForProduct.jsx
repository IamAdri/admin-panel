import styled from "styled-components";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

const DescriptionDiv = styled.div`
  padding: 3px;
  display: flex;
  gap: 10px;
  align-items: end;
  width: 500px;
`;
const DescriptionText = styled.p`
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const DescriptionTextModal = styled.p`
  padding: 0px 10px 10px 10px;
`;

function DescriptionSectionForProduct({ product }) {
  const handleOpenDescription = (e) => {
    console.log(e.target.nextSibling);
    const description = e.target.nextSibling;
    description.style.display = "flex";
  };
  const handleCloseDescription = (e) => {
    const description = e.target.closest("div");
    description.style.display = "none";
  };
  return (
    <DescriptionDiv>
      <DescriptionText>{product.description}</DescriptionText>
      <Button type="tertiary" onClick={handleOpenDescription}>
        Show more
      </Button>
      <Modal handleCloseModal={handleCloseDescription}>
        <DescriptionTextModal>{product.description}</DescriptionTextModal>
      </Modal>
    </DescriptionDiv>
  );
}

export default DescriptionSectionForProduct;
