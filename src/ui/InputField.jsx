import styled from "styled-components";

const InputDiv = styled.div`
  display: flex;
  gap: 5px;
`;

function InputField({ inputValue, inputType, minValue = null }) {
  const inputTitle = inputValue.slice(0, 1).toUpperCase() + inputValue.slice(1);
  return (
    <InputDiv>
      <label htmlFor={inputValue}>{inputTitle}</label>
      <input
        type={inputType}
        id={inputValue}
        name={inputValue}
        min={minValue}
        defaultValue={minValue}
      ></input>
    </InputDiv>
  );
}

export default InputField;
