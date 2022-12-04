import { useSelector } from "react-redux";
import { isWinner } from "../redux/playerSlice";
import "./Credits.css";
const Credits = () => {
  const winner = useSelector(isWinner);
  const content = winner ? ["🏆", "Victory"] : ["🏳", "Defeated"];
  console.info(winner);
  return (
    <div className="container credits-container">
      <div className="credit-icon winner">{content[0]}</div>
      <h1 className="credit-text">{content[1]}</h1>
      <div className="button-container">
        <button className="button credits-btn">rejoin</button>
        <button className="button credits-btn">exit</button>
      </div>
    </div>
  );
};

export default Credits;
