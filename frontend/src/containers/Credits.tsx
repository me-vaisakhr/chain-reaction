import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { isWinner } from "../redux/playerSlice";
import "./Credits.css";
const Credits = () => {
  const winner = useSelector(isWinner);
  const content = winner ? ["🏆", "Victory"] : ["🏳", "Defeated"];
  const navigate = useNavigate();
  const { roomId } = useParams();

  const handleReplay = () => {
    navigate(`/${roomId}/join`);
  };

  const handleExit = () => {
    navigate(`/`);
  };

  return (
    <div className="container credits-container">
      <div className="credit-icon winner">{content[0]}</div>
      <h1 className="credit-text">{content[1]}</h1>
      <div className="button-container">
        <button className="button credits-btn" onClick={handleReplay}>
          rejoin
        </button>
        <button className="button credits-btn" onClick={handleExit}>
          exit
        </button>
      </div>
    </div>
  );
};

export default Credits;
