import React from "react";
import { connect } from "react-redux";
export class MintNewWeaponPage extends React.Component {
  state = {
    name: "",
    attackPower: 0,
    uri: ""
  };

  constructor(props) {
    super(props);
    this.changeName = this.changeName.bind(this);
    this.changeAttackPower = this.changeAttackPower.bind(this);
    this.changeUri = this.changeUri.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  changeName(event) {
    this.setState({
      name: event.target.value
    });
  }

  changeAttackPower(event) {
    this.setState({
      attackPower: event.target.value
    });
  }

  changeUri(event) {
    this.setState({
      uri: event.target.value
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    await this.props.createNewWeaponWithSpec(this.state);
    await this.props.openWeaponsList();
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="name">Weapon name:</label>
        <input
          id="name"
          name="name"
          value={this.state.name}
          size="100"
          onChange={this.changeName}
        />
        <br />

        <label htmlFor="attackPower">Attack power:</label>
        <input
          id="attackPower"
          name="attackPower"
          value={this.state.attackPower}
          onChange={this.changeAttackPower}
        />
        <br />

        <label htmlFor="uri">Metadata URI:</label>
        <input
          id="uri"
          name="uri"
          value={this.state.uri}
          size="100"
          onChange={this.changeUri}
        />
        <br />

        <button type="submit">Create</button>
      </form>
    );
  }
}

const mapToState = state => ({});

const mapToDispatch = dispatch => ({
  createNewWeaponWithSpec: dispatch.weapons.createNewWeaponWithSpec,
  openWeaponsList: dispatch.weapons.openWeaponsList
});

const MintNewWeaponPageContainer = connect(
  mapToState,
  mapToDispatch
)(MintNewWeaponPage);

export default MintNewWeaponPageContainer;
