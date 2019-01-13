pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";

contract WeaponFactory is Ownable, ERC721Full {

  event NewWeapon(uint weaponId, string name, uint properties);
  event Claimable(uint[] v);

  struct Weapon {
    string name;
    uint attackPower;
  }

  Weapon[] public weapons;

  address weaponContractAddress;

  constructor() ERC721Full("Cryptowars item", "CWI") public
  {}

  function setWarriorContractAddress(address _address) external onlyOwner {
    weaponContractAddress = _address;
  }

  function claimWeaponForWarriorLevelUp(uint _weaponId, address _newOwnerAddress) public isAvailableWeapon(_weaponId) {
    require(msg.sender == weaponContractAddress, "Only the contract address can call claimWeaponForWarriorLevelUp");
    _transferFrom(owner(), _newOwnerAddress, _weaponId);
  }

  modifier isAvailableWeapon(uint _weaponId) {
    require(_weaponId != 0, "Cannot claim weapon 0");
    require(ownerOf(_weaponId) == owner(), "Cannot claim a weapon that is not owned my the contract owner");
    _;
  }

  function getClaimableWeapons() public view returns (uint[] memory) {
    uint[] memory ownedByOwner = _tokensOfOwner(owner());
    uint[] memory claimables = new uint[](ownedByOwner.length - 1);
    uint claimIndex = 0;
    //The basic sword (id=0), we have to remove it from the list of claimables
    for(uint i = 0; i < ownedByOwner.length; i++) {
        if (ownedByOwner[i] != 0) {
          claimables[claimIndex++] = ownedByOwner[i];
        }
    }
    return claimables;
  }

  function _createWeapon(string memory _name, uint _attackPower, string memory _weaponUri) private {
    uint weaponId = weapons.push(Weapon(_name, _attackPower)) - 1;
    _mint(owner(), weaponId);
    _setTokenURI(weaponId, _weaponUri);
    emit NewWeapon(weaponId, _name, _attackPower);
  } 

  function _generateAttackPowerFromName(string memory _str) private pure returns (uint) {
    return uint(keccak256(abi.encodePacked(_str))) % 25;
  }

  function createWeaponWithSpec(string memory _name, uint _attackPower, string memory _weaponUri) public onlyOwner {
    _createWeapon(_name, _attackPower, _weaponUri);
  }

  function createWeapon(string memory _name, string memory _weaponUri) public onlyOwner {
    _createWeapon(_name, _generateAttackPowerFromName(_name), _weaponUri);
  }

  function getWeaponsByOwner(address owner) public view returns (uint256[] memory) {
    return _tokensOfOwner(owner);
  }

  function setWeaponUri(uint256 _id, string calldata _weaponUri) external onlyOwner {
    _setTokenURI(_id, _weaponUri);
  }

  function getWeapon(uint256 _id) public view returns (uint id,
                                                        string memory name,
                                                        uint attackPower,
                                                        address owner) {
    Weapon storage weapon = weapons[_id];
    return (
      _id,
      weapon.name,
      weapon.attackPower,
      ownerOf(_id)
    );
  }
}
