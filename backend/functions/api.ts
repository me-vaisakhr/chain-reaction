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
import { Config } from '../src/config.js'
import { ServerSocket } from '../src/GameServer/Socket.js'
import ShortUniqueId from 'short-unique-id'
const serverless = require('serverless-http')
const router = express.Router()

// const nodePath = resolve(process.argv[1])
// const modulePath = resolve(fileURLToPath(import.meta.url))
// const isCLI = nodePath === modulePath

const app: Express = express()
const server = createServer(app)

const port: number = 3000

const defaultCorsOpts = {
  credentials: true,
  preflightContinue: true,
  origin: ['https://chain-reaction-multiplier.netlify.app', 'http://localhost:3001', 'http://192.168.1.9:3001'],
}

router.use(cors(defaultCorsOpts))

const gameServer = new ServerSocket(server)

router.get('/', (req, res) => {
  res.send('Working Express!!!')
})

app.get('/create', (req, res) => {
  const uniqueRoomId = new ShortUniqueId({ length: 5 })
  res.status(200).send({ roomId: uniqueRoomId() })
})

//   server.listen(port)
// eslint-disable-next-line no-console
//   console.log(`Listening on port: ${port}`)

app.use('/', router)
module.exports.handler = serverless(app)
