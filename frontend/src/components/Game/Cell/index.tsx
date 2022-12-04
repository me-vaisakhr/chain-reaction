import { FC } from "react";
import { Cell } from "../../../model/Cell";
import "./Cell.css";

interface Props extends Cell {
  cellColor?: string;
  disable?: boolean;
  isMyCell?: boolean;
  onClick?: (index: number) => void;
}

const CellInterface: FC<Props> = ({
  index,
  bombCount,
  cellColor,
  isMyCell = true,
  disable,
  player,
  onClick,
}) => {
  return (
    <div
      className={`cell-container ${(disable || !isMyCell) && "disabled"}`}
      style={{
        borderColor: `${player?.color || "#ececec"}`,
      }}
      onClick={() => !disable && onClick?.(index)}
    >
      {Array.from({ length: bombCount }).map(() => `💣`)}
    </div>
  );
};

export default CellInterface;
