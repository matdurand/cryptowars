import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract WarriorFactory is Ownable {

  Warrior[] public warriors;
  uint creationFee = 0.001 ether;

  event NewWarrior(uint warriorId, string name, address owner);
  
  mapping (uint => address) public warriorToOwner;
  mapping (address => uint[]) public ownerToWarriors;

  struct Warrior {
    string name;
    uint256 exp;
    uint16 winCount;
    uint16 lossCount;
    uint16 freeItems;
  }

  modifier hasRequiredPayment() {
    require(msg.value == creationFee, 
      "You must provide the required payment");
    _;
  }

  function createWarrior(string memory _name) 
      public payable hasRequiredPayment {
    uint warriorId = warriors.push(Warrior(_name, 0, 0, 0, 0, 0, 0));
    warriorToOwner[warriorId] = msg.sender;
    ownerToWarriors[msg.sender].push(warriorId);
    emit NewWarrior(warriorId, _name, msg.sender);
  } 
}
