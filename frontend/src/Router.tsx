import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Credits from "./containers/Credits";
import Game from "./containers/Game";
import JoinGame from "./containers/JoinGame";
import Lobby from "./containers/Lobby";
import Waiting from "./containers/Waiting";
import ContextLayout from "./Layout/ContextLayout";
import "./global.css";
import JoinRoom from "./containers/JoinRoom";

const Router = () => {
  return (
    <Suspense fallback={"Loading..."}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Lobby />} />
            <Route path="/room/join" element={<JoinRoom />} />
            <Route element={<ContextLayout />}>
              <Route path=":roomId">
                <Route path="join" element={<JoinGame />} />
                <Route path="wait" element={<Waiting />} />
                <Route path="start" element={<Game />} />
                <Route path="credits" element={<Credits />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default Router;
