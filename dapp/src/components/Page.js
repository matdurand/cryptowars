import React from "react";
import styled from "styled-components";

const Overflow = styled.div.attrs({ className: "rpgui-content" })`
  overflow-y: scroll;
`;

const Content = styled.div`
  p {
    color: white;
  }
`;

const CenterContainer = styled.div.attrs({
  className: "rpgui-container framed"
})`
  margin: 0 auto;
  max-width: 900px;
  min-width: 300px;
  position: relative;
`;

const Page = props => (
  <Overflow>
    <Content>
      <CenterContainer>{props.children}</CenterContainer>
    </Content>
  </Overflow>
);

export default Page;
