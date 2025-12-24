import styled from "styled-components";
import Button from "../../ui/Button";
import ModalLayout from "../../ui/ModalLayout";
import CloseButton from "../../ui/CloseButton";
import { useEffect, useRef, useState } from "react";

const DescriptionDiv = styled.div`
  padding: 3px;
  display: flex;
  gap: 10px;
  align-items: end;
  width: 500px;
`;
const DescriptionText = styled.p`
  width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const DescriptionTextModal = styled.p`
  padding: 0px 10px 10px 10px;
  width: 450px;
`;

function DescriptionSectionForProduct({ product }) {
  const descriptionRef = useRef(null);
  const [isButtonRefMounted, setIsButtonRefMounted] = useState(false);
  useEffect(() => {
    if (descriptionRef.current.offsetWidth < descriptionRef.current.scrollWidth)
      setIsButtonRefMounted(true);
  }, [descriptionRef]);
  //Opne/close description modal
  const handleOpenDescription = (e) => {
    const description = e.target.nextSibling;
    console.log(
      descriptionRef.current.offsetWidth < descriptionRef.current.scrollWidth
    );
    // console.log(descriptionRef.current.style.overflow === "hidden");
    description.style.display = "flex";
  };
  const handleCloseDescription = (e) => {
    const description = e.target.closest("div");
    description.style.display = "none";
  };
  return (
    <DescriptionDiv>
      <DescriptionText ref={descriptionRef}>
        {product.description}
      </DescriptionText>
      {isButtonRefMounted && (
        <Button $type="tertiary" onClick={handleOpenDescription}>
          Show more
        </Button>
      )}
      <ModalLayout>
        <CloseButton handleCloseModal={handleCloseDescription} />
        <DescriptionTextModal>{product.description}</DescriptionTextModal>
      </ModalLayout>
    </DescriptionDiv>
  );
}

export default DescriptionSectionForProduct;
