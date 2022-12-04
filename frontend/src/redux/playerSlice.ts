import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../model/Player";
import { RootState } from "../store";

interface GameState {
  players: Player[];
  me: Player | null;
  currentPlayer: Player | null;
  currentSelection: number;
  winner: Player | null;
}

const initialState: GameState = {
  players: [],
  me: null,
  currentPlayer: null,
  currentSelection: -1,
  winner: null,
};

export const playerSlice = createSlice({
  name: "playerSlice",
  initialState,
  reducers: {
    updatePlayers: (state, action: PayloadAction<Player[]>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.players = action.payload;
    },
    setMe: (state, action: PayloadAction<Player>) => {
      state.me = action.payload;
    },
    updateCurrentPlayer: (state, action: PayloadAction<Player>) => {
      state.currentPlayer = action.payload;
    },
    setSelection: (state, action: PayloadAction<number>) => {
      state.currentSelection = action.payload;
    },
    setWinner: (state, action: PayloadAction<Player>) => {
      state.winner = action.payload;
    },
    reset: (state, action: PayloadAction<number>) => {
      state = initialState;
    },
  },
});

export const {
  updatePlayers,
  setMe,
  updateCurrentPlayer,
  setSelection,
  setWinner,
  reset,
} = playerSlice.actions;

export const players = (state: RootState) => state.game.players;
export const currentPlayer = (state: RootState) => state.game.currentPlayer;
export const me = (state: RootState) => state.game.me;
export const isMyTurn = (state: RootState) =>
  state.game.me?.id === state.game.currentPlayer?.id;
export const selection = (state: RootState) => state.game.currentSelection;
export const isWinner = (state: RootState) =>
  state.game.me?.id === state.game.winner?.id || false;

export default playerSlice.reducer;
