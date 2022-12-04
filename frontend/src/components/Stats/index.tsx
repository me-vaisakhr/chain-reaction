import React, { FC } from "react";
import { useSelector } from "react-redux";
import { currentPlayer, me, players } from "../../redux/playerSlice";
import PlayerItem from "../Player/PlayerItem";
import "./Stats.css";

interface StatsProps {}

const Stats: FC<StatsProps> = () => {
  const fighters = useSelector(players);
  const currentplayer = useSelector(currentPlayer);
  const myself = useSelector(me);
  return (
    <div className="stats-container">
      <h3 className="stats-title">Fighters 🤼</h3>
      <div className="stats-wrapper">
        {fighters.map((fighter, index) => (
          <PlayerItem
            id={fighter.id}
            name={fighter.name}
            color={fighter.color}
            showMe={myself?.id === fighter.id}
            showCurrentPlayer={currentplayer?.id === fighter.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Stats;
