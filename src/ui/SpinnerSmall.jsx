import styled from "styled-components";

const SpinnerSmall = styled.div`
  width: 20px;
  height: 20px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 3px solid var(--color-grey-800);
  border-right-color: var(--color-grey-600);
  animation: rotate 1s infinite linear;
  @keyframes rotate {
    to {
      transform: rotate(1turn);
    }
  }
`;

export default SpinnerSmall;
