'use strict'

const { Router } = require('express')

const { checkUser } = require('../middlewares/auth')

const rootRouter = Router()

rootRouter
  .get('*', checkUser)
  .get('/', (req, res) => res.render('home'))
  .get('/about', (req, res) => res.render('about'))

  .use('/auth', require('./auth'))
  .use('/quran', require('./quran'))
  .use('/articles', require('./articles'))
  .use(require('./discuss'))

  .use((req, res) => res.status(404).render('404'))

module.exports = rootRouter
