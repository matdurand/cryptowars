import WeaponFactoryContractJson from "contracts/WeaponFactory.json";

export const createChallengesModel = (
  web3,
  account,
  networkId,
  mainAccount
) => {
  const weaponContract = new web3.eth.Contract(
    WeaponFactoryContractJson.abi,
    WeaponFactoryContractJson.networks[networkId].address
  );

  return {
    state: {
      challengeWeapon: null
    },
    reducers: {
      setChallengeWeapon(state, weapon) {
        return {
          ...state,
          challengeWeapon: weapon
        };
      }
    },
    effects: dispatch => ({
      async getWeaponDetails({ weaponId }) {
        const weapon = await weaponContract.methods
          .getWeapon(weaponId)
          .call({ from: mainAccount });

        this.setChallengeWeapon(weaponResultToWeapon(weapon));
      }
    })
  };
};

const weaponResultToWeapon = result => ({
  id: result.id,
  name: result.name,
  attackPower: result.attackPower
});
