import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Playground from "../components/Game/Playground";
import Stats from "../components/Stats";
import { GameContext } from "../Layout/GameContext/GameContextProvider";
import { currentPlayer } from "../redux/playerSlice";
import { EVENTS } from "../utils/constants";
import "./Game.css";

const Game = () => {
  const [initializeComplete, setInititalizeComplete] = useState(false);
  const socket = useContext(GameContext);
  const currentplayer = useSelector(currentPlayer);
  const { roomId } = useParams();
  const handleComplete = () => {
    socket?.timeout(3000).emit(EVENTS.COMPLETED, roomId, currentplayer?.id);
  };

  useEffect(() => {
    setTimeout(() => {
      setInititalizeComplete(true);
    }, 1200);
  }, []);
  return (
    <div className="container game-container">
      <h1 className="welcome-text">🤜 Let's Fight 🤛</h1>
      <div className="playground-container">
        <Playground
          roomId={roomId!}
          viewInitilizeComplete={initializeComplete}
          onComplete={handleComplete}
        />
        <Stats />
      </div>
    </div>
  );
};

export default Game;
