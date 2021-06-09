const { Router } = require('express')

const { checkUser } = require('../middlewares/auth')
const authRouter = require('./auth')
const quranRouter = require('./quran')
const articlesRouter = require('./articles')
const discussRouter = require('./discuss')

const rootRouter = Router()

rootRouter
  .get('*', checkUser)
  .get('/', (req, res) => res.render('home', { title: `${res.locals.user ? res.locals.user.nickname : 'Guest'}` }))
  .get('/about', (req, res) => res.render('about', { title: 'About' }))

  .use('/auth', authRouter)
  .use('/quran', quranRouter)
  .use('/articles', articlesRouter)
  .use(discussRouter)

  .use((req, res) => res.status(404).render('404', { title: '404' }))

module.exports = rootRouter
