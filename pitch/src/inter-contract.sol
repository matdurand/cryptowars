contract WeaponInterface {
  function getWeapon(uint256 _id) 
      external view 
    returns (
      uint id,
      string memory name,
      uint attackPower,
      address owner);
}

contract WarriorContract is Ownable {

  WeaponInterface weaponContract;

  function setWeaponContractAddress(address _address) 
      external onlyOwner {
    weaponContract = WeaponInterface(_address);
  }

  function dummyRemoteCall(uint _weaponId) public {
    (wId, wName, wPower, wOwner) = 
      weaponContract.getWeapon(_weaponId);
  }
}
