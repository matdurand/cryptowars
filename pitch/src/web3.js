import WarriorCombatContractJson 
  from "contracts/WarriorCombat.json";

const warriorContract = new web3.eth.Contract(
  WarriorCombatContractJson.abi,
  WarriorCombatContractJson.networks[networkId].address
);

const mainAccount = "... my address ...";
const slayerAccount = "... another player address ...";
const warriorIds = await warriorContract.methods
  .getWarriorsByOwner(slayerAccount)
  .call({ from: mainAccount });
