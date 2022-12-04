import { useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { GameContext } from "../Layout/GameContext/GameContextProvider";
import { EVENTS } from "../utils/constants";
import "./Join.css";

const JoinGame = () => {
  const { roomId } = useParams();
  const [userName, setName] = useState("");
  const socket = useContext(GameContext);
  const ref = useRef<HTMLInputElement>(null);
  const handleRedirectToWait = () => {
    if (!userName && ref) {
      ref.current?.focus();
      return;
    }
    if (!socket) return;
    userName && socket.emit(EVENTS.JOIN_ROOM, roomId, userName);
  };
  return (
    <div className="container join-container">
      <h3 className="username-title">👉 give us a username to identify you</h3>
      <input
        ref={ref}
        autoFocus
        className="username-text"
        value={userName}
        maxLength={8}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="enter username"
      />
      <button className="button join-button" onClick={handleRedirectToWait}>
        join game
      </button>
    </div>
  );
};

export default JoinGame;
