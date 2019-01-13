import styled from "styled-components";

function orDefaultPadding(padding) {
  return padding ? padding : 10;
}

const Zone = styled.div`
  ${({ padding }) =>
    `
    padding-top: ${orDefaultPadding(padding)}px;
    padding-bottom: ${orDefaultPadding(padding)}px;
  `}
`;

export default Zone;
