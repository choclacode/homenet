'use strict'

const fetch = require('node-fetch')

const url = 'https://choclacode.herokuapp.com/api/quran'

const quran_get = async (req, res) => res.render('quran/home', { surahs: await fetch(url).then((r) => r.json()) })
const surah_get = async (req, res) => {
  try {
    const data = await fetch(`${url}/${req.params.surah}`).then((r) => r.json())
    if (data instanceof Array && data.length === 3) return res.redirect('/quran')
    const { surah, info } = data
    res.render('quran/surah', { info, surah })
  } catch {
    res.redirect('/quran')
  }
}

module.exports = { quran_get, surah_get }
