import { useSearchParams } from "react-router-dom";
import Button from "./Button";
import styled from "styled-components";
import { GrNext, GrPrevious } from "react-icons/gr";
import { countPageNumber } from "../utils/helpers";

const StyledPagination = styled.div`
  display: flex;
  justify-content: end;
  gap: 25px;
  margin-top: 15px;
`;

function Pagination({ itemsLength }) {
  const [searchParams, setSearchParams] = useSearchParams();

  //Get current page
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const pageCount = countPageNumber(itemsLength);

  //Set previous page
  const prevPage = () => {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  };

  //Set next page
  const nextPage = () => {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  };
  return (
    <StyledPagination>
      <Button onClick={prevPage} disabled={currentPage === 1}>
        <GrPrevious />
        Previous page
      </Button>
      <Button onClick={nextPage} disabled={currentPage === pageCount}>
        Next page
        <GrNext />
      </Button>
    </StyledPagination>
  );
}

export default Pagination;
