import { createWeaponsModel } from "./weapons";

const createModels = (web3, account, networkId, mainAccount) => ({
  weapons: createWeaponsModel(web3, account, networkId, mainAccount)
});

export default createModels;
