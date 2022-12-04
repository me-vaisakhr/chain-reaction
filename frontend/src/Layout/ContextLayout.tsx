import { Outlet } from "react-router-dom";
import GameContextProvider from "./GameContext/GameContextProvider";

const ContextLayout = () => {
  return (
    <GameContextProvider>
      <Outlet />
    </GameContextProvider>
  );
};

export default ContextLayout;
