import WeaponFactoryContractJson from "contracts/WeaponFactory.json";
import { push } from "connected-react-router";
import { WEAPONS } from "../routers/routes";

export const createWeaponsModel = (web3, account, networkId, mainAccount) => {
  const weaponContract = new web3.eth.Contract(
    WeaponFactoryContractJson.abi,
    WeaponFactoryContractJson.networks[networkId].address
  );

  return {
    state: {
      loading: false,
      ownerWeapons: []
    },
    reducers: {
      setOwnerWeapons(state, weapons) {
        return {
          ...state,
          ownerWeapons: weapons
        };
      },
      setLoading(state, loading) {
        return {
          ...state,
          loading
        };
      }
    },
    effects: dispatch => ({
      async getOwnerWeapons() {
        const weaponIds = await weaponContract.methods
          .getWeaponsByOwner(mainAccount)
          .call({ from: mainAccount });

        //The if is necessary because if the contract owner is also a player, the weapon 0 will be in it's list
        if (!weaponIds.includes("0")) {
          weaponIds.push("0"); //Add the starter weapon, with id 0 to the list
        }
        const weapons = await Promise.all(
          weaponIds.map(id => getWeaponById(weaponContract, mainAccount, id))
        );
        this.setOwnerWeapons(weapons.map(weaponResultToWeapon));
      },

      async createNewWeaponWithSpec({ name, attackPower, uri }) {
        this.setLoading(true);
        await weaponContract.methods
          .createWeaponWithSpec(name, attackPower, uri)
          .send({ from: mainAccount, gas: 300000 });
        this.setLoading(false);
      },

      async openWeaponsList() {
        dispatch(push(WEAPONS.path));
      }
    })
  };
};

const getWeaponById = (contractInstance, account, id) =>
  contractInstance.methods.getWeapon(id).call({ from: account });

const weaponResultToWeapon = result => ({
  id: result.id,
  name: result.name,
  attackPower: result.attackPower
});
