const WarriorCombat = artifacts.require("WarriorCombat");
const WeaponFactory = artifacts.require("WeaponFactory");
const truffleAssert = require("truffle-assertions");

contract("WarriorCombat", accounts => {
  const [contractOwner, bob, alice, charlie, dylan, elon] = accounts;
  const creationFees = web3.utils.toWei("0.001", "ether");

  it("should allow to set the creation fees", async () => {
    const contract = await WarriorCombat.deployed();
    const newCreationFees = web3.utils.toWei("0.002", "ether");
    await contract.setCreationFee(newCreationFees, {
      from: contractOwner
    });
    let fees = await contract.getCreationFee({ from: alice });

    assert.equal(fees, newCreationFees, "Fees should be set to 2 ether");

    //Set if back for other tests
    await contract.setCreationFee(creationFees, {
      from: contractOwner
    });
  });

  it("should expose warrior by account", async () => {
    const contract = await WarriorCombat.deployed();
    const {
      account1WarriorId: dylanWarrior1,
      account2WarriorId: dylanWarrior2,
      account3WarriorId: elonWarrior1
    } = await createWarriors(contract, dylan, dylan, elon, creationFees);

    const dylanWarriors = await contract.getWarriorsByOwner(dylan);
    assert.equal(dylanWarriors.length, 2);
    assert.equal(dylanWarriors[0].toNumber(), dylanWarrior1.toNumber());
    assert.equal(dylanWarriors[1].toNumber(), dylanWarrior2.toNumber());

    const warriorsNotToDylan = await contract.getOtherWarriors(dylan);
    assert.equal(warriorsNotToDylan.length, 1);
    assert.equal(warriorsNotToDylan[0].toNumber(), elonWarrior1.toNumber());
  });

  it("should create a warrior and emit an event", async () => {
    const contract = await WarriorCombat.deployed();
    const creationResult = await contract.createWarrior("Ace", {
      from: bob,
      value: creationFees
    });
    truffleAssert.eventEmitted(creationResult, "NewWarrior", ev => {
      return ev.name == "Ace";
    });
  });

  it("should returns warrior exp", async () => {
    const contract = await WarriorCombat.deployed();
    const creationResult = await contract.createWarrior("Ace", {
      from: bob,
      value: creationFees
    });
    const warriorId = creationResult.logs[0].args.warriorId;
    await contract.setWarriorExp(warriorId, 100000, { from: contractOwner });
    const lvl = await contract.getWarriorLevel(warriorId, { from: bob });
    assert.equal(lvl.toNumber(), 32);
  });

  it("should record a duel", async () => {
    const weaponContract = await WeaponFactory.deployed();
    const warriorContract = await WarriorCombat.deployed();
    await warriorContract.setWeaponContractAddress(weaponContract.address, {
      from: contractOwner
    });

    const {
      account1WarriorId: bobWarriorId,
      account2WarriorId: aliceWarriorId
    } = await createWarriors(
      warriorContract,
      bob,
      alice,
      charlie,
      creationFees
    );

    const slayerId = await createWeapon(
      weaponContract,
      "Slayer",
      bob,
      contractOwner
    );

    const challengeResult = await createDuel(
      warriorContract,
      bob,
      bobWarriorId,
      slayerId,
      aliceWarriorId
    );

    truffleAssert.eventEmitted(challengeResult, "NewChallenge", ev => {
      return (
        ev.attackerWeaponId.toNumber() === slayerId.toNumber() &&
        ev.attackerWarriorId.toNumber() === bobWarriorId.toNumber() &&
        ev.defenderWarriorId.toNumber() === aliceWarriorId.toNumber()
      );
    });
  });

  it("should remove a previous un-accepted duel when a warrior challenge a new warrior", async () => {
    const weaponContract = await WeaponFactory.deployed();
    const warriorContract = await WarriorCombat.deployed();
    await warriorContract.setWeaponContractAddress(weaponContract.address, {
      from: contractOwner
    });

    const {
      account1WarriorId: bobWarriorId,
      account2WarriorId: aliceWarriorId,
      account3WarriorId: charlieWarriorId
    } = await createWarriors(
      warriorContract,
      bob,
      alice,
      charlie,
      creationFees
    );

    await createDuel(warriorContract, bob, bobWarriorId, 0, aliceWarriorId);

    await createDuel(warriorContract, bob, bobWarriorId, 0, charlieWarriorId);

    //There should be no pending duel between bob and alice
    const aliceChallengers = await warriorContract.getChallengedByWarriorIds(
      aliceWarriorId
    );
    assert.equal(
      aliceChallengers.length,
      0,
      "there should be only one challenge left for alice"
    );
  });

  it("should clear the challenges list once a duel is over", async () => {
    const weaponContract = await WeaponFactory.deployed();
    const warriorContract = await WarriorCombat.deployed();
    await warriorContract.setWeaponContractAddress(weaponContract.address, {
      from: contractOwner
    });

    const {
      account1WarriorId: bobWarriorId,
      account2WarriorId: aliceWarriorId,
      account3WarriorId: charlieWarriorId
    } = await createWarriors(
      warriorContract,
      bob,
      alice,
      charlie,
      creationFees
    );

    await createDuel(warriorContract, bob, bobWarriorId, 0, aliceWarriorId);
    await createDuel(
      warriorContract,
      charlie,
      charlieWarriorId,
      0,
      aliceWarriorId
    );

    await warriorContract.acceptDuel(aliceWarriorId, 0, bobWarriorId, {
      from: alice
    });

    const aliceChallengers = await warriorContract.getChallengedByWarriorIds(
      aliceWarriorId
    );

    assert.equal(
      aliceChallengers.length,
      1,
      "there should be only one challenger left"
    );
    assert.equal(
      aliceChallengers[0].toNumber(),
      charlieWarriorId.toNumber(),
      "Charlie should be the only challenger left"
    );
  });

  it("should accept an existing duel, with the default weapon", async () => {
    const weaponContract = await WeaponFactory.deployed();
    const warriorContract = await WarriorCombat.deployed();
    await warriorContract.setWeaponContractAddress(weaponContract.address, {
      from: contractOwner
    });

    const {
      account1WarriorId: bobWarriorId,
      account2WarriorId: aliceWarriorId
    } = await createWarriors(
      warriorContract,
      bob,
      alice,
      charlie,
      creationFees
    );

    await createDuel(warriorContract, bob, bobWarriorId, 0, aliceWarriorId);

    const duelResult = await warriorContract.acceptDuel(
      aliceWarriorId,
      0,
      bobWarriorId,
      { from: alice }
    );

    const winnerId = duelResult.logs[0].args.winnerWarriorId;
    const looserId = duelResult.logs[0].args.looserWarriorId;

    //Winner should get 25exp
    const updatedWinner = await warriorContract.getWarrior(winnerId, {
      from: bob
    });
    assert.equal(updatedWinner.exp, 25);
    assert.equal(updatedWinner.winCount, 1);
    assert.equal(updatedWinner.lossCount, 0);

    const updateLooser = await warriorContract.getWarrior(looserId, {
      from: bob
    });
    assert.equal(updateLooser.exp, 0);
    assert.equal(updateLooser.winCount, 0);
    assert.equal(updateLooser.lossCount, 1);
  });

  it("should accept an existing duel, with a custom weapon", async () => {
    const weaponContract = await WeaponFactory.deployed();
    const warriorContract = await WarriorCombat.deployed();
    await warriorContract.setWeaponContractAddress(weaponContract.address, {
      from: contractOwner
    });

    const {
      account1WarriorId: bobWarriorId,
      account2WarriorId: aliceWarriorId
    } = await createWarriors(
      warriorContract,
      bob,
      alice,
      charlie,
      creationFees
    );

    const slayerId = await createWeapon(
      weaponContract,
      "Slayer",
      bob,
      contractOwner
    );

    await createDuel(
      warriorContract,
      bob,
      bobWarriorId,
      slayerId,
      aliceWarriorId
    );

    const rainbowId = await createWeapon(
      weaponContract,
      "Rain bow",
      alice,
      contractOwner
    );

    const duelResult = await warriorContract.acceptDuel(
      aliceWarriorId,
      rainbowId,
      bobWarriorId,
      { from: alice }
    );

    const winnerId = duelResult.logs[0].args.winnerWarriorId;
    const looserId = duelResult.logs[0].args.looserWarriorId;

    //Winner should get 25exp
    const updatedWinner = await warriorContract.getWarrior(winnerId, {
      from: bob
    });
    assert.equal(updatedWinner.exp, 25);
    assert.equal(updatedWinner.winCount, 1);
    assert.equal(updatedWinner.lossCount, 0);

    const updateLooser = await warriorContract.getWarrior(looserId, {
      from: bob
    });
    assert.equal(updateLooser.exp, 0);
    assert.equal(updateLooser.winCount, 0);
    assert.equal(updateLooser.lossCount, 1);
  });

  it("should gives a free items on level up", async () => {
    const weaponContract = await WeaponFactory.deployed();
    const warriorContract = await WarriorCombat.deployed();
    await warriorContract.setWeaponContractAddress(weaponContract.address, {
      from: contractOwner
    });

    const {
      account1WarriorId: bobWarriorId,
      account2WarriorId: aliceWarriorId
    } = await createWarriors(
      warriorContract,
      bob,
      alice,
      charlie,
      creationFees
    );

    const slayerId = await createWeapon(
      weaponContract,
      "Slayer",
      bob,
      contractOwner
    );
    const rainbowId = await createWeapon(
      weaponContract,
      "Rain bow",
      alice,
      contractOwner
    );

    let duelResult;
    let aliceLevel = 1;
    while (aliceLevel === 1) {
      await createDuel(
        warriorContract,
        bob,
        bobWarriorId,
        slayerId,
        aliceWarriorId
      );
      duelResult = await warriorContract.acceptDuel(
        aliceWarriorId,
        rainbowId,
        bobWarriorId,
        { from: alice }
      );
      duelResultValues = getEventLog(duelResult, "ChallengeResult");
      const winnerId = duelResultValues.winnerWarriorId.toNumber();
      const attackerPower = duelResultValues.attackerPower.toNumber();
      const defenderPower = duelResultValues.defenderPower.toNumber();
      if (winnerId == aliceWarriorId.toNumber()) {
        assert.isTrue(
          attackerPower <= defenderPower,
          "Alice won. Alice (defender) attack power should be higher or equal. {Attacker:" +
            attackerPower +
            ", Defender:" +
            defenderPower +
            "}"
        );
      } else {
        assert.isTrue(
          attackerPower > defenderPower,
          "Bob won. Alice (defender) attack power should be lower. {Attacker:" +
            attackerPower +
            ", Defender:" +
            defenderPower +
            "}"
        );
      }
      const updatedAliceWarrior = await warriorContract.getWarrior(
        aliceWarriorId,
        { from: alice }
      );
      aliceLevel = updatedAliceWarrior.level.toNumber();
    }

    truffleAssert.eventEmitted(duelResult, "WarriorLevelUp", ev => {
      return (
        ev.warriorId.toNumber() === aliceWarriorId.toNumber() &&
        ev.newLevel.toNumber() === 2
      );
    });

    let aliceWarrior = await warriorContract.getWarrior(aliceWarriorId, {
      from: alice
    });
    assert(aliceWarrior.freeItems, 1);

    //Create a weapon to be claimed by Alice
    const superWeaponId = await createWeapon(
      weaponContract,
      "Super weapon",
      contractOwner,
      contractOwner
    );

    const claimables = await weaponContract.getClaimableWeapons({
      from: alice
    });
    assert.equal(claimables.length, 1);
    assert.equal(claimables[0].toNumber(), superWeaponId);

    await warriorContract.claimWeaponForWarriorLevelUp(
      superWeaponId,
      aliceWarriorId,
      { from: alice }
    );

    aliceWarrior = await warriorContract.getWarrior(aliceWarriorId, {
      from: alice
    });
    assert(aliceWarrior.freeItems, 0);

    const aliceWeapons = await weaponContract.getWeaponsByOwner(alice, {
      from: alice
    });
    const lastWeapon = aliceWeapons[aliceWeapons.length - 1];
    assert.equal(lastWeapon.toNumber(), superWeaponId);
  });
});

const createWarriors = async (
  warriorContract,
  account1,
  account2,
  account3,
  creationFees
) => {
  const account1WarriorId = await createWarrior(
    warriorContract,
    "Ace",
    account1,
    creationFees
  );
  const account2WarriorId = await createWarrior(
    warriorContract,
    "Humpty Dumpty",
    account2,
    creationFees
  );
  const account3WarriorId = await createWarrior(
    warriorContract,
    "Gardakan",
    account3,
    creationFees
  );
  return { account1WarriorId, account2WarriorId, account3WarriorId };
};

const createDuel = async (
  warriorContract,
  bob,
  bobWarriorId,
  bobWeaponId,
  aliceWarriorId
) => {
  const challengeResult = await warriorContract.duelChallenge(
    bobWarriorId,
    bobWeaponId,
    aliceWarriorId,
    { from: bob }
  );

  return challengeResult;
};

const createWarrior = async (warriorContract, name, account, creationFees) => {
  const creationResult = await warriorContract.createWarrior(name, {
    from: account,
    value: creationFees
  });
  const warriorId = creationResult.logs[0].args.warriorId;
  return warriorId;
};

const createWeapon = async (
  weaponContract,
  name,
  ownerAccount,
  contractOwner
) => {
  const creationResult = await weaponContract.createWeapon(
    name,
    "http://dummy/tokenUri",
    {
      from: contractOwner
    }
  );
  const event = creationResult.logs.filter(e => e.event === "NewWeapon")[0];
  const weaponId = event.args.weaponId;

  if (contractOwner != ownerAccount) {
    await weaponContract.transferFrom(contractOwner, ownerAccount, weaponId);
  }

  return weaponId;
};

const getEventLog = (result, eventName) =>
  result.logs.filter(log => log.event === eventName)[0].args;
