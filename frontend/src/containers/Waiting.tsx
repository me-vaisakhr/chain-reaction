import { useSelector } from "react-redux";
import PlayerItem from "../components/Player/PlayerItem";
import { players } from "../redux/playerSlice";
import "./Waiting.css";
import { me } from "../redux/playerSlice";
import SplashScreen from "../components/CounterSlashScreen.tsx";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "../Layout/GameContext/GameContextProvider";
import { EVENTS } from "../utils/constants";
import { useParams } from "react-router-dom";

const Waiting = () => {
  const [showSplashScreen, setSplashScreen] = useState(false);
  const playerList = useSelector(players);
  const myself = useSelector(me);
  const socket = useContext(GameContext);
  const { roomId } = useParams();

  useEffect(() => {
    if (socket) {
      socket.on(EVENTS.STARTING_GAME, () => {
        setSplashScreen(true);
      });
    }
  }, [socket]);

  const handleOnSplashAnimEnds = () => {
    socket?.emit(EVENTS.START_GAME, roomId);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId!);
  };

  return (
    <div className="container waiting-container">
      <div className="waiting-icon">⌛</div>
      <h1 className="waiting-title">Waiting for opponents to join the game</h1>
      <h2 className="waiting-sub-title" >
        Or share this 👉<a data-text="copied" onClick={handleCopy}> link </a>👈 with your friends
        to invite them{" "}
      </h2>
      <ol className="waiting-player-list">
        {playerList.map((player, index) => (
          <PlayerItem
            key={`players-${index}`}
            id={player.id}
            name={player.name}
            color={player.color}
            showMe={player.id === myself?.id}
          />
        ))}
      </ol>
      {showSplashScreen && (
        <SplashScreen
          open={showSplashScreen}
          onComplete={handleOnSplashAnimEnds}
        />
      )}
    </div>
  );
};

export default Waiting;
