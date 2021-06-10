const discussget = (req, res) => res.render('commun/discuss')

const shareget = (req, res) => res.render('commun/share')
const sharepost = (req, res) => {}

module.exports = {
  discussget,
  shareget,
  sharepost,
}
