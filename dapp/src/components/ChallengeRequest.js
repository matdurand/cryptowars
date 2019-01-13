import React from "react";
import Panel from "./Panel";
import Button from "./Button";
import styled from "styled-components";

const Card = styled.div`
  margin-bottom: 10px;

  & > div {
    width: 100%;
    position: relative;
  }
`;

const ChallengeRequest = ({ challenge }) => (
  <Card>
    <Panel frame={"framed-golden"}>
      <p>
        Challenge from {challenge.challenger.name}
        <br />
        Level {challenge.challenger.level} ({challenge.challenger.exp} xp) -{" "}
        {challenge.challenger.winCount} battle(s) won
        <br />
      </p>
      <div>
        <Button onClick={challenge.accept}>
          <p>Accept challenge</p>
        </Button>
      </div>
    </Panel>
  </Card>
);

export default ChallengeRequest;
