import WarriorCombatContractJson from "contracts/WarriorCombat.json";
import { push } from "connected-react-router";
import {
  LANDING,
  CHALLENGE_WARRIOR,
  ACCEPT_CHALLENGE,
  CHALLENGE_RESULT
} from "../routers/routes";
import createSubscriptionManager from "../utils/SubscriptionManager";
import { getState } from "../store";

const GAS_FOR_MOST_OPS = 300000;

export const createWarriorsModel = (web3, account, networkId, mainAccount) => {
  const warriorContract = new web3.eth.Contract(
    WarriorCombatContractJson.abi,
    WarriorCombatContractJson.networks[networkId].address
  );
  const subscriptionsManager = createSubscriptionManager();

  return {
    state: {
      balance: 0,
      ownerWarriors: [],
      otherWarriors: [],
      loading: false,
      challengeResultSubscriptionId: null,
      newChallengeSubscriptionId: null,
      newWarriorsSubscriptionId: null,
      events: []
    },
    reducers: {
      setBalance(state, balance) {
        return {
          ...state,
          balance
        };
      },
      pushEvent(state, event) {
        const newEvents = [event].concat(state.events);
        while (newEvents.length > 5) {
          newEvents.pop();
        }
        return {
          ...state,
          events: newEvents
        };
      },
      setLoading(state, loading) {
        return {
          ...state,
          loading
        };
      },
      setOwnerWarriors(state, warriors) {
        return {
          ...state,
          ownerWarriors: warriors
        };
      },
      setOtherWarriors(state, warriors) {
        return {
          ...state,
          otherWarriors: warriors
        };
      },
      setOwnerWarriorChallengedWarrior(state, warriorId, challengedWarriorId) {
        return {
          ...state,
          ownerWarriors: state.ownerWarriors.map(w => {
            if (w.id === warriorId) {
              w.challengedWarriorId = challengedWarriorId;
            }
          })
        };
      },
      setChallengeResultSubscriptionId(state, subscriptionId) {
        return {
          ...state,
          challengeResultSubscriptionId: subscriptionId
        };
      },
      setNewChallengeSubscriptionId(state, subscriptionId) {
        return {
          ...state,
          newChallengeSubscriptionId: subscriptionId
        };
      },
      setNewWarriorsSubscriptionId(state, subscriptionId) {
        return {
          ...state,
          newWarriorsSubscriptionId: subscriptionId
        };
      }
    },
    effects: dispatch => ({
      async updateBalance() {
        const wei = await web3.eth.getBalance(mainAccount);
        let ether = web3.utils.fromWei(wei, "ether");

        const dotIndex = ether.indexOf(".");
        if (dotIndex !== -1) {
          // Keep 5 decimal after dot
          ether = ether.substring(0, dotIndex + 6);
        }

        this.setBalance(ether);
      },
      async getOwnerWarriors() {
        const warriorIds = await warriorContract.methods
          .getWarriorsByOwner(mainAccount)
          .call({ from: mainAccount });
        const warriors = await Promise.all(
          warriorIds.map(id =>
            getWarriorById(warriorContract, mainAccount, id).then(
              async warrior => {
                const challengedBy = await warriorContract.methods
                  .getChallengedByWarriorIds(warrior.id)
                  .call({ from: mainAccount });
                return {
                  ...warrior,
                  challengedBy
                };
              }
            )
          )
        );
        this.setOwnerWarriors(warriors.map(warriorResultToWarrior));
      },

      async getOtherWarriors() {
        const otherWarriorIds = await warriorContract.methods
          .getOtherWarriors(mainAccount)
          .call({ from: mainAccount });
        const warriors = await Promise.all(
          otherWarriorIds.map(id =>
            getWarriorById(warriorContract, mainAccount, id)
          )
        );
        this.setOtherWarriors(warriors.map(warriorResultToWarrior));
      },

      async createWarrior({ warriorName }) {
        this.setLoading(true);
        const creationFees = await warriorContract.methods
          .getCreationFee()
          .call({ from: mainAccount });
        await warriorContract.methods.createWarrior(warriorName).send({
          from: mainAccount,
          value: creationFees,
          gas: GAS_FOR_MOST_OPS
        });
        await dispatch.warriors.getOwnerWarriors();
        dispatch(push(LANDING.path));
        await dispatch.warriors.updateBalance();
        this.setLoading(false);
      },

      async openWarriorChallengeForm({ warriorId }) {
        dispatch(push(CHALLENGE_WARRIOR.path.replace(":warriorId", warriorId)));
      },

      async openAcceptChallengeForm({
        defenderWarriorId,
        challengerWarriorId
      }) {
        dispatch(
          push(
            ACCEPT_CHALLENGE.path
              .replace(":defender", defenderWarriorId)
              .replace(":challenger", challengerWarriorId)
          )
        );
      },

      async getWarriorChallengedBy({ warriorId }) {
        const defenderWarriorId = await warriorContract.methods
          .getChallengedWarrior(warriorId)
          .call({ from: mainAccount });
        this.setOwnerWarriorChallengedWarrior(warriorId, defenderWarriorId);
      },

      async confirmWarriorChallenge({ warriorId, weaponId, targetWarriorId }) {
        this.setLoading(true);
        await warriorContract.methods
          .duelChallenge(warriorId, weaponId, targetWarriorId)
          .send({ from: mainAccount, gas: GAS_FOR_MOST_OPS });
        dispatch(push(LANDING.path));
        await dispatch.warriors.updateBalance();
        this.setLoading(false);
      },

      async acceptChallenge({
        defenderWarriorId,
        defenderWeaponId,
        challengerWarriorId
      }) {
        this.setLoading(true);
        await warriorContract.methods
          .acceptDuel(defenderWarriorId, defenderWeaponId, challengerWarriorId)
          .send({ from: mainAccount, gas: GAS_FOR_MOST_OPS });
        await dispatch.warriors.updateBalance();
        this.setLoading(false);
      },

      async waitForChallengeResultAndOpenSummary(
        { watchingWarriorId },
        rootState
      ) {
        const modelRef = this;
        const subscriptionId = subscriptionsManager.subscribe(
          warriorContract.events.ChallengeResult,
          (err, event) => {
            if (
              event.returnValues.defenderWarriorId === watchingWarriorId ||
              event.returnValues.attackerWarriorId === watchingWarriorId
            ) {
              modelRef.pushEvent({
                type: "CHALLENGE_RESULT",
                winnerWarriorId: event.returnValues.winnerWarriorId,
                looserWarriorId: event.returnValues.looserWarriorId,
                attackerWarriorId: event.returnValues.attackerWarriorId,
                defenderWarriorId: event.returnValues.defenderWarriorId,
                attackerPower: event.returnValues.attackerPower,
                defenderPower: event.returnValues.defenderPower
              });
              dispatch.warriors.displayChallengeResult({
                defenderWarriorId: event.returnValues.defenderWarriorId,
                defenderPower: event.returnValues.defenderPower,
                challengerWarriotId: event.returnValues.attackerWarriorId,
                challengerPower: event.returnValues.attackerPower,
                winnerWarriorId: event.returnValues.winnerWarriorId
              });
            }
          }
        );
        this.setChallengeResultSubscriptionId(subscriptionId);
      },

      async waitForChallengesAndReloadWarriors() {
        const modelRef = this;
        this.setChallengeResultSubscriptionId(
          subscriptionsManager.subscribe(
            warriorContract.events.ChallengeResult,
            (err, event) => {
              const ownerWarriorsIds = getState().warriors.ownerWarriors.map(
                w => w.id
              );
              const attackerId = event.returnValues.attackerWarriorId;
              if (ownerWarriorsIds.includes(attackerId)) {
                modelRef.pushEvent({
                  type: "CHALLENGE_RESULT",
                  winnerWarriorId: event.returnValues.winnerWarriorId,
                  looserWarriorId: event.returnValues.looserWarriorId,
                  attackerWarriorId: event.returnValues.attackerWarriorId,
                  defenderWarriorId: event.returnValues.defenderWarriorId,
                  attackerPower: event.returnValues.attackerPower,
                  defenderPower: event.returnValues.defenderPower
                });
                dispatch.warriors.getOwnerWarriors();
              }
            }
          )
        );

        this.setNewChallengeSubscriptionId(
          subscriptionsManager.subscribe(
            warriorContract.events.NewChallenge,
            (err, event) => {
              const ownerWarriorsIds = getState().warriors.ownerWarriors.map(
                w => w.id
              );
              const defenderId = event.returnValues.defenderWarriorId;
              if (ownerWarriorsIds.includes(defenderId)) {
                modelRef.pushEvent({
                  type: "NEW_CHALLENGE",
                  attackerWarriorId: event.returnValues.attackerWarriorId,
                  defenderWarriorId: event.returnValues.defenderWarriorId
                });
                dispatch.warriors.getOwnerWarriors();
              }
            }
          )
        );
      },

      async stopWaitingForChallenges(_, rootState) {
        if (rootState.warriors.challengeResultSubscriptionId) {
          subscriptionsManager.clear(
            rootState.warriors.challengeResultSubscriptionId
          );
          this.setChallengeResultSubscriptionId(null);
        }
        if (rootState.warriors.newChallengeSubscriptionId) {
          subscriptionsManager.clear(
            rootState.warriors.newChallengeSubscriptionId
          );
          this.setNewChallengeSubscriptionId(null);
        }
      },

      async waitForNewWarriors() {
        this.setNewWarriorsSubscriptionId(
          subscriptionsManager.subscribe(
            warriorContract.events.NewWarrior,
            (err, event) => {
              dispatch.warriors.getOtherWarriors();
            }
          )
        );
      },

      async stopWaitingForNewWarriors(_, rootState) {
        if (rootState.warriors.newWarriorsSubscriptionId) {
          subscriptionsManager.clear(
            rootState.warriors.newWarriorsSubscriptionId
          );
          this.setNewWarriorsSubscriptionId(null);
        }
      },

      async displayChallengeResult({
        defenderWarriorId,
        defenderPower,
        challengerWarriotId,
        challengerPower,
        winnerWarriorId
      }) {
        dispatch(
          push(
            CHALLENGE_RESULT.path
              .replace(":defender", defenderWarriorId)
              .replace(":defenderPower", defenderPower)
              .replace(":challenger", challengerWarriotId)
              .replace(":challengerPower", challengerPower)
              .replace(":winner", winnerWarriorId)
          )
        );
      },

      async claimFreeWeapon({ weaponId, warriorId }) {
        this.setLoading(true);
        await warriorContract.methods
          .claimWeaponForWarriorLevelUp(weaponId, warriorId)
          .send({ from: mainAccount, gas: GAS_FOR_MOST_OPS });
        dispatch(push(LANDING.path));
        await dispatch.warriors.updateBalance();
        this.setLoading(false);
      }
    })
  };
};

const getWarriorById = (warriorContract, account, warriorId) =>
  warriorContract.methods.getWarrior(warriorId).call({ from: account });

const warriorResultToWarrior = result => ({
  id: result.id,
  name: result.name,
  level: result.level,
  exp: result.exp,
  winCount: result.winCount,
  challengedWarriorId: result.challengedWarriorId,
  challengedWithWeaponId: result.challengedWithWeaponId,
  challengedBy: result.challengedBy,
  freeItems: result.freeItems
});
