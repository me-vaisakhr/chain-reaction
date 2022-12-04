import { useNavigate } from "react-router-dom";
import { createRoom } from "../api/game";
import "./Lobby.css";

const Lobby = () => {
  const navigate = useNavigate();
  const handleCreateRoom = () => {
    createRoom()
      .then((response) => {
        console.log(response.data);
        const id = response.data.roomId;
        navigate(`/${id}/join`);
      })
      .catch((err) => console.log("Error : ", err));
  };
  const handleJoinRoom = () => {
    navigate(`/room/join`);
  }
  return (
    <div className="container lobby-container">
      <h1 className="greetings">👋</h1>
      <h2 className="lobby-logo">Chain Reaction</h2>
      <button
        className="button lobby-create-room-button"
        onClick={handleCreateRoom}
      >
        create a room
      </button>
      <button
        className="button lobby-create-room-button"
        onClick={handleJoinRoom}
      >
        join existing room
      </button>
    </div>
  );
};

export default Lobby;
