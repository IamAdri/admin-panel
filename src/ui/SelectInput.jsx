import styled from "styled-components";

const Div = styled.div`
  display: flex;
  gap: 5px;
`;

function SelectInput({ optionValue, setOptionValue, optionArray, labelTitle }) {
  return (
    <Div>
      <label htmlFor={optionValue}>{labelTitle}</label>
      <select
        id={optionValue}
        name={optionValue}
        value={optionValue}
        onChange={(e) => {
          e.preventDefault();
          setOptionValue(e.target.value);
        }}
      >
        {optionArray.map((optionValue) => {
          return (
            <option key={optionValue} value={optionValue}>
              {optionValue}
            </option>
          );
        })}
      </select>
    </Div>
  );
}

export default SelectInput;
