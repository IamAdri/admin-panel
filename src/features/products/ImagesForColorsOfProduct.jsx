import { FaImages } from "react-icons/fa";
import Button from "../../ui/Button";
import List from "../../ui/List";
import styled from "styled-components";
import ModalLayout from "../../ui/ModalLayout";
import CloseButton from "../../ui/CloseButton";

const UlForColors = styled.ul`
  display: flex;
  gap: 5px;
`;
const ImagesList = styled.ul`
  display: grid;
  padding: 25px 55px;
  list-style: none;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 25px;
  row-gap: 15px;
`;
const ImageElement = styled.li`
  width: fit-content;
`;

function ImagesForColorsOfProduct({ product }) {
  const colors = Object.keys(product.variants);

  const handleOpenImages = (e) => {
    e.preventDefault();
    const images = e.target.closest("li").lastChild;
    images.style.display = "flex";
  };

  const handleCloseImages = (e) => {
    e.preventDefault();
    const images = e.target.closest("div");
    console.log(images);
    images.style.display = "none";
  };

  return (
    <UlForColors>
      {colors.map((color) => {
        return (
          <List key={(product.id, color)}>
            {color}:
            <Button type="tertiary" onClick={handleOpenImages}>
              <FaImages size={17} />
            </Button>
            <ModalLayout>
              <CloseButton handleCloseModal={handleCloseImages} />
              <ImagesList>
                {product.variants[color].length > 0
                  ? product.variants[color].map((image) => {
                      return (
                        <ImageElement key={image}>
                          <img
                            src={image}
                            width="150px"
                            alt="Product image"
                          ></img>
                        </ImageElement>
                      );
                    })
                  : "No images for this color."}
              </ImagesList>
            </ModalLayout>
          </List>
        );
      })}
    </UlForColors>
  );
}

export default ImagesForColorsOfProduct;
