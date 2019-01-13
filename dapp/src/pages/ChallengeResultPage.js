import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _find from "lodash/find";
import Center from "../components/Center";
import { LANDING } from "../routers/routes";
import Button from "../components/Button";
import styled from "styled-components";

const Lost = styled.div`
  color: #cf474a;
  font-size: 2em;
`;

const Won = styled.div`
  color: #7ebc47;
  font-size: 2em;
`;

class ChallengeResultPage extends React.Component {
  render() {
    const {
      challengerWarriorId,
      defenderWarriorId,
      defenderPower,
      challengerPower,
      winnerWarriorId
    } = this.props;
    const challengerWarrior = _find(
      this.props.otherWarriors,
      w => w.id === challengerWarriorId
    );
    const defenderWarrior = _find(
      this.props.ownerWarriors,
      w => w.id === defenderWarriorId
    );
    const winnerWarrior =
      winnerWarriorId === challengerWarriorId
        ? challengerWarrior
        : defenderWarrior;
    const victory = winnerWarriorId === defenderWarriorId;
    return (
      <div>
        <Center>
          <p>The fight is over!</p>
          {victory && <Won>You won</Won>}
          {!victory && <Lost>You lost</Lost>}
        </Center>
        <p>
          The attacker: {challengerWarrior.name} - Level{" "}
          {challengerWarrior.level}
        </p>
        <p>
          Your defending warrior: {defenderWarrior.name} - Level{" "}
          {defenderWarrior.level}
        </p>
        <br />

        <div>
          <p>Attacker dealt {challengerPower}</p>
          <p>Defender dealt {defenderPower}</p>
          <p>Winner is {winnerWarrior.name}, +25xp</p>
        </div>

        <Center>
          <Link to={LANDING.path}>
            <Button>
              <p>Done</p>
            </Button>
          </Link>
        </Center>
      </div>
    );
  }
}

const mapToState = state => ({
  ownerWarriors: state.warriors.ownerWarriors,
  otherWarriors: state.warriors.otherWarriors
});

const ChallengeResultPageContainer = connect(mapToState)(ChallengeResultPage);

export default ChallengeResultPageContainer;
