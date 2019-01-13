import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _find from "lodash/find";
import Center from "../components/Center";
import { LANDING } from "../routers/routes";
import Button from "../components/Button";

class AcceptChallengePage extends React.Component {
  state = {
    selectedWeaponId: null
  };

  static getDerivedStateFromProps(props, state) {
    if (state.selectedWeaponId === null || state.selectedWarriorId === null) {
      const newState = {};
      if (props.ownerWeapons && props.ownerWeapons.length > 0) {
        newState.selectedWeaponId = props.ownerWeapons[0].id;
      }
      return newState;
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.changeSelectedWeapon = this.changeSelectedWeapon.bind(this);
    this.onAcceptChallenge = this.onAcceptChallenge.bind(this);
  }

  componentDidMount() {
    this.props.waitForChallengeResultAndOpenSummary({
      watchingWarriorId: this.props.defenderWarriorId
    });

    const challengerWarrior = _find(
      this.props.otherWarriors,
      w => w.id === this.props.challengerWarriorId
    );
    this.props.getWeaponDetails({
      weaponId: challengerWarrior.challengedWithWeaponId
    });
  }

  componentWillUnmount() {
    this.props.stopWaitingForChallenges();
  }

  changeSelectedWeapon(event) {
    this.setState({
      selectedWeaponId: event.target.value
    });
  }

  onAcceptChallenge() {
    this.props.acceptChallenge({
      defenderWarriorId: this.props.defenderWarriorId,
      defenderWeaponId: this.state.selectedWeaponId,
      challengerWarriorId: this.props.challengerWarriorId
    });
  }

  render() {
    const {
      challengerWarriorId,
      defenderWarriorId,
      ownerWeapons,
      challengeWeapon
    } = this.props;
    const challengerWarrior = _find(
      this.props.otherWarriors,
      w => w.id === challengerWarriorId
    );
    const defenderWarrior = _find(
      this.props.ownerWarriors,
      w => w.id === defenderWarriorId
    );
    return (
      <div>
        <p>
          The attacker: {challengerWarrior.name} - Level{" "}
          {challengerWarrior.level}
          <br />
          {challengeWeapon && (
            <span>
              Using weapon: {challengeWeapon.name} (Attack power:{" "}
              {challengeWeapon.attackPower})
            </span>
          )}
        </p>
        <br />
        <hr />
        <br />

        <p>
          Your defending warrior: {defenderWarrior.name} - Level{" "}
          {defenderWarrior.level}
        </p>
        <br />
        <hr />
        <br />

        <p>Select your weapon for this fight:</p>
        <div>
          {ownerWeapons.map((weapon, idx) => (
            <div key={idx}>
              <input
                id={`weapon${weapon.id}`}
                checked={weapon.id === this.state.selectedWeaponId}
                className="rpgui-radio golden"
                name="weapon"
                value={weapon.id}
                type="radio"
                data-rpguitype="radio"
                onChange={this.changeSelectedWeapon}
              />
              <label
                id={`labelweapon${weapon.id}`}
                htmlFor={`weapon${weapon.id}`}
              >
                {weapon.name} - Attack power: {weapon.attackPower}
              </label>
            </div>
          ))}
        </div>
        <br />
        <hr />
        <br />

        <Center>
          <Link to={LANDING.path}>
            <Button>
              <p>Maybe later</p>
            </Button>
          </Link>

          <Button onClick={this.onAcceptChallenge}>
            <p>Fight!</p>
          </Button>
        </Center>
      </div>
    );
  }
}

const mapToState = state => ({
  ownerWarriors: state.warriors.ownerWarriors,
  otherWarriors: state.warriors.otherWarriors,
  ownerWeapons: state.weapons.ownerWeapons,
  challengeWeapon: state.challenges.challengeWeapon
});

const mapToDispatch = dispatch => ({
  waitForChallengeResultAndOpenSummary:
    dispatch.warriors.waitForChallengeResultAndOpenSummary,
  stopWaitingForChallenges: dispatch.warriors.stopWaitingForChallenges,
  acceptChallenge: dispatch.warriors.acceptChallenge,
  getWeaponDetails: dispatch.challenges.getWeaponDetails
});

const AcceptChallengePageContainer = connect(
  mapToState,
  mapToDispatch
)(AcceptChallengePage);

export default AcceptChallengePageContainer;
