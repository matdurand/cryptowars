import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { WEAPONS, MINT_NEW_WEAPONS } from "./routes";
import ErrorPage from "../pages/ErrorPage";
import { history } from "../store";
import ListWeaponsPage from "../pages/ListWeapons";
import MintNewWeaponPage from "../pages/MintNewWeaponPage";

const Main = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route {...WEAPONS} component={props => <ListWeaponsPage />} />
      <Route {...MINT_NEW_WEAPONS} component={props => <MintNewWeaponPage />} />
      <Route component={() => <ErrorPage />} />
    </Switch>
  </ConnectedRouter>
);

export default Main;
