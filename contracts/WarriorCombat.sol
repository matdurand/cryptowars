pragma solidity ^0.5.0;

import "./WarriorFactory.sol";

contract WarriorCombat is WarriorFactory {

  mapping(uint256 => uint256[]) private _defenderChallengedBy;
  uint randNonce = 0;

  event NewChallenge(uint attackerWarriorId, uint attackerWeaponId, uint defenderWarriorId);
  event ChallengeResult(uint attackerWarriorId, uint defenderWarriorId, uint winnerWarriorId, uint looserWarriorId, uint attackerPower, uint defenderPower);
  event WarriorLevelUp(uint warriorId, uint newLevel);

  function randMod(uint _modulus) internal returns(uint) {
    randNonce++;
    return uint(keccak256(abi.encodePacked(now, msg.sender, randNonce))) % _modulus;
  }

  function duelChallenge(uint _attackerWarriorId, uint _attackerWeaponId, uint _defenderWarriorId) external ownerOf(_attackerWarriorId) {
    require(_attackerWarriorId != _defenderWarriorId, "Cannot challenge yourself");
    require(
      msg.sender != warriorToOwner[_defenderWarriorId] && warriorToOwner[_defenderWarriorId] != address(0x0), 
      "Cannot challenge one of your own warrior");

    //weapon 0 is the beginner weapon, available to everyone. no validation required
    if (_attackerWeaponId != 0) {
      //Validate weapon owner
      address weaponOwner;
      (, , , weaponOwner) = weaponContract.getWeapon(_attackerWeaponId);
      require(
        msg.sender == weaponOwner, 
        "Cannot challenge using a weapon you do not own.");
    }

    _defenderChallengedBy[_defenderWarriorId].push(_attackerWarriorId);

    Warrior storage attacker = warriors[_attackerWarriorId - 1];
    if (attacker.challengedWarriorId != 0) {
      _removeAttackerFromDefenderChallengers(attacker.challengedWarriorId, _attackerWarriorId);
    }
    attacker.challengedWarriorId = _defenderWarriorId;
    attacker.challengedWithWeaponId = _attackerWeaponId;

    emit NewChallenge(_attackerWarriorId, _attackerWeaponId, _defenderWarriorId);
  }

  function getChallengedByWarriorIds(uint _defenderWarriorId) public view returns (uint[] memory) {
    return _defenderChallengedBy[_defenderWarriorId];
  }

  function acceptDuel(uint _defenderWarriorId, uint _defenderWeaponId, uint _attackerWarriorId) external ownerOf(_defenderWarriorId) {
    Warrior storage attacker = warriors[_attackerWarriorId - 1];
    require(attacker.challengedWarriorId == _defenderWarriorId, "No duel challenge received from requested warrior");

    address defenderWeaponOwner;
    uint defenderWeaponPower;
    (, , defenderWeaponPower, defenderWeaponOwner) = weaponContract.getWeapon(_defenderWeaponId);
    
    //weapon 0 is the beginner weapon, available to everyone. no validation required
    if (_defenderWeaponId != 0) {
      require(msg.sender == defenderWeaponOwner, "Cannot challenge using a weapon you do not own");
    }
    uint attackerWeaponPower;
    (, , attackerWeaponPower, ) = weaponContract.getWeapon(attacker.challengedWithWeaponId);

    uint defenderFinalPower = getAttackPower(_defenderWarriorId, defenderWeaponPower, _attackerWarriorId);
    uint attackerFinalPower = getAttackPower(_attackerWarriorId, attackerWeaponPower, _defenderWarriorId);

    resolveFight(_defenderWarriorId, defenderFinalPower, _attackerWarriorId, attackerFinalPower);

    //Clear duel request
    attacker.challengedWarriorId = 0;
    attacker.challengedWithWeaponId = 0;
    _removeAttackerFromDefenderChallengers(_defenderWarriorId, _attackerWarriorId);
  }

  function _removeAttackerFromDefenderChallengers(uint256 _defenderWarriorId, uint256 _attackerIdToRemove) private {
    uint256[] storage attackers = _defenderChallengedBy[_defenderWarriorId];
    
    //Swap the attacker to remove at the end, and pop to remove
    int256 attackerIndex = _getAttackerIndex(attackers, _attackerIdToRemove);
    if (attackerIndex >= 0) {
      uint256 lastIndex = attackers.length.sub(1);
      attackers[uint(attackerIndex)] = attackers[lastIndex];
      attackers.pop();
    }
  }

  function _getAttackerIndex(uint256[] storage _attackers, uint256 _attackerId) private view returns (int256) {
    uint256 nbAttackers = _attackers.length;
    for (uint256 i = 0; i < nbAttackers; i++) {
      if (_attackers[i] == _attackerId) {
        return int(i);
      }
    }
    return -1;
  }

  function resolveFight(uint _defenderWarriorId, uint _defenderFinalPower, uint _attackerWarriorId, uint _attackerFinalPower) internal {
    uint winnerLevel;
    uint winnerId;
    uint looserId;
    if (_defenderFinalPower >= _attackerFinalPower) {
      winnerLevel = getWarriorLevel(_defenderWarriorId);
      winnerId = _defenderWarriorId;
      looserId = _attackerWarriorId;
    } else {
      winnerLevel = getWarriorLevel(_attackerWarriorId);
      winnerId = _attackerWarriorId;
      looserId = _defenderWarriorId;
    }

    Warrior storage winner = warriors[winnerId - 1];
    winner.exp = winner.exp + 25;
    winner.winCount = winner.winCount + 1;
    uint levelAfterExp = getWarriorLevel(winnerId);
    if (levelAfterExp > winnerLevel) {
      //Level up, give on free item token
      winner.freeItems = winner.freeItems + 1; 
      emit WarriorLevelUp(winnerId, levelAfterExp);
    }

    Warrior storage looser = warriors[looserId - 1];
    looser.lossCount = looser.lossCount + 1;

    emit ChallengeResult(_attackerWarriorId, _defenderWarriorId, winnerId, looserId, _attackerFinalPower, _defenderFinalPower);
  }

  function getAttackPower(uint _warriorId, uint _weaponAttackPower, uint _otherWarriorId) internal returns (uint) {
    Warrior storage otherWarrior = warriors[_otherWarriorId - 1];
    uint randBonus = randMod(20);
    uint warriorLevel = getWarriorLevel(_warriorId);
    //Use the other warrior exp as a random to add randomness to the combat
    uint expRandom = otherWarrior.exp % 6;
    return warriorLevel + randBonus + _weaponAttackPower + expRandom;
  }

  function claimWeaponForWarriorLevelUp(uint _weaponId, uint _warriorId) external ownerOf(_warriorId){
    Warrior storage warrior = warriors[_warriorId - 1];
    require(warrior.freeItems > 0, "You need to level up to claim free weapons");

    weaponContract.claimWeaponForWarriorLevelUp(_weaponId, msg.sender);
    
    warrior.freeItems = warrior.freeItems - 1;
  }

}