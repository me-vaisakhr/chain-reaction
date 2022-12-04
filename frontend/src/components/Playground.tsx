import { FC, useContext, useEffect, useState } from "react";
import "./Playground.css";

import CellInterfaceV1 from "./Cell/cell";
import { Cell } from "../model/Cell";
import { EVENTS, EXPLODE_COUNT, GRID_SIZE } from "../utils/constants";
import { getColumn, getIndex, getRow, isCorner, isEdge } from "../utils/helper";
import { GameContext } from "../Layout/GameContext/GameContextProvider";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  currentPlayer,
  isMyTurn,
  players,
  selection,
  setSelection,
} from "../redux/playerSlice";
import { useDispatch } from "react-redux";

interface PlaygroundProps {
  onComplete: () => void;
}
//First needed to create grid
//which is a group of cells
const PlaygroundV1: FC<PlaygroundProps> = ({ onComplete }) => {
  // const socket = useContext(GameContext);
  // const { roomId } = useParams();
  // const dispatch = useDispatch();

  // const isMyPlay = useSelector(isMyTurn);
  // const currentplayer = useSelector(currentPlayer);
  // const currentSelectionIndex = useSelector(selection);
  // const playerList = useSelector(players);
  // // const player1: Player = { id: 1, name: "Player 1", color: "red" };
  // // const player2: Player = { id: 2, name: "Player 2", color: "blue" };

  // // const [attempts, setAttempts] = useState(0);

  // // useEffect(() => {
  // //   if (!socket) return;
  // //   initializeListners();
  // // }, [socket]);

  // console.info("Current active player => ", currentplayer);
  // console.info("Selected index => ", currentSelectionIndex);

  // useEffect(() => {
  //   if (currentSelectionIndex === -1) return;
  //   console.log("Player => ", currentplayer);
  //   // const currentplayer = currentplayer;
  //   if (!currentplayer) return;
  //   let cell = grid[currentSelectionIndex];
  //   if (cell.player && cell.player?.id !== currentplayer.id) return;
  //   if (isCorner(currentSelectionIndex)) {
  //     if (cell.bombCount < EXPLODE_COUNT.CORNER) {
  //       cell.bombCount++;
  //     }
  //   } else if (isEdge(currentSelectionIndex)) {
  //     if (cell.bombCount < EXPLODE_COUNT.EDGE) {
  //       cell.bombCount++;
  //     }
  //   } else {
  //     if (cell.bombCount < EXPLODE_COUNT.OTHER) {
  //       cell.bombCount++;
  //     }
  //   }
  //   cell.player = currentplayer;
  //   const newGrid = [...grid];
  //   newGrid[currentSelectionIndex] = cell;
  //   setGrid(newGrid);
  //   dispatch(setSelection(-1));
  // }, [currentSelectionIndex]);

  // // const initializeListners = useCallback(() => {
  // //   socket?.on(EVENTS.UPDATE_SELECTION, (index: number) => {});
  // // }, [currentplayer]);

  // const sendSelectionEvent = (event: string, index: number) => {
  //   socket?.timeout(500).emit(event, roomId, index);
  // };

  // const [isGameCompleted, setGameCompleteStatus] = useState(false);
  // const [grid, setGrid] = useState<Cell[]>(
  //   new Array(GRID_SIZE * GRID_SIZE).fill(undefined).map((_, index) => ({
  //     index: index,
  //     bombCount: 0,
  //   }))
  // );

  // const activeCells = grid.filter((cell) => cell.bombCount > 0 && cell.player);

  // // const handleReset = () => {
  // //   setGrid(
  // //     new Array(GRID_SIZE * GRID_SIZE).fill(undefined).map((_, index) => ({
  // //       index: index,
  // //       bombCount: 0,
  // //       player: undefined,
  // //     }))
  // //   );
  // //   setGameCompleteStatus(false);
  // //   setAttempts(0);
  // // };

  // // const getCurrentPlayer = () => (attempts % 2 === 0 ? player1 : player2);

  // //Game is finished
  // const isGameFinished = () => {
  //   const occupiedCells = grid.filter(
  //     (cell) => cell.bombCount > 0 && cell.player
  //   );
  //   console.info(
  //     "Game finished checking => ",
  //     occupiedCells.length,
  //     occupiedCells.every(
  //       (cell) => cell.player?.id === occupiedCells[0].player?.id
  //     )
  //   );
  //   return (
  //     occupiedCells.length > 1 &&
  //     occupiedCells.every(
  //       (cell) => cell.player?.id === occupiedCells[0].player?.id
  //     )
  //   );
  // };

  // const getWinner = () => {
  //   const occupiedCells = grid.filter(
  //     (cell) => cell.bombCount > 0 && cell.player
  //   );
  //   return occupiedCells[0].player;
  // };

  // //Explode and send 1 bomb to neighbour
  // const explode = (index: number) => {
  //   const newGrid = [...grid];
  //   console.info("Exploding index => ", index);
  //   // const currentplayer = gameContext?.currentPlayingPlayer;
  //   if (!currentplayer) return;
  //   const row = getRow(index);
  //   const col = getColumn(index);
  //   const currentIndex = getIndex(row, col);
  //   newGrid[currentIndex] = {
  //     index: currentIndex,
  //     bombCount: 0,
  //     player: undefined,
  //   };
  //   let topIndex = getIndex(row - 1, col);
  //   if (newGrid[topIndex]) {
  //     newGrid[topIndex].player = currentplayer;
  //     newGrid[topIndex].bombCount += 1;
  //   }
  //   let bottomIndex = getIndex(row + 1, col);
  //   if (newGrid[bottomIndex]) {
  //     newGrid[bottomIndex].player = currentplayer;
  //     newGrid[bottomIndex].bombCount += 1;
  //   }
  //   let leftIndex = getIndex(row, col - 1);
  //   if (newGrid[leftIndex]) {
  //     newGrid[leftIndex].player = currentplayer;
  //     newGrid[leftIndex].bombCount += 1;
  //   }
  //   let rightIndex = getIndex(row, col + 1);

  //   if (newGrid[rightIndex]) {
  //     newGrid[rightIndex].player = currentplayer;
  //     newGrid[rightIndex].bombCount += 1;
  //   }
  //   console.info("setting the new grid", currentSelectionIndex, currentplayer);
  //   setGrid(newGrid);
  // };

  // //Check for is any more cells to explode
  // //return -1 if stable or gives index of unstable cell
  // const isStableGrid = () => {
  //   for (let i = 0; i < grid.length; i++) {
  //     const cell = grid[i];
  //     if (isCorner(i) && cell.bombCount >= EXPLODE_COUNT.CORNER) {
  //       return i;
  //     } else if (isEdge(i) && cell.bombCount >= EXPLODE_COUNT.EDGE) {
  //       return i;
  //     } else if (cell.bombCount >= EXPLODE_COUNT.OTHER) {
  //       return i;
  //     }
  //   }
  //   return -1;
  // };

  // const handleCellClick = (index: number) => {
  //   if (isMyPlay) {
  //     sendSelectionEvent(EVENTS.SELECTION, index);
  //   }
  // };

  // useEffect(() => {
  //   const unStableIndex = isStableGrid();
  //   if (isGameFinished()) {
  //     console.info("Game finished");
  //     setGameCompleteStatus(true);
  //     onComplete();
  //   } else if (unStableIndex !== -1) {
  //     console.info("There are unstability in the grid");
  //     explode(unStableIndex);
  //   } else {
  //     const occupiedCells = grid.filter(
  //       (cell) => cell.bombCount > 0 && cell.player
  //     );
  //     console.info("Have occupied cells", occupiedCells.length, occupiedCells);
  //     if (occupiedCells.length) {
  //       console.info("---------------------");
  //       console.info("-----------Switching the player-----------");
  //       console.info("---------------------");
  //       isMyPlay && socket?.timeout(500).emit(EVENTS.SWITCH_TURN, roomId);
  //     }
  //   }
  // }, [grid]);

  return (
    <div className="container">
      {/* <h1>Chain reaction experiment</h1>
      <p>{`Grid Size : ${GRID_SIZE}`}</p>
      <div className="grid">
        {grid.map((cell, index) => (
          <CellInterfaceV1
            key={`cell-${index}`}
            index={cell.index}
            disable={!isMyPlay}
            cellColor={currentplayer?.color}
            player={cell.player}
            bombCount={cell.bombCount}
            onClick={handleCellClick}
          />
        ))}
      </div>
      {!isGameCompleted ? (
        <div>
          <span style={{ color: currentplayer?.color }}>
            {isMyPlay ? "Your" : currentplayer?.name}
          </span>
          's turn
        </div>
      ) : (
        <div style={{ padding: "2rem" }}>
          Winner is
          <span style={{ paddingLeft: "5px", color: getWinner()?.color }}>
            {getWinner()?.name}
          </span>
        </div>
      )}

      <br />
      <h4>Information</h4>
      <ul>
        {playerList.map((player) => (
          <li style={{ fontSize: "2rem" }}>
            <strong style={{ color: player?.color }}>{player.name}</strong>
            <p>{grid.filter((cell) => cell.player?.id === player.id).length}</p>
          </li>
        ))}
        <li>
          <strong>Total Cells</strong>
          <p>{GRID_SIZE * GRID_SIZE}</p>
        </li>
        <li>
          <strong>Occupied Cells</strong>
          <p>{activeCells.length}</p>
        </li>
        <li>
          <strong>Un occupied Cells</strong>
          <p>{GRID_SIZE * GRID_SIZE - activeCells.length}</p>
        </li>
        <li>
          <strong>Current Player</strong>
          <p style={{ color: currentplayer?.color }}>{currentplayer?.name}</p>
        </li>
      </ul> */}

      {/* <div>
        {isGameCompleted && <button onClick={handleReset}>Reset Again</button>}
      </div> */}
    </div>
  );
};

export default PlaygroundV1;
