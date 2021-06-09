const { Router } = require('express')

const { quran_get, surah_get } = require('../controllers/quran')

const quranRouter = Router()

quranRouter.get('/', quran_get).get(`/:surah`, surah_get)

module.exports = quranRouter
