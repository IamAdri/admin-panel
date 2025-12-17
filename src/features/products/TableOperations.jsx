import styled from "styled-components";
import Sorting from "../../ui/Sorting";
import { useState } from "react";
import FilterProducts from "./FilterProducts";

const StyledTableOperations = styled.div`
  display: flex;
  gap: 25px;
  justify-content: end;
  align-items: center;
  margin-bottom: 15px;
`;

function TableOperations() {
  const [selectedSortOption, setSelectedSortOption] = useState("default");
  return (
    <StyledTableOperations>
      <Sorting
        selectedSortOption={selectedSortOption}
        setSelectedSortOption={setSelectedSortOption}
      />
      <FilterProducts setSelectedSortOption={setSelectedSortOption} />
    </StyledTableOperations>
  );
}

export default TableOperations;
