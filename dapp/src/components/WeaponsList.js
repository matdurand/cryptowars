import React from "react";

const WeaponsList = ({ weapons }) => (
  <ul>
    {weapons &&
      weapons.length > 0 &&
      weapons.map((weapon, idx) => (
        <li key={idx}>
          {weapon.name} - Attack power: {weapon.attackPower}
        </li>
      ))}
  </ul>
);

export default WeaponsList;
