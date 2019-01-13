import { createWarriorsModel } from "./warriors";
import { createWeaponsModel } from "./weapons";
import { createChallengesModel } from "./challenges";

const createModels = (web3, account, networkId, mainAccount) => ({
  warriors: createWarriorsModel(web3, account, networkId, mainAccount),
  weapons: createWeaponsModel(web3, account, networkId, mainAccount),
  challenges: createChallengesModel(web3, account, networkId, mainAccount)
});

export default createModels;
