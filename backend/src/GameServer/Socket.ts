//--es-module-specifier-resolution=node
import { Server as HttpServer } from 'http'
import type { SocketId } from 'socket.io-adapter'
import { Socket, Server } from 'socket.io'
import { AVAILABLE_COLORS, EVENTS, MAX_USER_COUNT } from '../utils/constants'

type PlaterStatus = 'ACTIVE' | 'INACTIVE'

interface Player {
  id: SocketId
  name: string
  color: string
  room_id?: string
  status?: PlaterStatus
}

type RoomStatus = 'WAITING' | 'PLAYING' | 'FINISH'

interface Room {
  id: string
  players: Player[]
  status: RoomStatus
}

export class ServerSocket {
  public static instance: ServerSocket
  public io: Server
  public players: Player[]

  constructor(server: HttpServer) {
    ServerSocket.instance = this
    this.players = []
    this.io = new Server(server, {
      transports: ['websocket', 'polling'],
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false,
      cors: {
        origin: '*',
      },
    })

    this.io.on(EVENTS.CONNECTION, this.initializeListeners)
  }

  getAllRoomSpecificPlayers = (room_id: string) => this.players.filter(player => player.room_id === room_id)

  initializeListeners = (socket: Socket) => {
    console.info('Message received from ' + socket.id)

    socket.on(EVENTS.CONNECTION_ACK, (callback: (users: string[]) => void) => {
      console.info('Handshake received from: ' + socket.id)
      //user_connected
      socket.emit(EVENTS.USER_CONNECTION)
      callback([])
    })

    socket.on(EVENTS.JOIN_ROOM, (room_id: string, username: string) => {
      console.info(`Joining room [${room_id}] by ${socket.id} as ${username}`)

      const playerIndex = this.players.findIndex(player => player.id === socket.id)
      const isPlayerPlaying = playerIndex > -1 && this.players[playerIndex].room_id
      let currentRoomPlayers = this.getAllRoomSpecificPlayers(room_id)

      if (isPlayerPlaying) {
        console.info(`Joining room [${room_id}] failed for ${socket.id} as ${username}`)
        socket.emit(EVENTS.JOINED_ROOM_FAILED, `Already in another room! can't join another!!!`)
        return
      }
      const colorIndex = currentRoomPlayers.length % MAX_USER_COUNT
      const playerColor = AVAILABLE_COLORS[colorIndex < 0 ? 0 : colorIndex]
      console.info(`Player[${username}] color is ${playerColor}`)
      let currentPlayer = null
      if (playerIndex > -1) {
        this.players[playerIndex] = {
          ...this.players[playerIndex],
          room_id,
          color: playerColor,
          status: 'ACTIVE',
        }
        currentPlayer = this.players[playerIndex]
      } else {
        const player: Player = {
          id: socket.id,
          color: playerColor,
          name: username,
          room_id,
          status: 'ACTIVE',
        }
        //for temporary
        currentPlayer = player
        currentRoomPlayers.push(player)
        this.players.push(player)
      }

      //joining room id
      socket.join(room_id)
      //saving the user to global array

      console.info(`Joining room [${room_id}] success for ${socket.id} as ${username}`)
      socket.emit(EVENTS.JOINED_ROOM, currentPlayer)
      this.io.to(room_id).emit(EVENTS.PLAYER_LIST, currentRoomPlayers)

      //logic to initiate the game if max user counts condition met. along with first player to play game
      if (currentRoomPlayers.length >= MAX_USER_COUNT) {
        this.io.to(room_id).emit(EVENTS.CURRENT_PLAYER, currentRoomPlayers[0])
        console.info('Max user reached. starting game')
        setTimeout(() => {
          this.io.to(room_id).emit(EVENTS.STARTING_GAME)
        }, 1000)
      }
    })

    socket.on(EVENTS.START_GAME, (room_id: string) => {
      console.info(`Game is started @ [${room_id}]`)
      this.io.to(room_id).emit(EVENTS.STARTED_GAME)
    })

    socket.on(EVENTS.SELECTION, (room_id: string, selection: number) => {
      //once user select a cell here it will update for all users
      console.info(`Updating the selection to members[${room_id}] - [${selection}]`)
      this.io.to(room_id).emit(EVENTS.UPDATE_SELECTION, selection)
    })

    socket.on(EVENTS.SWITCH_TURN, (room_id: string, currentPlayerId: string) => {
      const players = this.getAllRoomSpecificPlayers(room_id)
      const currentPlayerIndex = players.findIndex(player => player.id === currentPlayerId)
      console.info(`Request from ${socket.id} -> current selection [${currentPlayerId}] of room [${room_id}]`)
      console.info(`Switching the turn to `, currentPlayerIndex, players[(currentPlayerIndex + 1) % MAX_USER_COUNT])
      // this.io
      //   .to(room_id)
      //   .timeout(1000)
      //   .emit(EVENTS.CURRENT_PLAYER, players[(currentPlayerIndex + 1) % MAX_USER_COUNT])
      socket.timeout(1000).emit(EVENTS.CURRENT_PLAYER, players[(currentPlayerIndex + 1) % MAX_USER_COUNT])
    })

    socket.on(EVENTS.COMPLETED, (room_id: string, currentPlayerId: string) => {
      const players = this.getAllRoomSpecificPlayers(room_id)
      const currentPlayerIndex = players.findIndex(player => player.id === currentPlayerId)
      //It will finish the game by sending winner details
      console.info(`Game completed and winner is `, players[currentPlayerIndex])
      this.io.to(room_id).emit(EVENTS.FINISH, players[currentPlayerIndex])
      console.log(`Leaving room`)
      for (let p of players) {
        const index = players.findIndex(player => player.id === p.id)
        this.players[index] = { ...this.players[index], room_id: undefined, status: 'INACTIVE' }
      }
      socket.leave(room_id)
    })

    socket.on(EVENTS.DISCONNECTED, () => {
      console.info('Disconnect received from: ' + socket.id)
      //user disconnection logic

      const playerIndex = this.players.findIndex(player => player.id === socket.id)
      if (playerIndex > -1) {
        socket.leave(this.players[playerIndex].room_id!)
        socket.disconnect()
        this.players[playerIndex] = { ...this.players[playerIndex], room_id: undefined, status: 'INACTIVE' }
      }
    })
  }
}

export default {}
