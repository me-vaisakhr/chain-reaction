export const GRID_SIZE: number = 8;

export const GRID_ROWS: number = 7;
export const GRID_COLS: number = 7;

export enum EXPLODE_COUNT {
  CORNER = 2,
  EDGE = 3,
  OTHER = 4,
}

export const enum EVENTS {
  CONNECTION = "connection",
  CONNECTION_ACK = "handshake",
  USER_CONNECTION = "user_connected",
  PLAYER_LIST = "player_list",
  JOIN_ROOM = "join_room",
  JOINED_ROOM = "joined_room",
  JOINED_ROOM_FAILED = "join_room_fail",
  STARTING_GAME = "starting_game",
  START_GAME = "start_game",
  STARTED_GAME = "started_game",
  CURRENT_PLAYER = "current_player",
  SELECTION = "selection",
  UPDATE_SELECTION = "update_selection",
  SWITCH_TURN = "switch_turn",
  FINISH = "finish",
  COMPLETED = "completed",
  DISCONNECTED = "disconnect",
}

export const SWITCH_TURN_TIMER_SECS: number = 30;
