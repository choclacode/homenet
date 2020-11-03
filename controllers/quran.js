const surahs = require('../global/quran/surahs.json');

const quran_get = (req, res) => res.render('quran/home', { title: 'القرآن الكريم', surahs });
const surah_get = (req, res) => {
  try {
    const surah = require(`../global/quran/${req.params.surah}.json`);
    let info;
    surahs.forEach((list) => list.forEach(({ num, eng, ara }) => {
      if (num == req.params.surah) info = { num, eng, ara };
    }));
    res.render('quran/surah', { 
      title: `${info.eng} - ${info.ara}`, 
      info, surah 
    });
  } catch {
    res.redirect('/quran');
  }
}

module.exports = { quran_get, surah_get };
