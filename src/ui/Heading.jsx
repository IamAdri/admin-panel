import styled, { css } from "styled-components";

const Heading = styled.h1`
  color: var(--color-grey-800);
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 500;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 400;
    `}
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 300;
    `}
    ${(props) =>
    props.as === "h4" &&
    css`
      font-weight: 600;
    `}
`;

export default Heading;
