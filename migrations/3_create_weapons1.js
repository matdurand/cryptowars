var WeaponFactory = artifacts.require("./WeaponFactory.sol");
var WarriorCombat = artifacts.require("./WarriorCombat.sol");

module.exports = async deployer => {
  let deployedWeaponFactory = await WeaponFactory.deployed();

  console.log("Creating weapons batch 1");
  await deployedWeaponFactory.createWeaponWithSpec(
    "Death from Above",
    12,
    "http://cryptowars.fun/metadata/wp/01",
    {
      gas: 300000
    }
  );
  await deployedWeaponFactory.createWeaponWithSpec(
    "Soul Reaper",
    14,
    "http://cryptowars.fun/metadata/wp/02",
    {
      gas: 300000
    }
  );
  await deployedWeaponFactory.createWeaponWithSpec(
    "Frost sword",
    18,
    "http://cryptowars.fun/metadata/wp/03",
    {
      gas: 300000
    }
  );
};
