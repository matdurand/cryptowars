function getWarriorsByOwner(address _owner) 
    external view returns(uint[] memory) {
  return ownerToWarriors[_owner];
}
