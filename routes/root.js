const { Router } = require('express')

const { checkUser } = require('../middlewares/auth')
const authRouter = require('./auth')
const quranRouter = require('./quran')
const articlesRouter = require('./articles')
const discussRouter = require('./discuss')

const rootRouter = Router()

rootRouter.get('*', checkUser)
rootRouter.get('/', (req, res) =>
  res.render('home', { title: `${res.locals.user ? res.locals.user.nickname : 'Guest'}` })
)
rootRouter.get('/about', (req, res) => res.render('about', { title: 'About' }))

rootRouter.use('/auth', authRouter)
rootRouter.use('/quran', quranRouter)
rootRouter.use('/articles', articlesRouter)
rootRouter.use(discussRouter)

rootRouter.use((req, res) => res.status(404).render('404', { title: '404' }))

module.exports = rootRouter
