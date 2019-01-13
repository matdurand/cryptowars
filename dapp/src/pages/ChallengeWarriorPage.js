import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _find from "lodash/find";
import Center from "../components/Center";
import { LANDING } from "../routers/routes";
import Button from "../components/Button";

class ChallengeWarriorPage extends React.Component {
  state = {
    selectedWarriorId: null,
    selectedWeaponId: null
  };

  static getDerivedStateFromProps(props, state) {
    if (state.selectedWeaponId === null || state.selectedWarriorId === null) {
      const newState = {};
      if (props.ownerWeapons && props.ownerWeapons.length > 0) {
        newState.selectedWeaponId = props.ownerWeapons[0].id;
      }
      if (props.ownerWarriors && props.ownerWarriors.length > 0) {
        newState.selectedWarriorId = props.ownerWarriors[0].id;
      }
      return newState;
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.changeSelectedWeapon = this.changeSelectedWeapon.bind(this);
    this.changeSelectedWarrior = this.changeSelectedWarrior.bind(this);
    this.confirmWarriorChallenge = this.confirmWarriorChallenge.bind(this);
  }

  changeSelectedWeapon(event) {
    this.setState({
      selectedWeaponId: event.target.value
    });
  }

  changeSelectedWarrior(event) {
    this.setState({
      selectedWarriorId: event.target.value
    });
  }

  confirmWarriorChallenge() {
    const selectedWarrior = _find(
      this.props.ownerWarriors,
      w => w.id === this.state.selectedWarriorId
    );
    let confirmContinue = true;
    if (selectedWarrior.challengedWarriorId !== "0") {
      confirmContinue = window.confirm(
        `${
          selectedWarrior.name
        } already has a challenge pending. If you continue, the old challenge will be discarded. Continue?`
      );
    }
    if (confirmContinue) {
      this.props.confirmWarriorChallenge({
        warriorId: this.state.selectedWarriorId,
        weaponId: this.state.selectedWeaponId,
        targetWarriorId: this.props.warriorId
      });
    }
  }

  render() {
    const { warriorId, ownerWarriors, ownerWeapons } = this.props;
    const targetWarrior = _find(
      this.props.otherWarriors,
      w => w.id === warriorId
    );
    return (
      <div>
        <p>
          Defender: {targetWarrior.name} - Level {targetWarrior.level}
        </p>
        <br />

        <p>Select your warrior for this fight:</p>
        <div>
          {ownerWarriors.map((warrior, idx) => (
            <div key={idx}>
              <input
                id={`warrior${warrior.id}`}
                checked={warrior.id === this.state.selectedWarriorId}
                className="rpgui-radio golden"
                name="warrior"
                value={warrior.id}
                type="radio"
                data-rpguitype="radio"
                onChange={this.changeSelectedWarrior}
              />
              <label htmlFor={`warrior${warrior.id}`}>
                {warrior.name} - Level {warrior.level}
              </label>
            </div>
          ))}
        </div>
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

        <Center>
          <Link to={LANDING.path}>
            <Button>
              <p>Nevermind</p>
            </Button>
          </Link>

          <Button onClick={this.confirmWarriorChallenge}>
            <p>I&apos;m in!</p>
          </Button>
        </Center>
      </div>
    );
  }
}

const mapToState = state => ({
  ownerWarriors: state.warriors.ownerWarriors,
  otherWarriors: state.warriors.otherWarriors,
  ownerWeapons: state.weapons.ownerWeapons
});

const mapToDispatch = dispatch => ({
  confirmWarriorChallenge: dispatch.warriors.confirmWarriorChallenge
});

const ChallengeWarriorPageContainer = connect(
  mapToState,
  mapToDispatch
)(ChallengeWarriorPage);

export default ChallengeWarriorPageContainer;
