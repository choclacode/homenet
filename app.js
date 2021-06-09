const express = require('express')
const { connect } = require('mongoose')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const { listen } = require('./global/functions')
const rootRouter = require('./routes/root')

const app = express()
connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.COOKIE_SECRET))

app.use(rootRouter)

listen(app)
