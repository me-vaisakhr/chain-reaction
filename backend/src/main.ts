#!/usr/bin/env node

/**
 * This is a sample HTTP server.
 * Replace this with your implementation.
 */

import 'dotenv/config'
import { createServer, IncomingMessage, ServerResponse } from 'http'
import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { Config } from './config.js'
import { ServerSocket } from './GameServer/Socket.js'
import ShortUniqueId from 'short-unique-id'

const nodePath = resolve(process.argv[1])
const modulePath = resolve(fileURLToPath(import.meta.url))
const isCLI = nodePath === modulePath

export default function main(port: number = Config.port) {
  const app: Express = express()
  const server = createServer(app)

  const defaultCorsOpts = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://192.168.1.9:3000'],
  }

  app.use(cors(defaultCorsOpts))

  const gameServer = new ServerSocket(server)

  server.prependListener('request', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
  })

  app.get('/', (req, res) => {
    res.send('Working Express!!!')
  })

  app.get('/create', (req, res) => {
    const uniqueRoomId = new ShortUniqueId({ length: 5 })
    res.status(200).send({ roomId: uniqueRoomId() })
  })

  if (isCLI) {
    server.listen(port)
    // eslint-disable-next-line no-console
    console.log(`Listening on port: ${port}`)
  }

  return server
}

if (isCLI) {
  main()
}
