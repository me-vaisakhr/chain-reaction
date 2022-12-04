import { FC, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { GameContext } from "../../Layout/GameContext/GameContextProvider";
import { Cell } from "../../model/Cell";
import {
  currentPlayer,
  isMyTurn,
  me,
  selection,
  setSelection,
} from "../../redux/playerSlice";
import {
  EVENTS,
  EXPLODE_COUNT,
  GRID_COLS,
  GRID_ROWS,
} from "../../utils/constants";
import {
  getColumn,
  getIndex,
  getRow,
  isCorner,
  isEdge,
} from "../../utils/helper";
import CellInterface from "./Cell";
import "./Playground.css";

interface PlaygroundProps {
  roomId: string;
  viewInitilizeComplete: boolean;
  onComplete?: () => void;
}

const Playground: FC<PlaygroundProps> = ({ roomId, viewInitilizeComplete, onComplete }) => {
  const playerSelection = useSelector(selection);
  const currentplayer = useSelector(currentPlayer);
  const socket = useContext(GameContext);
  const isMyPlay = useSelector(isMyTurn);
  const myself = useSelector(me);
  const [attempts, setAttempts] = useState(0);

  const dispatch = useDispatch();

  const [grid, setGrid] = useState<Cell[]>(
    new Array(GRID_ROWS * GRID_COLS).fill(undefined).map((_, index) => ({
      index: index,
      bombCount: 0,
    }))
  );

  useEffect(() => {
    const currentGrid = [...grid];
    if (playerSelection === -1 && !currentGrid[playerSelection]) return;

    const cell: Cell = currentGrid[playerSelection];
    // if (cell.player && cell.player.id !== myself?.id) return;
    if (isCorner(playerSelection)) {
      if (cell.bombCount < EXPLODE_COUNT.CORNER) {
        cell.bombCount++;
      }
    } else if (isEdge(playerSelection)) {
      if (cell.bombCount < EXPLODE_COUNT.EDGE) {
        cell.bombCount++;
      }
    } else {
      if (cell.bombCount < EXPLODE_COUNT.OTHER) {
        cell.bombCount++;
      }
    }
    cell.player = currentplayer!;
    const newGrid = [...grid];
    newGrid[playerSelection] = cell;
    setGrid(newGrid);
    dispatch(setSelection(-1));
  }, [playerSelection]);

  // //Explode and send 1 bomb to neighbour
  const explode = (index: number) => {
    const newGrid = [...grid];
    console.info("Exploding index => ", index);
    // const currentplayer = gameContext?.currentPlayingPlayer;
    if (!currentplayer) return;
    const row = getRow(index);
    const col = getColumn(index);
    const currentIndex = getIndex(row, col);
    newGrid[currentIndex] = {
      index: currentIndex,
      bombCount: 0,
      player: undefined,
    };
    let topIndex = getIndex(row - 1, col);
    if (newGrid[topIndex]) {
      newGrid[topIndex].player = currentplayer;
      newGrid[topIndex].bombCount += 1;
    }
    let bottomIndex = getIndex(row + 1, col);
    if (newGrid[bottomIndex]) {
      newGrid[bottomIndex].player = currentplayer;
      newGrid[bottomIndex].bombCount += 1;
    }
    let leftIndex = getIndex(row, col - 1);
    if (newGrid[leftIndex]) {
      newGrid[leftIndex].player = currentplayer;
      newGrid[leftIndex].bombCount += 1;
    }
    let rightIndex = getIndex(row, col + 1);

    if (newGrid[rightIndex]) {
      newGrid[rightIndex].player = currentplayer;
      newGrid[rightIndex].bombCount += 1;
    }
    console.info("setting the new grid", playerSelection, currentplayer);
    setGrid(newGrid);
  };

  // //Check for is any more cells to explode
  // //return -1 if stable or gives index of unstable cell
  const isStableGrid = () => {
    for (let i = 0; i < grid.length; i++) {
      const cell = grid[i];
      if (isCorner(i) && cell.bombCount >= EXPLODE_COUNT.CORNER) {
        return i;
      } else if (isEdge(i) && cell.bombCount >= EXPLODE_COUNT.EDGE) {
        return i;
      } else if (cell.bombCount >= EXPLODE_COUNT.OTHER) {
        return i;
      }
    }
    return -1;
  };

  // //Game is finished
  const isGameFinished = () => {
    const occupiedCells = grid.filter(
      (cell) => cell.bombCount > 0 && cell.player
    );
    console.info(
      "Game finished checking => ",
      occupiedCells.length,
      occupiedCells.every(
        (cell) => cell.player?.id === occupiedCells[0].player?.id
      )
    );
    return (
      occupiedCells.length > 1 &&
      occupiedCells.every(
        (cell) => cell.player?.id === occupiedCells[0].player?.id
      )
    );
  };

  useEffect(() => {
    console.info("Grid updated", isMyPlay);
    const unStableIndex = isStableGrid();
    if (isGameFinished()) {
      // setGameCompleteStatus(true);
      onComplete?.();
    } else if (unStableIndex !== -1) {
      console.info("There are unstability in the grid");
      explode(unStableIndex);
    } else {
      const occupiedCells = grid.filter(
        (cell) => cell.bombCount > 0 && cell.player
      );
      console.info("Have occupied cells", occupiedCells.length, occupiedCells);
      if (occupiedCells.length) {
        console.info("---------------------");
        console.info("-----------Switching the player-----------");
        console.info("---------------------");
        setAttempts((attempts) => attempts + 1);
        socket?.emit(EVENTS.SWITCH_TURN, roomId, currentplayer?.id);
      }
    }
  }, [grid]);

  const isMyCell = (index: number) => {
    const cell = grid[index];
    return (
      cell.player === undefined ||
      (cell.player && cell.player.id === myself?.id)
    );
  };

  const handleCellClick = (index: number) => {
    if (isMyCell(index) && isMyPlay)
      socket?.timeout(500).emit(EVENTS.SELECTION, roomId, index);
  };

  return (
    <>
      <div className="game-cell-container">
        {grid.map((cell, index) => (
          <CellInterface
            key={`cell-${index}`}
            index={cell.index}
            disable={!isMyPlay}
            cellColor={currentplayer?.color}
            player={cell.player}
            bombCount={cell.bombCount}
            isMyCell={isMyCell(index)}
            onClick={handleCellClick}
          />
        ))}
      </div>
      {viewInitilizeComplete && isMyPlay && <h1 className="your-turn-notifier">🫵 your turn</h1>}
    </>
  );
};

export default Playground;
