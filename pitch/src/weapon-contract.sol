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

  function createWeapon(
      string memory _name, 
      uint _attackPower, 
      string memory _weaponUri) public ownerOnly {
    uint weaponId = weapons.push(
        Weapon(_name, _attackPower)) - 1;
    _mint(owner(), weaponId);
    _setTokenURI(weaponId, _weaponUri);
    emit NewWeapon(weaponId, _name, 
      _attackPower);
  } 
}
