var WeaponFactory = artifacts.require("./WeaponFactory.sol");
var WarriorCombat = artifacts.require("./WarriorCombat.sol");

module.exports = async deployer => {
  await deployer.deploy(WeaponFactory);
  await deployer.deploy(WarriorCombat);

  //Attach weapon contract to warrior for weapon queries
  console.log(
    "Attaching weapon contract to warrior contract for weapons queries..."
  );
  let deployedWarriorCombat = await WarriorCombat.deployed();
  await deployedWarriorCombat.setWeaponContractAddress(WeaponFactory.address, {
    gas: 200000
  });

  let deployedWeaponFactory = await WeaponFactory.deployed();

  console.log(
    "Attaching warrior contract to weapon contract for level up weapons claims..."
  );
  await deployedWeaponFactory.setWarriorContractAddress(WarriorCombat.address, {
    gas: 200000
  });

  console.log("Creating basic sword, weapon 0");
  const basicSwordCreation = await deployedWeaponFactory.createWeaponWithSpec(
    "Basic sword",
    5,
    "http://cryptowars.fun/metadata/wp/00",
    {
      gas: 300000
    }
  );
};
