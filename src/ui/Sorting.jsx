import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Select = styled.select`
  padding: 5px;
`;

function Sorting({ selectedSortOption, setSelectedSortOption }) {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <Select
      id="sortProducts"
      name="sortProducts"
      value={selectedSortOption}
      onChange={(e) => {
        e.preventDefault();
        setSelectedSortOption(e.target.value);
        searchParams.set("sorting", e.target.value);
        searchParams.set("page", 1);
        setSearchParams(searchParams);
      }}
    >
      <option value="default">Sort by</option>
      <option value="ascendingPrice">Ascending price</option>
      <option value="descendingPrice">Descending price</option>
      <option value="withDiscount">With discount</option>
      <option value="noDiscount">No discount</option>
      <option value="recentlyAdded">Recently added</option>
    </Select>
  );
}

export default Sorting;
