const discussget = (req, res) => res.render('commun/discuss', { title: 'Discuss' });

const shareget = (req, res) => res.render('commun/share', { title: 'Share' });
const sharepost = (req, res) => {}

module.exports = {
  discussget,
  shareget, sharepost
};
