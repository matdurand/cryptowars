pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./Math.sol";

contract WeaponInterface {
  function getWeapon(uint256 _id) external view returns (
    uint id,
    string memory name,
    uint attackPower,
    address owner);
  function claimWeaponForWarriorLevelUp(uint _weaponId, address _newOwnerAddress) public;
}

contract WarriorFactory is Ownable {

  using SafeMath for uint256;
  using Math for uint256;

  WeaponInterface weaponContract;

  uint creationFee = 0.001 ether;

  event NewWarrior(uint warriorId, string name, address owner);

  struct Warrior {
    string name;
    uint256 exp;
    uint256 challengedWarriorId;
    uint256 challengedWithWeaponId; 
    uint16 winCount;
    uint16 lossCount;
    uint16 freeItems;
  }

  Warrior[] public warriors;
  mapping (uint => address) public warriorToOwner;
  mapping (address => uint[]) public ownerToWarriors;

  function setWeaponContractAddress(address _address) external onlyOwner {
    weaponContract = WeaponInterface(_address);
  }

  // Get the warrior creation fees
  function getCreationFee() public view returns (uint) {
    return creationFee;
  }

  // Set the warrior creation fees
  function setCreationFee(uint _fee) external onlyOwner {
    creationFee = _fee;
  }

  // Withdraw accumulated contract ether to the owner's account
  function withdraw(uint _amount) external onlyOwner {
    require(address(this).balance > _amount, "Requested amount is larger than current balance");
    address payable owner = address(uint160(owner()));
    owner.transfer(_amount);
  }

  // Create a new warrior by providing a name
  function createWarrior(string memory _name) public payable {
    require(msg.value == creationFee, "You must provide the required payment to create a warrior");

    uint warriorId = warriors.push(Warrior(_name, 0, 0, 0, 0, 0, 0));
    warriorToOwner[warriorId] = msg.sender;
    ownerToWarriors[msg.sender].push(warriorId);
    emit NewWarrior(warriorId, _name, msg.sender);
  } 

  //THIS SHOULD NOT BE IN PROD, FOR TEST ONLY
  function setWarriorExp(uint _warriorId, uint _exp) public onlyOwner {
    Warrior storage warrior = warriors[_warriorId - 1];
    warrior.exp = _exp;
  }

  function getWarriorLevel(uint _warriorId) public view returns (uint) {
    Warrior storage warrior = warriors[_warriorId - 1];
    return warrior.exp.div(100).sqrt().add(1);
  }

  function getWarriorsByOwner(address _owner) external view returns(uint[] memory) {
    return ownerToWarriors[_owner];
  }

  function getOtherWarriors(address _owner) external view returns(uint[] memory) {
    uint ownerWarriorsCount = ownerToWarriors[_owner].length;
    uint[] memory result = new uint[](warriors.length - ownerWarriorsCount);
    uint counter = 0;
    //TODO: this suck, as we are looping over every warrior. it doesnt scale
    for (uint i = 1; i <= warriors.length; i++) {
      if (warriorToOwner[i] != _owner) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }

  function getWarrior(uint _warriorId) public view returns (uint id,
                                                            string memory name,
                                                            uint256 exp,
                                                            uint256 level,
                                                            uint256 challengedWarriorId, 
                                                            uint256 challengedWithWeaponId,
                                                            uint16 winCount,
                                                            uint16 lossCount,
                                                            uint16 freeItems) {
    Warrior storage warrior = warriors[_warriorId - 1];
    return (
      _warriorId,
      warrior.name,
      warrior.exp,
      getWarriorLevel(_warriorId),
      warrior.challengedWarriorId,
      warrior.challengedWithWeaponId,
      warrior.winCount,
      warrior.lossCount,
      warrior.freeItems
    );
  }

  modifier ownerOf(uint _warriorId) {
    require(msg.sender == warriorToOwner[_warriorId]);
    _;
  }

}
