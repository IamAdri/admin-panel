import styled, { css } from "styled-components";
const types = {
  primary: css`
    background-color: var(--color-blue-600);
    border: 1px solid var(--color-blue-700);
    color: var(--color-grey-50);

    &:hover {
      background-color: var(--color-blue-700);
    }
  `,
  secondary: css`
    background-color: var(--color-grey-600);
    border: 1px solid var(--color-grey-700);
    color: var(--color-grey-50);
    &:hover {
      background-color: var(--color-grey-700);
    }
  `,
  tertiary: css`
    background-color: var(--color-grey-50);
    border: 1px solid var(--color-grey-600);
  `,
};

const sizes = {
  fitContent: css`
    width: fit-content;
  `,
  medium: css`
    width: 75px;
  `,
  full: css`
    width: 100%;
  `,
};

const selfaligns = {
  center: css`
    align-self: center;
  `,
  end: css`
    align-self: end;
  `,
};
const Button = styled.button.attrs((props) => ({
  type: props.type || "primary",
  size: props.size || "fitContent",
  selfalign: props.selfalign || "center",
}))`
  padding: 5px 7px;
  border-radius: 7%;
  justify-content: center;
  align-items: center;
  display: flex;
  gap: 3px;

  &:disabled,
  &:disabled:hover {
    background-color: var(--color-grey-300);
    border: 1px solid var(--color-grey-400);
    cursor: not-allowed;
  }
  ${(props) => types[props.type]}
  ${(props) => sizes[props.size]}
  ${(props) => selfaligns[props.selfalign]}
`;

export default Button;
