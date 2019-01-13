import styled from "styled-components";

function orDefaultFrame(frame) {
  return frame ? frame : "framed";
}

const Panel = styled.div.attrs(({ frame }) => ({
  className: `rpgui-container ${orDefaultFrame(frame)}`
}))``;

export default Panel;
