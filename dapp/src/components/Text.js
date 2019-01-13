import styled from "styled-components";

const Text = styled.div`
  color: white;

  ${({ centered }) =>
    centered &&
    `
    text-align: center;
  `}
`;

export default Text;
