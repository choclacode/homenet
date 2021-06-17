'use strict'

const express = require('express')
const { connect } = require('mongoose')
const cookie = require('cookie-parser')
require('dotenv').config({ path: `${__dirname}/.env/.env` })

const rootRouter = require('../app/routes/root')

const listen = (app) => {
  connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

  const server = app.listen(process.env.PORT)
  const io = require('socket.io')(server)
  io.on('connection', (socket) => socket.on('new-msg', (data) => socket.broadcast.emit('sendmsg', data)))

  return app
}

module.exports = (app) =>
  listen(app)
    .set('view engine', 'pug')
    .set('views', `${__dirname}/../app/views`)
    .use(
      express.static('public'),
      express.json(),
      express.urlencoded({ extended: true }),
      cookie(process.env.COOKIE_SECRET),
      rootRouter
    )
