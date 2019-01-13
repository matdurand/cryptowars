import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import WarriorsList from "../components/WarriorsList";
import Button from "../components/Button";
import Center from "../components/Center";
import { NEW_WARRIOR } from "../routers/routes";
import Panel from "../components/Panel";
import WeaponsList from "../components/WeaponsList";
import _find from "lodash/find";
import OtherWarriorCard from "../components/OtherWarriorCard";
import OwnerWarriorCard from "../components/OwnerWarriorCard";
import WarriorEvent from "../components/WarriorEvent";
import ChallengesList from "../components/ChallengesList";

export class WarriorsListPage extends React.Component {
  componentDidMount() {
    this.props.getOwnerWarriors(this.props.web3);
    this.props.getOtherWarriors(this.props.web3);
    this.props.getOwnerWeapons(this.props.web3);
    this.props.waitForChallengesAndReloadWarriors();
    this.props.waitForNewWarriors();
    this.props.updateBalance();
  }

  componentWillUnmount() {
    this.props.stopWaitingForChallenges();
    this.props.stopWaitingForNewWarriors();
  }

  render() {
    const {
      ownerWarriors,
      otherWarriors,
      openWarriorChallengeForm,
      openAcceptChallengeForm,
      ownerWeapons,
      warriorEvents,
      balance
    } = this.props;
    return (
      <div>
        <Panel frame={"framed-grey"}>
          <p>Your balance: {balance} eth</p>
        </Panel>
        {warriorEvents.length > 0 && (
          <Panel frame={"framed-grey"}>
            <p>Latest news:</p>
            <ol>
              {warriorEvents.map((event, index) => (
                <li key={index}>
                  <WarriorEvent
                    otherWarriors={otherWarriors}
                    ownerWarriors={ownerWarriors}
                    event={event}
                  />
                </li>
              ))}
            </ol>
          </Panel>
        )}
        <Panel frame={"framed-grey"}>
          <p>Your pending challenges:</p>
          <ChallengesList
            challenges={buildChallengesList(
              ownerWarriors,
              otherWarriors,
              openAcceptChallengeForm
            )}
          />
        </Panel>
        <Panel frame={"framed-grey"}>
          <p>Other warriors:</p>
          <WarriorsList
            warriorComponent={OtherWarriorCard}
            warriors={otherWarriors.map(
              withChallenge(ownerWarriors, openWarriorChallengeForm)
            )}
            noWarriorMessage={"There is no other warriors in the arena"}
          />
        </Panel>
        <Panel frame={"framed-grey"}>
          <p>Your warriors:</p>
          <WarriorsList
            warriorComponent={OwnerWarriorCard}
            warriors={ownerWarriors}
            noWarriorMessage={
              "Your have no warrior, click the button to create your first"
            }
          />
          <br />
          <Center>
            <Link
              to={NEW_WARRIOR.path}
              style={{ display: "block", height: "100%" }}
            >
              <Button>
                <p>Create a new warrior</p>
              </Button>
            </Link>
          </Center>
        </Panel>
        {ownerWarriors.length > 0 && (
          <Panel frame={"framed-grey"}>
            <p>Your weapons:</p>
            <WeaponsList weapons={ownerWeapons} />
          </Panel>
        )}
      </div>
    );
  }
}

const buildChallengesList = (
  ownerWarriors,
  otherWarriors,
  openAcceptChallengeForm
) => {
  const challenges = [];
  ownerWarriors.forEach(ownerWarrior => {
    if (ownerWarrior.challengedBy.length > 0) {
      ownerWarrior.challengedBy.forEach(challengerId => {
        const challengerWarrior = _find(
          otherWarriors,
          w => w.id === challengerId
        );
        if (challengerWarrior) {
          const duelChallenger = () =>
            openAcceptChallengeForm({
              defenderWarriorId: ownerWarrior.id,
              challengerWarriorId: challengerId
            });
          challenges.push({
            challenger: challengerWarrior,
            accept: duelChallenger
          });
        }
      });
    }
  });
  return challenges;
};

const withChallenge = (ownerWarriors, openChallengeWarriorForm) => warrior => {
  if (ownerWarriors.length === 0) {
    return warrior;
  }
  const onChallengeWarrior = () =>
    openChallengeWarriorForm({ warriorId: warrior.id });
  const hasBeenChallenged = !!_find(
    ownerWarriors,
    w => w.challengedWarriorId === warrior.id
  );
  const hasChallenge = !!_find(ownerWarriors, w =>
    w.challengedBy.includes(warrior.id)
  );
  return hasChallenge || hasBeenChallenged
    ? { ...warrior, hasBeenChallenged: true }
    : {
        ...warrior,
        onChallengeWarrior
      };
};

const mapToState = state => ({
  ownerWarriors: state.warriors.ownerWarriors,
  otherWarriors: state.warriors.otherWarriors,
  ownerWeapons: state.weapons.ownerWeapons,
  warriorEvents: state.warriors.events,
  balance: state.warriors.balance
});

const mapToDispatch = dispatch => ({
  getOwnerWarriors: dispatch.warriors.getOwnerWarriors,
  getOtherWarriors: dispatch.warriors.getOtherWarriors,
  openWarriorChallengeForm: dispatch.warriors.openWarriorChallengeForm,
  openAcceptChallengeForm: dispatch.warriors.openAcceptChallengeForm,
  getOwnerWeapons: dispatch.weapons.getOwnerWeapons,
  waitForChallengesAndReloadWarriors:
    dispatch.warriors.waitForChallengesAndReloadWarriors,
  stopWaitingForChallenges: dispatch.warriors.stopWaitingForChallenges,
  waitForNewWarriors: dispatch.warriors.waitForNewWarriors,
  stopWaitingForNewWarriors: dispatch.warriors.stopWaitingForNewWarriors,
  updateBalance: dispatch.warriors.updateBalance
});

const WarriorsListPageContainer = connect(
  mapToState,
  mapToDispatch
)(WarriorsListPage);

export default WarriorsListPageContainer;
