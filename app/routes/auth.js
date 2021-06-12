'use strict'

const { Router } = require('express')

const { signup_get, signup_post, login_get, login_post, logout_get } = require('../controllers/auth')

const authRouter = Router()

authRouter
  .get('/signup', signup_get)
  .post('/signup', signup_post)

  .get('/login', login_get)
  .post('/login', login_post)

  .get('/logout', logout_get)

module.exports = authRouter
