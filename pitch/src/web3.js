import WarriorCombatContractJson 
  from "contracts/WarriorCombat.json";

const warriorContract = new web3.eth.Contract(
  WarriorCombatContractJson.abi,
  WarriorCombatContractJson.networks[networkId].address
);

const mainAccount = "... my address ...";
const playerAccount = "... another player address ...";
const warriorIds = await warriorContract.methods
  .getWarriorsByOwner(playerAccount)
  .call({ from: mainAccount });
