import React from "react";
import Text from "./Text";

const WarriorsList = ({ warriors, noWarriorMessage, warriorComponent }) => (
  <div>
    {warriors &&
      warriors.length > 0 &&
      warriors.map((warrior, idx) =>
        React.createElement(warriorComponent, { key: idx, warrior })
      )}
    {warriors.length === 0 && <Text>{noWarriorMessage}</Text>}
  </div>
);

export default WarriorsList;
