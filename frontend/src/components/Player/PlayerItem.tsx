import React, { FC } from "react";
import { Player } from "../../model/Player";
import "./PlayerItem.css";

interface PlayerItemProps extends Player {
  showMe?: boolean;
  showCurrentPlayer?: boolean;
}
const PlayerItem: FC<PlayerItemProps> = ({
  id,
  name,
  color,
  showMe,
  showCurrentPlayer,
}) => {
  return (
    <div className="player-item-container">
      <div className="player-icon">{showMe ? `😎` : `🕵️‍♂️`}</div>
      {showMe && <p className="me-tag">me</p>}
      <p className="player-name">{name}</p>
      <div className="player-color" style={{ backgroundColor: color }} />
      {showCurrentPlayer && <div className="current-player">👈</div>}
    </div>
  );
};

export default PlayerItem;
