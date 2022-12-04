export const MAX_USER_COUNT = 2

export const AVAILABLE_COLORS = ['red', 'green']

export const enum EVENTS {
  CONNECTION = 'connection',
  CONNECTION_ACK = 'handshake',
  USER_CONNECTION = 'user_connected',
  JOIN_ROOM = 'join_room',
  PLAYER_LIST = 'player_list',
  JOINED_ROOM = 'joined_room',
  JOINED_ROOM_FAILED = 'join_room_fail',
  STARTING_GAME = 'starting_game',
  START_GAME = 'start_game',
  STARTED_GAME = 'started_game',
  CURRENT_PLAYER = 'current_player',
  SELECTION = 'selection',
  UPDATE_SELECTION = 'update_selection',
  SWITCH_TURN = 'switch_turn',
  FINISH = 'finish',
  COMPLETED = 'completed',
  DISCONNECTED = 'disconnect',
}
