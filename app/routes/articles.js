const { Router } = require('express')

const {
  articles_get,
  createarticle_get,
  createarticle_post,
  article_get,
  editarticle_get,
  editarticle_put,
  deletearticle,
} = require('../controllers/articles')
const { requireAuth } = require('../middlewares/auth')

const articlesRouter = Router()

articlesRouter
  .get('/', articles_get)

  .get('/create', requireAuth, createarticle_get)
  .post('/create', requireAuth, createarticle_post)

  .get('/:slug', article_get)

  .get('/edit/:slug', requireAuth, editarticle_get)
  .put('/edit/:slug', requireAuth, editarticle_put)

  .delete('/delete/:slug', requireAuth, deletearticle)

module.exports = articlesRouter
