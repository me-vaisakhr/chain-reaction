import { FC } from "react";
import { Cell } from "../../model/Cell";
import "./cell.css";

interface CellProps extends Cell {
  cellColor?: string;
  disable?: boolean;
  onClick?: (index: number) => void;
}

const CellInterfaceV1: FC<CellProps> = ({
  index,
  bombCount,
  player,
  disable,
  cellColor,
  onClick,
}) => {
  return (
    <div
      className="cell-container"
      style={{
        cursor: disable ? "not-allowed" : "pointer",
        borderColor: cellColor,
      }}
      onClick={() => {
        onClick?.(index);
      }}
    >
      <span style={{ color: player?.color }}>{`${
        bombCount > 0 ? bombCount : ""
      }`}</span>
    </div>
  );
};

export default CellInterfaceV1;
