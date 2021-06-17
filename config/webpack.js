require('dotenv').config({ path: `${__dirname}/.env/.env` })

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './app/resources/js',
  output: {
    filename: 'main.js',
    path: `${__dirname}/../public`,
  },
}
