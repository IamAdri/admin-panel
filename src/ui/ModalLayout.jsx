import styled, { css } from "styled-components";
const backgroundcolors = {
  blue: css`
    background-color: var(--color-blue-700);
    color: var(--color-grey-50);
  `,
  grey: css`
    background-color: var(--color-grey-50);
    color: var(--color-grey-800);
  `,
};

const positions = {
  primary: css`
    top: 30%;
    left: 40%;
  `,
  secondary: css`
    top: 30%;
    left: 35%;
  `,
};

const ModalLayout = styled.div.attrs((props) => ({
  $backgroundcolor: props.$backgroundcolor || "blue",
  $position: props.$position || "primary",
}))`
  display: none;
  position: absolute;
  padding: 3px;
  border: 1px solid;
  width: fit-content;

  flex-direction: column;

  ${(props) => backgroundcolors[props.$backgroundcolor]}
  ${(props) => positions[props.$position]}
`;

export default ModalLayout;
