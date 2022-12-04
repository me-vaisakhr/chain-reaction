import React, { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { useSocket } from "../../hooks/useSocket";
import { Player } from "../../model/Player";
import {
  setMe,
  setSelection,
  setWinner,
  updateCurrentPlayer,
  updatePlayers,
} from "../../redux/playerSlice";
import { EVENTS } from "../../utils/constants";

export const GameContext = createContext<Socket | null>(null);
const WEB_SOCKET_URI = "ws://127.0.0.1:8080";

const GameContextProvider: React.FC<any> = ({ children }) => {
  // const [players, setPlayers] = useState<Player[]>([]);
  // const [me, setMe] = useState<Player>();
  // const me = useRef<Player>();
  // const [isMyTurn, setMyTurn] = useState<boolean>(false);
  // const [currentPlayingPlayer, setCurrentPlayingPlayer] =
  // useState<Player | null>(null);
  const dispatch = useDispatch();
  const socket = useSocket(WEB_SOCKET_URI, {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: false,
  });

  const navigate = useNavigate();
  const { roomId } = useParams();

  useEffect(() => {
    socket.connect();
    startListeners();
    sendHandshake();
    initializeGlobalGameListners();
    // eslint-disable-next-line
  }, [socket]);

  const redirectToPage = (
    page: "HOME" | "JOIN" | "WAIT" | "GAME" | "CREDIT"
  ) => {
    switch (page) {
      case "HOME":
        navigate(`/`);
        break;
      case "JOIN":
        navigate(`/${roomId}/join`);
        break;
      case "WAIT":
        navigate(`/${roomId}/wait`, { replace: true });
        break;
      case "GAME":
        navigate(`/${roomId}/start`, { replace: true });
        break;
      case "CREDIT":
        navigate(`/${roomId}/credits`, { replace: true });
        break;
      default:
        console.log("No redirection mentioned");
    }
  };

  const initializeGlobalGameListners = () => {
    console.log({ roomId });

    socket.on(EVENTS.JOINED_ROOM, (player: Player) => {
      console.info("Room Joined => ");
      dispatch(setMe(player));
      redirectToPage("WAIT");
    });

    socket.on(EVENTS.PLAYER_LIST, (players: Player[]) => {
      console.info("Players list => ", players);
      dispatch(updatePlayers(players));
      // setMe(players.filter((player) => player.id === socket.id)[0]);
    });

    socket.on(EVENTS.JOINED_ROOM_FAILED, (reason: string) => {
      console.info("Joining room failed => ", reason);
      redirectToPage("HOME");
    });

    socket.on(EVENTS.STARTED_GAME, () => {
      redirectToPage("GAME");
    });

    socket.on(EVENTS.CURRENT_PLAYER, (player: Player) => {
      dispatch(updateCurrentPlayer(player));
      // setCurrentPlayingPlayer(player);
      console.log("CURRENT =>", player);
    });

    socket.on(EVENTS.UPDATE_SELECTION, (index: number) => {
      setTimeout(() => {
        dispatch(setSelection(index));
      }, 100);
    });

    socket.on(EVENTS.FINISH, (winner: Player) => {
      dispatch(setWinner(winner));
      setTimeout(() => {
        redirectToPage("CREDIT");
      }, 1000);
    });
  };

  const startListeners = () => {
    /** Messages */
    socket.on(EVENTS.USER_CONNECTION, (users: string[]) => {
      console.info("User connected message received");
    });

    /** Messages */
    socket.on("user_disconnected", (uid: string) => {
      console.info("User disconnected message received");
      // SocketDispatch({ type: "remove_user", payload: uid });
    });

    /** Connection / reconnection listeners */
    socket.io.on("reconnect", (attempt) => {
      console.info("Reconnected on attempt: " + attempt);
      sendHandshake();
    });

    socket.io.on("reconnect_attempt", (attempt) => {
      console.info("Reconnection Attempt: " + attempt);
    });

    socket.io.on("reconnect_error", (error) => {
      console.info("Reconnection error: " + error);
    });

    socket.io.on("reconnect_failed", () => {
      console.info("Reconnection failure.");
      console.error(
        "We are unable to connect you to the chat service.  Please make sure your internet connection is stable or try again later."
      );
    });
  };

  const sendHandshake = async () => {
    console.info("Sending handshake to server ...");

    socket.emit("handshake", async (users: string[]) => {
      console.info("User handshake callback message received", users);
    });
  };
  return <GameContext.Provider value={socket}>{children}</GameContext.Provider>;
};

export default GameContextProvider;
