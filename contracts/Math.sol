pragma solidity ^0.5.0;

library Math {
  function sqrt(uint x) internal pure returns (uint y) {
    if (x == 0) return 0;
    else if (x <= 3) return 1;
    uint z = (x + 1) / 2;
    y = x;
    while (z < y)
    {
      y = z;
      z = (x / z + z) / 2;
    }
  }
}

