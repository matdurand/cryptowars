import "openzeppelin/contracts/ownership/Ownable.sol";
import "openzeppelin/contracts/token/ERC721/ERC721Full.sol";

contract WeaponFactory is Ownable, ERC721Full {

  event NewWeapon(uint weaponId, string name, uint properties);

  struct Weapon {
    string name;
    uint attackPower;
  }

  Weapon[] public weapons;

  constructor() ERC721Full("Cryptowars item", "CWI") 
    public {}

  function _createWeapon(
      string memory _name, 
      uint _attackPower, 
      string memory _weaponUri) private {
    uint weaponId = weapons.push(
        Weapon(_name, _attackPower)) - 1;
    _mint(owner(), weaponId);
    _setTokenURI(weaponId, _weaponUri);
    emit NewWeapon(weaponId, _name, 
      _attackPower);
  } 

  function _generateAttackPowerFromName(
        string memory _str)  
      private pure returns (uint) {
    return uint(
      keccak256(abi.encodePacked(_str))) % 25;
  }

  function createWeapon(
      string memory _name, 
      string memory _weaponUri) 
      public onlyOwner {
    _createWeapon(
        _name, 
        _generateAttackPowerFromName(_name), 
        _weaponUri);
  }

  function createWeaponWithSpec(
      string memory _name, 
      uint _attackPower, 
      string memory _weaponUri) public onlyOwner {
    _createWeapon(_name, _attackPower, _weaponUri);
  }

  function getWeaponsByOwner(address owner) 
      public view returns (uint256[] memory) {
    return _tokensOfOwner(owner);
  }

  function getWeapon(uint256 _id) public view 
      returns (uint id,
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
