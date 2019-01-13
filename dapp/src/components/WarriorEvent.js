import React from "react";
import _find from "lodash/find";

const WarriorEvent = ({ ownerWarriors, otherWarriors, event }) => {
  const allWarriors = ownerWarriors.concat(otherWarriors);
  if (event.type === "CHALLENGE_RESULT") {
    let attackerWarrior = _find(
      allWarriors,
      w => w.id === event.attackerWarriorId
    );
    let defenderWarrior = _find(
      allWarriors,
      w => w.id === event.defenderWarriorId
    );
    let winnerWarrior =
      event.winnerWarriorId === event.attackerWarriorId
        ? attackerWarrior
        : defenderWarrior;
    return (
      <span>
        Challenge completed. {attackerWarrior.name} dealt {event.attackerPower}{" "}
        damage, {defenderWarrior.name} dealt {event.defenderPower}.{" "}
        {winnerWarrior.name} won the challenge.
      </span>
    );
  } else if (event.type === "NEW_CHALLENGE") {
    let attackerWarrior = _find(
      allWarriors,
      w => w.id === event.attackerWarriorId
    );
    let defenderWarrior = _find(
      allWarriors,
      w => w.id === event.defenderWarriorId
    );
    return (
      <span>
        {attackerWarrior.name} is challenging {defenderWarrior.name}
      </span>
    );
  } else {
    return <span>N/A</span>;
  }
};

export default WarriorEvent;
