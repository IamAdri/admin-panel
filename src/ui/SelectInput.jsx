import styled from "styled-components";

const Div = styled.div`
  display: flex;
  gap: 5px;
`;

function SelectInput({
  optionValue,
  setOptionValue,
  optionArray,
  labelTitle,
  register,
}) {
  return (
    <Div>
      <label htmlFor={optionValue}>{labelTitle}</label>
      <select
        id={optionValue}
        name={optionValue}
        defaultValue={optionValue}
        onChange={(e) => {
          e.preventDefault();
          setOptionValue(e.target.value);
        }}
        {...register}
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
