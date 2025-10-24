import styled from "styled-components";
import FilterProducts from "../../ui/FilterProducts";
import Sorting from "../../ui/Sorting";
import { useState } from "react";

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
