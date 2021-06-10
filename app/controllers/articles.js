const Article = require('../models/Article')
const { handleErrors, toDate } = require('../helpers/functions')

const articles_get = (req, res) =>
  Article.find()
    .then((articles) => res.render('articles/home', { articles }))
    .catch(console.log)

const createarticle_get = (req, res) => res.render('articles/create')
const createarticle_post = async (req, res) => {
  const { title, body, slug } = req.body
  const { user } = res.locals
  try {
    const d = new Date()
    const article = await Article.create({
      title,
      body,
      slug,
      author: { id: user.id, name: user.nickname },
      createdAt: { date: toDate(d), time: d.getTime() },
    })
    res.status(201).json({ article: article._id })
  } catch (err) {
    const errors = handleErrors(err).article
    res.status(404).json({ errors })
  }
}

const article_get = (req, res) =>
  Article.findOne({ slug: req.params.slug })
    .then((article) => res.render('articles/details', { article }))
    .catch(() => res.redirect('/articles'))

const editarticle_get = (req, res) => {
  const { id, nickname } = res.locals.user
  const { slug } = req.params
  Article.findOne({ slug, author: { id, name: nickname } }).then((article) => {
    if (article) res.render('articles/edit', { article })
    else res.redirect('/articles')
  })
}
const editarticle_put = async (req, res) => {
  const { title, body } = req.body
  const { slug } = req.params
  try {
    const article = await Article.findOne({ slug })
    article.title = title
    article.body = body
    article.save()
    res.status(201).json({ article: article._id })
  } catch (err) {
    const errors = handleErrors(err).article
    res.status(404).json({ errors })
  }
}

const deletearticle = (req, res) => {
  const { slug } = req.params
  const { id, nickname } = res.locals.user
  Article.findOneAndDelete({ slug, author: { id, name: nickname } })
    .then(() => res.json({ redirect: '/articles' }))
    .catch(() => res.json({ redirect: '/articles' }))
}

module.exports = {
  articles_get,
  createarticle_get,
  createarticle_post,
  article_get,
  editarticle_get,
  editarticle_put,
  deletearticle,
}
