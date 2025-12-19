import { IoMdClose } from "react-icons/io";
import Button from "./Button";

function CloseButton({ handleCloseModal }) {
  return (
    <Button $type="tertiary" $selfalign="end" onClick={handleCloseModal}>
      <IoMdClose size="15px" />
    </Button>
  );
}

export default CloseButton;
