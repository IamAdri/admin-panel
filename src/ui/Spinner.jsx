import styled from "styled-components";

const Spinner = styled.div`
  margin: 3.2rem auto 1.6rem;
  width: 60px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid var(--color-grey-800);
  border-right-color: var(--color-grey-600);
  animation: rotate 1s infinite linear;
  @keyframes rotate {
    to {
      transform: rotate(1turn);
    }
  }
`;

export default Spinner;
