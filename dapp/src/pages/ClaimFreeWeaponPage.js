import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Center from "../components/Center";
import { LANDING } from "../routers/routes";
import Button from "../components/Button";

class ClaimFreeWeaponPage extends React.Component {
  state = {
    selectedWeaponId: null
  };

  static getDerivedStateFromProps(props, state) {
    if (state.selectedWeaponId === null || state.selectedWarriorId === null) {
      const newState = {};
      if (props.availableWeapons && props.availableWeapons.length > 0) {
        newState.selectedWeaponId = props.availableWeapons[0].id;
      }
      return newState;
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.changeSelectedWeapon = this.changeSelectedWeapon.bind(this);
    this.onAcceptWeapon = this.onAcceptWeapon.bind(this);
  }

  componentDidMount() {
    this.props.getClaimableWeapons();
  }

  changeSelectedWeapon(event) {
    this.setState({
      selectedWeaponId: event.target.value
    });
  }

  onAcceptWeapon() {
    this.props.onAcceptWeapon({
      weaponId: this.state.selectedWeaponId,
      warriorId: this.props.warriorId
    });
  }

  render() {
    const { availableWeapons } = this.props;
    return (
      <div>
        <div>
          {availableWeapons.length === 0 && (
            <div>
              <p>Sorry, there is no claimable weapon. Come back later!</p>
              <Center>
                <Link to={LANDING.path}>
                  <Button>
                    <p>Back</p>
                  </Button>
                </Link>
              </Center>
            </div>
          )}
          {availableWeapons.length > 0 && (
            <div>
              <p>Select your free weapon from available ones:</p>
              {availableWeapons.map((weapon, idx) => (
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
              <br />

              <Center>
                <Link to={LANDING.path}>
                  <Button>
                    <p>Maybe later</p>
                  </Button>
                </Link>

                <Button onClick={this.onAcceptWeapon}>
                  <p>Yes I want this one</p>
                </Button>
              </Center>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapToState = state => ({
  availableWeapons: state.weapons.claimableWeapons
});

const mapToDispatch = dispatch => ({
  getClaimableWeapons: dispatch.weapons.getClaimableWeapons,
  onAcceptWeapon: dispatch.warriors.claimFreeWeapon
});

const ClaimFreeWeaponPageContainer = connect(
  mapToState,
  mapToDispatch
)(ClaimFreeWeaponPage);

export default ClaimFreeWeaponPageContainer;
