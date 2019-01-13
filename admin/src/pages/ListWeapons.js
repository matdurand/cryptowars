import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { MINT_NEW_WEAPONS } from "../routers/routes";

export class ListWeaponsPage extends React.Component {
  componentDidMount() {
    this.props.getWeapons();
  }

  render() {
    const { weapons } = this.props;
    return (
      <div>
        <h1>Available weapons:</h1>
        <ul>
          {weapons && weapons.map((w, index) => <li key={index}>{w.name}</li>)}
        </ul>
        <Link to={MINT_NEW_WEAPONS.path}>Create new weapon</Link>
      </div>
    );
  }
}

const mapToState = state => ({
  weapons: state.weapons.ownerWeapons
});

const mapToDispatch = dispatch => ({
  getWeapons: dispatch.weapons.getOwnerWeapons
});

const ListWeaponsPageContainer = connect(
  mapToState,
  mapToDispatch
)(ListWeaponsPage);

export default ListWeaponsPageContainer;
