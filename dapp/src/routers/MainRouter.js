import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import {
  LANDING,
  NEW_WARRIOR,
  CHALLENGE_WARRIOR,
  ACCEPT_CHALLENGE,
  CHALLENGE_RESULT,
  CLAIM_FREE_WEAPON
} from "./routes";
import PlayerPage from "../pages/PlayerPage";
import ErrorPage from "../pages/ErrorPage";
import NewWarriorPage from "../pages/NewWarriorPage";
import { history } from "../store";
import ChallengeWarriorPage from "../pages/ChallengeWarriorPage";
import AcceptChallengePage from "../pages/AcceptChallengePage";
import ChallengeResultPage from "../pages/ChallengeResultPage";
import ClaimFreeWeaponPage from "../pages/ClaimFreeWeaponPage";

const Main = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route {...LANDING} component={props => <PlayerPage />} />
      <Route {...NEW_WARRIOR} component={NewWarriorPage} />
      <Route
        {...CHALLENGE_WARRIOR}
        component={({ match }) => (
          <ChallengeWarriorPage warriorId={match.params.warriorId} />
        )}
      />
      <Route
        {...ACCEPT_CHALLENGE}
        component={({ match }) => (
          <AcceptChallengePage
            challengerWarriorId={match.params.challenger}
            defenderWarriorId={match.params.defender}
          />
        )}
      />
      <Route
        {...CHALLENGE_RESULT}
        component={({ match }) => (
          <ChallengeResultPage
            challengerWarriorId={match.params.challenger}
            challengerPower={match.params.challengerPower}
            defenderWarriorId={match.params.defender}
            defenderPower={match.params.defenderPower}
            winnerWarriorId={match.params.winner}
          />
        )}
      />
      <Route
        {...CLAIM_FREE_WEAPON}
        component={({ match }) => (
          <ClaimFreeWeaponPage warriorId={match.params.warrior} />
        )}
      />
      <Route component={() => <ErrorPage />} />
    </Switch>
  </ConnectedRouter>
);

export default Main;
