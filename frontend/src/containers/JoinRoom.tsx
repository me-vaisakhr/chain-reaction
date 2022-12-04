import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../Layout/GameContext/GameContextProvider";
import "./Join.css";

const JoinRoom = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const socket = useContext(GameContext);
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="container join-container">
      <h3 className="username-title">🥷 give us a the room name you have </h3>
      <input
        ref={ref}
        autoFocus
        className="username-text"
        value={roomId}
        maxLength={8}
        onChange={(e) => {
          setRoomId(e.target.value);
        }}
        placeholder="enter roomid"
      />
      <button
        className="button join-button"
        onClick={() => {
          roomId && navigate(`/${roomId}/join`);
        }}
      >
        join room
      </button>
    </div>
  );
};

export default JoinRoom;
