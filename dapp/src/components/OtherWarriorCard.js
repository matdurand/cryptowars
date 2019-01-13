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

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const OtherWarriorCard = ({ warrior }) => (
  <Card>
    <Panel frame={"framed-golden-2"}>
      <Container>
        <p>
          {warrior.name}
          <br />
          Level {warrior.level} - {warrior.winCount} battle(s) won
        </p>
        <div>
          {warrior.onChallengeWarrior && (
            <Button onClick={warrior.onChallengeWarrior}>
              <p>Challenge</p>
            </Button>
          )}
          {warrior.hasBeenChallenged && (
            <Button disabled>
              <p>Challenge pending</p>
            </Button>
          )}
        </div>
      </Container>
    </Panel>
  </Card>
);

export default OtherWarriorCard;
