import React from "react";
import styled from "styled-components";

const HeaderText = styled.h1`
  font-size: 250%;
`;

const HeaderSubtext = styled.h1`
  font-size: 175%;
`;

const PanelHeader = ({ title, subtitle }) => (
  <header>
    <HeaderText>{title}</HeaderText>
    <hr className="golden" />
    {subtitle && <HeaderSubtext>{subtitle}</HeaderSubtext>}
  </header>
);

export default PanelHeader;
