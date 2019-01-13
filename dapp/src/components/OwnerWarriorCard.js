import React from "react";
import Panel from "./Panel";
import Button from "./Button";
import styled from "styled-components";
import { CLAIM_FREE_WEAPON } from "../routers/routes";
import { Link } from "react-router-dom";

const Card = styled.div`
  margin-bottom: 10px;

  & > div {
    width: 100%;
    position: relative;
  }
`;

const OwnerWarriorCard = ({ warrior }) => (
  <Card>
    <Panel frame={"framed-golden-2"}>
      <p>
        {warrior.name}
        <br />
        Level {warrior.level} ({warrior.exp} xp) - {warrior.winCount} battle(s)
        won
        {warrior.freeItems && warrior.freeItems > 0 && (
          <React.Fragment>
            <br />
            <Link to={CLAIM_FREE_WEAPON.path.replace(":warrior", warrior.id)}>
              <Button>
                <p>Claim a free weapon</p>
              </Button>
            </Link>
          </React.Fragment>
        )}
      </p>
    </Panel>
  </Card>
);

export default OwnerWarriorCard;
